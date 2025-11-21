import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import ComparePower24h from './ComparePower24h/ComparePower24h'
import style from './PowerDetail.styles'
import { useLocalSearchParams } from 'expo-router'

export default function PowerDetail() {
  const { type } = useLocalSearchParams<{ type?: string }>()

  // Mặc định hiển thị CompareOutput24h nếu không có type hoặc type = 'output'
  const isPowerType = type === 'power'

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={style.section}>
          <ComparePower24h />
        </View>
      </View>
    </ScrollView>
  )
}
