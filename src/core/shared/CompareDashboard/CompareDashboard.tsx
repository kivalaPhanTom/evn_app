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
  lineData2?: { value: number }[]
  range: { from: dayjs.Dayjs; to: dayjs.Dayjs }
  onChangeDateRage: (newRange: { from: dayjs.Dayjs; to: dayjs.Dayjs }) => void
  isLoading: boolean
}
const CompareDashboard = ({ data, lineData2, range, onChangeDateRage }: CompareDashboardProps, isLoading = false) => {
  const barColor = '#2563EB'
  const screenWidth = Dimensions.get('window').width
  const barsToShow = 6
  const totalPadding = px.h(30) // left + right padding
  const availableWidth = screenWidth - totalPadding
  const barSpacing = px.h(8)
  const barWidth = (availableWidth - barSpacing * (barsToShow - 1)) / barsToShow
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

  const lineData2Converted = lineData2?.map((item: any, idx: number) => ({
    id: String(idx),
    label: String(idx),
    value: typeof item === 'number' ? item : item?.value,
  }))

  return (
    <View>
      <Text style={styles.chartTitle}>So sánh công suất theo ngày</Text>
      <DateRangePicker
        labelFrom="Ngày mục tiêu"
        labelTo="Ngày so sánh"
        format={'DD/MM/YYYY'}
        value={range}
        onChange={onChangeDateRage}
        mode="modal"
        chooseMode={'day'}
      />
      <View style={styles.chartWrapper}>
        {isLoading ?
          <LineBarChartSkeleton /> :
          <BarChart
            data={barData}
            rounded
            barWidth={barWidth}
            spacing={barSpacing}
            showLine={true}
            noOfSection={4}
            rulesType="dash"
            lineColor="transparent"
            lineData2={lineData2Converted}
            lineColor2="#A78BFA"
            customDataPoint2={customDataPoint}
          />
        }
      </View>
    </View>
  )
}

export default CompareDashboard
