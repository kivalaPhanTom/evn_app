import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, ListRenderItem, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'

import { t } from 'i18next'
import createStyles from './UnitMaintenanceSchedule.styles'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { RootState } from '@/core/redux/store'
import { getRepairSchedule } from '@/core/redux/domains/maintenance'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import { generateYearList } from '@/core/utils/date'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { MaintenanceCard } from '@/components/MaintenanceCard/MaintenanceCard.component'
import { MaintenanceIcon } from '@/components/ui/maintenance-icon'
import { ScheduleIcon } from '@/components/ui/schedule-icon'
import type { RepairScheduleState } from '@/core/redux/domains/maintenance/maintenance.slice'

type MaintenanceDetail = RepairScheduleState['Details'][number]

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
        <Text allowFontScaling={false} style={styles.selectText}>
          {selectedYear}
        </Text>
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

function UnitMaintenanceSchedule() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const router = useRouter()
  const dispatch = useAppDispatch()
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const styles = createStyles(isDark)

  const [firstLoading, setFirstLoading] = useState(true)
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const { isRepairerScheduleLoading, TotalActualDay, TotalCategory, Details } = useAppSelector(
    (state: RootState) => state.unitMaintenanceScheduleSlice,
  )

  useEffect(() => {
    setFirstLoading(true)
  }, [])

  useEffect(() => {
    if (!isRepairerScheduleLoading) {
      setFirstLoading(false)
    }
  }, [isRepairerScheduleLoading])

  useEffect(() => {
    dispatch(getRepairSchedule({ year: selectedYear }))
  }, [dispatch, countRefesh, selectedYear])

  const onPressCard = useCallback(() => {
    router.navigate({ pathname: '/unit-maintenance-schedule-detail' as any })
  }, [router])

  const renderItem: ListRenderItem<MaintenanceDetail> = useCallback(
    ({ item, index }) => (
      <MaintenanceCard
        title={item.PlantName}
        status={item.Status}
        typeCount={item?.Category?.Total || 0}
        maintenanceTypeData={item.Category}
        mainternanceDurationData={item.Day}
        plantCode={item.PlantCode}
        key={index}
      />
    ),
    [],
  )

  const keyExtractor = useCallback((item: MaintenanceDetail, index: number) => `${item.PlantCode}-${index}`, [])

  return (
    <SectionContainer title={t('repairMaintenance') + ' ' + selectedYear}>
      <View style={{ alignItems: 'flex-end' }}>
        <YearPicker selectedYear={selectedYear} onChange={setSelectedYear} styles={styles} />
      </View>
      <Pressable onPress={onPressCard}>
        <View style={styles.infoContainer}>
          <View style={[styles.infoCard]}>
            <Text style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#475569', fontSize: 11, fontWeight: 600 }}>
              TỔNG HẠNG MỤC SỬA CHỮA
            </Text>
            <View style={styles.infoRow}>
              {firstLoading || isRepairerScheduleLoading ? (
                <BarSkeleton />
              ) : (
                <>
                  <Text style={{ color: isDark ? '#FFFFFF' : '#1E3A8A', fontSize: 22 }}>{TotalCategory}</Text>
                  <MaintenanceIcon color="#22D3EE" opacity={isDark ? '0.2' : '1'} width="35" height="35" />
                </>
              )}
            </View>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#475569', fontSize: 11, fontWeight: 600 }}>
              TỔNG NGÀY SỬA CHỮA THỰC TẾ
            </Text>
            <View style={styles.infoRow}>
              {firstLoading || isRepairerScheduleLoading ? (
                <BarSkeleton />
              ) : (
                <>
                  <Text style={{ color: isDark ? '#FFFFFF' : '#1E3A8A', fontSize: 22 }}>{TotalActualDay}</Text>
                  <ScheduleIcon color="#22D3EE" opacity={isDark ? '0.2' : '1'} width="35" height="35" />
                </>
              )}
            </View>
          </View>
        </View>
      </Pressable>
      <View>
        {firstLoading || isRepairerScheduleLoading ? (
          <>
            <BarSkeleton width={'100%'} />
            <BarSkeleton width={'95%'} />
            <BarSkeleton width={'90%'} />
            <BarSkeleton width={'85%'} />
            <BarSkeleton width={'80%'} />
            <BarSkeleton width={'75%'} />
          </>
        ) : (
          <FlatList
            data={Details ?? []}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            removeClippedSubviews
            initialNumToRender={4}
            windowSize={5}
            maxToRenderPerBatch={3}
            scrollEnabled={false}
          />
        )}
      </View>
    </SectionContainer>
  )
}

export default UnitMaintenanceSchedule
