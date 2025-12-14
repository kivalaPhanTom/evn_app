import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'

function UnitMaintenanceSchedule() {
  const router = useRouter()

  const onPressCard = () => {
    router.push({ pathname: '/unit-maintenance-schedule-detail' as any })
  }

  return (
    <SectionContainer
      title="Các tổ máy có lịch sửa chữa bảo dưỡng"
      actionButton={{
        label: 'Thêm chi tiết',
        onPress: onPressCard,
      }}
    >
      <View style={{ marginBottom: 20 }}>
        <View></View>
      </View>
    </SectionContainer>
  )
}

export default UnitMaintenanceSchedule
