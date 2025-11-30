import { StyleSheet } from 'react-native'
import { px } from '@/core/utils/scale'

const styles = StyleSheet.create({
  monthPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px.v(20),
    gap: px.h(12),
  },
  monthPickerLabel: {
    fontSize: px.f(14),
    color: '#FFFFFF',
  },
  monthPickerInput: {
    flex: 1,
    height: px.v(40),
    borderRadius: px.h(20),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: px.h(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthPickerText: {
    fontSize: px.f(14),
    color: '#FFFFFF',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: px.h(20),
  },
  modalContent: {
    backgroundColor: '#1A1D2E',
    borderRadius: px.h(18),
    padding: px.h(16),
    width: '100%',
    maxWidth: 350,
  },
  modalTitle: {
    fontSize: px.f(16),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: px.v(16),
    textAlign: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    gap: px.h(16),
    marginBottom: px.v(8),
  },
  pickerColumn: {
    flex: 1,
  },
  pickerLabel: {
    fontSize: px.f(14),
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: px.v(8),
    textAlign: 'center',
    fontWeight: '500',
  },
  pickerScrollView: {
    maxHeight: px.v(200),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: px.h(8),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  pickerItem: {
    paddingVertical: px.v(12),
    paddingHorizontal: px.h(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerItemSelected: {
    backgroundColor: '#4f9cff',
  },
  pickerItemText: {
    fontSize: px.f(14),
    color: '#FFFFFF',
  },
  pickerItemTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: px.v(12),
    gap: px.h(10),
  },
  modalButton: {
    flex: 1,
    paddingVertical: px.v(12),
    borderRadius: px.h(10),
    alignItems: 'center',
  },
  modalButtonPrimary: {
    backgroundColor: '#4f9cff',
  },
  modalButtonSecondary: {
    backgroundColor: '#2e3348',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: px.f(14),
  },
})

export default styles

