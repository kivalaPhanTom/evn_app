import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import GradientText from '@/components/GradientText/GradientText.component'
import { Colors } from '@/core/constants/colors'
import { px } from '@/core/utils/scale'
import ProductOutputDetail from '@/features/home/components/ProductionOutput/ProductOutputDetail/ProductOutputDetail'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ProductOutputDetailScreen: React.FC = () => {
  return (
    <TwinkleStars background={Colors.background} particleDensity={50} particleColor={Colors.textColor} minSize={0.5} maxSize={2}>
      <View style={styles.header}>
        <GradientText
          text={'Chi tiết Sản lượng'}
          colors={'#FFF'}
          fontSize={px.f(30)}
          style={{ textAlign: 'center' }}
        />
        <View style={styles.locationRow}>
          <Text style={styles.locationText}>{'Công ty thủy điện Buon Kuop'}</Text>
        </View>
      </View>
      <ProductOutputDetail />
    </TwinkleStars>
  )
}

export default ProductOutputDetailScreen

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
