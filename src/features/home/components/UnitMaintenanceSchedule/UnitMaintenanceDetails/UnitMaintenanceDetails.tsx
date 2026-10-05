import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, ListRenderItem, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { useLocalSearchParams } from 'expo-router'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import ScrollableTabBar from '@/components/ScrollableTabBar/ScrollableTabBar.component'
import {
  MaintenanceLevelCard,
  MaintenanceLevel,
} from '@/components/MaintenanceLevelCard/MaintenanceLevelCard.component'
import createStyles from './UnitMaintenanceDetails.styles'
import { getDetailRepairSchedule } from '@/core/redux/domains/maintenance'
import { RootState } from '@/core/redux/store'
import { generateYearList } from '@/core/utils/date'
import { useAppTheme } from '@/core/hooks/use-app-theme'

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
  if (
    lowerType.includes('rcm') ||
    lowerType.includes('medium') ||
    lowerType.includes('minor') ||
    lowerType.includes('trung') ||
    lowerType.includes('tiểu')
  ) {
    return 'rcm'
  }
  return 'rcm'
}

type MaintenanceItem = {
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
    activeMonths: number[]
  }
}

interface YearPickerProps {
  selectedYear: number
  onChange: (year: number) => void
  styles: ReturnType<typeof createStyles>
}

const YearPicker: React.FC<YearPickerProps> = ({ selectedYear, onChange, styles }) => {
  const [showSelectModal, setShowSelectModal] = useState(false)
  const currentYear = new Date().getFullYear()
  const years = useMemo(() => generateYearList(currentYear), [currentYear])

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
                  onChange(year)
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

function UnitMaintenanceDetails() {
  const { currentPlantId: currentPlantIdFromParams } = useLocalSearchParams<{ currentPlantId?: string | string[] }>()
  const dispatch = useAppDispatch()
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const styles = createStyles(isDark)
  const { currentPlantDetail } = useAppSelector((state: RootState) => state.unitMaintenanceScheduleSlice)

  const currentPlantId = Array.isArray(currentPlantIdFromParams)
    ? currentPlantIdFromParams[0]
    : currentPlantIdFromParams

  const effectivePlantId = currentPlantId || currentPlantDetail?.PlantCode || TABS[0]?.id || ''
  const [activeTab, setActiveTab] = useState<string>(effectivePlantId)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    if (effectivePlantId) {
      setActiveTab(effectivePlantId)
    }
  }, [effectivePlantId])

  useEffect(() => {
    if (activeTab) {
      dispatch(getDetailRepairSchedule({ currentPlantId: activeTab, year: selectedYear ?? new Date().getFullYear() }))
    }
  }, [activeTab, dispatch, selectedYear])

  const maintenanceItems = useMemo<MaintenanceItem[]>(() => {
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

  const renderItem: ListRenderItem<MaintenanceItem> = useCallback(
    ({ item }) => (
      <MaintenanceLevelCard
        title={item.title}
        level={item.level}
        planned={item.planned}
        actual={item.actual}
        timeline={item.timeline}
      />
    ),
    [],
  )

  const keyExtractor = useCallback((item: MaintenanceItem, index: number) => `${item.title}-${index}`, [])

  return (
    <ScrollView>
      <ScrollableTabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <SectionContainer title="Chi tiết hạng mục bảo dưỡng">
        <View style={{ alignItems: 'flex-end' }}>
          <YearPicker selectedYear={selectedYear} onChange={setSelectedYear} styles={styles} />
        </View>
        <View style={styles.contentContainer}>
          {maintenanceItems.length > 0 ? (
            <FlatList
              data={maintenanceItems}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              removeClippedSubviews
              initialNumToRender={6}
              windowSize={7}
              maxToRenderPerBatch={4}
              updateCellsBatchingPeriod={50}
              scrollEnabled={false}
            />
          ) : (
            <View style={{ padding: 20, alignItems: 'center' }} />
          )}
        </View>
      </SectionContainer>
    </ScrollView>
  )
}

export default React.memo(UnitMaintenanceDetails)
