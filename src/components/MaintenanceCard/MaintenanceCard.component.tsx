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
  minor: number
  major: number
  general: number
}

interface MaintenanceDuration {
  planned: number
  actual: number
}

interface MaintenanceCardProps {
  title: string
  status: number
  typeCount: number
  maintenanceTypeData: MaintenanceType
  mainternanceDurationData: MaintenanceDuration
}

export const MaintenanceCard: React.FC<MaintenanceCardProps> = ({
  title,
  status,
  typeCount,
  maintenanceTypeData,
  mainternanceDurationData,
}) => {
  const router = useRouter()

  const onPressCard = () => {
    router.push({ pathname: '/unit-maintenance-schedule-detail' as any })
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
            <View style={{ flexDirection: 'row' }}>
              <MaintenanceIcon opacity="1" width="16" height="16" />
              <Text
                style={{ color: 'rgb(255,255,255)', fontSize: 14, marginLeft: 5 }}
              >{`Hạng mục sửa chữa (${typeCount})`}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: px(20) }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                <Text style={{ color: '#34D399', fontSize: 16, fontWeight: 'bold' }}>{maintenanceTypeData.minor}</Text>
                <Text style={{ color: '#64748B', fontSize: 12 }}>{`TIỂU TU`}</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
                <Text style={{ color: '#63728A', fontSize: 30 }}>|</Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 5,
                  marginLeft: 5,
                }}
              >
                <Text style={{ color: '#FBBF24', fontSize: 16, fontWeight: 'bold' }}>{maintenanceTypeData.major}</Text>
                <Text style={{ color: '#64748B', fontSize: 12 }}>{`TRUNG TU`}</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
                <Text style={{ color: '#63728A', fontSize: 30 }}>|</Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 5,
                  marginLeft: 5,
                }}
              >
                <Text style={{ color: '#FB7185', fontSize: 16, fontWeight: 'bold' }}>
                  {maintenanceTypeData.general}
                </Text>
                <Text style={{ color: '#64748B', fontSize: 12 }}>{`ĐẠI TU`}</Text>
              </View>
            </View>
          </View>
          <View style={styles.maintenanceInfoRow}>
            <View style={{ flexDirection: 'row' }}>
              <ScheduleIcon opacity="1" width="16" height="16" />
              <Text style={{ color: 'rgb(255,255,255)', fontSize: 14, marginLeft: 5 }}>{`Số ngày sửa chữa`}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: px(10) }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>
                  {mainternanceDurationData.planned}
                </Text>
                <Text style={{ color: '#64748B', fontSize: 12 }}>{`KẾ HOẠCH`}</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
                <Text style={{ color: '#63728A', fontSize: 30 }}>|</Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 5,
                  marginLeft: 5,
                }}
              >
                <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>
                  {mainternanceDurationData.actual}
                </Text>
                <Text style={{ color: '#64748B', fontSize: 12 }}>{`DỰ KIẾN`}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
