import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatNumber } from '@/core/utils/utils'
interface Item {
    PlantCode: string;
    PlantName: string;
    Value: number;
}

interface Props {
    title: string;
    items: Item[];
    total: number;
    totalUnit: string;
    variant?: 'blue' | 'purple' | 'red';
}

export default function TotalRevenueExpensesItem({
    title,
    items,
    total,
    totalUnit,
    variant = 'blue',
}: Props) {
    return (
        <View style={[styles.card, styles[variant]]}>
            <View style={styles.left}>
                <Text style={styles.title}>{title}</Text>

                {items.map((item, idx) => (
                    <View key={idx} style={styles.row}>
                        <Text style={styles.label}>{item.PlantName}:</Text>
                        <Text style={styles.value}>
                            {formatNumber(item.Value)} Tỷ
                        </Text>
                    </View>
                ))}
            </View>

            <View style={styles.right}>
                <Text style={styles.total}>{formatNumber(total)}</Text>
                <Text style={styles.totalUnit}>{totalUnit}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
        marginTop: 12,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 5,
    },

    /* ===== Variants ===== */
    blue: {
        backgroundColor: '#0F172A',
        borderWidth: 1,
        borderColor: 'rgba(59,130,246,0.35)',
    },
    purple: {
        backgroundColor: '#0F172A',
        borderWidth: 1,
        borderColor: 'rgba(139,92,246,0.35)',
    },
    red: {
        backgroundColor: '#0F172A',
        borderWidth: 1,
        borderColor: 'rgba(239,68,68,0.35)',
    },

    left: {
        flex: 1,
    },

    right: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginLeft: 12,
    },

    title: {
        color: '#94A3B8',
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 8,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
        paddingRight: 12,
    },

    label: {
        color: '#94A3B8',
        fontSize: 11,
    },

    value: {
        color: '#22C55E',
        fontSize: 11,
        fontWeight: '600',
    },

    total: {
        color: '#F8FAFC',
        fontSize: 22,
        fontWeight: '700',
        lineHeight: 26,
    },

    totalUnit: {
        color: '#94A3B8',
        fontSize: 11,
        marginTop: 2,
    },
});
