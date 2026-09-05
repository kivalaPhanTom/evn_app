import React, { useState } from 'react'
import { View, Text, Dimensions } from 'react-native'
import styles from './CompareDashboard.styles'
import { px } from '@/core/utils/scale'
import BarChart from '@/components/BarChart/BarChart.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'
import dayjs from 'dayjs'
import LineBarChartSkeleton from '@/components/Skeletons/LineBarChartSkeleton'
import { LineChart } from '@/components/ChartView/LineChart.component'
import { Colors } from '@/core/constants/colors'
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
  lineData2?: { value: number; label: string }[]
  rangeCompare: { from: dayjs.Dayjs; to: dayjs.Dayjs }
  rangeTarget: { from: dayjs.Dayjs; to: dayjs.Dayjs }
  onChangeDateRangeCompare: (newRange: { from: dayjs.Dayjs; to: dayjs.Dayjs }) => void
  onChangeDateRangeTarget: (newRange: { from: dayjs.Dayjs; to: dayjs.Dayjs }) => void
  isLoading: boolean
  isCheckDisableDate?: boolean
  scrollToEnd?: boolean
}
const CompareDashboardV2 = ({
  data,
  lineData2,
  rangeCompare,
  rangeTarget,
  onChangeDateRangeCompare,
  onChangeDateRangeTarget,
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

  // T�nh offset cho line data2 d?a tr�n gi� tr? l?n nh?t c?a bar vs line
  const barMaxValue = data.length > 0 ? Math.max(...data.map((item) => item.value || 0)) : 0
  const lineMaxValue = lineData2 && lineData2.length > 0 ? Math.max(...lineData2.map((item) => item.value || 0)) : 0

  // N?u line cao hon bar, t�nh offset �m d? push line xu?ng
  // shift d?a tr�n t? l? value difference
  let lineDataPointsShift2 = 0
  if (lineMaxValue > barMaxValue) {
    const valueDiff = lineMaxValue - barMaxValue
    const ratio = valueDiff / lineMaxValue // t? l? ch�nh l?ch
    lineDataPointsShift2 = -Math.ceil(chartHeight * ratio * 0.5) // 50% c?a chi?u cao tuong ?ng v?i t? l?
  }

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

  return (
    <View>
      <View>
        <Text style={styles.chartCompareByTime}>Ng�y so s�nh</Text>
        <DateRangePicker
          format={'DD/MM/YYYY'}
          value={rangeCompare}
          onChange={onChangeDateRangeCompare}
          mode="modal"
          chooseMode={'day'}
          isCheckDisableDate={isCheckDisableDate}
        />
      </View>
      <View>
        <Text style={styles.chartCompareByTime}>Ng�y m?c ti�u</Text>
        <DateRangePicker
          format={'DD/MM/YYYY'}
          value={rangeTarget}
          onChange={onChangeDateRangeTarget}
          mode="modal"
          chooseMode={'day'}
          isCheckDisableDate={isCheckDisableDate}
        />
      </View>
      <View style={styles.chartWrapper}>
        {isLoading ? (
          <LineBarChartSkeleton height={150} />
        ) : (
          <LineChart
            data={data}
            data2={lineData2}
            height={px(200)}
            color={'#4975B3'}
            color2="#A78BFA"
            areaChart={false}
            hideYAxisText={true}
            scrollToEnd={true}
          />
        )}
      </View>
    </View>
  )
}

export default CompareDashboardV2
