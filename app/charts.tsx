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

interface BarGroup {
  label: string
  items: {
    value: number
    frontColor?: string
    showValuesOnTop?: boolean
  }[]
}

const THRESHOLD = 45
const getColorForValue = (value: number, threshold = THRESHOLD): string => (value >= threshold ? '#00b300' : '#ee0033')

const rawBarGroups: BarGroup[] = [
  {
    label: '0h',
    items: [
      { value: 50, frontColor: getColorForValue(50) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '1h',
    items: [
      { value: 45, frontColor: getColorForValue(45) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '2h',
    items: [
      { value: 40, frontColor: getColorForValue(40) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '3h',
    items: [
      { value: 95, frontColor: getColorForValue(95) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '4h',
    items: [
      { value: 30, frontColor: getColorForValue(30) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '5h',
    items: [
      { value: 75, frontColor: getColorForValue(75) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '6h',
    items: [
      { value: 60, frontColor: getColorForValue(60) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '7h',
    items: [
      { value: 55, frontColor: getColorForValue(55) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '8h',
    items: [
      { value: 70, frontColor: getColorForValue(70) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '9h',
    items: [
      { value: 85, frontColor: getColorForValue(85) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '10h',
    items: [
      { value: 90, frontColor: getColorForValue(90) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '11h',
    items: [
      { value: 78, frontColor: getColorForValue(78) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '12h',
    items: [
      { value: 65, frontColor: getColorForValue(65) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '13h',
    items: [
      { value: 50, frontColor: getColorForValue(50) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '14h',
    items: [
      { value: 40, frontColor: getColorForValue(40) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '15h',
    items: [
      { value: 82, frontColor: getColorForValue(82) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '16h',
    items: [
      { value: 88, frontColor: getColorForValue(88) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '17h',
    items: [
      { value: 33, frontColor: getColorForValue(33) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '18h',
    items: [
      { value: 66, frontColor: getColorForValue(66) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '19h',
    items: [
      { value: 59, frontColor: getColorForValue(59) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '20h',
    items: [
      { value: 47, frontColor: getColorForValue(47) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '21h',
    items: [
      { value: 52, frontColor: getColorForValue(52) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '22h',
    items: [
      { value: 61, frontColor: getColorForValue(61) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '23h',
    items: [
      { value: 69, frontColor: getColorForValue(69) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '24h',
    items: [
      { value: 56, frontColor: getColorForValue(56) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
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

      <ProfitCard tab={tab} setTab={setTab} contentAnim={contentAnim} lineData={rawBarGroups} />
      <LakeCard tab={tab} contentAnim={contentAnim} />
    </ScrollView>
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
