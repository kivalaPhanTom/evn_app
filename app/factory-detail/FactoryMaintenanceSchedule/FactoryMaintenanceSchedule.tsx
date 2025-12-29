import React from 'react'
import { View } from 'react-native'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import FactoryMaintenanceInfo from './FactoryMaintenanceInfo/FactoryMaintenanceInfo'
import { t } from 'i18next'
import { router } from 'expo-router'

function FactoryMaintenanceSchedule() {

  const onPressCard = () => {
    router.push({ pathname: '/unit-maintenance-schedule-detail' as any })
  }

  return (
    <SectionContainer 
      title={t('repairMaintenance')}
      actionButton={{
        label: 'Thêm chi tiết',
        onPress: onPressCard,
      }}
    >
      <View style={{ marginBottom: 20 }}>
        <FactoryMaintenanceInfo />
      </View>
    </SectionContainer>
  )
}

export default FactoryMaintenanceSchedule
