import React, { useState, useEffect } from 'react'
import { Text, View, Pressable } from 'react-native'
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
import BarSkeleton from '@/components/Skeletons/BarSkeleton'

function UnitMaintenanceSchedule() {
  const router = useRouter()
  const dispatch = useDispatch()

  const onPressCard = () => {
    router.navigate({ pathname: '/unit-maintenance-schedule-detail' as any })
  }
  const [firstLoading, setFirstLoading] = useState(true)
  const { countRefesh } = useSelector((state: any) => state.homeSlice)
  const { isRepairerScheduleLoading, TotalActualDay, TotalCategory, TotalMajorCategory, TotalRCMCategory, Details } =
    useSelector((state: RootState) => state.unitMaintenanceScheduleSlice)
  useEffect(() => {
    setFirstLoading(true)
  }, [])

  useEffect(() => {
    if (!isRepairerScheduleLoading) {
      setFirstLoading(false)
    }
  }, [isRepairerScheduleLoading])
  useEffect(() => {
    // Dispatch action to fetch repair schedule data
    dispatch(getRepairSchedule())
  }, [dispatch, countRefesh])

  return (
    <SectionContainer
      title={t('repairMaintenance') + " " + new Date().getFullYear()}
    >
      <Pressable onPress={onPressCard}>
        <View style={styles.infoContainer}>
          <View style={[styles.infoCard]}>
            <Text style={{ color: 'rgb(255,255,255, 0.5)', fontSize: 11, fontWeight: 600 }}>TỔNG HẠNG MỤC SỬA CHỮA</Text>
            <View style={styles.infoRow}>
              {firstLoading || isRepairerScheduleLoading ? <BarSkeleton /> :
                <>
                  <Text style={{ color: 'rgb(255,255,255)', fontSize: 22 }}>{TotalCategory}</Text>
                  <MaintenanceIcon color="#22D3EE" opacity="0.2" width="35" height="35" />
                </>
              }
            </View>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ color: 'rgb(255,255,255, 0.5)', fontSize: 11, fontWeight: 600 }}>
              TỔNG NGÀY SỬA CHỮA THỰC TẾ
            </Text>
            <View style={styles.infoRow}>
              {firstLoading || isRepairerScheduleLoading ? <BarSkeleton /> :
                <>
                  <Text style={{ color: 'rgb(255,255,255)', fontSize: 22 }}>{TotalActualDay}</Text>
                  <ScheduleIcon color="#22D3EE" opacity="0.2" width="35" height="35" />
                </>
              }
            </View>
          </View>
        </View>
      </Pressable>
      <View>
        {firstLoading || isRepairerScheduleLoading ?
          <>
            <BarSkeleton width={'100%'} />
            <BarSkeleton width={'95%'} />
            <BarSkeleton width={'90%'} />
            <BarSkeleton width={'85%'} />
            <BarSkeleton width={'80%'} />
            <BarSkeleton width={'75%'} />
          </> :
          <>
            {Details?.map((item, idex) => (
              <MaintenanceCard
                title={item.PlantName}
                status={item.Status}
                typeCount={item?.Category?.Total || 0}
                maintenanceTypeData={item.Category}
                mainternanceDurationData={item.Day}
                plantCode={item.PlantCode}
                key={idex}
              />
            ))}</>
        }
      </View>
    </SectionContainer>
  )
}

export default UnitMaintenanceSchedule
