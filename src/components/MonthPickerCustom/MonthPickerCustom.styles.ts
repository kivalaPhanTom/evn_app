import { StyleSheet } from 'react-native'
import { px } from '@/core/utils/scale'
import { createThemePalette } from '@/core/constants/themePalette'

const createStyles = (isDark: boolean) => {
  const p = createThemePalette(isDark)
  return StyleSheet.create({
    monthPickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: px.v(20),
      gap: px.h(12),
    },
    monthPickerLabel: {
      fontSize: px.f(16),
      color: p.textSecondary,
    },
    monthPickerInput: {
      flex: 1,
      height: px.v(40),
      borderRadius: px.h(20),
      borderWidth: 1,
      borderColor: p.border,
      backgroundColor: p.inputBg,
      paddingHorizontal: px.h(20),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    monthPickerText: {
      fontSize: px.f(16),
      color: p.textPrimary,
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
      backgroundColor: p.modalBackground,
      borderRadius: px.h(18),
      padding: px.h(16),
      width: '100%',
      maxWidth: 350,
    },
    modalTitle: {
      fontSize: px.f(16),
      fontWeight: 'bold',
      color: p.textPrimary,
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
      color: p.textSecondary,
      marginBottom: px.v(8),
      textAlign: 'center',
      fontWeight: '500',
    },
    pickerScrollView: {
      maxHeight: px.v(200),
      borderWidth: 1,
      borderColor: p.border,
      borderRadius: px.h(8),
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
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
      color: p.textPrimary,
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
      backgroundColor: isDark ? '#2e3348' : 'rgba(0, 0, 0, 0.06)',
    },
    modalButtonText: {
      color: p.textPrimary,
      fontWeight: '600',
      fontSize: px.f(14),
    },
  })
}

export default createStyles
