import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import styles from './CompareDashboard.styles'
import { BarGroup, LineDataPoint } from '@/components/BarChartWithLines'
import { px } from '@/core/utils/scale'
import BarChart from '@/components/BarChart/BarChart.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { getCompareProductOutput } from '@/core/redux/Actions/ProductOutputActions'

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
  lineData2?: { value: number }[]
}

const CompareDashboard = ({ data, lineData2 }: CompareDashboardProps) => {
  const dispatch = useDispatch()
  const [range, setRange] = useState({
    from: dayjs().subtract(1, 'day'),
    to: dayjs(),
  })

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

  useEffect(() => {
    dispatch(getCompareProductOutput({ 
      tagetDate: range.from.format('DD/MM/YYYY'),
      compareDate: range.to.format('DD/MM/YYYY')
    }))
  }, [dispatch])

  const onChangeDateRage = (newRange: { from: any; to: any }) => {
    setRange(newRange)
    const fromDate = dayjs(newRange.from)
    const toDate = dayjs(newRange.to)
    console.log('Selected Date Range:', { from: fromDate.format('DD/MM/YYYY'), to: toDate.format('DD/MM/YYYY') })

    if (fromDate.isAfter(toDate)) {
      return
    }

    dispatch(
      getCompareProductOutput({
        tagetDate: fromDate.format('DD/MM/YYYY'),
        compareDate: toDate.format('DD/MM/YYYY'),
      }),
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerDashboard}>So sánh sản lượng theo ngày</Text>
      <DateRangePicker
        labelFrom="Ngày mục tiêu"
        labelTo="Ngày so sánh"
        format={'DD/MM/YYYY'}
        value={range}
        onChange={onChangeDateRage}
        mode="modal"
        chooseMode={'day'}
      />
      <View style={localStyles.chartContainer}>
        <View style={styles.chartWrapper}>
          <BarChart
            data={barData}
            rounded
            barWidth={barWidth}
            spacing={barSpacing}
            showLine={true}
            // lineDataPointsShift={-15}
            noOfSection={4}
            rulesType="dash"
            // lineColor="#A78BFA"
            lineColor="transparent"
            customDataPoint2={customDataPoint}
            lineData2={lineData2Converted}
            lineColor2="#A78BFA"
            lineDataPointsShift2={0}
          />
        </View>
      </View>
    </View>
  )
}

export default CompareDashboard
