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

function HomeNewScreen() {
  const dispatch = useAppDispatch();
  const { detail } = useAppSelector((state: RootState) => state.powerSlice)
  const activeTab = useAppSelector((state: RootState) => state.powerSlice.activeTabIndex)
  const onSetActiveTab = (index: number) => {
    dispatch(setActiveTab(index))
  }
  return (
    <PagerView
      style={{ flex: 1, backgroundColor:Colors.background }}
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
        detail.map((factory, index) => (
          <View key={`factory${index}`} style={{ flex: 1 }}>
            {activeTab === index + 1 ? <FactoryDetail
              companyName={`NMTĐ ${factory.name}`}
              location={'Đắk Lắk'}
              currentPlantId={factory.code}
              keyTab={index + 1}
            /> : <BlankPageSkeleton />}
          </View>
        ))
      }
    </PagerView>
  )
}

export default HomeNewScreen