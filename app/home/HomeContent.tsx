import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import GradientText from '@/components/GradientText/GradientText.component'
import { textGradients } from '@/core/constants/gradients'
import { px } from '@/core/utils/scale'
import PowerSection from '@/features/home/components/PowerSection/PowerSection'
import ProductionOutput from '@/features/home/components/ProductionOutput/ProductionOutput'
import Hydrology from '@/features/home/components/Hydrology/Hydrology'
import UnitMaintenanceSchedule from '@/features/home/components/UnitMaintenanceSchedule/UnitMaintenanceSchedule'
import RevenueDetail from '@/features/home/components/RevenueProfit/RevenueProfitDetail/Revenue/Revenue'
import { Colors } from '@/core/constants/colors'
import ProfitDetail from '@/features/home/components/RevenueProfit/RevenueProfitDetail/Profit/Profit'
import { saveState } from '@/core/redux/slices/HomeSlice'
import { RefreshControl } from "react-native";
interface Props { }

function HomeContent(props: Props) {
  const { } = props
  const router = useRouter()
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false);
  const { countRefesh } = useSelector((state: any) => state.homeSlice)

  //   const swipeLeft = Gesture.Pan()
  //     .activeOffsetX([-30, 30])
  //     .onEnd(e => {
  //       if (e.translationX < -80) {
  //         runOnJS(router.navigate)('/factory-detail')
  //       }
  //     })
  const { companyName, location } = useLocalSearchParams<{
    companyName?: string | string[]
    location?: string | string[]
  }>()
  const companyTitle = Array.isArray(companyName) ? companyName[0] : companyName
  const companyLocation = Array.isArray(location) ? location[0] : location
  console.log('countRefeshTTTT:', countRefesh)
  const onRefresh = async () => {
    console.log('sdsdsdsdsdsd')
    setRefreshing(true);
    setTimeout(() => {
      dispatch(saveState({
        countRefesh: countRefesh + 1
      }))
      setRefreshing(false);
    }, 1000);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TwinkleStars background={Colors.background} particleDensity={50} particleColor={Colors.textColor} minSize={0.5} maxSize={2}>
        <View style={styles.header}>
          <GradientText
            text={companyTitle ?? 'CÔNG TY THỦY ĐIỆN BUÔN KUỐP'}
            colors={textGradients.water}
            fontSize={px.f(30)}
            style={{ textAlign: 'center' }}
          />
          <View style={styles.locationRow}>
            <Ionicons name="location" size={px.f(12)} color="#FF6A6A" style={{ marginRight: px.h(6) }} />
            <Text style={styles.locationText}>{companyLocation ?? 'Đắk Lắk, Việt Nam'}</Text>
          </View>
        </View>
        <ScrollView>
          <PowerSection />
          <ProductionOutput />
          <Hydrology />
          <RevenueDetail />
          <ProfitDetail />
          <UnitMaintenanceSchedule />
        </ScrollView>
      </TwinkleStars>
    </ScrollView>

  )
}
export default HomeContent

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
