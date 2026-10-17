import { hydrologyLight as light, hydrologyDark as dark } from '@/core/constants/hydrologyPalette'
import { StyleSheet } from 'react-native'

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? dark.text : light.text,
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
      backgroundColor: isDark ? dark.detail.metricBackground : light.subtleDetail,
      borderRadius: 8,
      gap: 4,
    },
    itemLabel: {
      fontSize: 12,
      color: isDark ? dark.detail.metricLabel : light.muted,
    },
    itemValue: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    legend: {
      marginTop: 20,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: isDark ? dark.detail.legendBorder : light.border,
    },
    legendText: {
      color: isDark ? dark.detail.legendText : light.muted,
      fontSize: 12,
      textAlign: 'center',
      fontStyle: 'italic',
    },
  })

export default createStyles
