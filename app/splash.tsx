import { px } from '@/core/utils/scale'
import { useTheme } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native'

export default function SplashScreen() {
  const theme = useTheme()
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace('/(tabs)')
    }, 900) // small delay
    return () => clearTimeout(t)
  }, [router])

  const isDark = (theme.dark ?? false) === true
  const background = theme.colors?.background ?? (isDark ? '#051022' : '#fff')
  const textColor = isDark ? '#E6F7FF' : '#0B1720'

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} animated backgroundColor={background} />
      <View style={styles.inner}>
        <View style={[styles.logo, { backgroundColor: isDark ? '#0A2230' : '#e6f6ff' }]} />
        <Text style={[styles.title, { color: textColor }]}>EVN App</Text>
        <ActivityIndicator size="small" color={isDark ? '#7DF0FF' : '#0A8FDD'} style={{ marginTop: px.v(12) }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    alignItems: 'center',
  },
  logo: {
    width: px.h(84),
    height: px.h(84),
    borderRadius: px.h(18),
    marginBottom: px.v(12),
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: px.m(18),
    fontWeight: '700',
  },
})
