import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import HydrographicChart from '@/components/HydrographicChart/HydrographicChart'
import PowerStoreInLake from './PowerStoreInLake/PowerStoreInLake'
import Overview from './Overview/Overview'
import InflowOutflow from './InflowOutflow/InflowOutflow'
import FlowDiagram from '@/components/FlowDiagram/FlowDiagram'

function Hydrology() {
  const router = useRouter()

  const onPressCard = () => {
    router.navigate({ pathname: '/hydrology-detail' as any })
  }


  return (
    <SectionContainer 
      title="Thủy văn"
      actionButton={{
        label: 'Chi tiết',
        onPress: onPressCard,
      }}
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
