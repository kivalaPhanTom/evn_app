import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { Animated, ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native'
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
import { useAppTheme } from '@/core/hooks/use-app-theme'
import ProfitDetail from '@/features/home/components/RevenueProfit/RevenueProfitDetail/Profit/Profit'
import { saveState } from '@/core/redux/domains/refresh'
import { LazySection } from '@/components/LazySection/LazySection'
import UriWebView from '@/components/UriWebView'
import TechInfo from '@/features/home/components/TechInfo/TechInfo'
import DocumentSection from '@/features/home/components/Legal/Documents'
import ExistenceInfo from '@/features/home/components/Existence/ExistenceInfo'
import ReportIcon from '@/components/icons/ReportIcon'
import { useThemePalette } from '@/core/constants/themePalette'
import { VisibilityProvider } from '@/core/context/visibility-context'

interface moduleItem {
  code: string
  name: string
  canAccess: boolean
}
function HomeContent() {
  const dispatch = useAppDispatch()
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const { modules } = useAppSelector((state: any) => state.moduleSlice)
  const { t } = useTranslation()
  const { companyName, location } = useLocalSearchParams<{
    companyName?: string | string[]
    location?: string | string[]
  }>()
  const companyTitle = Array.isArray(companyName) ? companyName[0] : companyName
  const companyLocation = Array.isArray(location) ? location[0] : location
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const p = useThemePalette()

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      dispatch(
        saveState({
          countRefesh: countRefesh + 1,
        }),
      )
    }, 80)
  }, [countRefesh, dispatch])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const task = requestIdleCallback(() => {
      setReady(true)
    })
    return () => cancelIdleCallback(task)
  }, [])

  const scrollY = useRef(new Animated.Value(0)).current
  const [loadedSections, setLoadedSections] = useState({
    production: false,
    hydrology: false,
    revenue: false,
    profit: false,
    maintenance: false,
    map: false,
    techInfo: false,
    documents: false,
    existence: false,
  })

  // Hydrology section: ~300-1800px scrollY. Hydrology height lớn (chart + 3 cards).
  const [hydrologyInViewport, setHydrologyInViewport] = useState(true)

  const preloadOffset = 300 // px before entering viewport
  const thresholds = useRef({
    production: 200 - preloadOffset,
    hydrology: 600 - preloadOffset,
    revenue: 1000 - preloadOffset,
    profit: 1400 - preloadOffset,
    maintenance: 1800 - preloadOffset,
    map: 2200 - preloadOffset,
    techInfo: 2600 - preloadOffset,
    documents: 3000 - preloadOffset,
    existence: 3400 - preloadOffset,
  }).current

  useEffect(() => {
    const id = scrollY.addListener(({ value }) => {
      setLoadedSections((prev) => {
        let changed = false
        const next = { ...prev }
        if (!prev.production && value >= thresholds.production) {
          next.production = true
          changed = true
        }
        if (!prev.hydrology && value >= thresholds.hydrology) {
          next.hydrology = true
          changed = true
        }
        if (!prev.revenue && value >= thresholds.revenue) {
          next.revenue = true
          changed = true
        }
        if (!prev.profit && value >= thresholds.profit) {
          next.profit = true
          changed = true
        }
        if (!prev.maintenance && value >= thresholds.maintenance) {
          next.maintenance = true
          changed = true
        }
        if (!prev.map && value >= thresholds.map) {
          next.map = true
          changed = true
        }
        if (!prev.techInfo && value >= thresholds.techInfo) {
          next.techInfo = true
          changed = true
        }
        if (!prev.documents && value >= thresholds.documents) {
          next.documents = true
          changed = true
        }
        if (!prev.existence && value >= thresholds.existence) {
          next.existence = true
          changed = true
        }
        return changed ? next : prev
      })
      // Hydrology section: viewport = scrollY in [start - buffer, end + buffer].
      // Hydrology rộng (chart + cards), range rất rộng để animation KHÔNG bị stop khi user đang đọc nội dung.
      // PowerStoreInLake / HydrographicChart có thể cao tới 3000-4000px.
      const hBuffer = 100
      const hTop = 300 - hBuffer
      const hBottom = 4500 - hBuffer
      const visible = value >= hTop && value < hBottom
      setHydrologyInViewport((prev) => (prev === visible ? prev : visible))
    })
    return () => scrollY.removeListener(id)
  }, [scrollY, thresholds])

  const checkModulePermission = useCallback(
    (moduleCode: string): boolean => {
      let result = false
      const moduleFound = modules.find((mod: moduleItem) => mod.code === moduleCode)
      if (moduleFound && moduleFound.canAccess) result = true
      return result
    },
    [modules],
  )

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
      scrollEventThrottle={16}
    >
      <VisibilityProvider value={{ hydrology: hydrologyInViewport }}>
        <TwinkleStars
        background={isDark ? Colors.background : Colors.lightBackground}
        particleDensity={50}
        particleColor={Colors.textColor}
        minSize={0.5}
        maxSize={2}
      >
        <View style={[styles.header, !isDark && styles.lightHeader]}>
          <ReportIcon size={px.f(32)} color={p.fileChartIcon} style={styles.checklistIcon} />
          <GradientText
            text={companyTitle ?? t('companyName')}
            colors={isDark ? textGradients.water : textGradients.waterStrong}
            fontSize={px.f(30)}
            style={{ textAlign: 'center' }}
          />
          <View style={styles.locationRow}>
            <Ionicons name="location" size={px.f(12)} color="#FF6A6A" style={{ marginRight: px.h(6) }} />
            <Text style={[styles.locationText, { color: isDark ? '#C7D6E1' : '#6B7280' }]}>
              {companyLocation ?? 'Đắk Lắk, Việt Nam'}{' '}
            </Text>
          </View>
        </View>
        {checkModulePermission('CONG_SUAT') && <PowerSection />}

        {checkModulePermission('SAN_LUONG') && (
          <LazySection shouldLoad={loadedSections.production} minHeight={300}>
            <ProductionOutput />
          </LazySection>
        )}

        {checkModulePermission('THUY_VAN') && (
          <LazySection shouldLoad={loadedSections.hydrology} minHeight={300}>
            <Hydrology />
          </LazySection>
        )}

        {checkModulePermission('DOANH_THU') && (
          <LazySection shouldLoad={loadedSections.revenue} minHeight={300}>
            <RevenueDetail />
          </LazySection>
        )}

        {checkModulePermission('LOI_NHUAN') && (
          <LazySection shouldLoad={loadedSections.profit} minHeight={300}>
            <ProfitDetail />
          </LazySection>
        )}

        {(checkModulePermission('LICH_SCL') || checkModulePermission('LICH_SUA_CHUA')) && (
          <LazySection shouldLoad={loadedSections.maintenance} minHeight={300}>
            <UnitMaintenanceSchedule />
          </LazySection>
        )}

        <LazySection shouldLoad={loadedSections.map} minHeight={200}>
          <UriWebView
            uri="https://buonkuop.vn:2016/pclb/quantrac.aspx"
            headers={{ 'Accept-Language': 'vi-VN,vi;q=0.9' }}
            style={{ flex: 1, height: 400, marginBottom: px.v(60) }}
          />
        </LazySection>
        <LazySection shouldLoad={loadedSections.techInfo} minHeight={300}>
          <TechInfo />
        </LazySection>
        <LazySection shouldLoad={loadedSections.documents} minHeight={300}>
          <DocumentSection />
        </LazySection>
        <LazySection shouldLoad={loadedSections.existence} minHeight={300}>
          <ExistenceInfo />
        </LazySection>
      </TwinkleStars>
      </VisibilityProvider>
    </ScrollView>
  )
}
export default React.memo(HomeContent)

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
  lightHeader: {
    paddingHorizontal: px.h(16) + px.f(32) + px.h(8),
  },
  checklistIcon: {
    position: 'absolute',
    left: px.h(16),
    top: px.v(2),
  },
  locationRow: {
    marginTop: px.v(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: px.m(13),
  },
})
