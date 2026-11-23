import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  title: {
    fontSize: px.m(19),
    fontWeight: '500',
  },
  mainRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'baseline',
    columnGap: px.h(12),
    rowGap: px.v(4),
    marginTop: px.v(12),
  },
  currentValue: {
    maxWidth: '100%',
    fontSize: px.f(52),
    fontWeight: '800',
    textAlign: 'center',
  },
  unit: {
    fontSize: px.f(20),
    fontWeight: '700',
  },
  slash: {
    fontSize: px.f(25),
    fontWeight: '400',
  },
  refValue: {
    maxWidth: '100%',
    fontSize: px.f(35),
    fontWeight: '400',
    textAlign: 'center',
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
