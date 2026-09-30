import { hydrologyLight as light } from '@/core/constants/hydrologyPalette'
import { StyleSheet } from 'react-native'

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : light.text,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    item: {
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 4,
      width: 105,
      backgroundColor: isDark ? 'rgba(255,255,255, 0.03)' : light.subtle,
      borderRadius: 8,
      gap: 4,
    },
    itemLabel: {
      fontSize: 12,
      color: isDark ? '#93959F' : light.muted,
    },
    itemValue: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    legend: {
      marginTop: 20,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255, 255, 255, 0.05)' : light.border,
    },
    legendText: {
      color: isDark ? '#7a8596' : light.muted,
      fontSize: 12,
      textAlign: 'center',
      fontStyle: 'italic',
    },
  })

export default createStyles
