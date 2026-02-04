import React, { useState, useEffect, useMemo } from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useLocalSearchParams } from 'expo-router'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import ScrollableTabBar from '@/components/ScrollableTabBar/ScrollableTabBar.component'
import {
  MaintenanceLevelCard,
  MaintenanceLevel,
} from '@/components/MaintenanceLevelCard/MaintenanceLevelCard.component'
import styles from './UnitMaintenanceDetails.styles'
import { getDetailRepairSchedule } from '@/core/redux/Actions/UnitMaintenanceScheduleActions'
import { RootState } from '@/core/redux/store'

const TABS = [
  { id: 'BTS', label: 'Buôn Tua Srah' },
  { id: 'BK', label: 'Buôn Kuôp' },
  { id: 'SP3', label: 'Srepok 3' },
]

// Helper function to map Type string to MaintenanceLevel
const mapTypeToLevel = (type: string): MaintenanceLevel => {
  const lowerType = type.toLowerCase()
  if (lowerType.includes('major') || lowerType.includes('đại')) {
    return 'major'
  }
  // Map 'RCM' or any other value (medium, minor, etc.) to 'rcm'
  if (
    lowerType.includes('rcm') ||
    lowerType.includes('medium') ||
    lowerType.includes('minor') ||
    lowerType.includes('trung') ||
    lowerType.includes('tiểu')
  ) {
    return 'rcm'
  }
  // Default to rcm if unknown
  return 'rcm'
}

function UnitMaintenanceDetails() {
  const { currentPlantId: currentPlantIdFromParams } = useLocalSearchParams<{ currentPlantId?: string | string[] }>()
  const dispatch = useDispatch()
  const { currentPlantDetail } = useSelector((state: RootState) => state.unitMaintenanceScheduleSlice)

  // Normalize currentPlantId from params (handle array case)
  const currentPlantId = Array.isArray(currentPlantIdFromParams)
    ? currentPlantIdFromParams[0]
    : currentPlantIdFromParams

  // Use currentPlantId from params, or fallback to PlantCode from Redux, or first tab
  const effectivePlantId = currentPlantId || currentPlantDetail?.PlantCode || TABS[0]?.id || ''
  const [activeTab, setActiveTab] = useState<string>(effectivePlantId)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i)

  useEffect(() => {
    // Update activeTab when effectivePlantId changes
    if (effectivePlantId) {
      setActiveTab(effectivePlantId)
    }
  }, [effectivePlantId])

  useEffect(() => {
    // Call API if we have a valid currentPlantId from params
    if (activeTab) {
      dispatch(getDetailRepairSchedule({ currentPlantId: activeTab, year: selectedYear ?? new Date().getFullYear() }))
    }
    // Note: If no currentPlantId, component will use data from Redux state
    // if it was already fetched by another component
  }, [activeTab, dispatch, selectedYear])

  // Map API data to component format
  const maintenanceItems = useMemo(() => {
    if (!currentPlantDetail?.Items || currentPlantDetail.Items.length === 0) {
      return []
    }

    return currentPlantDetail.Items.map((item) => ({
      title: item.Name || '',
      level: mapTypeToLevel(item.Type || ''),
      planned: {
        days: item.PlannedDays || 0,
        startDate: item.PlannedStartDate || '',
        endDate: item.PlannedEndDate || '',
      },
      actual: {
        days: item.ActualDays || null,
        startDate: item.ActualStartDate,
        endDate: item.ActualEndDate,
      },
      timeline: {
        activeMonths: item.ActiveMonth || [],
      },
    }))
  }, [currentPlantDetail])

  return (
    <ScrollView>
      <ScrollableTabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <SectionContainer title="Chi tiết hạng mục bảo dưỡng">
        <View style={{ alignItems: 'flex-end' }}>
          {(() => {
            const YearPicker: React.FC = () => {
              const [showSelectModal, setShowSelectModal] = useState(false)

              return (
                <>
                  <TouchableOpacity style={styles.selectContainer} onPress={() => setShowSelectModal(true)}>
                    <Text style={styles.selectText}>{selectedYear}</Text>
                  </TouchableOpacity>

                  <Modal
                    visible={showSelectModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowSelectModal(false)}
                  >
                    <TouchableOpacity
                      style={styles.modalOverlay}
                      activeOpacity={1}
                      onPress={() => setShowSelectModal(false)}
                    >
                      <View style={styles.modalContent}>
                        {years.map((year) => (
                          <TouchableOpacity
                            key={year}
                            style={[styles.selectOption, selectedYear === year && styles.selectOptionActive]}
                            onPress={() => {
                              setSelectedYear(year)
                              setShowSelectModal(false)
                            }}
                          >
                            <Text
                              style={[styles.selectOptionText, selectedYear === year && styles.selectOptionTextActive]}
                            >
                              {year}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </TouchableOpacity>
                  </Modal>
                </>
              )
            }

            return <YearPicker />
          })()}
        </View>
        <View style={styles.contentContainer}>
          {maintenanceItems.length > 0 ? (
            maintenanceItems.map((item, index) => (
              <MaintenanceLevelCard
                key={`${item.title}-${index}`}
                title={item.title}
                level={item.level}
                planned={item.planned}
                actual={item.actual}
                timeline={item.timeline}
              />
            ))
          ) : (
            <View style={{ padding: 20, alignItems: 'center' }}>{/* Optional: Add loading or empty state */}</View>
          )}
        </View>
      </SectionContainer>
    </ScrollView>
  )
}

export default UnitMaintenanceDetails
