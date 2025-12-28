import React from 'react'
import { View, Text } from 'react-native'
import { MaintenanceIcon } from '@/components/ui/maintenance-icon'
import { ScheduleIcon } from '@/components/ui/schedule-icon'
import styles from './FactoryMaintenanceInfo.styles'

function FactoryMaintenanceInfo() {
  // Dữ liệu mẫu - có thể thay thế bằng dữ liệu từ API/Redux
  const maintenanceTypeData = {
    minor: 1, // TIỂU TU
    medium: 0, // TRUNG TU
    major: 1, // ĐẠI TU
  }

  const maintenanceDurationData = {
    planned: 10, // KẾ HOẠCH
    actual: 12, // THỰC TẾ
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
