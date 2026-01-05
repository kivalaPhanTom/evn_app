import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native'
import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import GradientText from '@/components/GradientText/GradientText.component'
import { textGradients } from '@/core/constants/gradients'
import { px } from '@/core/utils/scale'
import PowerSectionFactDetail from './PowerSectionFactDetail/PowerSectionFactDetail'
import ProductionOutputFactDetail from './ProductionOutputFactDetail/ProductionOutputFactDetail'
import ReservoirWaterLevel from './ReservoirWaterLevel/ReservoirWaterLevel'
import HydrologyFactDetail from './HydrologyFactDetail/HydrologyFactDetail'
import FactoryMaintenanceSchedule from './FactoryMaintenanceSchedule/FactoryMaintenanceSchedule'
import RevenueDetail from './RevenueProfitFactDetail/Revenue'
import ProfitDetail from './RevenueProfitFactDetail/Profit'
import { saveState } from '@/core/redux/slices/FactoryDetailSlice'
interface factoryDetailProps {
  companyName: string;
  location: string;
  currentPlantId: string;
  keyTab: number;
}

function FactoryDetail(props: factoryDetailProps) {
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { companyName, location, currentPlantId, keyTab } = props;
  const { countRefesh } = useSelector((state: any) => state.factoryDetailSlice)

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(saveState({
        countRefesh: countRefesh + 1
      }))
    }, 80);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
              keyTab={keyTab}
            />
            <ProductionOutputFactDetail
              currentPlantId={currentPlantId}
              keyTab={keyTab}
            />
            <ReservoirWaterLevel />
            <HydrologyFactDetail keyTab={keyTab} currentPlantId={currentPlantId} />
            <RevenueDetail keyTab={keyTab} currentPlantId={currentPlantId} />
            <ProfitDetail keyTab={keyTab} currentPlantId={currentPlantId} />
            <FactoryMaintenanceSchedule />
          </ScrollView>
        </TwinkleStars>
      </View>
    </ScrollView>
  )
}

export default React.memo(FactoryDetail)

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
