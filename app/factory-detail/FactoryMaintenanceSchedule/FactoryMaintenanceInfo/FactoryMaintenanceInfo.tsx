import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { MaintenanceIcon } from '@/components/ui/maintenance-icon'
import { ScheduleIcon } from '@/components/ui/schedule-icon'
import styles from './FactoryMaintenanceInfo.styles'
import { getDetailRepairSchedule } from '@/core/redux/Actions/UnitMaintenanceScheduleActions'
import { RootState } from '@/core/redux/store'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'

interface FactoryMaintenanceInfoProps {
  currentPlantId?: string
}

function FactoryMaintenanceInfo(props: FactoryMaintenanceInfoProps) {
  const { currentPlantId } = props
  const dispatch = useDispatch()
  const { currentPlantDetail, isDetailRepairScheduleLoading } = useSelector((state: RootState) => state.unitMaintenanceScheduleSlice)
  const { countRefesh } = useSelector((state: any) => state.factoryDetailSlice)
  const [firstLoading, setFirstLoading] = useState(true)

  useEffect(() => {
    setFirstLoading(true)
  }, [])

  useEffect(() => {
    if (!isDetailRepairScheduleLoading) {
      setFirstLoading(false)
    }
  }, [isDetailRepairScheduleLoading])

  useEffect(() => {
    if (currentPlantId) {
      dispatch(getDetailRepairSchedule({ currentPlantId }))
    }
  }, [currentPlantId, dispatch, countRefesh])

  // Map dữ liệu từ Breakdown - API v2 trả về RCM thay vì Minor và Medium
  const maintenanceTypeData = {
    rcm: currentPlantDetail?.Breakdown?.RCM ?? 0, // RCM
    major: currentPlantDetail?.Breakdown?.Major ?? 0, // ĐẠI TU
  }

  // Map dữ liệu từ RepairPlannedDays và RepairActualDays
  const maintenanceDurationData = {
    planned: currentPlantDetail?.RepairPlannedDays ?? 0, // KẾ HOẠCH
    actual: currentPlantDetail?.RepairActualDays ?? 0, // THỰC TẾ
  }

  return (
    <View style={styles.infoContainer}>
      {/* Card trái: Tổng Hạng mục sửa chữa */}
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>TỔNG HẠNG MỤC SỬA CHỮA</Text>
        {firstLoading || isDetailRepairScheduleLoading ? <BarSkeleton /> :
          <>
            <View style={{ marginTop: 8 }}>
              <View style={styles.maintenanceTypeRow}>
                <Text style={[styles.maintenanceTypeValue, { color: '#60A5FA', marginRight: 10 }]}>
                  {maintenanceTypeData.rcm}
                </Text>
                <Text style={styles.maintenanceTypeLabel}>RCM</Text>
              </View>

              <View style={styles.maintenanceTypeRow}>
                <Text style={[styles.maintenanceTypeValue, { color: '#FB7185' }]}>
                  {maintenanceTypeData.major}
                </Text>
                <Text style={styles.maintenanceTypeLabel}>ĐẠI TU</Text>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <MaintenanceIcon color="#22D3EE" opacity="0.2" width="35" height="35" />
            </View>
          </>
        }
      </View>

      {/* Card phải: Tổng Số ngày sửa chữa */}
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>TỔNG SỐ NGÀY SỬA CHỮA</Text>
        {firstLoading || isDetailRepairScheduleLoading ? <BarSkeleton /> :
          <>
            <View style={styles.durationContainer}>
              <View style={styles.durationItem}>
                <Text style={styles.durationValue}>{maintenanceDurationData.planned}</Text>
                <Text style={styles.durationLabel}>KẾ HOẠCH</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.durationItem}>
                <Text style={styles.durationValue}>{maintenanceDurationData.actual}</Text>
                <Text style={styles.durationLabel}>THỰC TẾ</Text>
              </View>
            </View>

            <View style={styles.iconContainer}>
              <ScheduleIcon color="#22D3EE" opacity="0.2" width="35" height="35" />
            </View>
          </>
        }
      </View>
    </View>
  )
}

export default FactoryMaintenanceInfo
