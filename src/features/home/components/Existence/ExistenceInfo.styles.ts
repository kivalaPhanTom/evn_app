import { Colors } from '@/core/constants/colors';
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
        marginBottom: 12,
    },

    cardPressed: {
        backgroundColor: '#f8fafc',
    },

    content: {
        padding: 16,
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    date: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.grey,
    },

    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.white,
        marginBottom: 8,
        lineHeight: 22,
    },

    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 4,
    },

    locationText: {
        fontSize: 12,
        color: '#64748b',
    },

    button: {
        marginTop: 8,
        backgroundColor: '#0f172a',
        borderRadius: 12,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },

    buttonPressed: {
        backgroundColor: '#1e293b',
    },

    buttonDisabled: {
        opacity: 0.7,
    },

    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },

    dateContainer: { 
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    }
});
export default styles;