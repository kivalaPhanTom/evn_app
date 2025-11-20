import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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
})

export default styles
