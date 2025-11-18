import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import React, { useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'

export default function ProductOutputDetail() {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <AnimatedCardContainer>
        <Text>So sánh sản lượng 24h</Text>
      </AnimatedCardContainer>
      <AnimatedCardContainer>
        <Text>Sản lượng lũy kế</Text>
      </AnimatedCardContainer>
    </View>
  )
}
