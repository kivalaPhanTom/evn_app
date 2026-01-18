import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import GradientText from '@/components/GradientText/GradientText.component'
import { px } from '@/core/utils/scale'
import RevenueProfitDetail from '@/features/home/components/RevenueProfit/RevenueProfitDetail/RevenueProfitDetail'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const RevenueProfitDetailScreen: React.FC = () => {
  return (
    <View>
      <View style={styles.header}>
        <GradientText
          text={'Chi tiết sản lượng'}
          colors={'#FFF'}
          fontSize={px.f(30)}
          style={{ textAlign: 'center' }}
        />
        <View style={styles.locationRow}>
          <Text style={styles.locationText}>{'Công ty thủy điện Buon Kuop'}</Text>
        </View>
      </View>
      <RevenueProfitDetail />
    </View>
  )
}

export default RevenueProfitDetailScreen

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    paddingTop: px.v(12),
    paddingBottom: px.v(40),
  },
  header: {
    marginTop: px.v(10),
    marginBottom: px.v(20),
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
