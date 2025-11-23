import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 24,
    minHeight: 340,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    zIndex: 1,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#e8eaed',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: '#7a8596',
    fontSize: 13,
    fontWeight: '400',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    color: '#7a8596',
    fontSize: 11,
    fontWeight: '600',
    // marginBottom: ,
    letterSpacing: 0.5,
  },
  statValueCurrent: {
    color: '#5b8def',
    fontSize: 24,
    fontWeight: '700',
    // marginBottom: 6,
  },
  statValueAverage: {
    color: '#eab308',
    fontSize: 24,
    fontWeight: '700',
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    color: '#ef4444',
    fontSize: 13,
    fontWeight: '600',
  },
  changePositive: {
    color: '#4ade80',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  unitLabel: {
    color: '#7a8596',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
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
export default styles
