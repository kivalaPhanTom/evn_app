import React, { use, useEffect } from 'react'
import { Text, View } from 'react-native'
import { useRouter } from 'expo-router'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'

import { Image } from 'expo-image'
import { icons } from '@/assets'
import styles from './UnitMaintenanceSchedule.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { MaintenanceCard } from '@/components/MaintenanceCard/MaintenanceCard.component'
import { MaintenanceIcon } from '@/components/ui/maintenance-icon'
import { ScheduleIcon } from '@/components/ui/schedule-icon'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/core/redux/store'
import { getRepairSchedule } from '@/core/redux/Actions/UnitMaintenanceScheduleActions'

function UnitMaintenanceSchedule() {
  const router = useRouter()
  const dispatch = useDispatch()

  const onPressCard = () => {
    router.navigate({ pathname: '/unit-maintenance-schedule-detail' as any })
  }
  const { TotalActualDay, TotalCategory, TotalMajorCategory, TotalMediumCategory, TotalMinorCategory, Details } =
    useSelector((state: RootState) => state.unitMaintenanceScheduleSlice)

  useEffect(() => {
    // Dispatch action to fetch repair schedule data
    dispatch(getRepairSchedule())
  }, [dispatch])

  return (
    <SectionContainer
      title={t('repairMaintenance')}
      actionButton={{
        label: 'Thêm chi tiết',
        onPress: onPressCard,
      }}
    >
      <View style={styles.infoContainer}>
        <View style={[styles.infoCard]}>
          <Text style={{ color: 'rgb(255,255,255, 0.5)', fontSize: 11, fontWeight: 600 }}>TỔNG HẠNG MỤC SỬA CHỮA</Text>
          <View style={styles.infoRow}>
            <Text style={{ color: 'rgb(255,255,255)', fontSize: 22 }}>{TotalCategory}</Text>
            <MaintenanceIcon color="#22D3EE" opacity="0.2" width="35" height="35" />
          </View>
        </View>
        <View style={styles.infoCard}>
          <Text style={{ color: 'rgb(255,255,255, 0.5)', fontSize: 11, fontWeight: 600 }}>
            TỔNG NGÀY SỬA CHỮA THỰC TẾ
          </Text>
          <View style={styles.infoRow}>
            <Text style={{ color: 'rgb(255,255,255)', fontSize: 22 }}>{TotalActualDay}</Text>
            <ScheduleIcon color="#22D3EE" opacity="0.2" width="35" height="35" />
          </View>
        </View>
      </View>
      <View>
        {Details?.map((item, idex) => (
          <MaintenanceCard
            title={item.PlantName}
            status={item.Status}
            typeCount={item.Category.Total}
            maintenanceTypeData={item.Category}
            mainternanceDurationData={item.Day}
            plantCode={item.PlantCode}
            key={idex}
          />
        ))}
      </View>
    </SectionContainer>
  )
}

export default UnitMaintenanceSchedule
