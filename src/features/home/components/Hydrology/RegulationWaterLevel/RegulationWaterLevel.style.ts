import { hydrologyLight as light, hydrologyDark as dark } from '@/core/constants/hydrologyPalette'
import { StyleSheet } from 'react-native'
import { px } from '@/core/utils/scale'

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    title: {
      fontSize: px.f(24),
      fontWeight: 'bold',
      color: isDark ? dark.text : light.text,
      marginBottom: px.v(16),
    },
    container: {},
    tableContainer: {
      borderWidth: 1,
      borderColor: isDark ? dark.border : light.border,
      borderRadius: px.h(8),
      overflow: 'hidden',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: isDark ? dark.subtle : light.subtleDetail,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? dark.border : light.border,
    },
    tableHeaderCell: {
      paddingVertical: px.v(12),
      paddingHorizontal: px.h(12),
      borderRightWidth: 1,
      borderRightColor: isDark ? dark.border : light.border,
    },
    tableHeaderText: {
      fontSize: px.f(20),
      fontWeight: 'bold',
      color: isDark ? dark.text : light.text,
      marginBottom: px.v(8),
      textAlign: 'center',
    },
    tableSubHeader: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    tableSubHeaderText: {
      fontSize: px.f(14),
      color: isDark ? dark.muted : light.muted,
      fontWeight: '500',
    },
    timeColumn: {
      flex: 1.2,
    },
    mnqtColumn: {
      flex: 1,
      borderRightWidth: 0,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? dark.detail.border : light.border,
    },
    tableRowLast: {
      borderBottomWidth: 0,
    },
    tableCell: {
      paddingVertical: px.v(12),
      paddingHorizontal: px.h(12),
      borderRightWidth: 1,
      borderRightColor: isDark ? dark.border : light.border,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    tableCellText: {
      fontSize: px.f(16),
      color: isDark ? dark.text : light.text,
      textAlign: 'center',
    },
  })

export default createStyles
