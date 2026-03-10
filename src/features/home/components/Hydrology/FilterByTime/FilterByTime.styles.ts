import { StyleSheet } from 'react-native'
import { px } from '@/core/utils/scale'

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: px.f(24),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: px.v(20),
  },
  chartCompareByTime: {
    textTransform: 'uppercase',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginLeft: px(12),
    marginTop: 10,
  },
})

export default styles
