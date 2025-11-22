import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import GradientText from '@/components/GradientText/GradientText.component'
import HydrographicChart from '@/components/HydrographicChart/HydrographicChart'
import { lightGradients } from '@/core/constants/gradients'
import { px } from '@/core/utils/scale'
import PowerSection from '@/features/home/components/PowerSection/PowerSection'
import ProductionOutput from '@/features/home/components/ProductionOutput/ProductionOutput'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Hydrology from '@/features/home/components/Hydrology/Hydrology'
interface Props {}

function HomeNewScreen(props: Props) {
  const {} = props

  const { companyName, location } = useLocalSearchParams<{
    companyName?: string | string[]
    location?: string | string[]
  }>()
  const companyTitle = Array.isArray(companyName) ? companyName[0] : companyName
  const companyLocation = Array.isArray(location) ? location[0] : location

  return (
    <TwinkleStars background="#000033" particleDensity={50} particleColor="#FFFFFF" minSize={0.5} maxSize={2}>
      <View style={styles.header}>
        <GradientText
          text={companyTitle ?? 'CÔNG TY THỦY ĐIỆN BUÔN KUỐP'}
          colors={lightGradients.purple}
          fontSize={px.f(30)}
          style={{ textAlign: 'center' }}
        />
        <View style={styles.locationRow}>
          <Ionicons name="location" size={px.f(12)} color="#FF6A6A" style={{ marginRight: px.h(6) }} />
          <Text style={styles.locationText}>{companyLocation ?? 'Đắk Lắk, Việt Nam'}</Text>
        </View>
      </View>
      <ScrollView>
        <HydrographicChart />
        <PowerSection />
        <ProductionOutput />
        <Hydrology />
      </ScrollView>
    </TwinkleStars>
  )
}

export default HomeNewScreen

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    paddingTop: px.v(12),
    paddingBottom: px.v(40),
  },
  header: {
    marginTop: px.v(40),
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
