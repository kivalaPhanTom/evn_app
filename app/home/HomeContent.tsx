import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { ScrollView, StyleSheet, Text, View, RefreshControl, InteractionManager } from 'react-native'
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
import { LazySection } from '@/components/LazySection/LazySection'
import UriWebView from '@/components/UriWebView'

interface moduleItem {
  code: string
  name: string
  canAccess: boolean
}
function HomeContent() {
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { countRefesh } = useSelector((state: any) => state.homeSlice)
  const { modules } = useSelector((state: any) => state.moduleSlice)
  const { t } = useTranslation()
  const { companyName, location } = useLocalSearchParams<{
    companyName?: string | string[]
    location?: string | string[]
  }>()
  const companyTitle = Array.isArray(companyName) ? companyName[0] : companyName
  const companyLocation = Array.isArray(location) ? location[0] : location

  const onRefresh = async () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      dispatch(
        saveState({
          countRefesh: countRefesh + 1,
        }),
      )
    }, 80)
  }
  const [ready, setReady] = useState(false)

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setReady(true)
    })
  }, [])
  const [scrollY, setScrollY] = useState(0)

  const onScroll = (e: any) => {
    setScrollY(e.nativeEvent.contentOffset.y)
  }

  const preloadOffset = 300 // px before entering viewport

  const shouldLoadProduction = scrollY >= 200 - preloadOffset
  const shouldLoadHydrology = scrollY >= 600 - preloadOffset
  const shouldLoadRevenue = scrollY >= 1000 - preloadOffset
  const shouldLoadProfit = scrollY >= 1400 - preloadOffset
  const shouldLoadMaintenance = scrollY >= 1800 - preloadOffset
  const shouldLoadMap = scrollY >= 2200 - preloadOffset

  const checkModulePermission = (moduleCode: string): boolean => {
    let result = false
    const moduleFound = modules.find((mod: moduleItem) => mod.code === moduleCode)
    if (moduleFound && moduleFound.canAccess) result = true
    return result
  }

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      onScroll={onScroll}
      scrollEventThrottle={16}
    >
      <TwinkleStars
        background={Colors.background}
        particleDensity={50}
        particleColor={Colors.textColor}
        minSize={0.5}
        maxSize={2}
      >
        <View style={styles.header}>
          <GradientText
            text={companyTitle ?? t('companyName')}
            colors={textGradients.water}
            fontSize={px.f(30)}
            style={{ textAlign: 'center' }}
          />
          <View style={styles.locationRow}>
            <Ionicons name="location" size={px.f(12)} color="#FF6A6A" style={{ marginRight: px.h(6) }} />
            <Text style={styles.locationText}>{companyLocation ?? 'Đắk Lắk, Việt Nam'}</Text>
          </View>
        </View>
        {checkModulePermission('CONG_SUAT') && <PowerSection />}

        {checkModulePermission('SAN_LUONG') && (
          <LazySection shouldLoad={shouldLoadProduction} minHeight={300}>
            <ProductionOutput />
          </LazySection>
        )}

        {checkModulePermission('THUY_VAN') && (
          <LazySection shouldLoad={shouldLoadHydrology} minHeight={300}>
            <Hydrology />
          </LazySection>
        )}
        {checkModulePermission('DOANH_THU') && (
          <LazySection shouldLoad={shouldLoadRevenue} minHeight={300}>
            <RevenueDetail />
          </LazySection>
        )}

        {checkModulePermission('LOI_NHUAN') && (
          <LazySection shouldLoad={shouldLoadProfit} minHeight={300}>
            <ProfitDetail />
          </LazySection>
        )}

        {checkModulePermission('LICH_SUA_CHUA') && (
          <LazySection shouldLoad={shouldLoadMaintenance} minHeight={300}>
            <UnitMaintenanceSchedule />
          </LazySection>
        )}

        {/* <LazySection shouldLoad={shouldLoadMap} minHeight={200}> */}
          <UriWebView
            uri="https://buonkuop.vn:2016/pclb/quantrac.aspx"
            headers={{ 'Accept-Language': 'vi-VN,vi;q=0.9' }}
            style={{ flex: 1, height: 400, marginBottom: px.v(60) }}
          />
        {/* </LazySection> */}

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
