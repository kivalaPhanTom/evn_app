import { Colors } from '@/core/constants/colors'
import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    infoContainer: {
      flexDirection: 'row',
      marginBottom: px(20),
      gap: px(10),
      paddingHorizontal: px(4), // small safe padding
    },
    infoCard: {
      flex: 1,          // 🔑 share available width
      minWidth: 0,      // 🔑 prevents overflow on Android
      borderRadius: 12,
      padding: 16,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#E5E7EB',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    selectContainer: {
      width: 60,
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
    },
    selectText: {
      color: isDark ? '#e8eaed' : '#111827',
      fontSize: 14,
      fontWeight: '600',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    modalContent: {
      width: '50%',
      maxWidth: 360,
      backgroundColor: isDark ? 'rgba(20, 20, 20, 0.95)' : '#FFFFFF',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      paddingVertical: 8,
    },
    selectOption: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    selectOptionActive: {
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
    },
    selectOptionText: {
      color: isDark ? '#e8eaed' : '#111827',
      fontSize: px.f(20),
      fontWeight: '500',
      textAlign: 'center',
    },
    selectOptionTextActive: {
      color: Colors.blue,
      fontWeight: '700',
    },
  })
export default createStyles
