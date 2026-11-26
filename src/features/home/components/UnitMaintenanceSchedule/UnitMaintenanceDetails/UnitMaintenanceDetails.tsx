import { usePlantSelection } from '@/core/hooks/use-plant-selection'
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

  const { tabs, currentPlantId: activeTab, selectPlant } = usePlantSelection(currentPlantId)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    if (activeTab) {
      dispatch(getDetailRepairSchedule({ currentPlantId: activeTab, year: selectedYear ?? new Date().getFullYear() }))
    }
  }, [activeTab, dispatch, selectedYear])

  const maintenanceItems = useMemo<MaintenanceItem[]>(() => {
    if (!currentPlantDetail?.items || currentPlantDetail.items.length === 0) {
      return []
    }

    return currentPlantDetail.items.map((item) => ({
      title: item.name || '',
      level: mapTypeToLevel(item.type || ''),
      planned: {
        days: item.plannedDays || 0,
        startDate: item.plannedStartDate || '',
        endDate: item.plannedEndDate || '',
      },
      actual: {
        days: item.actualDays || null,
        startDate: item.actualStartDate,
        endDate: item.actualEndDate,
      },
      timeline: {
        activeMonths: item.activeMonth || [],
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
      <ScrollableTabBar tabs={tabs} activeTab={activeTab} onTabChange={selectPlant} />
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
