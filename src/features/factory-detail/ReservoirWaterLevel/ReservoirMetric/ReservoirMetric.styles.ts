import { hydrologyDark, hydrologyLight } from '@/core/constants/hydrologyPalette'
import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

export const createStyles = (isDark: boolean) => {
  const colors = (isDark ? hydrologyDark : hydrologyLight).reservoirMetric
  return StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: px.h(16),
    width: '100%',
  },
  card: {
    flex: 1,
    padding: px.h(16),
    borderRadius: px.h(12),
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px.v(12),
    width: '100%',
  },
  iconContainer: {
    width: px.h(32),
    height: px.h(32),
    borderRadius: px.h(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: px.h(8),
  },
  iconText: {
    color: colors.iconText,
    fontSize: px.m(16),
    fontWeight: 'bold',
  },
  label: {
    color: colors.label,
    fontSize: px.m(16),
    fontWeight: '600',
  },
  value: {
    fontSize: px.m(32),
    fontWeight: '700',
    marginBottom: px.v(4),
  },
  unit: {
    color: colors.unit,
    fontSize: px.m(14),
    fontWeight: '400',
    marginBottom: px.v(8),
    opacity: 0.9,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.divider,
    marginBottom: px.v(8),
  },
  samePeriodContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  samePeriodLabel: {
    color: colors.samePeriodLabel,
    fontSize: px.m(12),
    fontWeight: '400',
    opacity: 0.7,
  },
  previousValue: {
    color: colors.previousValue,
    fontSize: px.m(12),
    fontWeight: '600',
    opacity: 1,
  },
})
}
