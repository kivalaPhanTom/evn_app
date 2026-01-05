import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: px.h(10),
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
  profitTimeTitle: {
    fontSize: px.f(24),
    fontWeight: 'bold',
    marginBottom: px.v(12),
    color: '#fff',
  },
  lineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  gradientLine: {
    borderRadius: 1,
  },
  chartWrapper: {
    marginTop: px.v(8),
    marginBottom: px.v(12),
    marginLeft: px.h(-12),
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  axisContainer: {
    marginTop: px.v(8), // space below chart
    paddingTop: px.v(8),
  },
  axisDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginVertical: px.v(20),
  },
  axisLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  axisLabel: {
    fontSize: px.f(14),
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendSwatch: {
    width: px.h(16),
    height: px.h(16),
    borderRadius: 4,
    marginRight: px.h(8),
  },
  legendText: {
    color: '#8b92a0',
    fontSize: px.f(16),
  },
})
