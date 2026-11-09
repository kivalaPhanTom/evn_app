import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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

const variantConfig = {
    blue: {
        borderColor: 'rgba(34,211,238,0.25)',
        gradient: ['rgba(34, 211, 238, 0.3)', 'rgba(34, 211, 238, 0.2)'],
    },
    purple: {
        borderColor: 'rgba(167,139,250,0.25)',
        gradient: ['rgba(167, 139, 250, 0.3)', 'rgba(167, 139, 250, 0.2)'],
    },
    red: {
        borderColor: 'rgba(248,113,113,0.25)',
        gradient: ['rgba(248, 113, 113, 0.3)', 'rgba(248, 113, 113, 0.2)'],
    },
};

// Plant label colors (same across all variants per Figma)
const plantLabelColors = ['#6936ff', '#178d42', '#00a9c3'];
// Plant value colors (shifted by one position)
const plantValueColors = ['#178d42', '#00a9c3', '#6936ff'];

export default function TotalRevenueExpensesItem({
    title,
    items,
    total,
    totalUnit,
    variant = 'blue',
}: Props) {
    const isDark = useAppTheme() === 'dark';
    const config = variantConfig[variant];

    const titleColor = isDark ? '#f0f6ff' : '#475569';
    const totalColor = isDark ? '#F8FAFC' : '#475569';
    const totalUnitColor = isDark ? '#94A3B8' : '#475569';

    const cardBg = isDark ? '#0F172A' : 'transparent';
    const cardBorder = config.borderColor;

    return (
        <LinearGradient
            colors={isDark ? [cardBg, cardBg] : (config.gradient as [string, string])}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.card, { borderColor: cardBorder }]}
        >
            <View style={styles.left}>
                <Text style={[styles.title, { color: titleColor }]}>{title}</Text>

                {items.map((item, idx) => {
                    const labelColor = isDark ? '#e3efff' : plantLabelColors[idx % 3];
                    const valueColor = isDark ? Colors.green : plantValueColors[idx % 3];
                    return (
                        <View key={idx} style={styles.row}>
                            <Text style={[styles.label, { color: labelColor }]}>{item.PlantName}:</Text>
                            <Text style={[styles.value, { color: valueColor }]}>
                                {formatNumber(item.Value)} Tỷ
                            </Text>
                        </View>
                    );
                })}
            </View>

            <View style={styles.right}>
                <Text style={[styles.total, { color: totalColor }]}>{formatNumber(total)}</Text>
                <Text style={[styles.totalUnit, { color: totalUnitColor }]}>{totalUnit}</Text>
            </View>
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    card: {
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
