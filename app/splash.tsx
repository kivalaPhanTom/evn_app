import { icons } from '@/assets'
import { px } from '@/core/utils/scale'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { useAuth } from '@/core/context/AuthProvider'
import { ActivityIndicator, StyleSheet, View } from 'react-native'


export default function Splash() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (loading) return
    if (isAuthenticated) {
      router.replace('/companies')
    } else {
      router.replace('/login')
    }
  }, [isAuthenticated, loading, router])

  return (
    <LinearGradient
      colors={['#0B0F2A', '#000033']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.root}
    >
      <View style={styles.content}>
        <Image source={icons.evnLogo} style={styles.logo} contentFit="contain" />
        <ActivityIndicator size="large" color="#0EA5E9" style={{ marginTop: px.v(16) }} />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: px.h(16) },
  content: { alignItems: 'center', justifyContent: 'center' },
  logo: { width: px.h(150), height: px.h(150) },
})
