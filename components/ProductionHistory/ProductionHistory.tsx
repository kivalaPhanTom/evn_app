import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface DayProduction {
    date: string;
    actual: number;
    contract: number;
}

interface ProductionHistoryProps {
    days: DayProduction[];
    unit?: string;
}

const ProductionHistory: React.FC<ProductionHistoryProps> = ({
    days,
    unit = 'tr.Wh'
}) => {
    return (
        <LinearGradient
            colors={['#1a2533', '#253344', '#1a2533']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >

            <View style={styles.content}>
                {/* Title */}
                <Text style={styles.title}>SẢN LƯỢNG 7 NGÀY GẦN NHẤT</Text>

                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <Text style={[styles.headerText, styles.col1]}>NGÀY</Text>
                    <Text style={[styles.headerText, styles.col2]}>THỰC TẾ</Text>
                    <Text style={[styles.headerText, styles.col3]}>HỢP ĐỒNG</Text>
                </View>

                <View style={styles.separator} />

                {/* Table Rows */}
                <ScrollView
                    style={styles.tableBody}
                    showsVerticalScrollIndicator={false}
                >
                    {days.map((day, index) => {
                        const isAboveContract = day.actual >= day.contract;
                        const actualColor = isAboveContract ? '#4ade80' : '#ef4444';

                        return (
                            <View key={index} style={styles.rowCard}>
                                <View style={styles.tableRow}>
                                    <Text style={[styles.cellText, styles.col1, styles.dateText]}>
                                        {day.date}
                                    </Text>
                                    <View style={styles.col2}>
                                        <Text style={[styles.cellText, styles.valueText, { color: actualColor }]}>
                                            {day.actual.toFixed(1)}{' '}
                                            <Text style={styles.unitText}>{unit}</Text>
                                        </Text>
                                    </View>
                                    <View style={styles.col3}>
                                        <Text style={[styles.cellText, styles.valueText, styles.contractText]}>
                                            {day.contract.toFixed(1)}{' '}
                                            <Text style={styles.unitText}>{unit}</Text>
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>

                {/* Legend */}
                <View style={styles.legend}>
                    <Text style={styles.legendText}>
                        Màu xanh: Đạt/vượt hợp đồng • Màu đỏ: Dưới hợp đồng
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        padding: 24,
        minHeight: 500,
        position: 'relative',
        overflow: 'hidden',
    },
    content: {
        zIndex: 1,
        flex: 1,
    },
    title: {
        color: '#a8b2c1',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 24,
        letterSpacing: 1,
    },
    tableHeader: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 4,
    },
    headerText: {
        color: '#7a8596',
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        marginBottom: 8,
    },
    tableBody: {
        flex: 1,
        gap: 12,
    },
    rowCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 18,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    col1: {
        flex: 1,
    },
    col2: {
        flex: 1,
        alignItems: 'flex-start',
    },
    col3: {
        flex: 1,
        alignItems: 'flex-start',
    },
    cellText: {
        fontSize: 15,
    },
    dateText: {
        color: '#e8eaed',
        fontWeight: '500',
    },
    valueText: {
        fontSize: 18,
        fontWeight: '700',
    },
    contractText: {
        color: '#eab308',
    },
    unitText: {
        fontSize: 13,
        fontWeight: '400',
        color: '#7a8596',  // Màu xám riêng ✅
        opacity: 0.7,
    },
    legend: {
        marginTop: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
    },
    legendText: {
        color: '#7a8596',
        fontSize: 12,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    // Decorative dots
    dot: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        borderRadius: 50,
        opacity: 0.5,
    },
});

export default ProductionHistory;
