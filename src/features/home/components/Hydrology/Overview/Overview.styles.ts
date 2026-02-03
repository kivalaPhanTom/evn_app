import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: px.h(12),
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
  },
  card: {
    flex: 1,
    minWidth: 0,
    alignSelf: 'stretch',
    display: 'flex',
    backgroundColor: 'transparent',
    width: '100%',
  },
  cardActive: {
    // Bỏ scale để detailContainer sát với tab active
    // transform: [{ scale: 1.02 }],
    // backgroundColor: 'transparent',
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: px.v(12),
    paddingHorizontal: px.h(8),
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 16,
  },
  locationContainer: {
    alignItems: 'center',
    marginBottom: px.v(8),
    width: '100%',
    height: px.v(48),
    justifyContent: 'center',
  },
  locationName: {
    // Màu sẽ được set động từ data.color
    fontSize: px.m(14),
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
    fontSize: px.m(18),
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
    backgroundColor: 'transparent',
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
    borderTopColor: '#F6FF00', // Màu vàng
    borderStyle: 'dashed' as const,
  },
  referenceText: {
    color: '#F6FF00', // Màu vàng
    fontSize: px.m(10),
    fontWeight: '600',
    marginRight: px.h(6),
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backgroundColor: 'transparent',
    paddingHorizontal: px.h(2),
    paddingVertical: px.v(2),
    borderRadius: px.h(4),
  },
  detailContainer: {
    padding: px.h(12),
    backgroundColor: '#1c056eff',
    borderBottomLeftRadius: px.h(8),
    borderBottomRightRadius: px.h(8),
  },
  detailText: {
    color: '#C7D6E1',
    fontSize: px.m(14),
    textAlign: 'center',
  },
})
