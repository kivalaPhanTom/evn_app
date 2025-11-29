import React from 'react'
import { View } from 'react-native'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import HydrographicChart from '@/components/HydrographicChart/HydrographicChart'
import PowerStoreInLake from './PowerStoreInLake/PowerStoreInLake'
import Overview from './Overview/Overview'
import InflowOutflow from './InflowOutflow/InflowOutflow'
import FlowDiagram from '@/components/FlowDiagram/FlowDiagram'

function Hydrology() {
  return (
    <SectionContainer title="Thủy văn">
      <View style={{ marginBottom: 20 }}>
        <FlowDiagram />
        <Overview />
        <HydrographicChart />
        <InflowOutflow />
      </View>
      <View style={{ marginBottom: 20 }}>
        <PowerStoreInLake />
      </View>
    </SectionContainer>
  )
}

export default Hydrology
