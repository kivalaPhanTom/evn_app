import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { px } from '@/core/utils/scale'
import styles from './ProductOutputRencentDays.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import { Colors } from '@/core/constants/colors'
import { LineChart } from '@/components/ChartView/LineChart.component'
import CompareLegend from '@/core/shared/CompareLegend'
import { LineChartSkeleton } from '../Skeletons/LineChartSkeleton'

interface ProductionData {
  date: string
  dayOfWeek: string
  actual: number
  contract: number
  samePeriod?: number
}
interface Props {
  isLoading: boolean
  productionData: ProductionData[]
  onPressCard: any
  selectedYear: number
  setSelectedYear: (year: number) => void
}
interface LegendItemData {
  type: 'box' | 'line'
  color?: string
  label: string
}
function ProductOutputRencentDays(props: Props) {
  const [firstLoading, setFirstLoading] = useState(true)
  const { isLoading, productionData, onPressCard, selectedYear, setSelectedYear } = props
  const currentYear = new Date().getFullYear()
  // 
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i - 1)
  const unit = 'tr.KWh'
  const dataActual = productionData.map((item) => ({
    value: item.actual,
    label: item.date,
  }))
  const contractData = productionData.map((item) => ({
    value: item.contract,
    label: item.date,
  }))
  const samePeriodData = productionData.map((item) => ({
    value: item.samePeriod ?? 0,
    label: item.date,
  }))
  const lineChartData = dataActual

  useEffect(() => {
    setFirstLoading(true)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      setFirstLoading(false)
    }
  }, [isLoading])
  const legendItems: LegendItemData[] = [
    { type: 'line', label: 'Thực tế', color: Colors.green },
    { type: 'line', label: 'Hợp đồng', color: '#eab308' },
    { type: 'line', label: 'Cùng kỳ', color: '#7a8596' },
  ]
  return (
    <AnimatedCardContainer onPress={onPressCard}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>A 7 NGÀY GẦN NHẤT</Text>

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
              <BarSkeleton width="100%" />
            </>
          ) : (
            <>
              {productionData.map((day, index) => {
                const isAboveContract = day.actual >= day.contract
                const actualColor = isAboveContract ? Colors.green : Colors.red
                const isWeekend =
                  day.dayOfWeek.toLowerCase() === 'thứ bảy' || day.dayOfWeek.toLowerCase() === 'chủ nhật'
                return (
                  <View key={index} style={styles.rowCard}>
                    <View style={styles.tableRow}>
                      <Text style={[styles.cellText, styles.col1, styles.dateText, isWeekend && styles.weekendText,]}>
                        {day.date}
                        {'\n'}
                        <Text style={styles.dayOfWeek}>
                          {day.dayOfWeek}
                        </Text>
                      </Text>
                      <View style={styles.col2}>
                        <Text style={[styles.cellText, styles.valueText, { color: actualColor }]}>
                          {day.actual.toFixed(2)} <Text style={styles.unitText}></Text>
                        </Text>
                      </View>
                      <View style={styles.col3}>
                        <Text style={[styles.cellText, styles.valueText, styles.contractText]}>
                          {day.contract.toFixed(2)} <Text style={styles.unitText}></Text>
                        </Text>
                      </View>
                      <View style={styles.col3}>
                        <Text style={[styles.cellText, styles.valueText, styles.samePeriodText]}>
                          {day.samePeriod != null ? day.samePeriod.toFixed(2) : '--'}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              })}
            </>
          )}
        </View>

        {firstLoading || isLoading ?
          <View style={{ marginTop: 20 }}>
            <LineChartSkeleton />
          </View>
          :
          <View>
            <CompareLegend items={legendItems} />
            <LineChart
              data={dataActual}
              data2={contractData}
              data3={samePeriodData}
              color={Colors.green}
              color2={'#eab308'}
              color3={'#7a8596'}
              areaChart={false}
              hideYAxisText={true}
              marginLeftXLabel={20}
            />
          </View>
        }
        {/* Legend */}
        {/* <View style={styles.legend}>
          <Text style={styles.legendText}>Màu xanh: Đạt/vượt hợp đồng • Màu đỏ: Dưới hợp đồng</Text>
        </View> */}
      </View>
    </AnimatedCardContainer>
  )
}

export default ProductOutputRencentDays
