import { Colors } from '@/core/constants/colors';
import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 12,
        // paddingVertical: 4,
    },

    separator: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },

    row: {
        flexDirection: 'row',
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    pressed: {
        backgroundColor: 'rgba(255,255,255,0.4)',
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
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconNormal: {
        backgroundColor: 'rgba(255,255,255,0.6)',
    },

    iconExpired: {
        backgroundColor: '#fee2e2',
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
        color: '#ffffff',
    },

    expiredTitle: {
        color: Colors.red,
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

    expiredLabel: {
        marginTop: 2,
        fontSize: 8,
        letterSpacing: 2,
        fontWeight: '900',
        color: '#dc2626',
    },

    emptyContainer: {
        paddingVertical: 80,
        alignItems: 'center',
    },

    emptyIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
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
        borderBottomColor: 'rgba(255,255,255,0.2)',
    },

    headerText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.5,
        color: '#6b7280',
        textTransform: 'uppercase',
    },
});
export default styles