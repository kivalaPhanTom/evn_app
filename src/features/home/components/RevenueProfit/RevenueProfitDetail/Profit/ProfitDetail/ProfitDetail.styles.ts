import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingHorizontal: px.h(16),
    paddingBottom: px.v(40),
  },
  datePickerContainer: {
    marginTop: px.v(20),
    marginBottom: px.v(24),
    width: '50%',
    alignSelf: 'center',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: px.h(12),
  },
  card: {
    borderRadius: px.h(16),
    minHeight: px.v(140),
    overflow: 'hidden',
    backgroundColor: 'rgba(30, 41, 59, 0.5)', // Base background color
    // Shadow/glow effect
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  leftCard: {
    flex: 0.6, // 60% width
  },
  rightCard: {
    flex: 0.4, // 40% width
  },
  cardContent: {
    flex: 1,
    padding: px.h(16),
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: '#047857',
    fontSize: px.f(16),
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: px.v(8),
  },
  cardLabelYellow: {
    color: '#FFFFFF',
    fontSize: px.f(12),
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: px.v(8),
  },
  cardValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  cardValue: {
    color: '#059669',
    fontSize: px.f(64),
    fontWeight: '700',
    lineHeight: px.f(72),
  },
  cardValueYellow: {
    color: '#FFFFFF',
    fontSize: px.f(40),
    fontWeight: '700',
    lineHeight: px.f(48),
  },
  cardUnit: {
    color: '#059669',
    fontSize: px.f(20),
    fontWeight: '400',
    marginLeft: px.h(4),
  },
  cardUnitYellow: {
    color: '#FFFFFF',
    fontSize: px.f(14),
    fontWeight: '400',
    marginLeft: px.h(4),
  },
})
