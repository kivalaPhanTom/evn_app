import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'
import { createThemePalette } from '@/core/constants/themePalette'

const createStyles = (isDark: boolean) => {
  const p = createThemePalette(isDark)
  return StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: px.v(16),
      backgroundColor: 'transparent',
    },
    headerDashboard: {
      color: p.title,
      fontSize: 14,
      paddingHorizontal: 10,
    },
    chartTitle: {
      textTransform: 'capitalize',
      color: p.textSecondary,
    },
    chartCompareByTime: {
      textTransform: 'uppercase',
      color: p.textSecondary,
      fontSize: 12,
      marginLeft: px(12),
      marginTop: 10,
    },
    chartWrapper: {
      marginTop: px.v(8),
      marginBottom: px.v(12),
      marginLeft: px.h(-12),
      width: '100%',
      alignSelf: 'stretch',
      backgroundColor: 'transparent',
      overflow: 'hidden',
    },
    topLabel: {
      color: '#5B9FED',
      fontSize: px.m(12),
      fontWeight: 'bold',
      textAlign: 'center',
    },
  })
}

export default createStyles
