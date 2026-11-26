import { Colors } from '@/core/constants/colors'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { px } from '@/core/utils/scale'
import React from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'

export interface ConfirmDialogProps {
  visible: boolean
  title: string
  message: string
  confirmText: string
  cancelText: string
  onConfirm: () => void
  onCancel: () => void
  destructive?: boolean
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  destructive = false,
}) => {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const lightOn = !isDark

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={[styles.card, lightOn ? styles.cardLight : styles.cardDark]}>
          <Text style={[styles.title, { color: lightOn ? '#111827' : Colors.white }]}>{title}</Text>
          <Text style={[styles.message, { color: lightOn ? '#374151' : '#B6C3D3' }]}>{message}</Text>
          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                lightOn ? styles.buttonSecondaryLight : styles.buttonSecondaryDark,
                pressed && { opacity: 0.7 },
              ]}
              onPress={onCancel}
            >
              <Text style={[styles.buttonText, { color: lightOn ? '#374151' : Colors.white }]}>{cancelText}</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                destructive ? styles.buttonDanger : styles.buttonPrimary,
                pressed && { opacity: 0.8 },
              ]}
              onPress={onConfirm}
            >
              <Text style={[styles.buttonText, { color: Colors.white }]}>{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: px.h(24),
  },
  card: {
    width: '100%',
    maxWidth: px.h(360),
    borderRadius: px.h(16),
    paddingHorizontal: px.h(20),
    paddingTop: px.v(22),
    paddingBottom: px.v(18),
    borderWidth: 1,
  },
  cardLight: {
    backgroundColor: Colors.white,
    borderColor: 'rgba(17, 24, 39, 0.08)',
  },
  cardDark: {
    backgroundColor: Colors.cardColor,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: px.f(17),
    fontWeight: '700',
    marginBottom: px.v(10),
    textAlign: 'center',
  },
  message: {
    fontSize: px.f(15),
    lineHeight: px.f(22),
    textAlign: 'center',
    marginBottom: px.v(20),
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: px.h(12),
  },
  button: {
    flex: 1,
    paddingVertical: px.v(12),
    borderRadius: px.h(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondaryLight: {
    backgroundColor: '#E5E7EB',
  },
  buttonSecondaryDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonPrimary: {
    backgroundColor: Colors.blue,
  },
  buttonDanger: {
    backgroundColor: '#DC2626',
  },
  buttonText: {
    fontSize: px.f(15),
    fontWeight: '600',
  },
})

export default ConfirmDialog
