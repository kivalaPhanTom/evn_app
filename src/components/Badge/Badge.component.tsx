import { mapStatusVNToEN } from '@/core/utils/status';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
    status: string;
}

const STATUS_COLORS: Record<
    string,
    { bg: string; text: string; border: string }
> = {
    NEW: {
        bg: '#dcfce7',
        text: '#166534',
        border: '#bbf7d0',
    },
    DOING: {
        bg: '#fef9c3',     // yellow-100
        text: '#854d0e',   // yellow-800
        border: '#fde68a', // yellow-200
    },
    DONE: {
        bg: '#e0e7ff',
        text: '#3730a3',
        border: '#c7d2fe',
    },
};

export const Badge: React.FC<BadgeProps> = ({ status }) => {
    const statusMapped = mapStatusVNToEN(status);
    const color =
        STATUS_COLORS[statusMapped] || {
            bg: '#f1f5f9',
            text: '#334155',
            border: '#e2e8f0',
        };

    return (
        <View
            style={[
                styles.badge,
                {
                    backgroundColor: color.bg,
                    borderColor: color.border,
                },
            ]}
        >
            <Text style={[styles.badgeText, { color: color.text }]}>
                {status}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 999,
        borderWidth: 1,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '500',
    },
});
