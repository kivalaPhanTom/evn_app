import React from 'react'
import { View } from 'react-native'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import FactoryMaintenanceInfo from './FactoryMaintenanceInfo/FactoryMaintenanceInfo'

function FactoryMaintenanceSchedule() {


  return (
    <SectionContainer 
      title="Các tổ máy có lịch sửa chữa bảo dưỡng"
    //   actionButton={{
    //     label: 'Thêm chi tiết',
    //     onPress: onPressCard,
    //   }}
    >
      <View style={{ marginBottom: 20 }}>
        <FactoryMaintenanceInfo />
      </View>
    </SectionContainer>
  )
}

export default FactoryMaintenanceSchedule
