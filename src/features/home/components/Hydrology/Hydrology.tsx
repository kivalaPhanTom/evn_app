import React, { useState } from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import PowerStoreInLake from './PowerStoreInLake/PowerStoreInLake'
import { setSelectedOptionsValue } from '@/core/redux/domains/hydrology'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { RootState } from '@/core/redux/store'
import Overview from './Overview/Overview'

function Hydrology() {
  const router = useRouter()
const dispatch = useAppDispatch()
  const { selectedOptionsValue } = useAppSelector((state: RootState) => state.hydrologySlice)
  const onPressCard = () => {
    router.navigate({ pathname: '/hydrology-detail' as any })
  }
  const options = [
    { label: "Theo giờ", value: "HOURS" },
    { label: "Theo 7 ngày gần nhất", value: "7_DAYS" },
  ];
 
  const onChange = (val: string) => {
    dispatch(setSelectedOptionsValue(val))
  }

  return (
    <SectionContainer
      title="Thủy văn"
      actionButton={{
        label: 'Chi tiết',
        onPress: onPressCard,
      }}
      isShowSelectButton={true}
      options={options}
      onChangeOption={onChange}
      selectedValue={selectedOptionsValue}
    >
      <View style={{ marginBottom: 20 }}>
        <Overview />
      </View>
      <View style={{ marginBottom: 20 }}>
        <PowerStoreInLake />
      </View>
    </SectionContainer>
  )
}

export default Hydrology
