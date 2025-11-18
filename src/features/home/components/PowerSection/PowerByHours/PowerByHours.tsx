import React from 'react'
import { View, Text } from 'react-native'
import styles from './PowerByHours.styles'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import ProfitCard from '@/features/dashboard/components/ProfitCard/ProfitCard'
import { LineChart } from '@/components/ChartView/LineChart.component'

function PowerByHours() {
  const title = 'Công suất theo giờ'
  const subtitle = 'Hôm nay, 14/11/2025'
  const currentValue = 126
  const currentHour = '20H'
  const changePercent = 0.024
  const averageValue = 118
  const hourlyData = [
    { value: 118, label: '0h' },
    { value: 120, label: '1h' },
    { value: 122, label: '2h' },
    { value: 126, label: '3h' },
    { value: 115, label: '4h' },
    { value: 110, label: '5h' },
    { value: 120, label: '6h' },
    { value: 125, label: '7h' },
    { value: 125, label: '8h' },
    { value: 135, label: '9h' },
    { value: 118, label: '10h' },
    { value: 112, label: '11h' },
    { value: 120, label: '12h' },
    { value: 123, label: '13h' },
    { value: 140, label: '14h' },
    { value: 145, label: '15h' },
    { value: 136, label: '16h' },
    { value: 133, label: '17h' },
    { value: 131, label: '18h' },
    { value: 128, label: '19h' },
    { value: 126, label: '20h' },
    { value: 123, label: '21h' },
    { value: 121, label: '22h' },
    { value: 110, label: '23h' },
  ]
  const unit = 'MW'
  const chartWidth = 280
  const chartHeight = 100
  const maxValue = Math.max(...hourlyData.map((d) => d.value))
  const minValue = Math.min(...hourlyData.map((d) => d.value))
  const range = maxValue - minValue || 1

  const pointSpacing = chartWidth / (hourlyData.length - 1)

  const avgData = Array(24)
    .fill(0)
    .map((item, idx) => ({ value: 118, label: idx + 'h', hideDataPoint: true }))

  const initIndex = Number(currentHour.substring(0, 2))

  const getY = (value: number) => {
    return chartHeight - ((value - minValue) / range) * (chartHeight - 20) - 10
  }

  const pathData = hourlyData
    .map((data, index) => {
      const x = index * pointSpacing
      const y = getY(data.value)
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
    })
    .join(' ')

  const isPositiveChange = changePercent >= 0
  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>HIỆN TẠI ({currentHour})</Text>
            <Text style={styles.statValueCurrent}>
              {currentValue} {unit}
            </Text>
            <View style={styles.changeRow}>
              <MetricDiff diff={126} compareTo={118} />
            </View>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>TRUNG BÌNH</Text>
            <Text style={styles.statValueAverage}>
              {averageValue} {unit}
            </Text>
          </View>
        </View>
        <View>
          <LineChart
            data={avgData}
            data2={hourlyData}
            initialScrollIndex={initIndex}
            color="#FBBF24"
            color2="#2563EB"
          />
        </View>
        {/* Unit Label */}
        <Text style={styles.unitLabel}>Đơn vị: {unit}</Text>
      </View>
    </AnimatedCardContainer>
  )
}

export default PowerByHours
