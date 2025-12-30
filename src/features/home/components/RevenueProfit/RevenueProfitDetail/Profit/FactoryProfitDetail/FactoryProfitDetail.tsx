import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getProfit } from '@/core/redux/Actions/RevenueProfitActions'
import { RootState } from '@/core/redux/store'
import DatePicker from '@/components/DatePicker/DatePicker.component'
import GradientCard from '@/components/GradientCard/GradientCard.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'
import dayjs from 'dayjs'
import { styles } from './FactoryProfitDetail.styles'
import { LinearGradient } from 'expo-linear-gradient'

function FactoryProfitDetail() {
  const dispatch = useDispatch()
  const { profit, isLoadingProfit } = useSelector((state: RootState) => state.revenueProfitSlice)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [range, setRange] = useState({
    from: dayjs().subtract(10, 'day'),
    to: dayjs(),
  })
  const [selectedOption, setSelectedOption] = useState<string>('Tổng')
  const [showSelectModal, setShowSelectModal] = useState(false)
  
  const selectOptions = ['Tổng', 'BTS', 'BK', 'SP3']

  useEffect(() => {
    dispatch(getProfit())
  }, [dispatch])

  // Get month number from profit.Cumulative.Month.month (format: "2024-11")
  const monthNumber = profit.Cumulative.Month.month?.split('-')[1] ?? new Date().getMonth() + 1
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
              <Text style={[styles.cardValue, { color: valueColor }]}>{profit.Today.Value}</Text>
              <Text style={[styles.cardUnit, { color: valueColor }]}>tỷ VNĐ</Text>
            </View>
            {/* Plant Breakdown */}
            <View style={styles.plantBreakdown}>
              {profit.Breakdown.map((plant, idx) => {
                const plantColor = plantColors[idx] || plant.Color
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
                  <Text style={styles.cardValueLeft}>{profit.Cumulative.Month.Value}</Text>
                  <Text style={styles.cardUnitLeft}>tỷ</Text>
                </View>
              </View>
              <View style={styles.plantBreakdownHorizontal}>
                {profit.Breakdown.map((plant, idx) => {
                  const plantColor = plantColors[idx] || plant.Color
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
        <TouchableOpacity
          style={styles.selectContainer}
          onPress={() => setShowSelectModal(true)}
        >
          <Text style={styles.selectText}>{selectedOption}</Text>
        </TouchableOpacity>
        <Modal visible={showSelectModal} transparent animationType="fade" onRequestClose={() => setShowSelectModal(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowSelectModal(false)}
          >
            <View style={styles.modalContent}>
              {selectOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.selectOption,
                    selectedOption === option && styles.selectOptionActive,
                  ]}
                  onPress={() => {
                    setSelectedOption(option)
                    setShowSelectModal(false)
                  }}
                >
                  <Text
                    style={[
                      styles.selectOptionText,
                      selectedOption === option && styles.selectOptionTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
        <DateRangePicker format="DD/MM/YYYY" value={range} onChange={setRange} mode="modal" chooseMode="day" />
      </AnimatedCardContainer>
    </ScrollView>
  )
}

export default FactoryProfitDetail
