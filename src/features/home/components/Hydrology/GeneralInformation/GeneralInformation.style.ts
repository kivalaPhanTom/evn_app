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
    gridContainer: {
      gap: px.v(12),
    },
    row: {
      flexDirection: 'row',
      gap: px.h(12),
      justifyContent: 'center',
    },
    card: {
      flex: 1,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFFFFF',
      borderRadius: px.h(12),
      padding: px.h(16),
      paddingVertical: px.v(16),
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : light.border,
      position: 'relative',
      minHeight: px.v(100),
    },
    cardWide: {
      flex: 0,
      width: '48%',
      alignSelf: 'center',
    },
    iconContainer: {
      position: 'absolute',
      top: px.v(12),
      right: px.h(12),
    },
    cardLabel: {
      fontSize: px.f(16),
      color: isDark ? 'rgba(255, 255, 255, 0.7)' : light.muted,
      marginBottom: px.v(8),
      fontWeight: '500',
    },
    valueContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginTop: px.v(4),
    },
    cardValue: {
      fontSize: px.f(26),
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : light.text,
    },
    cardUnit: {
      fontSize: px.f(16),
      color: isDark ? 'rgba(255, 255, 255, 0.7)' : light.muted,
      fontWeight: '500',
    },
  })

export default createStyles
