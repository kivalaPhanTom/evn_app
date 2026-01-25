import { Colors } from '@/core/constants/colors'
import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 24,
    minHeight: 500,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    zIndex: 1,
    // flex: 1,
  },
  title: {
    color: '#a8b2c1',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 24,
    letterSpacing: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  headerText: {
    color: '#7a8596',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 8,
  },
  tableBody: {
    // flex: 1,
    gap: 8,
  },
  rowCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  col1: {
    flex: 1,
  },
  col2: {
    flex: 1,
    alignItems: 'flex-start',
  },
  col3: {
    flex: 1,
    alignItems: 'flex-start',
  },
  cellText: {
    fontSize: 15,
  },
  dateText: {
    color: '#e8eaed',
    fontWeight: '500',
  },
  valueText: {
    fontSize: 18,
    fontWeight: '700',
  },
  contractText: {
    color: '#eab308',
  },
  unitText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#7a8596', // Màu xám riêng ✅
    opacity: 0.7,
  },
  legend: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  legendText: {
    color: '#7a8596',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  samePeriodText: {
    color: '#7a8596',
  },
  col4: {
    flex: 1,
    alignItems: 'flex-end',
  },
  samePeriodHeader: {
    alignItems: 'flex-end',
  },
  yearPicker: {
    width: 90,
    minWidth: 90,
    color: '#7a8596',
    // marginTop: -4,
  },
  pickerItemIOS: {
    fontSize: 5,
    color: 'red',
  },
  pickerItemAndroid: {
    fontSize: 10,
    paddingRight: 0
  },
  selectContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  selectText: {
    color: '#e8eaed',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '50%',
    maxWidth: 360,
    backgroundColor: 'rgba(20, 20, 20, 0.95)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 8,
  },
  selectOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  selectOptionActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  selectOptionText: {
    color: '#e8eaed',
    fontSize: px.f(20),
    fontWeight: '500',
    textAlign: 'center',
  },
  selectOptionTextActive: {
    color: Colors.blue,
    fontWeight: '700',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 4,
  },
  actionButtonText: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  actionButtonIcon: {
    color: '#9CA3AF',
    fontSize: 13,
  },
})
export default styles
