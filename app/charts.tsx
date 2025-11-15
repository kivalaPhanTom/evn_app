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

const lineCurrent = [
  { value: 118, label: '0h' },
  { value: 120, label: '1h' },
  { value: 122, label: '2h' },
  { value: 126, label: '3h' },
  { value: 124, label: '4h' },
  { value: 128, label: '5h' },
  { value: 130, label: '6h' },
  { value: 132, label: '7h' },
  { value: 129, label: '8h' },
  { value: 135, label: '9h' },
  { value: 138, label: '10h' },
  { value: 140, label: '11h' },
  { value: 142, label: '12h' },
  { value: 139, label: '13h' },
  { value: 137, label: '14h' },
  { value: 134, label: '15h' },
  { value: 136, label: '16h' },
  { value: 133, label: '17h' },
  { value: 131, label: '18h' },
  { value: 128, label: '19h' },
  { value: 125, label: '20h' },
  { value: 123, label: '21h' },
  { value: 121, label: '22h' },
  { value: 119, label: '23h' },
]

const lineAvg = Array(24)
  .fill(0)
  .map(() => ({ value: 118, hideDataPoint: true }))

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

        <ProfitCard tab={tab} setTab={setTab} contentAnim={contentAnim} lineData={lineAvg} lineData2={lineCurrent} />
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
