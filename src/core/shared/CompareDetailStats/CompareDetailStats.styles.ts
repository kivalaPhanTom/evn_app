import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

// Color constants
const COLORS = {
  currentDate: 'rgba(59, 130, 246, 1)',
  compareDate: 'rgba(168, 85, 247, 1)',
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginTop: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    padding: 16,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 16,
  },
  statColumn: {
    flex: 1,
    gap: 8,
    alignItems: 'center',
  },
  dateBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'center',
  },
  currentDateBadge: {
    backgroundColor: COLORS.currentDate,
  },
  compareDateBadge: {
    backgroundColor: COLORS.compareDate,
  },
  currentDateColor: {
    color: COLORS.currentDate,
  },
  compareDateColor: {
    color: COLORS.compareDate,
  },
  dateText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  valueText: {
    fontSize: px(32),
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  unitText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.6)',
    marginLeft: 4,
  },
  differenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  positiveChange: {
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
  },
  negativeChange: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  differenceIcon: {
    fontSize: 14,
    fontWeight: '600',
  },
  differenceText: {
    fontSize: 13,
    fontWeight: '600',
  },
  positiveColor: {
    color: '#34D399',
  },
  negativeColor: {
    color: '#EF4444',
  },
})

export default styles
