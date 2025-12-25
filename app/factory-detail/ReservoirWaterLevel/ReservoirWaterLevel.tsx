import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import ReservoirInfo from './ReservoirInfo/ReservoirInfo'
import ReservoirMetric from './ReservoirMetric/ReservoirMetric'

function ReservoirWaterLevel() {
//   const router = useRouter()

//   const onPressCard = () => {
//     router.push({ pathname: '/hydrology-detail' as any })
//   }


  return (
    <SectionContainer 
      title="Mực nước hồ chứa"
    //   actionButton={{
    //     label: 'Thêm chi tiết',
    //     onPress: onPressCard,
    //   }}
    >
      <View style={{ marginBottom: 20 }}>
        <ReservoirInfo />
      </View>
      <View style={{ marginBottom: 20 }}>
        <ReservoirMetric />
      </View>
    </SectionContainer>
  )
}

export default ReservoirWaterLevel
