import React from 'react'
import ProductCumulativeOutput from './ProductCummulativeOutput/ProductComulativeOutput'
import { ScrollView, View } from 'react-native'
import CompareOutput24h from './CompareOutput24h/CompareOutput24h'
import style from './ProductOutputDetail.styles'
import { useLocalSearchParams } from 'expo-router'

export default function ProductOutputDetail() {
  const { type } = useLocalSearchParams<{ type?: string }>()

  // Mặc định hiển thị CompareOutput24h nếu không có type hoặc type = 'output'
  const isPowerType = type === 'power'

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={style.section}>
          <CompareOutput24h />
        </View>
        <View style={style.section}>
          <ProductCumulativeOutput />
        </View>
      </View>
    </ScrollView>
  )
}
