import React from 'react'
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

function UnitMaintenanceSchedule() {
  const router = useRouter()

  const onPressCard = () => {
    router.push({ pathname: '/unit-maintenance-schedule-detail' as any })
  }

  const data = [
    {
      title: 'Buôn Tua Sah',
      status: 1,
      typeCount: 2,
      maintenanceTypeData: {
        minor: 1,
        major: 0,
        general: 1,
      },
      mainternanceDurationData: {
        planned: 40,
        actual: 36,
      },
    },
    {
      title: 'Buôn Kuôp',
      status: 0,
      typeCount: 2,
      maintenanceTypeData: {
        minor: 1,
        major: 0,
        general: 1,
      },
      mainternanceDurationData: {
        planned: 40,
        actual: 36,
      },
    },
    {
      title: 'Srepok 3',
      status: 1,
      typeCount: 2,
      maintenanceTypeData: {
        minor: 1,
        major: 0,
        general: 1,
      },
      mainternanceDurationData: {
        planned: 40,
        actual: 36,
      },
    },
  ]

  return (
    <SectionContainer
      title="Các tổ máy có lịch sửa chữa bảo dưỡng"
      // actionButton={{
      //   label: 'Thêm chi tiết',
      //   onPress: onPressCard,
      // }}
    >
      <View style={styles.infoContainer}>
        <View style={[styles.infoCard]}>
          <Text style={{ color: 'rgb(255,255,255, 0.5)', fontSize: 11, fontWeight: 600 }}>TỔNG HẠNG MỤC SỬA CHỮA</Text>
          <View style={styles.infoRow}>
            <Text style={{ color: 'rgb(255,255,255)', fontSize: 22 }}>6</Text>
            <MaintenanceIcon color="#22D3EE" opacity="0.2" width="35" height="35" />
          </View>
        </View>
        <View style={styles.infoCard}>
          <Text style={{ color: 'rgb(255,255,255, 0.5)', fontSize: 11, fontWeight: 600 }}>
            TỔNG NGÀY SỬA CHỮA THỰC TẾ
          </Text>
          <View style={styles.infoRow}>
            <Text style={{ color: 'rgb(255,255,255)', fontSize: 22 }}>78</Text>
            <ScheduleIcon color="#22D3EE" opacity="0.2" width="35" height="35" />
          </View>
        </View>
      </View>
      <View>
        {data?.map((item, idex) => (
          <MaintenanceCard
            title={item.title}
            status={item.status}
            typeCount={item.typeCount}
            maintenanceTypeData={item.maintenanceTypeData}
            mainternanceDurationData={item.mainternanceDurationData}
            key={idex}
          />
        ))}
      </View>
    </SectionContainer>
  )
}

export default UnitMaintenanceSchedule
