import React, { useEffect, useRef, useState } from 'react'
import {
  AppState,
  AppStateStatus,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
//import { appVersion } from '@/core/utils/deviceInfo'
import { checkAppVersion } from '@/core/service/version.service'
import GradientButton from '../GradientButton/GradientButton.component'
import { px } from '@/core/utils/scale'
import { Colors } from '@/core/constants/colors'
import Constants from 'expo-constants'

const VersionChecker: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [payload, setPayload] = useState<any>(null)
  const appState = useRef(AppState.currentState)
  const appVersion = Constants.expoConfig?.version ?? ''
  console.log('App Version:', appVersion)
  const doCheck = async () => {
    try {
      const platform = Platform.OS === 'ios' ? 'ios' : 'android'
      const res = await checkAppVersion(platform, appVersion)
      if (res && res?.Result?.forceUpdate) {
        setPayload(res?.Result)
        setVisible(true)
      }
    } catch (e) {
      console.error('checkAppVersion failed:', e)
    }
  }
  useEffect(() => {
    // initial check
    void doCheck()

    const subscription = AppState.addEventListener(
      'change',
      (nextState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextState === 'active'
        ) {
          void doCheck()
        }
        appState.current = nextState
      }
    )

    return () => subscription.remove()
  }, [])

  const openStore = async () => {
    const platform = Platform.OS === 'ios' ? 'ios' : 'android'

    const link = payload?.storeUrl?.[platform]

    if (!link) return

    try {
      await Linking.openURL(link)
    } catch (error) {
      console.warn('Failed to open store URL:', error)
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.message}>
            {payload?.message || '?ng d?ng d� c� phi�n b?n m?i.\nVui l�ng t?i phi�n b?n m?i d? ti?p t?c.'}
          </Text>
          <View style={styles.actions}>
            <GradientButton
              title={'C?P NH?T'}
              onPress={openStore}
              //loading={loading}
              gradientColors={['#0EA5E9', '#06B6D4']}
              borderColor={{ light: '#06B6D4', dark: '#06B6D4' }}
              height={px.h(72)}
              style={styles.updateBtn}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  box: {
    width: '86%',
    backgroundColor: 'rgba(255,255,255,0.06)',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  message: { color: '#d1d5db', fontSize: 14, marginVertical: 20 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end' },
  btnPrimary: { backgroundColor: '#2563EB', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  updateBtn: {
    marginTop: px.v(14),
    // shadow for button
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
})

export default VersionChecker
