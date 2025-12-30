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
  fullWidthCard: {
    width: '100%',
    flex: 1,
  },
  cardContent: {
    flex: 1,
    padding: px.h(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: px.f(20),
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: px.v(8),
    textAlign: 'center',
  },
  cardValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardValue: {
    fontSize: px.f(64),
    fontWeight: '700',
    lineHeight: px.f(72),
    textAlign: 'center',
  },
  cardUnit: {
    fontSize: px.f(20),
    fontWeight: '400',
    marginLeft: px.h(4),
  },
  plantBreakdown: {
    marginTop: px.v(16),
    alignItems: 'center',
    width: '100%',
    maxWidth: '80%',
  },
  plantBreakdownHorizontal: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  plantItem: {
    fontSize: px.f(16),
    fontWeight: '500',
    marginBottom: px.v(4),
    textAlign: 'left',
  },
  cardContentVertical: {
    flex: 1,
    padding: px.h(16),
  },
  cardContentHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: px.v(8),
  },
  cardValueContainerLeft: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  cardValueRowLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  cardLabelCumulative: {
    fontSize: px.f(20),
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'left',
    color: '#FBBF24',
  },
  cardValueLeft: {
    fontSize: px.f(40),
    fontWeight: '700',
    lineHeight: px.f(48),
    textAlign: 'left',
    color: '#FFFFFF',
  },
  cardUnitLeft: {
    fontSize: px.f(14),
    fontWeight: '400',
    marginLeft: px.h(4),
    color: '#FFFFFF',
  },
  profitTimeTitle: {
    fontSize: px.f(24),
    fontWeight: 'bold',
    marginBottom: px.v(12),
    color: '#fff',
  },
  selectContainer: {
    width: '100%',
    height: px.v(50),
    borderRadius: px.h(12),
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: px.v(16),
  },
  selectText: {
    fontSize: px.f(18),
    fontWeight: '600',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1A1D2E',
    borderRadius: px.h(16),
    padding: px.v(8),
    minWidth: 200,
    maxWidth: '80%',
  },
  selectOption: {
    paddingVertical: px.v(16),
    paddingHorizontal: px.h(20),
    borderRadius: px.h(8),
    marginVertical: px.v(4),
  },
  selectOptionActive: {
    backgroundColor: 'rgba(79, 156, 255, 0.2)',
  },
  selectOptionText: {
    fontSize: px.f(16),
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  selectOptionTextActive: {
    color: '#4f9cff',
    fontWeight: '600',
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
