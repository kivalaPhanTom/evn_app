import React from 'react'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Shadow } from 'react-native-shadow-2'
import { px } from '@/core/utils/scale'
import styles from './MaintenanceLevelCard.styles'

export type MaintenanceLevel = 'major' | 'medium' | 'minor'

interface MaintenanceLevelCardProps {
  title: string
  level: MaintenanceLevel
  planned: {
    days: number
    startDate: string
    endDate: string
  }
  actual: {
    days: number | null
    startDate: string | null
    endDate: string | null
  }
  timeline: {
    activeMonths: number[] // Array of month indices (0-11) that are active
  }
}

const getLevelConfig = (level: MaintenanceLevel) => {
  switch (level) {
    case 'major':
      return {
        label: 'ĐẠI TU',
        color: '#FB7185',
        backgroundColor: 'rgba(251, 113, 133, 0.1)',
        borderColor: 'rgba(251, 113, 133, 0.3)',
      }
    case 'medium':
      return {
        label: 'TRUNG TU',
        color: '#34D399',
        backgroundColor: 'rgba(52, 211, 153, 0.1)',
        borderColor: 'rgba(52, 211, 153, 0.3)',
      }
    case 'minor':
      return {
        label: 'TIỂU TU',
        color: '#60A5FA',
        backgroundColor: 'rgba(96, 165, 250, 0.1)',
        borderColor: 'rgba(96, 165, 250, 0.3)',
      }
  }
}

const MONTHS = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']

const renderInfoRow = (label: string, value: string | number, valueStyle?: any) => (
  <View style={styles.infoRowItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, valueStyle]}>{value}</Text>
  </View>
)

export const MaintenanceLevelCard: React.FC<MaintenanceLevelCardProps> = ({
  title,
  level,
  planned,
  actual,
  timeline,
}) => {
  const config = getLevelConfig(level)
  const getActualDaysStyle = () => {
    if (actual.days === null) return undefined
    if (actual.days > planned.days) return styles.infoValueOver
    if (actual.days < planned.days) return styles.infoValueUnder
    return undefined
  }

  // Normalize activeMonths to array of indices (0-11)
  // Handles: number, number[], or already normalized array
  const normalizeActiveMonths = (activeMonths: number | number[]): number[] => {
    if (activeMonths == null) return []
    
    // Convert to array if it's a single number
    const monthsArray = Array.isArray(activeMonths) ? activeMonths : [activeMonths]
    
    // Convert month numbers (1-12) to indices (0-11)
    return monthsArray.map(month => {
      // If month is 1-12 (actual month number), convert to 0-11 (array index)
      // If month is already 0-11 (array index), use as is
      return month >= 1 && month <= 12 ? month - 1 : month
    })
  }

  const normalizedActiveMonths = normalizeActiveMonths(timeline.activeMonths)

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View
          style={[
            styles.statusTag,
            {
              backgroundColor: config.backgroundColor,
              borderColor: config.borderColor,
            },
          ]}
        >
          <Text style={[styles.statusText, { color: config.color }]}>{config.label}</Text>
        </View>
      </View>

      <View style={styles.sectionsContainer}>
        <View style={[styles.section, styles.plannedSection]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar-outline" size={16} color="#FFF" />
            <Text style={styles.sectionTitle}>KẾ HOẠCH</Text>
          </View>
          <View style={styles.infoColumn}>
            {renderInfoRow('Ngày:', planned.days)}
            {renderInfoRow('Bắt đầu:', planned.startDate)}
            {renderInfoRow('Kết thúc:', planned.endDate)}
          </View>
        </View>

        <View style={[styles.section, styles.actualSection]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="time-outline" size={16} color="#FFF" />
            <Text style={styles.sectionTitle}>THỰC TẾ</Text>
          </View>
          <View style={styles.infoColumn}>
            {renderInfoRow('Ngày:', actual.days !== null ? actual.days : '--', getActualDaysStyle())}
            {renderInfoRow('Bắt đầu:', actual.startDate || '--')}
            {renderInfoRow('Kết thúc:', actual.endDate || '--')}
          </View>
        </View>
      </View>

      <View style={styles.timelineContainer}>
        <View style={styles.timelineBar}>
          {MONTHS.map((month, index) => {
            const isActive = normalizedActiveMonths.includes(index)

            return (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineSegmentWrapper}>
                  {isActive ? (
                    <Shadow
                      distance={2.5}
                      startColor={`${config.color}CC`}
                      endColor={`${config.color}00`}
                      offset={[0, 0]}
                      paintInside={false}
                      sides={{ top: true, bottom: true, start: true, end: true }}
                      corners={{ topStart: true, topEnd: true, bottomStart: true, bottomEnd: true }}
                      style={styles.timelineShadowContainer}
                    >
                      <View
                        style={[
                          styles.timelineSegment,
                          {
                            backgroundColor: config.color,
                            borderColor: config.borderColor,
                          },
                        ]}
                      />
                    </Shadow>
                  ) : (
                    <View style={styles.timelineSegment} />
                  )}
                </View>
                <Text style={[styles.timelineLabel, isActive && styles.timelineLabelActive]}>
                  {month}
                </Text>
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}

