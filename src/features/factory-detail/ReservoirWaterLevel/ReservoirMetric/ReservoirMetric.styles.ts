import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
    color: '#FFFFFF',
    fontSize: px.m(16),
    fontWeight: 'bold',
  },
  label: {
    color: '#FFFFFF',
    fontSize: px.m(16),
    fontWeight: '600',
  },
  value: {
    fontSize: px.m(32),
    fontWeight: '700',
    marginBottom: px.v(4),
  },
  unit: {
    color: '#FFFFFF',
    fontSize: px.m(14),
    fontWeight: '400',
    marginBottom: px.v(8),
    opacity: 0.9,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: px.v(8),
  },
  samePeriodContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  samePeriodLabel: {
    color: '#FFFFFF',
    fontSize: px.m(12),
    fontWeight: '400',
    opacity: 0.7,
  },
  previousValue: {
    color: '#FFFFFF',
    fontSize: px.m(12),
    fontWeight: '600',
    opacity: 1,
  },
})

