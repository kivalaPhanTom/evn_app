import React from 'react'
import { View } from 'react-native'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import PowerStoreInLake from './PowerStoreInLake/PowerStoreInLake'

function Hydrology() {
  return (
    <SectionContainer title="Thủy văn">
      <View style={{ marginBottom: 20 }}>
        <PowerStoreInLake />
      </View>
    </SectionContainer>
  )
}

export default Hydrology
