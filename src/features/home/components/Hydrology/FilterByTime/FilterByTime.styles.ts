import { hydrologyLight as light, hydrologyDark as dark } from '@/core/constants/hydrologyPalette'
import { StyleSheet } from 'react-native'
import { px } from '@/core/utils/scale'

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {},
    title: {
      fontSize: px.f(24),
      fontWeight: 'bold',
      color: isDark ? dark.text : light.text,
      marginBottom: px.v(20),
    },
    chartCompareByTime: {
      textTransform: 'uppercase',
      color: isDark ? dark.detail.faintText : light.muted,
      fontSize: 12,
      marginLeft: px(12),
      marginTop: 10,
    },
  })

export default createStyles
