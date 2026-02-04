import { Colors } from '@/core/constants/colors'
import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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
})

export default styles
