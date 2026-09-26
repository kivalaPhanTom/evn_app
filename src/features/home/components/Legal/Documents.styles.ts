import { Colors } from '@/core/constants/colors';
import { StyleSheet } from 'react-native'
const createStyles = (isDark: boolean) =>
    StyleSheet.create({
    container: {
        // backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 12,
        // paddingVertical: 4,
    },

    separator: {
        height: 1,
        backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
    },

    row: {
        flexDirection: 'row',
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    pressed: {
        backgroundColor: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.04)',
    },

    expiredRow: {
        // backgroundColor: 'rgba(239,68,68,0.1)',
    },

    left: {
        flexDirection: 'row',
        flex: 1,
        gap: 12,
    },

    icon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconNormal: {
        backgroundColor: isDark ? 'rgba(255,255,255,0.6)' : '#E5E7EB',
    },

    iconExpired: {
        backgroundColor: '#fee2e2',
    },

    iconUpcomingDue: {
        backgroundColor: Colors.warningZero,
    },

    iconText: {
        fontSize: 16,
    },

    textWrap: {
        flex: 1,
    },

    title: {
        fontSize: 14,
        fontWeight: '600',
        color: isDark ? '#ffffff' : '#111827',
    },

    expiredTitle: {
        color: Colors.red,
    },

    upComingDueTitle: {
        color: Colors.warningFull,
    },

    right: {
        alignItems: 'flex-end',
        marginLeft: 12,
    },

    date: {
        fontSize: 14,
        color: Colors.grey,
        fontVariant: ['tabular-nums'],
    },

    expiredDate: {
        color: '#dc2626',
    },

    upComingDueDate: {
        color: Colors.warningFull,
    },

    expiredLabel: {
        marginTop: 2,
        fontSize: 8,
        letterSpacing: 2,
        fontWeight: '900',
        color: '#dc2626',
    },

    upcomingDueLabel: {
        marginTop: 2,
        fontSize: 8,
        letterSpacing: 2,
        fontWeight: '900',
        color: Colors.warningFull,
    },

    emptyContainer: {
        paddingVertical: 80,
        alignItems: 'center',
    },

    emptyIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },

    emptyIconText: {
        fontSize: 32,
        opacity: 0.4,
    },

    emptyText: {
        fontSize: 14,
        color: '#9ca3af',
        fontWeight: '500',
    },

    headerRow: {
        flexDirection: 'row',
        // paddingHorizontal: 16,
        paddingVertical: 12,
        // backgroundColor: 'rgba(255,255,255,0.7)',
        borderBottomWidth: 1,
        borderBottomColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
    },

    headerText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.5,
        color: '#6b7280',
        textTransform: 'uppercase',
    },

    docHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
    },

    docHeaderIcon: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDark ? 'rgba(34,197,94,0.25)' : '#DCFCE7',
    },

    docHeaderText: {
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 0.5,
        color: isDark ? '#ffffff' : '#111827',
    },

    docInfoIcon: {
        color: isDark ? '#60A5FA' : '#2563EB',
    },

    docIconChip: {
        backgroundColor: isDark ? 'rgba(37,99,235,0.35)' : '#DBEAFE',
    },

    docName: {
        fontSize: 14,
        fontWeight: '600',
        color: isDark ? '#ffffff' : '#111827',
    },

    dateLine: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },

    dateText: {
        fontSize: 12,
        color: '#6b7280',
        fontVariant: ['tabular-nums'],
    },

    statusLabel: {
        fontSize: 9,
        letterSpacing: 1,
        fontWeight: '800',
        marginLeft: 4,
    },

    eyeButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: isDark ? '#3B82F6' : '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default createStyles