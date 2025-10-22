import { px } from '@/core/utils/scale'
import LakeCard from '@/features/dashboard/components/LakeCard/LakeCard'
import ProfitCard from '@/features/dashboard/components/ProfitCard/ProfitCard'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, ScrollView, StyleSheet } from 'react-native'
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
  const { t } = useTranslation()
  const [tab, setTab] = useState<'day' | 'month' | 'year'>('day')

  const contentAnim = useRef(new Animated.Value(1)).current

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <ProfitCard tab={tab} setTab={setTab} contentAnim={contentAnim} lineData={lineData} />
        <LakeCard tab={tab} contentAnim={contentAnim} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    // paddingHorizontal: px.h(16),
    paddingTop: px.v(12),
    paddingBottom: px.v(40),
  },
})
