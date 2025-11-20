import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import styles from './CompareDashboard.styles'
import { px } from '@/core/utils/scale'
import BarChart from '@/components/BarChart/BarChart.component'
interface BarGroup {
  label: string
  items: {
    value: number
    frontColor?: string
    showValuesOnTop?: boolean
  }[]
}
const CompareDashboard = () => {
  const barColor = '#2563EB'
  const screenWidth = Dimensions.get('window').width
  const barsToShow = 6
  const totalPadding = px.h(30) // left + right padding
  const availableWidth = screenWidth - totalPadding
  const barSpacing = px.h(8)
  const barWidth = (availableWidth - barSpacing * (barsToShow - 1)) / barsToShow

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
    {
      label: '24h',
      items: [{ value: 56, frontColor: barColor }],
    },
  ]

  return (
    <View>
      <Text style={styles.chartTitle}>So sánh sản lượng theo ngày</Text>
      <Text style={styles.chartTitle}>Dashboard</Text>
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
        />
      </View>
    </View>
  )
}

export default CompareDashboard
