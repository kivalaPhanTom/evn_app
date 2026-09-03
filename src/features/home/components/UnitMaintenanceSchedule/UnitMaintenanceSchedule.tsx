import React, { useState, useEffect } from 'react'
import { Text, View, Pressable, TouchableOpacity, Modal } from 'react-native'
import { useRouter } from 'expo-router'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'

import { Image } from 'expo-image'
import { icons } from '@/assets'
import styles from './UnitMaintenanceSchedule.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { MaintenanceCard } from '@/components/MaintenanceCard/MaintenanceCard.component'
import { MaintenanceIcon } from '@/components/ui/maintenance-icon'
import { ScheduleIcon } from '@/components/ui/schedule-icon'
import { t } from 'i18next'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { RootState } from '@/core/redux/store'
import { getRepairSchedule } from '@/core/redux/domains/maintenance'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import { generateYearList } from '@/core/utils/date'

function UnitMaintenanceSchedule() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const router = useRouter()
  const dispatch = useAppDispatch()

  const currentYear = new Date().getFullYear()
  const years = generateYearList(currentYear)

  const onPressCard = () => {
    router.navigate({ pathname: '/unit-maintenance-schedule-detail' as any })
  }
  const [firstLoading, setFirstLoading] = useState(true)
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const { isRepairerScheduleLoading, TotalActualDay, TotalCategory, TotalMajorCategory, TotalRCMCategory, Details } =
    useAppSelector((state: RootState) => state.unitMaintenanceScheduleSlice)
  useEffect(() => {
    setFirstLoading(true)
  }, [])

  useEffect(() => {
    if (!isRepairerScheduleLoading) {
      setFirstLoading(false)
    }
  }, [isRepairerScheduleLoading])
  useEffect(() => {
    // Dispatch action to fetch repair schedule data
    dispatch(getRepairSchedule({ year: selectedYear }))
  }, [dispatch, countRefesh, selectedYear])

  return (
    <SectionContainer title={t('repairMaintenance') + ' ' + selectedYear}>
      <View style={{ alignItems: 'flex-end' }}>
        {(() => {
          const YearPicker: React.FC = () => {
            const [showSelectModal, setShowSelectModal] = useState(false)

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
      <Pressable onPress={onPressCard}>
        <View style={styles.infoContainer}>
          <View style={[styles.infoCard]}>
            <Text style={{ color: 'rgb(255,255,255, 0.5)', fontSize: 11, fontWeight: 600 }}>
              TỔNG HẠNG MỤC SỬA CHỮA
            </Text>
            <View style={styles.infoRow}>
              {firstLoading || isRepairerScheduleLoading ? (
                <BarSkeleton />
              ) : (
                <>
                  <Text style={{ color: 'rgb(255,255,255)', fontSize: 22 }}>{TotalCategory}</Text>
                  <MaintenanceIcon color="#22D3EE" opacity="0.2" width="35" height="35" />
                </>
              )}
            </View>
          </View>
          <View style={styles.infoCard}>
            <Text style={{ color: 'rgb(255,255,255, 0.5)', fontSize: 11, fontWeight: 600 }}>
              TỔNG NGÀY SỬA CHỮA THỰC TẾ
            </Text>
            <View style={styles.infoRow}>
              {firstLoading || isRepairerScheduleLoading ? (
                <BarSkeleton />
              ) : (
                <>
                  <Text style={{ color: 'rgb(255,255,255)', fontSize: 22 }}>{TotalActualDay}</Text>
                  <ScheduleIcon color="#22D3EE" opacity="0.2" width="35" height="35" />
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
          <>
            {Details?.map((item, idex) => (
              <MaintenanceCard
                title={item.PlantName}
                status={item.Status}
                typeCount={item?.Category?.Total || 0}
                maintenanceTypeData={item.Category}
                mainternanceDurationData={item.Day}
                plantCode={item.PlantCode}
                key={idex}
              />
            ))}
          </>
        )}
      </View>
    </SectionContainer>
  )
}

export default UnitMaintenanceSchedule
