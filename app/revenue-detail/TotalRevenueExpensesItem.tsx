import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatNumber } from '@/core/utils/utils'
import { Colors } from '@/core/constants/colors';
import { useAppTheme } from '@/core/hooks/use-app-theme';
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

const accents = {
    blue: { light: '#155E75', darkBorder: 'rgba(34,211,238,0.25)' },
    purple: { light: '#5B4394', darkBorder: 'rgba(167,139,250,0.25)' },
    red: { light: '#9B4141', darkBorder: 'rgba(248,113,113,0.25)' },
};

export default function TotalRevenueExpensesItem({
    title,
    items,
    total,
    totalUnit,
    variant = 'blue',
}: Props) {
    const isDark = useAppTheme() === 'dark';
    const accent = accents[variant];
    const heading = <Text style={[styles.title, !isDark && styles.lightTitle]}>{title}</Text>;
    const amount = (
        <View style={styles.right}>
            <Text style={[styles.total, !isDark && { color: accent.light }]}>{formatNumber(total)}</Text>
            <Text style={[styles.totalUnit, !isDark && styles.lightLabel]}>{totalUnit}</Text>
        </View>
    );

    return (
        <View style={[styles.card, isDark ? { borderColor: accent.darkBorder } : styles.lightCard]}>
            {!isDark && <View style={styles.lightHeader}>{heading}{amount}</View>}
            <View style={isDark ? styles.left : undefined}>
                {isDark && heading}
                {items.map((item) => (
                    <View key={item.PlantCode} style={[styles.row, !isDark && styles.lightRow]}>
                        <Text style={[styles.label, !isDark && styles.lightLabel]}>{item.PlantName}{isDark ? ':' : ''}</Text>
                        <Text style={[styles.value, !isDark && styles.lightValue]}>{formatNumber(item.Value)} {isDark ? 'Tỷ' : 'tỷ'}</Text>
                    </View>
                ))}
            </View>
            {isDark && amount}
        </View>
    );
}
const styles = StyleSheet.create({
    lightCard: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderColor: '#D9DFE6',
        borderRadius: 14,
        elevation: 0,
        shadowOpacity: 0,
    },
    lightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#CBD5E1',
    },
    lightTitle: { flex: 1, color: '#1E293B', fontSize: 15, marginBottom: 0 },
    lightRow: { alignItems: 'baseline', paddingTop: 6, paddingRight: 0, gap: 12 },
    lightLabel: { color: '#475569', fontSize: 13, flexShrink: 1 },
    lightValue: { color: '#1E293B', fontSize: 13, fontVariant: ['tabular-nums'] },
    card: {
        backgroundColor: '#0F172A',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 18,
        marginTop: 12,
        borderWidth: 1,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 5,
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
        color: '#f0f6ff',
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
        color: '#e3efff',
        fontSize: 11,
    },

    value: {
        color: Colors.green,
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
