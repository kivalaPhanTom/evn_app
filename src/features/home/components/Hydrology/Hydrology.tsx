import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import HydrographicChart from '@/components/HydrographicChart/HydrographicChart'
import PowerStoreInLake from './PowerStoreInLake/PowerStoreInLake'
import Overview from './Overview/Overview'
import InflowOutflow from './InflowOutflow/InflowOutflow'

function Hydrology() {
  const router = useRouter()

  const onPressCard = () => {
    router.push({ pathname: '/hydrology-detail' as any })
  }


  return (
    <SectionContainer 
      title="Thủy văn"
      actionButton={{
        label: 'Thêm chi tiết',
        onPress: onPressCard,
      }}
    >
      <View style={{ marginBottom: 20 }}>
        <Overview />
      </View>
      <View style={{ marginBottom: 20 }}>
        <PowerStoreInLake />
      </View>
      {/* <View style={{ marginBottom: 20 }}>
        <FlowRate title="Mực nước thượng lưu (MNTL)" data={[]} currentColor="#0EA5E9" unit="m" />
      </View>
      <View style={{ marginBottom: 20 }}>
        <FlowRate title="Lưu lượng về (Qve)" data={[]} currentColor="#3B82F6" unit="m³/s" />
      </View>
      <View style={{ marginBottom: 20 }}>
        <FlowRate title="Lưu lượng chạy máy (Qcm)" data={[]} currentColor="#10B981" unit="m³/s" />
      </View>
      <View style={{ marginBottom: 20 }}>
        <FlowRate title="Lưu lượng xả tràn (Qxt)" data={[]} currentColor="#F59E0B" unit="m³/s" />
      </View> */}
    </SectionContainer>
  )
}

export default Hydrology
