import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getProfit } from '@/core/redux/Actions/RevenueProfitActions'
import { RootState } from '@/core/redux/store'
import DatePicker from '@/components/DatePicker/DatePicker.component'
import GradientCard from '@/components/GradientCard/GradientCard.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'
import dayjs from 'dayjs'
import { styles } from './ProfitDetail.styles'
import { LinearGradient } from 'expo-linear-gradient'

interface ProfitDetailProps {
  plantName?: string
  plantId?: string
}

function ProfitDetail({ plantName, plantId }: ProfitDetailProps) {
  const dispatch = useDispatch()
  const { profit, isLoadingProfit } = useSelector((state: RootState) => state.revenueProfitSlice)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [range, setRange] = useState({
    from: dayjs().subtract(10, 'day'),
    to: dayjs(),
  })

  useEffect(() => {
    dispatch(getProfit())
  }, [dispatch])

  // Get month number from profit.Cumulative.Month.month (format: "2024-11")
  const monthNumber = profit.Cumulative.Month.month?.split('-')[1] ?? new Date().getMonth() + 1
  const widthLine = '93%'
  const heightLine = 1
  const colorLine = '#7a8596'
  const lineStyle = { marginVertical: 10 }

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

      {/* Two Cards Side by Side */}
      <View style={styles.cardsRow}>
        {/* Left Card - Green with Radial Gradient */}
        <GradientCard
          colors={['rgba(34, 197, 94, 0.2)', 'rgba(16, 185, 129, 0.1)']}
          locations={[0, 1]}
          angle={132.12}
          style={[styles.card, styles.leftCard]}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>LỢI NHUẬN RÒNG HÔM NAY</Text>
            <View style={styles.cardValueContainer}>
              <Text style={styles.cardValue}>{profit.Today.Value}</Text>
              <Text style={styles.cardUnit}>tỷ VNĐ</Text>
            </View>
          </View>
        </GradientCard>

        {/* Right Card - Yellow/Gold with Linear Gradient */}
        <GradientCard
          colors={['rgba(251, 191, 36, 0.2)', 'rgba(251, 191, 36, 0.1)']}
          locations={[0, 1]}
          angle={113.39}
          style={[styles.card, styles.rightCard]}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardLabelYellow}>LŨY KẾ THÁNG {monthNumber}</Text>
            <View style={styles.cardValueContainer}>
              <Text style={styles.cardValueYellow}>{profit.Cumulative.Month.Value}</Text>
              <Text style={styles.cardUnitYellow}>tỷ</Text>
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
        <DateRangePicker format="DD/MM/YYYY" value={range} onChange={setRange} mode="modal" chooseMode="day" />
      </AnimatedCardContainer>
    </ScrollView>
  )
}

export default ProfitDetail
