import { hydrologyDark, hydrologyLight } from '@/core/constants/hydrologyPalette'
import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

const createStyles = (isDark: boolean) => {
  const colors = (isDark ? hydrologyDark : hydrologyLight).reservoirInfo
  return StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: px.v(16),
    borderRadius: px.h(12),
    overflow: 'hidden',
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: px.h(16),
    paddingVertical: px.v(16),
  },
  title: {
    color: colors.title,
    fontSize: px.m(18),
    fontWeight: '600',
    // textTransform: 'uppercase',
  },
  locationName: {
    color: colors.locationText,
    fontSize: px.m(14),
    fontWeight: '600',
    textTransform: 'uppercase',
    backgroundColor: colors.locationBackground,
    borderRadius: px.h(16),
    paddingHorizontal: px.h(12),
    paddingVertical: px.v(4),
  },
  container: {
    width: '100%',
    paddingHorizontal: px.h(16),
    paddingBottom: px.v(16),
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: px.h(16),
  },
  gaugeContainer: {
    width: px.h(120),
    minWidth: px.h(120),
  },
  waterContainer: {
    position: 'relative',
    borderWidth: 2,
    borderColor: colors.gaugeBorder,
    borderTopWidth: 0,
    overflow: 'hidden',
    backgroundColor: colors.gaugeBackground,
    // borderTopLeftRadius: px.h(8),
    // borderTopRightRadius: px.h(8),
    borderBottomLeftRadius: px.h(12),
    borderBottomRightRadius: px.h(12),
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
    borderTopColor: colors.reference,
    borderStyle: 'dashed' as const,
  },
  referenceText: {
    color: colors.reference,
    fontSize: px.m(10),
    fontWeight: '600',
    marginLeft: px.h(6),
    backgroundColor: colors.referenceBackground,
    paddingHorizontal: px.h(6),
    paddingVertical: px.v(2),
    borderRadius: px.h(4),
  },
  percentageText: {
    color: colors.percentageText,
    fontSize: px.m(18),
    fontWeight: '700',
    textShadowColor: colors.percentageShadow,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: px.h(8),
  },
  currentLevelContainer: {
    marginBottom: px.v(20),
  },
  currentLevel: {
    color: colors.currentLevel,
    fontSize: px.m(32),
    fontWeight: '700',
    lineHeight: px.m(38),
  },
  maxLevel: {
    color: colors.maxLevelText,
    fontSize: px.m(16),
    fontWeight: '400',
    marginTop: px.v(4),
    opacity: 0.8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: px.v(12),
    backgroundColor: colors.infoBackground,
    borderRadius: px.h(8),
    paddingHorizontal: px.h(12),
    paddingVertical: px.v(10),
  },
  infoLabel: {
    color: colors.infoLabel,
    fontSize: px.m(14),
    fontWeight: '400',
    opacity: 0.8,
  },
  infoValue: {
    color: colors.infoValue,
    fontSize: px.m(14),
    fontWeight: '600',
  },
})

}

export default createStyles

