import { StyleSheet } from 'react-native'
import { px } from '@/core/utils/scale'

const styles = StyleSheet.create({
  title: {
    fontSize: px.f(22),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: px.v(16),
  },
  container: {
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: px.h(8),
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
  },
  tableHeaderCell: {
    paddingVertical: px.v(12),
    paddingHorizontal: px.h(12),
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.15)',
  },
  tableHeaderText: {
    fontSize: px.f(20),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: px.v(8),
    textAlign: 'center',
  },
  tableSubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tableSubHeaderText: {
    fontSize: px.f(14),
    color: 'rgba(255, 255, 255, 0.7)',
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
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  tableRowLast: {
    borderBottomWidth: 0,
  },
  tableCell: {
    paddingVertical: px.v(12),
    paddingHorizontal: px.h(12),
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.15)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tableCellText: {
    fontSize: px.f(16),
    color: '#FFFFFF',
    textAlign: 'center',
  },
})

export default styles
