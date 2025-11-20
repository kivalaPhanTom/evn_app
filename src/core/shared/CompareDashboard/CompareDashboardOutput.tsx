import React from 'react'
import { View, StyleSheet } from 'react-native'
import styles from './CompareDashboard.styles'
import BarChartWithLines, { BarGroup, LineDataPoint } from '@/components/BarChartWithLines'
import { LineChart } from 'react-native-gifted-charts'
import { px } from '@/core/utils/scale'

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
  const chartHeight = px.v(200)
  const maxValue = 120
  const barWidth = px.h(40)
  const barSpacing = px.h(25)
  const initialSpacing = px.h(32)

  // Data sử dụng BarGroup format giống BarChart.component.tsx
  const barGroups: BarGroup[] = [
    { label: '0h', items: [{ value: 98, frontColor: '#5B9FED' }] },
    { label: '1h', items: [{ value: 95, frontColor: '#5B9FED' }] },
    { label: '2h', items: [{ value: 102, frontColor: '#5B9FED' }] },
    { label: '3h', items: [{ value: 97, frontColor: '#5B9FED' }] },
    { label: '4h', items: [{ value: 108, frontColor: '#5B9FED' }] },
    { label: '5h', items: [{ value: 100, frontColor: '#5B9FED' }] },
  ]

  // Line màu hồng/tím (comparison line)
  const lineData: LineDataPoint[] = [
    { value: 85, dataPointColor: '#E879F9' },
    { value: 80, dataPointColor: '#E879F9' },
    { value: 88, dataPointColor: '#E879F9' },
    { value: 82, dataPointColor: '#E879F9' },
    { value: 95, dataPointColor: '#E879F9' },
    { value: 87, dataPointColor: '#E879F9' },
  ]

  // Line màu vàng (target/threshold line) - để overlay riêng
  const lineData2: LineDataPoint[] = [
    { value: 105 },
    { value: 105 },
    { value: 105 },
    { value: 105 },
    { value: 105 },
    { value: 105 },
  ]

  return (
    <View style={styles.container}>
      <View style={localStyles.chartContainer}>
        {/* Bar Chart với line màu hồng */}
        <View style={localStyles.absoluteChart}>
          <BarChartWithLines
            data={barGroups}
            height={chartHeight}
            barWidth={barWidth}
            spacing={barSpacing}
            rounded
            barRadius={8}
            showHorizontalGrid={true}
            showYAxis={false}
            lineData={lineData}
            lineColor="#E879F9"
            lineThickness={3}
            showLineDataPoints={true}
            curvedLine={true}
            useCustomDataPoint={false}
          />
        </View>

        {/* Yellow line overlay - căn chỉnh để line đi qua giữa các bar */}
        <View style={[localStyles.absoluteChart, localStyles.lineOverlay]} pointerEvents="none">
          <LineChart
            data={lineData2}
            height={chartHeight}
            maxValue={maxValue}
            noOfSections={4}
            hideDataPoints={false}
            dataPointsHeight={10}
            dataPointsWidth={10}
            dataPointsRadius={5}
            dataPointsColor="#FBD34D"
            thickness={3}
            color="#FBD34D"
            curved={false}
            hideYAxisText
            hideRules
            hideAxesAndRules
            initialSpacing={initialSpacing + barWidth / 2}
            spacing={barWidth + barSpacing}
            yAxisColor="transparent"
            xAxisColor="transparent"
            isAnimated
          />
        </View>
      </View>
    </View>
  )
}

export default CompareDashboard
