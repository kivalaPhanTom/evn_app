import React, { useState } from 'react'
import { View, Pressable, TouchableOpacity, Text, Modal } from 'react-native'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import FactoryMaintenanceInfo from './FactoryMaintenanceInfo/FactoryMaintenanceInfo'
import { t } from 'i18next'
import { router } from 'expo-router'
import styles from './FactoryMaintenanceSchedule.styles'
import { generateYearList } from '@/core/utils/date'

interface FactoryMaintenanceScheduleProps {
  currentPlantId?: string
  selectedYear: number
  setSelectedYear: (year: number) => void
}

function FactoryMaintenanceSchedule(props: FactoryMaintenanceScheduleProps) {
  const { currentPlantId, selectedYear, setSelectedYear } = props

  const currentYear = new Date().getFullYear()
  const years = generateYearList(currentYear)

  const onPressCard = () => {
    router.navigate({
      pathname: '/unit-maintenance-schedule-detail' as any,
      params: currentPlantId ? { currentPlantId } : undefined,
    })
  }

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
        <View style={{ marginBottom: 20 }}>
          <FactoryMaintenanceInfo selectedYear={selectedYear} currentPlantId={currentPlantId} />
        </View>
      </Pressable>
    </SectionContainer>
  )
}

export default FactoryMaintenanceSchedule
