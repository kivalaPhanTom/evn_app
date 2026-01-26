import React, { useState } from 'react'
import { View, Text, Dimensions } from 'react-native'
import styles from './CompareDashboard.styles'
import { px } from '@/core/utils/scale'
import BarChart from '@/components/BarChart/BarChart.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'
import dayjs from 'dayjs'
import LineBarChartSkeleton from '@/components/Skeletons/LineBarChartSkeleton'
interface BarGroup {
  label: string
  items: {
    value: number
    frontColor?: string
    showValuesOnTop?: boolean
  }[]
}

interface CompareDashboardProps {
  data: { value: number; label: string }[]
  lineData2?: { value: number; id: number; label: string }[]
  range: { from: dayjs.Dayjs; to: dayjs.Dayjs }
  onChangeDateRage: (newRange: { from: dayjs.Dayjs; to: dayjs.Dayjs }) => void
  isLoading: boolean
  isCheckDisableDate?: boolean
  scrollToEnd?: boolean
}
const CompareDashboard = ({
  data,
  lineData2,
  range,
  onChangeDateRage,
  isCheckDisableDate,
  isLoading = false,
  scrollToEnd = false,
}: CompareDashboardProps) => {
  const barColor = '#2563EB'
  const screenWidth = Dimensions.get('window').width
  const barsToShow = 6
  const totalPadding = px.h(30) // left + right padding
  const availableWidth = screenWidth - totalPadding
  const barSpacing = px.h(8)
  const barWidth = (availableWidth - barSpacing * (barsToShow - 1)) / barsToShow
  const chartHeight = px.v(150)

  // Tính offset cho line data2 dựa trên giá trị lớn nhất của bar vs line
  const barMaxValue = data.length > 0 ? Math.max(...data.map((item) => item.value || 0)) : 0
  const lineMaxValue = lineData2 && lineData2.length > 0 ? Math.max(...lineData2.map((item) => item.value || 0)) : 0

  // Nếu line cao hơn bar, tính offset âm để push line xuống
  // shift dựa trên tỷ lệ value difference
  let lineDataPointsShift2 = 0
  if (lineMaxValue > barMaxValue) {
    const valueDiff = lineMaxValue - barMaxValue
    const ratio = valueDiff / lineMaxValue // tỷ lệ chênh lệch
    lineDataPointsShift2 = -Math.ceil(chartHeight * ratio * 0.5) // 50% của chiều cao tương ứng với tỷ lệ
  }
  console.log('lineMaxValue:', lineMaxValue, 'barMaxValue:', barMaxValue, 'lineDataPointsShift2:', lineDataPointsShift2)

  const customDataPoint = (
    <View
      style={{
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#A78BFA',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -5,
        marginTop: -5,
      }}
    >
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: '#FFFFFF',
        }}
      />
    </View>
  )

  const convertData = data?.map((item) => ({
    label: item.label,
    items: [item.value],
  }))

  const barData: BarGroup[] = convertData.map((item, idx) => ({
    id: idx,
    label: item.label,
    items: [
      {
        value: item.items[0],
        frontColor: barColor,
      },
    ],
  }))
  return (
    <View>
      <Text style={styles.chartTitle}>So sánh công suất theo ngày</Text>
      <DateRangePicker
        labelFrom="Ngày so sánh"
        labelTo="Ngày mục tiêu"
        format={'DD/MM/YYYY'}
        value={range}
        onChange={onChangeDateRage}
        mode="modal"
        chooseMode={'day'}
        isCheckDisableDate={isCheckDisableDate}
      />
      <View style={styles.chartWrapper}>
        {isLoading ? (
          <LineBarChartSkeleton height={150} />
        ) : (
          <BarChart
            data={barData}
            rounded
            barWidth={barWidth}
            spacing={barSpacing}
            showLine={true}
            noOfSection={4}
            rulesType="dash"
            lineColor="transparent"
            lineData2={lineData2}
            lineColor2="#A78BFA"
            lineDataPointsShift2={lineDataPointsShift2}
            customDataPoint2={customDataPoint}
            scrollToEnd={scrollToEnd}
          />
        )}
      </View>
    </View>
  )
}

export default CompareDashboard
