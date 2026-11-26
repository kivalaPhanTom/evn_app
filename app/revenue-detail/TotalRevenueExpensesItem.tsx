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
    return (
        <View style={[styles.card, isDark ? { borderColor: accent.darkBorder } : styles.lightCard]}>
            <View style={[styles.header, !isDark && styles.lightHeader]}>
                <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.title, !isDark && styles.lightTitle]}>
                    {title}
                </Text>
                <Text numberOfLines={1} style={[styles.total, !isDark && { color: accent.light }]}>
                    {formatNumber(total)}{'\u00A0'}
                    <Text style={[styles.totalUnit, !isDark && styles.lightLabel]}>{totalUnit}</Text>
                </Text>
            </View>
            <View>
                {items.map((item) => (
                    <View key={item.PlantCode} style={[styles.row, !isDark && styles.lightRow]}>
                        <Text style={[styles.label, !isDark && styles.lightLabel]}>{item.PlantName}{isDark ? ':' : ''}</Text>
                        <Text style={[styles.value, !isDark && styles.lightValue]}>{formatNumber(item.Value)} {isDark ? 'Tỷ' : 'tỷ'}</Text>
                    </View>
                ))}
            </View>
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
    header: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 8,
        paddingBottom: 8,
    },
    lightHeader: {
        paddingBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#CBD5E1',
    },
    lightTitle: { flex: 1, color: '#1E293B', fontSize: 15 },
    lightRow: { alignItems: 'baseline', paddingTop: 6, paddingRight: 0, gap: 12 },
    lightLabel: { color: '#475569', fontSize: 13, flexShrink: 1 },
    lightValue: { color: '#1E293B', fontSize: 13, fontVariant: ['tabular-nums'] },
    card: {
        backgroundColor: '#0F172A',
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

    title: {
        color: '#f0f6ff',
        fontSize: 13,
        fontWeight: '700',
        flex: 1,
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
        fontWeight: '400',
    },
});
