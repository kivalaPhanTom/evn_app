import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface DayPower {
    value: number;
    label: string;
}

interface PowerHistoryProps {
    days: DayPower[];
    unit?: string;
}

const PowerHistory: React.FC<PowerHistoryProps> = ({
    days,
    unit = 'MW'
}) => {
    return (
        <LinearGradient
            colors={['#1a2332', '#2a3544', '#1a2332']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >

            <View style={styles.content}>
                <Text style={styles.title}>CÔNG SUẤT 7 NGÀY GẦN NHẤT</Text>

                {/* Scrollable Power Values */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {days.map((day, index) => (
                        <View key={index} style={styles.valueCard}>
                            <View style={styles.valueItem}>
                                <Text style={styles.powerValue}>{day.value}</Text>
                                <Text style={styles.dayLabel}>{day.label}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                {/* Bottom Info */}
                <View style={styles.bottomInfo}>
                    <View style={styles.hintRow}>
                        <View style={styles.legendDot} />
                        <Text style={styles.hintText}>
                            Lướt ngang để xem thêm →
                        </Text>
                    </View>
                    <Text style={styles.unitText}>Đơn vị: {unit}</Text>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 20,
        minHeight: 160,
        position: 'relative',
        overflow: 'hidden',
    },
    content: {
        zIndex: 1,
    },
    title: {
        color: '#8b92a0',
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 20,
        letterSpacing: 0.5,
    },
    scrollContent: {
        paddingRight: 20,
    },
    valueCard: {
        backgroundColor: '#1e2838',
        borderRadius: 12,
        marginRight: 12,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    valueItem: {
        alignItems: 'center',
    },
    powerValue: {
        color: '#5b8def',
        fontSize: 40,
        fontWeight: '700',
        marginBottom: 4,
    },
    dayLabel: {
        color: '#8b92a0',
        fontSize: 11,
        fontWeight: '500',
    },
    bottomInfo: {
        marginTop: 20,
        alignItems: 'center',  // Thêm dòng này
    },
    hintRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'center',  // Thêm dòng này
    },
    legendDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#5b8def',
        marginRight: 8,
    },
    hintText: {
        color: '#8b92a0',
        fontSize: 11,
        textAlign: 'center'
    },
    unitText: {
        color: '#8b92a0',
        fontSize: 11,
    },
    // Decorative stars
    star: {
        position: 'absolute',
        width: 2,
        height: 2,
        backgroundColor: '#ffffff',
        borderRadius: 1,
        opacity: 0.6,
    },
    star1: {
        top: 20,
        right: 60,
    },
    star2: {
        top: 15,
        left: 40,
    },
    star3: {
        top: 50,
        right: 100,
    },
    star4: {
        bottom: 30,
        left: 30,
    },
    star5: {
        bottom: 50,
        right: 40,
    },
});

export default PowerHistory;
