import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import styles from './ProductOutputRencentDays.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import { Colors } from '@/core/constants/colors'

interface ProductionData {
  date: string
  actual: number
  contract: number
}
interface Props {
  isLoading: boolean
  productionData: ProductionData[]
  onPressCard?: any
}
function ProductOutputRencentDays(props: Props) {
  const [firstLoading, setFirstLoading] = useState(true)
  const { isLoading, productionData, onPressCard } = props
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear - 1)
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i - 1)
  const unit = 'tr.KWh'

  useEffect(() => {
    setFirstLoading(true)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      setFirstLoading(false)
    }
  }, [isLoading])

  return (
    <AnimatedCardContainer onPress={onPressCard}>
      <View style={styles.content}>
        {/* Title */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text style={styles.title}>Q 7 NGÀY GẦN NHẤT</Text>
          <TouchableOpacity onPress={onPressCard} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Thêm chi tiết</Text>
            <Text style={styles.actionButtonIcon}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.col1]}>NGÀY</Text>
          <Text style={[styles.headerText, styles.col2]}>THỰC TẾ ({unit})</Text>
          <Text style={[styles.headerText, styles.col3]}>HỢP ĐỒNG ({unit})</Text>
          <View style={styles.col4}>
            <View style={styles.samePeriodHeader}>
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
                                  style={[
                                    styles.selectOptionText,
                                    selectedYear === year && styles.selectOptionTextActive,
                                  ]}
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
          </View>
        </View>

        <View style={styles.separator} />

        {/* Table Rows */}
        <View
          style={styles.tableBody}
          // showsVerticalScrollIndicator={false}
        >
          {firstLoading || isLoading ? (
            <>
              <BarSkeleton width={'100%'} />
              <BarSkeleton width={'100%'} />
              <BarSkeleton width={'100%'} />
              <BarSkeleton width={'100%'} />
              <BarSkeleton width={'100%'} />
              <BarSkeleton width={'100%'} />
              <BarSkeleton width={'100%'} />
            </>
          ) : (
            <>
              {productionData.map((day, index) => {
                const isAboveContract = day.actual >= day.contract
                const actualColor = isAboveContract ? Colors.green : Colors.red

                return (
                  <View key={index} style={styles.rowCard}>
                    <View style={styles.tableRow}>
                      <Text style={[styles.cellText, styles.col1, styles.dateText]}>{day.date}</Text>
                      <View style={styles.col2}>
                        <Text style={[styles.cellText, styles.valueText, { color: actualColor }]}>
                          {day.actual.toFixed(1)} <Text style={styles.unitText}>{unit}</Text>
                        </Text>
                      </View>
                      <View style={styles.col3}>
                        <Text style={[styles.cellText, styles.valueText, styles.contractText]}>
                          {day.contract.toFixed(1)} <Text style={styles.unitText}>{unit}</Text>
                        </Text>
                      </View>
                      <View style={styles.col4}>
                        <Text style={[styles.cellText, styles.valueText, styles.contractText]}>--</Text>
                      </View>
                    </View>
                  </View>
                )
              })}
            </>
          )}
        </View>

        {/* Legend */}
        {/* <View style={styles.legend}>
          <Text style={styles.legendText}>Màu xanh: Đạt/vượt hợp đồng • Màu đỏ: Dưới hợp đồng</Text>
        </View> */}
      </View>
    </AnimatedCardContainer>
  )
}

export default ProductOutputRencentDays
