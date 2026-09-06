import { icons, images } from '@/assets'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import GradientButton from '@/components/GradientButton/GradientButton.component'
import GradientInput from '@/components/GradientInput/GradientInput.component'
import { Colors } from '@/core/constants/colors'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { px } from '@/core/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, ScrollView } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { getToken } from '@/core/redux/domains/auth'
import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import Constants from 'expo-constants'

type FormValues = {
  username: string
  password: string
}

export default function LoginScreen() {
  const scheme = useAppTheme()
  const dispatch = useAppDispatch()
  const isDark = scheme === 'dark'
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { username: '', password: '' },
    mode: 'onSubmit',
  })
  const [showPass, setShowPass] = useState(false)
  const loading = useAppSelector((state) => state.authenSlice.status === 'loading')
  const insets = useSafeAreaInsets()
  const keyboardOffset = insets.top + px.v(50)
  const appVersion = Constants.expoConfig?.version ?? ''

  const onLogin = (data: FormValues) => {
    dispatch(getToken({ username: data.username, password: data.password }))
  }
  const { t } = useTranslation()

  return (
    <TwinkleStars
      backgroundImage={images.bgLogin}
      particleDensity={50}
      particleColor={Colors.textColor}
      minSize={0.5}
      maxSize={2}
    >
      <SafeAreaView style={styles.flex} edges={['top']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={keyboardOffset}
          style={styles.flex}
        >
          <ScrollView style={styles.flex} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View style={styles.logoWrap}>
              <Image source={icons.evnLogo} style={{ width: px.h(200), height: px.h(120) }} contentFit="contain" />
            </View>

            <View style={styles.titleWrap}>
              <Text style={styles.loginTitle}>{t('appName')}</Text>
            </View>

            {/* Form */}

            <View style={styles.formWrap}>
              <AnimatedCardContainer>
                {/* <View pointerEvents="none" style={styles.formGlowRim} /> */}
                {/* <LinearGradient
                  pointerEvents="none"
                  colors={['rgba(255,255,255,0.28)', 'rgba(123,97,240,0.22)', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.formGlow}
                /> */}
                <View style={[styles.titleWrap, { marginBottom: px.v(24) }]}>
                  <Text style={styles.loginTitle}>{t('auth.login')}</Text>
                </View>
                <View style={{ marginBottom: px.v(14) }}>
                  <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <GradientInput
                        value={value}
                        onChangeText={onChange}
                        placeholder={t('auth.username')}
                        onBlur={onBlur}
                        autoComplete="username"
                        textContentType="username"
                        importantForAutofill="yes"
                        borderColor={errors.username ? '#EF4444' : undefined}
                        height={px.h(72)}
                        leftIcon={
                          <Ionicons name="person-outline" size={px.f(22)} color={isDark ? '#0EA5E9' : '#6B7280'} />
                        }
                      />
                    )}
                  />
                </View>

                <View style={{ marginBottom: px.v(12) }}>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <GradientInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder={t('auth.password')}
                        type={showPass ? 'text' : 'password'}
                        autoComplete="password"
                        textContentType="password"
                        importantForAutofill="yes"
                        borderColor={errors.password ? '#EF4444' : undefined}
                        height={px.h(72)}
                        leftIcon={
                          <Ionicons name="lock-closed-outline" size={px.f(22)} color={isDark ? '#0EA5E9' : '#6B7280'} />
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
                    )}
                  />
                  {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                </View>

                <GradientButton
                  title={t('auth.login')}
                  onPress={handleSubmit(onLogin)}
                  loading={loading}
                  gradientColors={['#0EA5E9', '#06B6D4']}
                  borderColor={{ light: '#06B6D4', dark: '#06B6D4' }}
                  height={px.h(72)}
                  style={styles.loginBtn}
                />
              </AnimatedCardContainer>
            </View>
            <View style={{ alignItems: 'center', marginVertical: px.v(16) }}>
              <Text style={{ color: '#fff', fontSize: px.f(13) }}>v{appVersion}</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TwinkleStars>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: px.v(24),
  },
  titleWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '700',
    color: '#0EA5E9',
  },
  loginTitle: {
    marginTop: px.v(12),
    fontSize: px.f(25),
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
  },
  formWrap: {
    flex: 1, // chiếm hết chiều cao còn lại
    // borderTopLeftRadius: px.h(40),
    // borderTopRightRadius: px.h(40),
    // borderWidth: px.h(1),
    // borderColor: 'rgba(255,255,255,0.1)',
    borderBottomWidth: 0,
    paddingHorizontal: px.h(24),
    // marginTop: px.v(80),
    paddingTop: px.v(50),
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
  errorText: {
    color: '#EF4444',
    marginTop: px.v(6),
    fontSize: px.f(15),
  },
})
