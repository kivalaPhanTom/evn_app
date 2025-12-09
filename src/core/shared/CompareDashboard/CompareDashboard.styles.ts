import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: px.v(16),
    backgroundColor: 'transparent',
  },
  headerDashboard: {
    color: '#fff',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  chartTitle: {
    textTransform: 'capitalize',
    color: 'rgba(255, 255, 255, 0.5)',
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

export default styles
