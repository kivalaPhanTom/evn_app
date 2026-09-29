import { Colors } from '@/core/constants/colors'
import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
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
    color: '#22D3EE',
    fontSize: px.m(18),
    fontWeight: '600',
    // textTransform: 'uppercase',
  },
  locationName: {
    color: isDark ? '#9CA3AF' : '#6B7280',
    fontSize: px.m(14),
    fontWeight: '600',
    textTransform: 'uppercase',
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
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
    borderColor: isDark ? '#fff' : '#E5E7EB',
    borderTopWidth: 0,
    overflow: 'hidden',
    backgroundColor: 'transparent',
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
    borderTopColor: Colors.warningFull,
    borderStyle: 'dashed' as const,
  },
  referenceText: {
    color: Colors.warningFull,
    fontSize: px.m(10),
    fontWeight: '600',
    marginLeft: px.h(6),
    backgroundColor: 'transparent',
    paddingHorizontal: px.h(6),
    paddingVertical: px.v(2),
    borderRadius: px.h(4),
  },
  percentageText: {
    color: '#FFFFFF',
    fontSize: px.m(18),
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
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
    color: '#3AB7FF',
    fontSize: px.m(32),
    fontWeight: '700',
    lineHeight: px.m(38),
  },
  maxLevel: {
    color: isDark ? '#FFFFFF' : '#6B7280',
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
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
    borderRadius: px.h(8),
    paddingHorizontal: px.h(12),
    paddingVertical: px.v(10),
  },
  infoLabel: {
    color: isDark ? '#FFFFFF' : '#475569',
    fontSize: px.m(14),
    fontWeight: '400',
    opacity: 0.8,
  },
  infoValue: {
    color: isDark ? '#FFFFFF' : '#111827',
    fontSize: px.m(14),
    fontWeight: '600',
  },
})

export default createStyles

