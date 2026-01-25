import React from 'react'
import { View } from 'react-native'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import FactoryMaintenanceInfo from './FactoryMaintenanceInfo/FactoryMaintenanceInfo'
import { t } from 'i18next'
import { router } from 'expo-router'

interface FactoryMaintenanceScheduleProps {
  currentPlantId?: string
}

function FactoryMaintenanceSchedule(props: FactoryMaintenanceScheduleProps) {
  const { currentPlantId } = props

  const onPressCard = () => {
    router.navigate({ 
      pathname: '/unit-maintenance-schedule-detail' as any,
      params: currentPlantId ? { currentPlantId } : undefined
    })
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
        <FactoryMaintenanceInfo currentPlantId={currentPlantId} />
      </View>
    </SectionContainer>
  )
}

export default FactoryMaintenanceSchedule
