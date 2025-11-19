import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import React, { useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import ProductCumulativeOutput from './ProductCummulativeOutput/ProductComulativeOutput'

export default function ProductOutputDetail() {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <AnimatedCardContainer>
        <Text>So sánh sản lượng 24h</Text>
      </AnimatedCardContainer>
      <ProductCumulativeOutput />
    </View>
  )
}
