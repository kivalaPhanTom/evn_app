import React, { useState } from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'
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
import { RootState } from '@/core/redux/store'
import ProfitDetail from '@/features/home/components/RevenueProfit/RevenueProfitDetail/Profit/Profit'
import { setActiveTab } from '@/core/redux/slices/PowerSlice'
import PagerView from 'react-native-pager-view'
// import { View } from 'react-native'
import FactoryDetail from 'app/factory-detail'
import HomeContent from './HomeContent'
interface Props { }

function HomeNewScreen(props: Props) {
  const { } = props
  const router = useRouter()
  const dispatch = useDispatch();

  const { detail } = useSelector((state: RootState) => state.powerSlice)

  // const swipeLeft = Gesture.Pan()
  //   .activeOffsetX([-30, 30])
  //   .onEnd(e => {
  //     if (e.translationX < -80) {
  //       runOnJS(router.navigate)('/factory-detail')
  //     }
  //   })
  // const { companyName, location } = useLocalSearchParams<{
  //   companyName?: string | string[]
  //   location?: string | string[]
  // }>()
  // const companyTitle = Array.isArray(companyName) ? companyName[0] : companyName
  // const companyLocation = Array.isArray(location) ? location[0] : location
  const onSetActiveTab = (index: number) => {
    dispatch(setActiveTab(index))
  }
  return (
    <PagerView
      style={{ flex: 1 }}
      initialPage={0}
      onPageSelected={(e) => onSetActiveTab(e.nativeEvent.position)}
      orientation="horizontal"
    >
      {/* PAGE 1: HOME */}
      <View key="home" style={{ flex: 1 }}>
        <HomeContent />
      </View>

      {/* PAGE 2: FACTORY DETAIL */}
      {
        detail.map((factory, index) => (
          <View key={`factory${index}`} style={{ flex: 1 }}>
            <FactoryDetail
              companyName={`Nhà máy ${factory.name}`}
              location={'Đắk Lắk'}
              currentPlantId={factory.code}
              keyTab={index + 1}

            />
          </View>
        ))
      }
    </PagerView>
    // <TwinkleStars background={Colors.background} particleDensity={50} particleColor={Colors.textColor} minSize={0.5} maxSize={2}>
    //   <View style={styles.header}>
    //     <GradientText
    //       text={companyTitle ?? 'CÔNG TY THỦY ĐIỆN BUÔN KUỐP'}
    //       colors={textGradients.water}
    //       fontSize={px.f(30)}
    //       style={{ textAlign: 'center' }}
    //     />
    //     <View style={styles.locationRow}>
    //       <Ionicons name="location" size={px.f(12)} color="#FF6A6A" style={{ marginRight: px.h(6) }} />
    //       <Text style={styles.locationText}>{companyLocation ?? 'Đắk Lắk, Việt Nam'}</Text>
    //     </View>
    //   </View>
    //   <ScrollView>
    //     <PowerSection />
    //     <ProductionOutput />
    //     <Hydrology />
    //     <UnitMaintenanceSchedule />
    //     <RevenueDetail />
    //     <ProfitDetail />
    //   </ScrollView>
    // </TwinkleStars>
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
