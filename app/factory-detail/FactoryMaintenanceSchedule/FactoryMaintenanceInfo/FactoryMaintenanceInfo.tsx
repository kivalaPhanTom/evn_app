import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { MaintenanceIcon } from '@/components/ui/maintenance-icon'
import { ScheduleIcon } from '@/components/ui/schedule-icon'
import styles from './FactoryMaintenanceInfo.styles'
import { getDetailRepairSchedule } from '@/core/redux/Actions/UnitMaintenanceScheduleActions'
import { RootState } from '@/core/redux/store'

interface FactoryMaintenanceInfoProps {
  currentPlantId?: string
}

function FactoryMaintenanceInfo(props: FactoryMaintenanceInfoProps) {
  const { currentPlantId } = props
  const dispatch = useDispatch()
  const { currentPlantDetail } = useSelector((state: RootState) => state.unitMaintenanceScheduleSlice)

  useEffect(() => {
    if (currentPlantId) {
      dispatch(getDetailRepairSchedule({ currentPlantId }))
    }
  }, [currentPlantId, dispatch])

  // Map dữ liệu từ Breakdown
  const maintenanceTypeData = {
    minor: currentPlantDetail?.Breakdown?.Minor ?? 0, // TIỂU TU
    medium: currentPlantDetail?.Breakdown?.Medium ?? 0, // TRUNG TU
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
        
        <View style={{ marginTop: 8 }}>
          <View style={styles.maintenanceTypeRow}>
            <Text style={[styles.maintenanceTypeValue, { color: '#34D399', marginRight: 10 }]}>
              {maintenanceTypeData.minor}
            </Text>
            <Text style={styles.maintenanceTypeLabel}>TIỂU TU</Text>
          </View>
          
          <View style={styles.maintenanceTypeRow}>
            <Text style={[styles.maintenanceTypeValue, { color: '#FBBF24' }]}>
              {maintenanceTypeData.medium}
            </Text>
            <Text style={styles.maintenanceTypeLabel}>TRUNG TU</Text>
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
      </View>

      {/* Card phải: Tổng Số ngày sửa chữa */}
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>TỔNG SỐ NGÀY SỬA CHỮA</Text>
        
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
      </View>
    </View>
  )
}

export default FactoryMaintenanceInfo
