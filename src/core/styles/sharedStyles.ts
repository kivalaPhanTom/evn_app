import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

export const dashboardCommonStyles = StyleSheet.create({
  metricRow: {
    flexDirection: 'row',
    marginTop: px.v(6),
    alignItems: 'center',
  },
  metricLeft: {
    flex: 1,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: px.v(10),
  },
  metricRight: {
    width: px.h(56),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  smallIconBox: {
    width: px.h(24),
    height: px.h(24),
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: px.v(12),
    width: '100%',
  },
  summaryBox: {
    flex: 1,
    marginRight: px.h(8),
    borderRadius: px.h(12),
  },
  summaryFull: {
    marginTop: px.v(12),
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
})
