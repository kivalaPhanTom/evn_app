import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styles from './CompareDashboard.styles'
import { BarGroup, LineDataPoint } from '@/components/BarChartWithLines'
import { px } from '@/core/utils/scale'
import BarChart from '@/components/BarChart/BarChart.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'
import dayjs from 'dayjs'
import { getCompareProductOutput } from '@/core/redux/Actions/ProductOutputActions'
import LineBarChartSkeleton from '@/components/Skeletons/LineBarChartSkeleton'
import { RootState } from '@/core/redux/store'

const localStyles = StyleSheet.create({
  chartContainer: {
    position: 'relative',
    width: '100%',
    height: px.v(200),
  },
  absoluteChart: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  lineOverlay: {
    zIndex: 10,
  },
  dataPoint: {
    width: 10,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataPointInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 2,
  },
})

interface CompareDashboardProps {
  data: { value: number; label: string }[]
  lineData?: number[]
  lineData2?: { value: number }[]
  currentPlantId?: string
  isCheckDisableDate: boolean
}

const CompareDashboard = ({ data, lineData, lineData2, currentPlantId, isCheckDisableDate }: CompareDashboardProps) => {
  const dispatch = useDispatch()
  const [range, setRange] = useState({
    from: dayjs().subtract(1, 'day'),
    to: dayjs(),
  })
  const { countRefesh } = useSelector((state: any) => state.refreshSlice)
  const { isLoadingCompareProductOutput } = useSelector((state: RootState) => state.productOutputSlice)
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

  const customDataPointContract = (
    <View
      style={{
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FBBF24',
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

  // Data sử dụng BarGroup format giống BarChart.component.tsx
  const convertData = data?.map((item) => ({
    label: item.label,
    items: [item.value],
  }))

  const barData: BarGroup[] = convertData.map((item) => ({
    label: item.label,
    items: [
      {
        value: item.items[0],
        frontColor: barColor,
      },
    ],
  }))

  const lineData2Converted = lineData2?.map((item: any) => ({
    value: item,
  }))

  const lineData1Converted = data?.map((_, index) => ({
    value: lineData?.[index] ?? 0,
  }))

  useEffect(() => {
    dispatch(
      getCompareProductOutput({
        tagetDate: range.to.format('DD/MM/YYYY'),
        compareDate: range.from.format('DD/MM/YYYY'),
        currentPlantId: currentPlantId || '',
      }),
    )
  }, [dispatch, countRefesh])

  const onChangeDateRage = (newRange: { from: any; to: any }) => {
    setRange(newRange)
    const fromDate = dayjs(newRange.from)
    const toDate = dayjs(newRange.to)

    dispatch(
      getCompareProductOutput({
        tagetDate: fromDate.format('DD/MM/YYYY'),
        compareDate: toDate.format('DD/MM/YYYY'),
        currentPlantId: currentPlantId || '',
      }),
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerDashboard}>So sánh sản lượng theo ngày</Text>
      <DateRangePicker
        labelFrom="Ngày so sánh"
        labelTo="Ngày mục tiêu"
        format={'DD/MM/YYYY'}
        value={range}
        onChange={onChangeDateRage}
        mode="modal"
        chooseMode={'day'}
        allowToBeforeFrom={true}
        isCheckDisableDate={isCheckDisableDate}
      />
      <View style={localStyles.chartContainer}>
        {isLoadingCompareProductOutput ? (
          <LineBarChartSkeleton height={150} />
        ) : (
          <View style={styles.chartWrapper}>
            <BarChart
              data={barData}
              rounded
              barWidth={barWidth}
              spacing={barSpacing}
              showLine={true}
              lineDataPointsShift={-15}
              noOfSection={4}
              rulesType="dash"
              // lineColor="#A78BFA"
              lineColor="transparent"
              lineData1={lineData1Converted}
              lineColor1="#FBBF24"
              lineDataPointsShift1={0}
              customDataPoint1={customDataPointContract}
              customDataPoint2={customDataPoint}
              // lineData={lineData}
              lineData2={lineData2Converted}
              lineColor2="#A78BFA"
              lineDataPointsShift2={0}
              scrollToEnd
            />
          </View>
        )}
      </View>
    </View>
  )
}

export default CompareDashboard
