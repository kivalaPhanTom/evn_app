import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import React, { useEffect, useRef, useState } from 'react'
import ProductCumulativeOutput from './ProductCummulativeOutput/ProductComulativeOutput'
import { ScrollView, Text, View } from 'react-native'
import CompareOutput24h from './components/CompareOutput24h/CompareOutput24h'
import style from './ProductOutputDetail.styles'

export default function ProductOutputDetail() {
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
