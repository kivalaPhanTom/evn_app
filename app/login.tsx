import { icons } from '@/assets'
import GradientButton from '@/components/GradientButton/GradientButton.component'
import GradientInput from '@/components/GradientInput/GradientInput.component'
import { Colors } from '@/core/constants/colors'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { GradientColors } from '@/core/types'
import { px } from '@/core/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useMemo, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScreen() {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const bg = useMemo<GradientColors>(
    () => (isDark ? ['#0B0F2A', '#221A47', '#2F205D'] : ['#F3F4F6', '#E9EAF0', '#E6E7ED']),
    [isDark],
  )

  const onLogin = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push('/companies')
    }, 900)
  }

  return (
    <LinearGradient colors={bg} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['top']}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
          <View style={styles.logoWrap}>
            <Image source={icons.evnLogo} style={{ width: px.h(200), height: px.h(200) }} contentFit="contain" />
          </View>

          {/* Form */}
          <View style={styles.formWrap}>
            {/* Top inner glow */}
            <LinearGradient
              pointerEvents="none"
              colors={['rgba(255,255,255,0.28)', 'rgba(123,97,240,0.22)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.formGlow}
            />
            {/* Thin highlight rim */}
            <View pointerEvents="none" style={styles.formGlowRim} />
            <View style={{ marginBottom: px.v(14) }}>
              <GradientInput
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
                leftIcon={<Ionicons name="person-outline" size={px.f(18)} color={isDark ? '#A6B0BE' : '#6B7280'} />}
              />
            </View>

            <View style={{ marginBottom: px.v(12) }}>
              <GradientInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                type={showPass ? 'text' : 'password'}
                leftIcon={
                  <Ionicons name="lock-closed-outline" size={px.f(18)} color={isDark ? '#A6B0BE' : '#6B7280'} />
                }
                rightIcon={
                  <Ionicons
                    name={showPass ? 'eye-off-outline' : 'eye-outline'}
                    size={px.f(18)}
                    color={isDark ? '#A6B0BE' : '#6B7280'}
                    onPress={() => setShowPass((v) => !v)}
                  />
                }
              />
            </View>

            <GradientButton
              title="Login"
              onPress={onLogin}
              loading={loading}
              backgroundColor={'#48319D'}
              borderColor={{ light: '#7B61F0', dark: '#7B61F0' }}
              style={styles.loginBtn}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: px.v(24),
  },
  formWrap: {
    flex: 1, // chiếm hết chiều cao còn lại
    borderTopLeftRadius: px.h(40),
    borderTopRightRadius: px.h(40),
    borderWidth: px.h(1),
    borderColor: 'rgba(255,255,255,0.1)',
    borderBottomWidth: 0,
    paddingHorizontal: px.h(24),
    marginTop: px.v(100),
    paddingTop: px.v(100),
    borderTopWidth: 0,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  formGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: px.v(70), // Glow height
    borderTopLeftRadius: px.h(40),
    borderTopRightRadius: px.h(40),
  },
  formGlowRim: {
    position: 'absolute',
    top: 0,
    left: px.h(20),
    right: px.h(20),
    height: px.v(1),
    backgroundColor: 'rgba(203,192,255,0.6)',
    borderRadius: px.h(2),
  },
  loginBtn: {
    marginTop: px.v(14),
    // shadow for button
    shadowColor: Colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
})
