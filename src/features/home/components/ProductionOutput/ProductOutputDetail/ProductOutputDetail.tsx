import React from 'react'
import ProductCumulativeOutput from './ProductCummulativeOutput/ProductComulativeOutput'
import { ScrollView, View } from 'react-native'
import CompareOutput24h from './CompareOutput24h/CompareOutput24h'
import style from './ProductOutputDetail.styles'
import { useLocalSearchParams } from 'expo-router'
import CompareOutputByTime from './CompareOutputByTime/CompareOutputByTime'

export default function ProductOutputDetail(props: { currentPlantId?: string; isCheckDisableDate: boolean }) {
  const { type } = useLocalSearchParams<{ type?: string }>()
  const { currentPlantId, isCheckDisableDate } = props

  // Mặc định hiển thị CompareOutput24h nếu không có type hoặc type = 'output'
  const isPowerType = type === 'power'
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={style.section}>
          <CompareOutput24h currentPlantId={currentPlantId} isCheckDisableDate={isCheckDisableDate} />
        </View>
        <View style={style.section}>
          <CompareOutputByTime currentPlantId={currentPlantId} isCheckDisableDate={isCheckDisableDate} />
        </View>
        <View style={style.section}>
          <ProductCumulativeOutput currentPlantId={currentPlantId} />
        </View>
      </View>
    </ScrollView>
  )
}
