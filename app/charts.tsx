import GradientText from '@/components/GradientText/GradientText.component'
import { lightGradients } from '@/core/constants/gradients'
import { px } from '@/core/utils/scale'
import LakeCard from '@/features/dashboard/components/LakeCard/LakeCard'
import ProfitCard from '@/features/dashboard/components/ProfitCard/ProfitCard'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const lineData = [
  { value: 50, label: '01' },
  { value: 80, label: '02' },
  { value: 40, label: '03' },
  { value: 95, label: '04' },
  { value: 70, label: '05' },
  { value: 85, label: '06' },
  { value: 60, label: '07' },
]

export default function ChartsScreen() {
  const [tab, setTab] = useState<'day' | 'month' | 'year'>('day')

  const contentAnim = useRef(new Animated.Value(1)).current

  const { companyName, location } = useLocalSearchParams<{
    companyName?: string | string[]
    location?: string | string[]
  }>()
  const companyTitle = Array.isArray(companyName) ? companyName[0] : companyName
  const companyLocation = Array.isArray(location) ? location[0] : location

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <GradientText
            text={companyTitle ?? 'CÔNG TY THỦY ĐIỆN BUÔN KUỐP'}
            colors={lightGradients.purple}
            fontSize={px.f(30)}
            style={{ textAlign: 'center' }}
          />
          <View style={styles.locationRow}>
            <Ionicons name="location" size={px.f(12)} color="#FF6A6A" style={{ marginRight: px.h(6) }} />
            <Text style={styles.locationText}>{companyLocation ?? 'Đắk Lắk, Việt Nam'}</Text>
          </View>
        </View>

        <ProfitCard tab={tab} setTab={setTab} contentAnim={contentAnim} lineData={lineData} />
        <LakeCard tab={tab} contentAnim={contentAnim} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    paddingTop: px.v(12),
    paddingBottom: px.v(40),
  },
  header: {
    marginTop: px.v(40),
    alignItems: 'center',
  },
  locationRow: {
    marginTop: px.v(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#C7D6E1',
    fontSize: px.m(13),
  },
})
