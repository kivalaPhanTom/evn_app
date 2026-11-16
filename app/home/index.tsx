import React from 'react'
import { useAppSelector, useAppDispatch } from '@/core/redux/hooks'
import { View } from 'react-native'
import { RootState } from '@/core/redux/store'
import { setActiveTab } from '@/core/redux/domains/power'
import PagerView from 'react-native-pager-view'
import FactoryDetail from 'app/factory-detail'
import HomeContent from './HomeContent'
import BlankPageSkeleton from '@/components/Skeletons/BlankPageSkeleton'
import { Colors } from '@/core/constants/colors'
import { useAppTheme } from '@/core/hooks/use-app-theme'

function HomeNewScreen() {
  const dispatch = useAppDispatch();
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const { plants, companies, selectedCompanyId } = useAppSelector((state: RootState) => state.companyPlantSlice)
  const selectedCompany = companies.find((company) => company.companyId === selectedCompanyId)
  const activeTab = useAppSelector((state: RootState) => state.powerSlice.activeTabIndex)
  const onSetActiveTab = (index: number) => {
    dispatch(setActiveTab(index))
  }
  return (
    <PagerView
      key={selectedCompanyId ?? 'home'}
      style={{ flex: 1, backgroundColor: isDark ? Colors.background : Colors.lightBackground }}
      initialPage={0}
      onPageSelected={(e) => onSetActiveTab(e.nativeEvent.position)}
      orientation="horizontal"
    >
      {/* PAGE 1: HOME */}
      <View key="home" style={{ flex: 1 }}>
        {activeTab === 0 ? <HomeContent /> : <BlankPageSkeleton />}
      </View>

      {/* PAGE 2: FACTORY DETAIL */}
      {
        plants.filter((plant) => plant.companyId === selectedCompanyId).map((plant, index) => (
          <View key={`factory-${plant.plantId}`} style={{ flex: 1 }}>
            {activeTab === index + 1 ? <FactoryDetail
              companyName={`NMTĐ ${plant.plantName}`}
              location={selectedCompany?.location ?? ''}
              currentPlantId={String(plant.plantId)}
              keyTab={index + 1}
            /> : <BlankPageSkeleton />}
          </View>
        ))
      }
    </PagerView>
  )
}

export default HomeNewScreen
