import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'

import { Image } from 'expo-image'
import { icons } from '@/assets'
import styles from './MaintenanceCard.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { MaintenanceIcon } from '../ui/maintenance-icon'
import { ScheduleIcon } from '../ui/schedule-icon'
import { px } from '@/core/utils/scale'

interface MaintenanceType {
  RCM: number
  Major: number
  // Keep Minor and Medium for backward compatibility with old API
  Minor?: number
  Medium?: number
}

interface MaintenanceDuration {
  Plan: number
  Actual: number
}

interface MaintenanceCardProps {
  title: string
  status: number
  typeCount: number
  maintenanceTypeData: MaintenanceType
  mainternanceDurationData: MaintenanceDuration
  plantCode?: string
}

export const MaintenanceCard: React.FC<MaintenanceCardProps> = ({
  title,
  status,
  typeCount,
  maintenanceTypeData,
  mainternanceDurationData,
  plantCode,
}) => {
  const router = useRouter()

  const onPressCard = () => {
    router.navigate({ 
      pathname: '/unit-maintenance-schedule-detail' as any,
      params: { currentPlantId: plantCode }
    })
  }

  return (
    <TouchableOpacity style={styles.infoContainer} onPress={onPressCard} activeOpacity={0.8}>
      <View style={styles.infoCard}>
        <View style={styles.titleRow}>
          <Text style={{ color: 'rgb(255,255,255)', fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: `${status === 1 ? 'rgba(52, 211, 153, 0.1)' : 'rgba(251, 191, 36, 0.1)'}`,
                padding: 5,
                borderRadius: 10,
              },
            ]}
          >
            {status === 1 ? (
              <Image source={icons.tickIcon} contentFit="contain" style={{ width: 14, height: 14 }} />
            ) : (
              <Image source={icons.toolIcon} contentFit="contain" style={{ width: 14, height: 14 }} />
            )}
            <Text
              style={{
                color: `${status === 1 ? '#34D399' : '#FBBF24'}`,
                fontSize: 12,
                marginLeft: 6,
                fontWeight: 'bold',
              }}
            >
              {status === 1 ? 'HOẠT ĐỘNG' : 'ĐANG BẢO DƯỠNG'}
            </Text>
          </View>
        </View>
        <View style={styles.maintenanceInfoContainer}>
          <View style={styles.maintenanceInfoRow}>
            <View style={styles.maintenanceInfoHeader}>
              <MaintenanceIcon opacity="1" width={px(16).toString()} height={px(16).toString()} />
              <Text style={styles.maintenanceInfoHeaderText}>
                {`Hạng mục sửa chữa (${typeCount})`}
              </Text>
            </View>
            <View style={styles.maintenanceInfoContent}>
              <View style={styles.maintenanceInfoItem}>
                <Text style={[styles.maintenanceInfoValue, { color: '#34D399' }]}>
                  {maintenanceTypeData.RCM ?? ((maintenanceTypeData.Minor ?? 0) + (maintenanceTypeData.Medium ?? 0))}
                </Text>
                <Text style={styles.maintenanceInfoLabel}>RCM</Text>
              </View>
              <Text style={styles.maintenanceInfoDivider}>|</Text>
              <View style={styles.maintenanceInfoItem}>
                <Text style={[styles.maintenanceInfoValue, { color: '#FB7185' }]}>
                  {maintenanceTypeData.Major}
                </Text>
                <Text style={styles.maintenanceInfoLabel}>ĐẠI TU</Text>
              </View>
            </View>
          </View>
          <View style={styles.maintenanceInfoRow}>
            <View style={styles.maintenanceInfoHeader}>
              <ScheduleIcon opacity="1" width={px(16).toString()} height={px(16).toString()} />
              <Text style={styles.maintenanceInfoHeaderText}>Số ngày sửa chữa</Text>
            </View>
            <View style={styles.maintenanceInfoContent}>
              <View style={styles.maintenanceInfoItem}>
                <Text style={[styles.maintenanceInfoValue, { color: '#FFF' }]}>
                  {mainternanceDurationData.Plan}
                </Text>
                <Text style={styles.maintenanceInfoLabel}>KẾ HOẠCH</Text>
              </View>
              <Text style={styles.maintenanceInfoDivider}>|</Text>
              <View style={styles.maintenanceInfoItem}>
                <Text style={[styles.maintenanceInfoValue, { color: '#FFF' }]}>
                  {mainternanceDurationData.Actual}
                </Text>
                <Text style={styles.maintenanceInfoLabel}>THỰC TẾ</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
