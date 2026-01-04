import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getProfit, getDailyAndCumulativeData } from '@/core/redux/Actions/RevenueProfitActions'
import { RootState } from '@/core/redux/store'
import DatePicker from '@/components/DatePicker/DatePicker.component'
import GradientCard from '@/components/GradientCard/GradientCard.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'
import dayjs from 'dayjs'
import { styles } from './FactoryProfitDetail.styles'
import { LinearGradient } from 'expo-linear-gradient'
import { BarGroup } from '@/core/types'
import { Colors } from '@/core/constants/colors'
import BarChart from '@/components/BarChart/BarChart.component'
import { px } from '@/core/utils/scale'
import { useLocalSearchParams } from 'expo-router'

function FactoryProfitDetail() {
  const dispatch = useDispatch()
  const { profit, dailyAndCumulativeData } = useSelector((state: RootState) => state.revenueProfitSlice)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [range, setRange] = useState({
    from: dayjs().subtract(10, 'day'),
    to: dayjs(),
  })
  const [selectedOption, setSelectedOption] = useState<string>('Tổng')
  const [showSelectModal, setShowSelectModal] = useState(false)

  const { currentPlantId } = useLocalSearchParams<{
    currentPlantId?: string
  }>()
  const plantId = currentPlantId || ''

  const selectOptions = ['Tổng', 'BTS', 'BK', 'SP3']

  useEffect(() => {
    dispatch(getProfit())
  }, [dispatch])

  useEffect(() => {
    const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY')
    dispatch(getDailyAndCumulativeData({ currentPlantId: plantId, date: formattedDate }))
  }, [dispatch, selectedDate, plantId])

  // Get month number from selectedDate (format: "DD/MM/YYYY")
  const monthNumber = dayjs(selectedDate).format('DD/MM/YYYY')?.split('/')[1] ?? new Date().getMonth() + 1
  const widthLine = '93%'
  const heightLine = 1
  const colorLine = '#7a8596'
  const lineStyle = { marginVertical: 10 }

  // Check if profit is negative (loss)
  const isLoss = profit.Today.Value < 0
  const cardColors = isLoss
    ? (['rgba(249, 115, 22, 0.2)', 'rgba(239, 68, 68, 0.1)'] as const)
    : (['rgba(34, 197, 94, 0.2)', 'rgba(16, 185, 129, 0.1)'] as const)
  const labelColor = isLoss ? '#F97316' : '#22C55E'
  const valueColor = isLoss ? '#EF4444' : '#10B981'

  // Plant colors mapping
  const plantColors = ['#A78BFA', '#4ADE80', '#22D3EE']

  const profitData = [
    {
      Date: '2025-12-21',
      value: 13.03,
    },
    {
      Date: '2025-12-22',
      value: 0.55,
    },
    {
      Date: '2025-12-23',
      value: -1,
    },
    {
      Date: '2025-12-24',
      value: 0.54,
    },
    {
      Date: '2025-12-25',
      value: 0.56,
    },
    {
      Date: '2025-12-26',
      value: 0.51,
    },
    {
      Date: '2025-12-27',
      value: 0.49,
    },
  ]
  const values: { label: string; value: number }[] = profitData?.map((item: { value: number }) => ({
    label: '',
    value: Number(item.value),
  }))
  const rawBarGroups: BarGroup[] = values.map(({ label, value }: { label: string; value: number }) => ({
    label,
    items: [
      {
        value,
        frontColor: value < 0 ? Colors.red : Colors.green,
        showValuesOnTop: true,
        showPrefix: value > 0,
      },
    ],
  }))
  const today = new Date()
  const formatDay = (d: Date) => `${String(d.getDate()).padStart(2, '0')}`
  const formatDayWithMonth = (d: Date) =>
    `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
  const endDate = new Date(today)
  endDate.setDate(today.getDate() - 1) //
  const xAxisLabels = values.map((_, idx) => {
    const d = new Date(endDate)
    d.setDate(endDate.getDate() - (values.length - 1 - idx))
    return formatDayWithMonth(d)
  })

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Date Picker */}
      <View style={styles.datePickerContainer}>
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          format="DD/MM/YYYY"
          textColor="#fff"
          borderColor="rgba(255,255,255,0.15)"
          backgroundColor="rgba(26, 35, 50, 0.6)"
        />
      </View>

      {/* Card - Radial Gradient */}
      <View style={styles.cardsRow}>
        <GradientCard colors={cardColors} locations={[0, 1]} angle={132.12} style={[styles.card, styles.fullWidthCard]}>
          <View style={styles.cardContent}>
            <Text style={[styles.cardLabel, { color: labelColor }]}>LỢI NHUẬN RÒNG HÔM NAY</Text>
            <View style={styles.cardValueContainer}>
              <Text style={[styles.cardValue, { color: valueColor }]}>{dailyAndCumulativeData.ProfitToday.Value}</Text>
              <Text style={[styles.cardUnit, { color: valueColor }]}>{dailyAndCumulativeData.ProfitToday.Unit}</Text>
            </View>
            {/* Plant Breakdown */}
            <View style={styles.plantBreakdown}>
              {dailyAndCumulativeData.ByPlantToday.map((plant, idx) => {
                const plantColor = plantColors[idx] || '#A78BFA'
                return (
                  <Text key={idx} style={[styles.plantItem, { color: plantColor }]}>
                    {plant.PlantName}: {plant.Value} tỷ
                  </Text>
                )
              })}
            </View>
          </View>
        </GradientCard>
      </View>

      <View style={[styles.lineContainer, lineStyle]}>
        <LinearGradient
          colors={[`${colorLine}00`, `${colorLine}AA`, `${colorLine}00`]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          locations={[0, 0.5, 1]}
          style={[styles.gradientLine, { width: widthLine, height: heightLine }]}
        />
      </View>

      {/* Card - Cumulative Month (Above) */}
      <View style={styles.cardsRow}>
        <GradientCard
          colors={['rgba(245, 158, 11, 0.2)', 'rgba(234, 179, 8, 0.1)']}
          locations={[0, 1]}
          angle={132.12}
          style={[styles.card, styles.fullWidthCard]}
        >
          <View style={styles.cardContentVertical}>
            <Text style={styles.cardLabelCumulative}>LŨY KẾ THÁNG {monthNumber}</Text>
            <View style={styles.cardContentHorizontal}>
              <View style={styles.cardValueContainerLeft}>
                <View style={styles.cardValueRowLeft}>
                  <Text style={styles.cardValueLeft}>{dailyAndCumulativeData.ProfitMonth.Value}</Text>
                  <Text style={styles.cardUnitLeft}>{dailyAndCumulativeData.ProfitMonth.Unit}</Text>
                </View>
              </View>
              <View style={styles.plantBreakdownHorizontal}>
                {dailyAndCumulativeData.ByPlantMonth.map((plant, idx) => {
                  const plantColor = plantColors[idx] || '#A78BFA'
                  return (
                    <Text key={idx} style={[styles.plantItem, { color: plantColor }]}>
                      {plant.PlantName}: {plant.Value} tỷ
                    </Text>
                  )
                })}
              </View>
            </View>
          </View>
        </GradientCard>
      </View>
      <View style={[styles.lineContainer, lineStyle]}>
        <LinearGradient
          colors={[`${colorLine}00`, `${colorLine}AA`, `${colorLine}00`]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          locations={[0, 0.5, 1]}
          style={[styles.gradientLine, { width: widthLine, height: heightLine }]}
        />
      </View>

      {/* Lãi/Lỗ theo thời gian */}
      <AnimatedCardContainer>
        <Text style={styles.profitTimeTitle}>Lãi/Lỗ theo thời gian</Text>
        <TouchableOpacity style={styles.selectContainer} onPress={() => setShowSelectModal(true)}>
          <Text style={styles.selectText}>{selectedOption}</Text>
        </TouchableOpacity>
        <Modal
          visible={showSelectModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowSelectModal(false)}
        >
          <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowSelectModal(false)}>
            <View style={styles.modalContent}>
              {selectOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.selectOption, selectedOption === option && styles.selectOptionActive]}
                  onPress={() => {
                    setSelectedOption(option)
                    setShowSelectModal(false)
                  }}
                >
                  <Text style={[styles.selectOptionText, selectedOption === option && styles.selectOptionTextActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
        <DateRangePicker format="DD/MM/YYYY" value={range} onChange={setRange} mode="modal" chooseMode="day" />
        <View>
          <View style={[styles.chartWrapper]}>
            <BarChart data={rawBarGroups} rounded noOfSection={3} disableScroll />
          </View>
          <View style={styles.axisContainer}>
            <View style={[styles.axisLabelsRow, { justifyContent: 'flex-start' }]}>
              {xAxisLabels.map((label, idx) => {
                const isToday = idx === xAxisLabels.length - 1
                const isNegative = values[idx].value < 0
                const color = isToday ? '#8b92a0' : isNegative ? Colors.red : '#8b92a0'
                return (
                  <View key={idx} style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={[styles.axisLabel, { color }]}>{label}</Text>
                  </View>
                )
              })}
            </View>
            <View style={styles.axisDivider} />
            {/* Legend */}
            <View style={styles.legendRow}>
              <View style={[styles.legendItem]}>
                <View style={[styles.legendSwatch, { backgroundColor: Colors.green }]} />
                <Text style={styles.legendText}>Lãi</Text>
              </View>
              <View style={[styles.legendItem, { marginLeft: px.h(24) }]}>
                <View style={[styles.legendSwatch, { backgroundColor: Colors.red }]} />
                <Text style={styles.legendText}>Lỗ</Text>
              </View>
            </View>
          </View>
        </View>
      </AnimatedCardContainer>
    </ScrollView>
  )
}

export default FactoryProfitDetail
