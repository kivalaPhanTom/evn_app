import { Colors } from '@/core/constants/colors'
import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'
import { createThemePalette } from '@/core/constants/themePalette'

const createStyles = (isDark: boolean) => {
  const p = createThemePalette(isDark)
  return StyleSheet.create({
  contentContainer: {},
    selectContainer: {
      width: 60,
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: p.borderStrong,
      backgroundColor: p.inputBg,
    },
    selectText: {
      color: p.textPrimary,
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
      backgroundColor: p.modalBackground,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: p.divider,
      paddingVertical: 8,
    },
    selectOption: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    selectOptionActive: {
      backgroundColor: p.chipBg,
    },
    selectOptionText: {
      color: p.title,
      fontSize: px.f(20),
      fontWeight: '500',
      textAlign: 'center',
    },
    selectOptionTextActive: {
      color: isDark ? Colors.blue : '#1D4ED8',
      fontWeight: '700',
    },
  })
}

export default createStyles
