import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface Props { }

const data = {
    powerPrices: [
        { label: 'GIÁ TT BÌNH QUÂN NGÀY', value: '1,245', unit: 'Đồng/kWh', type: 'blue' },
        { label: 'GIÁ CÔNG SUẤT BQ', value: '156', unit: 'Đồng/kWh', type: 'gray' },

        // ✅ FULL WIDTH
        {
            label: 'GIÁ THỊ TRƯỜNG TOÀN PHẦN',
            value: '1,401',
            unit: 'Đồng/kWh',
            type: 'green',
            full: true,
        },

        { label: 'GIÁ TRẦN CHÀO', value: '1,590', unit: 'Đồng/kWh', type: 'gray' },
        { label: 'GIÁ HĐ THÁNG (TẠM TÍNH)', value: '1,180', unit: 'Đồng/kWh', type: 'gray' },

        // ✅ FULL WIDTH
        {
            label: 'GIÁ BIẾN ĐỔI NHIÊN LIỆU',
            value: '0',
            unit: 'Đồng/kWh',
            note: 'Thuỷ điện không áp dụng',
            type: 'gray',
            full: true,
        },
    ],
};

function SectionBox({ children, style }: any) {
    return <View style={style}>{children}</View>;
}

export default function PowerPrices(props: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>GIÁ ĐIỆN</Text>

            <View style={styles.gridWrap}>
                {data.powerPrices.map((item, idx) => {
                    const boxStyle: any[] = [
                        styles.sectionBox,
                        item.type === 'blue' && styles.boxBlue,
                        item.type === 'green' && styles.boxGreen,
                        item.type === 'gray' && styles.boxGray,
                        item.full && styles.fullWidth,
                    ];

                    return (
                        <SectionBox key={idx} style={boxStyle}>
                            <Text style={styles.label}>{item.label}</Text>
                            <Text style={styles.value}>{item.value}</Text>
                            <Text style={styles.unit}>{item.unit}</Text>
                            {item.note && <Text style={styles.note}>{item.note}</Text>}
                        </SectionBox>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B1220',
        // padding: 16,
    },

    sectionTitle: {
        color: '#94A3B8',
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 12,
    },

    gridWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    sectionBox: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        width: '48%',
        marginRight: '2%',
        minHeight: 110,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.28,
        shadowRadius: 12,
        elevation: 5,
    },

    /** 🔵 XANH DƯƠNG DỊU */
    boxBlue: {
        backgroundColor: 'rgba(30, 99, 255, 0.18)',
        borderWidth: 1,
        borderColor: 'rgba(96, 165, 250, 0.6)',
    },

    /** 🟢 XANH LÁ DỊU */
    boxGreen: {
        backgroundColor: 'rgba(16, 185, 129, 0.16)',
        borderWidth: 1,
        borderColor: 'rgba(52, 211, 153, 0.6)',
    },

    /** ⚪ XÁM */
    boxGray: {
        backgroundColor: 'rgba(30, 41, 59, 0.85)',
        borderWidth: 1,
        borderColor: '#334155',
    },

    fullWidth: {
        width: '100%',
        marginRight: 0,
    },

    label: {
        color: '#94A3B8',
        fontSize: 11,
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        marginBottom: 6,
    },

    value: {
        color: '#F8FAFC',
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 28,
    },

    unit: {
        color: '#94A3B8',
        fontSize: 11,
        marginTop: 2,
    },

    note: {
        color: '#64748B',
        fontSize: 11,
        marginTop: 6,
    },
});
