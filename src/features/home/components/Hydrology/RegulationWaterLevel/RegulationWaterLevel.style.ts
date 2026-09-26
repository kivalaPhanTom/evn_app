import { StyleSheet } from 'react-native'
import { px } from '@/core/utils/scale'

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    title: {
      fontSize: px.f(24),
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#374151',
      marginBottom: px.v(16),
    },
    container: {},
    tableContainer: {
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
      borderRadius: px.h(8),
      overflow: 'hidden',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
    },
    tableHeaderCell: {
      paddingVertical: px.v(12),
      paddingHorizontal: px.h(12),
      borderRightWidth: 1,
      borderRightColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
    },
    tableHeaderText: {
      fontSize: px.f(20),
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#1E3A8A',
      marginBottom: px.v(8),
      textAlign: 'center',
    },
    tableSubHeader: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    tableSubHeaderText: {
      fontSize: px.f(14),
      color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#475569',
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
      borderBottomColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
    },
    tableRowLast: {
      borderBottomWidth: 0,
    },
    tableCell: {
      paddingVertical: px.v(12),
      paddingHorizontal: px.h(12),
      borderRightWidth: 1,
      borderRightColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    tableCellText: {
      fontSize: px.f(16),
      color: isDark ? '#FFFFFF' : '#374151',
      textAlign: 'center',
    },
  })

export default createStyles
