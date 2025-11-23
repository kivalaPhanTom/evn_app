import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: px.h(12),
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: px.v(16),
  },
  card: {
    flex: 1,
    minWidth: 0,
  },
  cardActive: {
    transform: [{ scale: 1.02 }],
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: px.v(12),
    paddingHorizontal: px.h(8),
  },
  locationContainer: {
    alignItems: 'center',
    marginBottom: px.v(8),
    width: '100%',
  },
  locationName: {
    // Màu sẽ được set động từ data.color
    fontSize: px.m(12),
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
  },
  locationUnderline: {
    width: '60%',
    height: 2,
    // backgroundColor sẽ được set động từ data.color
    marginTop: px.v(4),
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: px.v(12),
    justifyContent: 'center',
  },
  currentLevel: {
    color: '#00C853', // Màu xanh lá
    fontSize: px.m(22),
    fontWeight: '700',
  },
  maxLevel: {
    color: '#9AA6B6', // Màu xám
    fontSize: px.m(12),
    fontWeight: '500',
  },
  waterContainer: {
    position: 'relative',
    borderWidth: 2,
    borderColor: '#fff',
    borderTopWidth: 0,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  referenceLine: {
    position: 'absolute',
    left: px.h(8),
    right: px.h(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderTopWidth: 1,
    borderTopColor: '#ADFF2F', // Màu vàng-xanh lá
    borderStyle: 'dashed' as const,
  },
  referenceText: {
    color: '#ADFF2F', // Màu vàng-xanh lá
    fontSize: px.m(10),
    fontWeight: '600',
    marginLeft: px.h(6),
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: px.h(6),
    paddingVertical: px.v(2),
    borderRadius: px.h(4),
  },
  detailContainer: {
    padding: px.h(12),
    backgroundColor: '#48319d',
    borderRadius: px.h(8),
  },
  detailText: {
    color: '#C7D6E1',
    fontSize: px.m(14),
    textAlign: 'center',
  },
})
