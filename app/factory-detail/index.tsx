import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import GradientText from '@/components/GradientText/GradientText.component'
import { lightGradients } from '@/core/constants/gradients'
import { textGradients } from '@/core/constants/gradients'
import { px } from '@/core/utils/scale'
import PowerSection from '@/features/home/components/PowerSection/PowerSection'
import ProductionOutput from '@/features/home/components/ProductionOutput/ProductionOutput'
import Hydrology from '@/features/home/components/Hydrology/Hydrology'
import UnitMaintenanceSchedule from '@/features/home/components/UnitMaintenanceSchedule/UnitMaintenanceSchedule'
import PowerSectionFactDetail from './PowerSectionFactDetail/PowerSectionFactDetail'
import ProductOutputRencentDaysFactDetail from './ProductionOutputFactDetail/ProductOutputRencentDaysFactDetail/ProductOutputRencentDaysFactDetail'
import ProductionOutputFactDetail from './ProductionOutputFactDetail/ProductionOutputFactDetail'
import ReservoirWaterLevel from './ReservoirWaterLevel/ReservoirWaterLevel'
interface factoryDetailProps {
  companyName: string;
  location: string;
  currentPlantId: string;
  keyTab: number;
}

function FactoryDetail(props: factoryDetailProps) {
  const { companyName, location, currentPlantId, keyTab } = props;

  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <TwinkleStars background="#000033" particleDensity={50} particleColor="#FFFFFF" minSize={0.5} maxSize={2}>
        <View style={styles.header}>
          <GradientText
            text={companyName}
            colors={textGradients.water}
            fontSize={px.f(30)}
            style={{ textAlign: 'center' }}
          />
          <View style={styles.locationRow}>
            <Ionicons name="location" size={px.f(12)} color="#FF6A6A" style={{ marginRight: px.h(6) }} />
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </View>
        <ScrollView>
          <PowerSectionFactDetail
            currentPlantId={currentPlantId}
            keyTab = {keyTab}
          />
          <ProductionOutputFactDetail
            currentPlantId={currentPlantId}
            keyTab = {keyTab}
          />
          <ReservoirWaterLevel />
        </ScrollView>
      </TwinkleStars>
    </View>
  )
}

export default FactoryDetail

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

