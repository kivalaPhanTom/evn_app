import React, { useState, useRef, useEffect } from 'react'
import { Animated, Easing, View as RNView, Text as RNText } from 'react-native'
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
import BlankPageSkeleton from '@/components/Skeletons/BlankPageSkeleton'
interface Props { }

function HomeNewScreen(props: Props) {
  const { } = props
  const router = useRouter()
  const dispatch = useDispatch();

  const { detail } = useSelector((state: RootState) => state.powerSlice)
  const activeTab = useSelector((state: RootState) => state.powerSlice.activeTabIndex)
  const [isLoading, setIsLoading] = useState(false)
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let looping: Animated.CompositeAnimation | null = null;
    if (isLoading) {
      looping = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.linear,
        })
      );
      looping.start();
    } else {
      spinAnim.stopAnimation();
      spinAnim.setValue(0);
    }
    return () => {
      if (looping) looping.stop();
    };
  }, [isLoading]);

  const onSetActiveTab = (index: number) => {
    dispatch(setActiveTab(index))
  }

  const handlePageScrollStateChanged = (event: any) => {
    const state = event?.nativeEvent?.pageScrollState;
    if (state === 'dragging' || state === 'settling') {
      setIsLoading(true)
    } else if (state === 'idle') {
      setIsLoading(false)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => onSetActiveTab(e.nativeEvent.position)}
        orientation="horizontal"
        onPageScrollStateChanged={handlePageScrollStateChanged}
      >
        {/* PAGE 1: HOME */}
        <View key="home" style={{ flex: 1 }}>
          {activeTab === 0 ? <HomeContent /> : <BlankPageSkeleton />}
        </View>

        {/* PAGE 2: FACTORY DETAIL */}
        {
          detail.map((factory, index) => (
            <View key={`factory${index}`} style={{ flex: 1 }}>
              {activeTab === index + 1 ? <FactoryDetail
                companyName={`Nhà máy ${factory.name}`}
                location={'Đắk Lắk'}
                currentPlantId={factory.code}
                keyTab={index + 1}
              /> : <BlankPageSkeleton />}
            </View>
          ))
        }
      </PagerView>
      {isLoading && (
        <RNView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.18)',
            zIndex: 10,
          }}
        >
          <Animated.View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              borderWidth: 6,
              borderColor: '#4F8EF7',
              borderTopColor: '#fff',
              borderRightColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 18,
              transform: [{ rotate: spinAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }],
              backgroundColor: 'rgba(30,41,59,0.7)',
              shadowColor: '#000',
              shadowOpacity: 0.18,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 4 },
            }}
          >
            <Ionicons name="flash" size={36} color="#FFD600" />
          </Animated.View>
          <RNText style={{ color: '#fff', fontSize: 17, fontWeight: '600', textShadowColor: '#000', textShadowRadius: 8, letterSpacing: 0.5 }}>
            
          </RNText>
        </RNView>
      )}
    </View>
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
