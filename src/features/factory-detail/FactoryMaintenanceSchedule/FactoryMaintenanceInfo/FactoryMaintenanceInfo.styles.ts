import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'
import { createThemePalette } from '@/core/constants/themePalette'

const createStyles = (isDark: boolean) => {
  const p = createThemePalette(isDark)
  return StyleSheet.create({
    infoContainer: {
      flexDirection: 'row',
      marginBottom: px(20),
      gap: px(10),
      paddingHorizontal: px(4),
    },
    infoCard: {
      flex: 1,
      minWidth: 0,
      borderRadius: 12,
      padding: 16,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.12)',
      position: 'relative',
    },
    cardTitle: {
      color: isDark ? 'rgba(255, 255, 255, 0.5)' : '#475569',
      fontSize: 11,
      fontWeight: '600',
      marginBottom: 8,
    },
    maintenanceTypeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    maintenanceTypeValue: {
      fontSize: 18,
      fontWeight: 'bold',
      marginRight: 10,
      minWidth: 20,
    },
    maintenanceTypeLabel: {
      fontSize: 12,
      color: p.textSecondary,
    },
    iconContainer: {
      position: 'absolute',
      bottom: 12,
      right: 12,
    },
    durationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2,
      paddingRight: px(44),
      gap: px(20),
    },
    durationItem: {
      alignItems: 'center',
      flex: 1,
    },
    durationValue: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDark ? 'rgb(255, 255, 255)' : '#111827',
      marginBottom: 6,
    },
    durationLabel: {
      fontSize: 10,
      color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6B7280',
    },
    divider: {
      width: 1,
      height: 40,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
    },
  })
}

export default createStyles
