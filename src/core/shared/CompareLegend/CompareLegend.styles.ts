import { StyleSheet } from 'react-native'
import { createThemePalette } from '@/core/constants/themePalette'

const createStyles = (isDark: boolean) => {
  const p = createThemePalette(isDark)
  return StyleSheet.create({
    legendContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 16,
      marginBottom: 8,
      backgroundColor: p.inputBg,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: p.divider,
      paddingVertical: 10,
      paddingHorizontal: 12,
      justifyContent: 'space-between',
      gap: 8,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flexBasis: '48%',
    },
    legendBox: {
      width: 14,
      height: 10,
      backgroundColor: '#3b82f6',
      borderRadius: 2,
    },
    legendLine: {
      width: 20,
      height: 2.5,
      backgroundColor: '#8b5cf6',
      borderRadius: 1.5,
    },
    legendLabel: {
      fontSize: 12,
      color: p.textSecondary,
      fontWeight: '500',
    },
  })
}

export default createStyles
