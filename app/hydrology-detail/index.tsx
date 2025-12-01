import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import GradientText from '@/components/GradientText/GradientText.component'
import { px } from '@/core/utils/scale'
import HydrologyDetail from '@/features/home/components/Hydrology/HydrologyDetail/HydrologyDetail'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HydrologyDetailScreen: React.FC = () => {
  return (
    <TwinkleStars background="#000033" particleDensity={50} particleColor="#FFFFFF" minSize={0.5} maxSize={2}>
      <View style={styles.header}>
        <GradientText
          text={'Chi tiết Thủy văn'}
          colors={'#FFF'}
          fontSize={px.f(30)}
          style={{ textAlign: 'center' }}
        />
        <View style={styles.locationRow}>
          <Text style={styles.locationText}>{'Công ty thủy điện Buon Kuop'}</Text>
        </View>
      </View>
      <HydrologyDetail />
    </TwinkleStars>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: px.v(20),
    paddingBottom: px.v(10),
  },
  locationRow: {
    alignItems: 'center',
    marginTop: px.v(8),
  },
  locationText: {
    color: '#9CA3AF',
    fontSize: px.m(14),
  },
})

export default HydrologyDetailScreen

