import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { getProfit, getDailyAndCumulativeData, getProfitByPeriod } from '@/core/redux/domains/revenue-profit'
import { RootState } from '@/core/redux/store'
import DatePicker from '@/components/DatePicker/DatePicker.component'
import GradientCard from '@/components/GradientCard/GradientCard.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'
import dayjs from 'dayjs'
import { styles } from './ProfitDetail.styles'
import { LinearGradient } from 'expo-linear-gradient'
import { BarGroup } from '@/core/types'
import { Colors } from '@/core/constants/colors'
import BarChart from '@/components/BarChart/BarChart.component'
import { px } from '@/core/utils/scale'
import { Toast } from 'toastify-react-native'

interface ProfitDetailProps {
  plantName?: string
  plantId?: string
}

function ProfitDetail({ plantName, plantId }: ProfitDetailProps) {
  const dispatch = useAppDispatch()
  const { dailyAndCumulativeData, profitByPeriod } = useAppSelector((state: RootState) => state.revenueProfitSlice)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const [selectedDate, setSelectedDate] = useState<Date>(yesterday)
  const [range, setRange] = useState({
    from: dayjs().subtract(10, 'day'),
    to: dayjs().subtract(1, 'day'),
  })

  const onChangeDateRage = (newRange: { from: any; to: any }) => {
    const fromDate = dayjs(newRange.from)
    const toDate = dayjs(newRange.to)
    if (fromDate.isAfter(toDate)) {
      Toast.warn('Ngày bắt đầu không được sau ngày kết thúc')
      return
    }
    setRange(newRange)
  }
  useEffect(() => {
    dispatch(getProfit())
  }, [dispatch])

  useEffect(() => {
    const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY')
    dispatch(getDailyAndCumulativeData({ currentPlantId: plantId || '', date: formattedDate }))
  }, [dispatch, selectedDate, plantId])
  useEffect(() => {
    // Fetch factory profit by period when range or plantId changes
    const fromDate = dayjs(range?.from)?.format('DD/MM/YYYY')
    const toDate = dayjs(range?.to)?.format('DD/MM/YYYY')
    dispatch(
      getProfitByPeriod({
        startDate: fromDate,
        endDate: toDate,
        currentPlantId: plantId || '',
      }),
    )
  }, [dispatch, range])
  // Get month number from selectedDate (format: "DD/MM/YYYY")
  const monthNumber = dayjs(selectedDate).format('DD/MM/YYYY')?.split('/')[1] ?? new Date().getMonth() + 1
  const widthLine = '93%'
  const heightLine = 1
  const colorLine = '#7a8596'
  const lineStyle = { marginVertical: 10 }

  const profitData = profitByPeriod?.Data || []
  const values: { label: string; value: number }[] = profitData?.map((item: { Value: number; Date: string }) => ({
    label: item.Date.substring(0, 5), // Lấy ngày từ chuỗi "DD/MM/YYYY"
    value: Number(item.Value),
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
              <Text style={styles.cardValue}>{dailyAndCumulativeData.ProfitToday.Value}</Text>
              <Text style={styles.cardUnit}>{dailyAndCumulativeData.ProfitToday.Unit}</Text>
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
              <Text style={styles.cardValueYellow}>{dailyAndCumulativeData.ProfitMonth.Value}</Text>
              <Text style={styles.cardUnitYellow}>{dailyAndCumulativeData.ProfitMonth.Unit}</Text>
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
        <DateRangePicker format="DD/MM/YYYY" value={range} onChange={onChangeDateRage} mode="modal" chooseMode="day" />
        <View>
          <View style={[styles.chartWrapper]}>
            <BarChart data={rawBarGroups} rounded noOfSection={3} scrollToEnd />
          </View>
          <View style={styles.axisContainer}>
            {/* <View style={[styles.axisLabelsRow, { justifyContent: 'flex-start' }]}>
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
            </View> */}
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

export default ProfitDetail
