import React from 'react'
import { ScrollView, View } from 'react-native'
import { px } from '@/core/utils/scale'
import RevenueDetail from './Revenue/Revenue'
import ProfitDetail from './Profit/Profit'

export default function RevenueProfitDetail() {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ marginTop: px.v(20) }}>
          <RevenueDetail />
        </View>
        <View style={{ marginTop: px.v(20) }}>
          <ProfitDetail />
        </View>
      </View>
    </ScrollView>
  )
}
