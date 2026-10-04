import React, { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { Animated, ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native'
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
import { saveState } from '@/core/redux/domains/refresh'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { t } from 'i18next'
import { useRouter } from 'expo-router'
import { LazySection } from '@/components/LazySection/LazySection'
import TechInfoDetail from './TechInfoDetail/TechInfoDetail'
import ExistenceInfo from '@/features/home/components/Existence/ExistenceInfo'
import { setSelectedOptionsValueFactDetail } from '@/core/redux/domains/hydrology'
import { RootState } from '@/core/redux/store'
import { Colors } from '@/core/constants/colors'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { useThemePalette } from '@/core/constants/themePalette'
import ReportIcon from '@/components/icons/ReportIcon'

interface factoryDetailProps {
  companyName: string;
  location: string;
  currentPlantId: string;
  keyTab: number;
}
interface moduleItem {
  code: string;
  name: string;
  canAccess: boolean;
}

function FactoryDetail(props: factoryDetailProps) {
  const dispatch = useAppDispatch()
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { companyName, location, currentPlantId, keyTab } = props;
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const p = useThemePalette()
  const { selectedOptionsValueFactDetail } = useAppSelector((state: RootState) => state.hydrologySlice) 
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const { modules } = useAppSelector((state: any) => state.moduleSlice)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const router = useRouter();

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(saveState({
        countRefesh: countRefesh + 1
      }))
    }, 80);
  };

  const onPressCardHydro = () => {
    router.navigate({
      pathname: '/hydrology-detail' as any, params: {
        currentPlantId: currentPlantId
      }
    })
  }

  const scrollY = useRef(new Animated.Value(0)).current;
  const [shouldLoadProductionOutputFactDetail, setShouldLoadProductionOutputFactDetail] = useState(false);
  const [shouldLoadHydrology, setShouldLoadHydrology] = useState(false);
  const [shouldLoadRevenue, setShouldLoadRevenue] = useState(false);
  const [shouldLoadProfit, setShouldLoadProfit] = useState(false);
  const [shouldLoadMaintenance, setShouldLoadMaintenance] = useState(false);
  const [shouldLoadTechInfo, setShouldLoadTechInfo] = useState(false);
  const [shouldLoadExistence, setShouldLoadExistence] = useState(false);

  const checkModulePermission = (moduleCode: string): boolean => {
    let result = false;
    const moduleFound = modules.find((mod: moduleItem) => mod.code === moduleCode);
    if (moduleFound && moduleFound.canAccess) result = true;
    return result
  };

  const preloadOffset = 300; // px before entering viewport
  const thresholds = useRef({
    production: 200 - preloadOffset,
    hydrology: 600 - preloadOffset,
    revenue: 1000 - preloadOffset,
    profit: 1400 - preloadOffset,
    maintenance: 1800 - preloadOffset,
    techInfo: 2200 - preloadOffset,
    existence: 2600 - preloadOffset,
  }).current;

  useEffect(() => {
    const id = scrollY.addListener(({ value }) => {
      if (value >= thresholds.production) setShouldLoadProductionOutputFactDetail(true);
      if (value >= thresholds.hydrology) setShouldLoadHydrology(true);
      if (value >= thresholds.revenue) setShouldLoadRevenue(true);
      if (value >= thresholds.profit) setShouldLoadProfit(true);
      if (value >= thresholds.maintenance) setShouldLoadMaintenance(true);
      if (value >= thresholds.techInfo) setShouldLoadTechInfo(true);
      if (value >= thresholds.existence) setShouldLoadExistence(true);
    });
    return () => scrollY.removeListener(id);
  }, [scrollY, thresholds]);
  const options = [
    { label: "Theo giờ", value: "HOURS" },
    { label: "Theo 7 ngày gần nhất", value: "7_DAYS" }
  ];

  const onChange = (val: string) => {
    dispatch(setSelectedOptionsValueFactDetail(val))
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false },
      )}
      scrollEventThrottle={16}
    >
      <View style={{ flex: 1 }} collapsable={false}>
        <TwinkleStars background={isDark ? Colors.background : Colors.lightBackground} particleDensity={50} particleColor={Colors.textColor} minSize={0.5} maxSize={2}>
          <View style={styles.header}>
            <ReportIcon size={px.f(32)} color={p.fileChartIcon} style={styles.checklistIcon} />
            <GradientText
              text={companyName}
              colors={textGradients.water}
              fontSize={px.f(30)}
              style={{ textAlign: 'center' }}
            />
            <View style={styles.locationRow}>
              <Ionicons name="location" size={px.f(12)} color="#FF6A6A" style={{ marginRight: px.h(6) }} />
              <Text style={[styles.locationText, { color: isDark ? '#C7D6E1' : '#6B7280' }]}>{location}</Text>
            </View>
          </View>

          {
            checkModulePermission('CONG_SUAT') &&
            <PowerSectionFactDetail
              currentPlantId={currentPlantId}
              keyTab={keyTab}
            />
          }
          {
            checkModulePermission('SAN_LUONG') &&
            <LazySection shouldLoad={shouldLoadProductionOutputFactDetail} minHeight={300}>
              <ProductionOutputFactDetail
                currentPlantId={currentPlantId}
                keyTab={keyTab}
              />
            </LazySection>
          }
          {
            checkModulePermission('THUY_VAN') &&
            <LazySection shouldLoad={shouldLoadHydrology} minHeight={300}>
              <SectionContainer
                title={t('hydrology')}
                actionButton={{
                  label: 'Chi tiết',
                  onPress: onPressCardHydro,
                }}
                isShowSelectButton={true}
                options={options}
                onChangeOption={onChange}
                selectedValue={selectedOptionsValueFactDetail}
              >
                <ReservoirWaterLevel currentPlantId={currentPlantId} />
                <HydrologyFactDetail keyTab={keyTab} currentPlantId={currentPlantId} />
              </SectionContainer>
            </LazySection>
          }
          {
            checkModulePermission('DOANH_THU') &&
            <LazySection shouldLoad={shouldLoadRevenue} minHeight={300}>
              <RevenueDetail keyTab={keyTab} currentPlantId={currentPlantId} />
            </LazySection>
          }
          {
            checkModulePermission('LOI_NHUAN') &&
            <LazySection shouldLoad={shouldLoadProfit} minHeight={300}>
              <ProfitDetail keyTab={keyTab} currentPlantId={currentPlantId} currentPlantName={companyName} />
            </LazySection>
          }
          {
            checkModulePermission('LICH_SUA_CHUA') &&
            <LazySection shouldLoad={shouldLoadMaintenance} minHeight={300}>
              <FactoryMaintenanceSchedule selectedYear={selectedYear} setSelectedYear={setSelectedYear} currentPlantId={currentPlantId} />
            </LazySection>
          }
          <LazySection shouldLoad={shouldLoadTechInfo} minHeight={300}>
            <TechInfoDetail
              currentPlantId={currentPlantId}
              keyTab={keyTab}
            />
          </LazySection>
          <LazySection shouldLoad={shouldLoadExistence} minHeight={300}>
            <ExistenceInfo currentPlantId={currentPlantId} />
          </LazySection>
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
    color: '#C7D6E1',
    fontSize: px.m(13),
  },
})
