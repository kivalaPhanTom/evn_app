import React from 'react'
import { Text, View } from 'react-native'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import GeneralInformation from '../GeneralInformation/GeneralInformation'
import RegulationWaterLevel from '../RegulationWaterLevel/RegulationWaterLevel'


function HydrologyDetail() {
  return (
    <SectionContainer title="">
      <View style={{ marginBottom: 20 }}>
        <GeneralInformation />
      </View>
      <View style={{ marginBottom: 20 }}>
        <RegulationWaterLevel title="Mực nước thượng lưu (MNTL)" />
      </View>
    </SectionContainer>
  )
}

export default HydrologyDetail
