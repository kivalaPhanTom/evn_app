import { StyleSheet } from 'react-native'

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#374151',
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
      backgroundColor: isDark ? 'rgba(255,255,255, 0.03)' : 'rgba(0,0,0,0.04)',
      borderRadius: 8,
      gap: 4,
    },
    itemLabel: {
      fontSize: 12,
      color: isDark ? '#93959F' : '#6B7280',
    },
    itemValue: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    legend: {
      marginTop: 20,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.08)',
    },
    legendText: {
      color: isDark ? '#7a8596' : '#6B7280',
      fontSize: 12,
      textAlign: 'center',
      fontStyle: 'italic',
    },
  })

export default createStyles
