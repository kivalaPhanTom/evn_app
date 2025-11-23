import React from 'react'
import { View } from 'react-native'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import PowerStoreInLake from './PowerStoreInLake/PowerStoreInLake'
import Overview from './Overview/Overview'

function Hydrology() {
  return (
    <SectionContainer title="Thủy văn">
      <View style={{ marginBottom: 20 }}>
        <Overview />
        <PowerStoreInLake />
      </View>
    </SectionContainer>
  )
}

export default Hydrology
