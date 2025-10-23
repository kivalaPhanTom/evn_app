import AnimatedCardContainer from '@/components/CardContainer/CardContainer.component'
import { textGradients } from '@/core/constants/gradients'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import type { GradientColors } from '@/core/types'
import { px } from '@/core/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import React, { useMemo } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const COMPANIES = [
  { name: 'CÔNG TY THỦY ĐIỆN BUÔN KUỐP', location: 'Đắk Lắk, Việt Nam' },
  { name: 'CÔNG TY THỦY ĐIỆN IA LY', location: 'Gia Lai, Việt Nam' },
  { name: 'EVN HCMC', location: 'TP. Hồ Chí Minh, Việt Nam' },
  { name: 'EVN HANOI', location: 'Hà Nội, Việt Nam' },
]

export default function CompaniesScreen() {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const router = useRouter()

  const bg = useMemo<GradientColors>(
    () => (isDark ? ['#0B0F2A', '#221A47', '#2F205D'] : ['#F3F4F6', '#E9EAF0', '#E6E7ED']),
    [isDark],
  )

  return (
    <LinearGradient colors={bg} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.flex}>
      <SafeAreaView style={styles.flex} edges={['top']}>
        <ScrollView contentContainerStyle={styles.container}>
          {COMPANIES.map((c) => (
            <Pressable
              key={c.name}
              onPress={() => router.push({ pathname: '/charts', params: { companyName: c.name, location: c.location } })}
              style={{ marginBottom: px.v(12) }}
            >
              <AnimatedCardContainer
                gradientPosition="top"
                gradientColors={textGradients.accent}
                borderRadius={px.h(14)}
                backgroundColor={{ dark: '#0F1830', light: '#FFFFFF' }}
                borderColor={{ dark: 'rgba(255,255,255,0.06)', light: 'rgba(0,0,0,0.06)' }}
                borderWidth={1}
                showGradient
              >
                <View style={styles.row}>
                  <View style={styles.iconWrap}>
                    <Ionicons name="business-outline" size={px.f(18)} color={isDark ? '#A6B0BE' : '#6B7280'} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.company, { color: isDark ? '#E6ECF2' : '#111827' }]} numberOfLines={2}>
                      {c.name}
                    </Text>
                    <View style={styles.locationRow}>
                      <Ionicons name="location-outline" size={px.f(12)} color="#FF6A6A" style={{ marginRight: px.h(6) }} />
                      <Text style={[styles.location, { color: isDark ? '#E6ECF2' : '#111827' }]}>{c.location}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={px.f(18)} color={isDark ? '#A6B0BE' : '#6B7280'} />
                </View>
              </AnimatedCardContainer>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    paddingHorizontal: px.h(16),
    paddingTop: px.v(12),
    paddingBottom: px.v(28),
    marginTop: px.v(60),
  },
  title: {
    fontSize: px.f(18),
    fontWeight: '700',
    marginBottom: px.v(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: px.v(14),
    paddingHorizontal: px.h(12),
  },
  iconWrap: {
    width: px.h(36),
    height: px.h(36),
    borderRadius: px.h(18),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(123,97,240,0.12)',
    marginRight: px.h(12),
  },
  company: {
    fontSize: px.f(15),
    fontWeight: '700',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: px.v(6),
  },
  location: {
    color: '#C7D6E1',
    fontSize: px.m(12),
  },
})
