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
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { t } from 'i18next'
import { useRouter } from 'expo-router'
import { LazySection } from '@/components/LazySection/LazySection'
import TechInfoDetail from './TechInfoDetail/TechInfoDetail'
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
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { companyName, location, currentPlantId, keyTab } = props;
  const { countRefesh } = useSelector((state: any) => state.factoryDetailSlice)
  const { modules } = useSelector((state: any) => state.moduleSlice)
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

  const [scrollY, setScrollY] = useState(0);

  const onScroll = (e: any) => {
    setScrollY(e.nativeEvent.contentOffset.y);
  };

  const checkModulePermission = (moduleCode: string): boolean => {
    let result = false;
    const moduleFound = modules.find((mod: moduleItem) => mod.code === moduleCode);
    if (moduleFound && moduleFound.canAccess) result = true;
    return result
  };

  const preloadOffset = 300; // px before entering viewport

  const shouldLoadProductionOutputFactDetail = scrollY >= 200 - preloadOffset;
  const shouldLoadHydrology = scrollY >= 600 - preloadOffset;
  const shouldLoadRevenue = scrollY >= 1000 - preloadOffset;
  const shouldLoadProfit = scrollY >= 1400 - preloadOffset;
  const shouldLoadMaintenance = scrollY >= 1800 - preloadOffset;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onScroll={onScroll}
      scrollEventThrottle={16}
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
          <LazySection shouldLoad={shouldLoadRevenue} minHeight={300}>
            <TechInfoDetail
              currentPlantId={currentPlantId}
              keyTab={keyTab}
            />
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
