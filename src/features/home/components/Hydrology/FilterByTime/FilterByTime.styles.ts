import { hydrologyLight as light } from '@/core/constants/hydrologyPalette'
import { StyleSheet } from 'react-native'
import { px } from '@/core/utils/scale'

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {},
    title: {
      fontSize: px.f(24),
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : light.text,
      marginBottom: px.v(20),
    },
    chartCompareByTime: {
      textTransform: 'uppercase',
      color: isDark ? 'rgba(255, 255, 255, 0.5)' : light.muted,
      fontSize: 12,
      marginLeft: px(12),
      marginTop: 10,
    },
  })

export default createStyles
