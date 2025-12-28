import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    paddingHorizontal: px.h(16),
    //   height:'100%'
  },
  pillText: {
    textAlign: 'center',
    fontSize: px.m(18),
    fontWeight: '600',
  },
})
export default styles
