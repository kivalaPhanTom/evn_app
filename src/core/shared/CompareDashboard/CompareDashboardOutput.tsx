import React from 'react'
import { View, StyleSheet } from 'react-native'
import styles from './CompareDashboard.styles'
import { BarGroup, LineDataPoint } from '@/components/BarChartWithLines'
import { px } from '@/core/utils/scale'
import BarChart from '@/components/BarChart/BarChart.component'

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

const CompareDashboard = () => {
  const barWidth = px.h(40)
  const barSpacing = px.h(25)
  const barColor = '#2563EB'
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
  const rawBarGroups: BarGroup[] = [
    {
      label: '0h',
      items: [{ value: 50, frontColor: barColor }],
    },
    {
      label: '1h',
      items: [{ value: 45, frontColor: barColor }],
    },
    {
      label: '2h',
      items: [{ value: 40, frontColor: barColor }],
    },
    {
      label: '3h',
      items: [{ value: 95, frontColor: barColor }],
    },
    {
      label: '4h',
      items: [{ value: 30, frontColor: barColor }],
    },
    {
      label: '5h',
      items: [{ value: 75, frontColor: barColor }],
    },
    {
      label: '6h',
      items: [{ value: 60, frontColor: barColor }],
    },
    {
      label: '7h',
      items: [{ value: 55, frontColor: barColor }],
    },
    {
      label: '8h',
      items: [{ value: 70, frontColor: barColor }],
    },
    {
      label: '9h',
      items: [{ value: 85, frontColor: barColor }],
    },
    {
      label: '10h',
      items: [{ value: 90, frontColor: barColor }],
    },
    {
      label: '11h',
      items: [{ value: 78, frontColor: barColor }],
    },
    {
      label: '12h',
      items: [{ value: 65, frontColor: barColor }],
    },
    {
      label: '13h',
      items: [{ value: 50, frontColor: barColor }],
    },
    {
      label: '14h',
      items: [{ value: 40, frontColor: barColor }],
    },
    {
      label: '15h',
      items: [{ value: 82, frontColor: barColor }],
    },
    {
      label: '16h',
      items: [{ value: 88, frontColor: barColor }],
    },
    {
      label: '17h',
      items: [{ value: 33, frontColor: barColor }],
    },
    {
      label: '18h',
      items: [{ value: 66, frontColor: barColor }],
    },
    {
      label: '19h',
      items: [{ value: 59, frontColor: barColor }],
    },
    {
      label: '20h',
      items: [{ value: 47, frontColor: barColor }],
    },
    {
      label: '21h',
      items: [{ value: 52, frontColor: barColor }],
    },
    {
      label: '22h',
      items: [{ value: 61, frontColor: barColor }],
    },
    {
      label: '23h',
      items: [{ value: 69, frontColor: barColor }],
    },
  ]

  // Line màu vàng (target/threshold line) - để overlay riêng
  const lineData2: LineDataPoint[] = [
    { value: 70 },
    { value: 70 },
    { value: 70 },
    { value: 80 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
    { value: 80 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
    { value: 80 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
    { value: 70 },
    { value: 80 },
    { value: 70 },
    { value: 70 },
  ]

  return (
    <View style={styles.container}>
      <View style={localStyles.chartContainer}>
        <View style={styles.chartWrapper}>
          <BarChart
            data={rawBarGroups}
            rounded
            barWidth={barWidth}
            spacing={barSpacing}
            showLine={true}
            lineDataPointsShift={-15}
            noOfSection={4}
            rulesType="dash"
            lineColor="#A78BFA"
            customDataPoint={customDataPoint}
            lineData2={lineData2}
            lineColor2="#FBD34D"
            lineDataPointsShift2={-15}
          />
        </View>
        {/* Bar Chart với line màu hồng */}
        {/* <View style={localStyles.absoluteChart}>
          <BarChartWithLines
            data={barGroups}
            height={chartHeight}
            barWidth={barWidth}
            spacing={barSpacing}
            rounded
            barRadius={8}
            showHorizontalGrid={true}
            showYAxis={false}
            //lineData={lineData}
            //lineColor="#E879F9"
            //lineThickness={3}
            showLineDataPoints={true}
            curvedLine={true}
            useCustomDataPoint={false}
          />
        </View> */}
      </View>
    </View>
  )
}

export default CompareDashboard
