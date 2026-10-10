import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  title: {
    fontSize: px.m(19),
    fontWeight: '500',
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginTop: px.v(12),
  },
  unit: {
    fontWeight: '700',
  },
  slash: {
    fontSize: px.f(25),
    fontWeight: '400',
    marginHorizontal: px.h(6),
  },
  refValue: {
    fontSize: px.f(35),
    fontWeight: '400',
  },
  refUnit: {
    fontSize: px.f(20),
    fontWeight: '400',
  },
  firstSkeleton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
})
