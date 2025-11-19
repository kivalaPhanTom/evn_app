import React from 'react'
import { View, Text } from 'react-native'
import styles from './ProductionOutputByHours.styles'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import BarChart from '@/components/BarChart/BarChart.component'
import { useRouter } from 'expo-router'

interface BarGroup {
  label: string
  items: {
    value: number
    frontColor?: string
    showValuesOnTop?: boolean
  }[]
}

const THRESHOLD = 45
const getColorForValue = (value: number, threshold = THRESHOLD): string => (value >= threshold ? '#00b300' : '#ee0033')

const rawBarGroups: BarGroup[] = [
  {
    label: '0h',
    items: [
      { value: 50, frontColor: getColorForValue(50) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '1h',
    items: [
      { value: 45, frontColor: getColorForValue(45) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '2h',
    items: [
      { value: 40, frontColor: getColorForValue(40) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '3h',
    items: [
      { value: 95, frontColor: getColorForValue(95) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '4h',
    items: [
      { value: 30, frontColor: getColorForValue(30) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '5h',
    items: [
      { value: 75, frontColor: getColorForValue(75) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '6h',
    items: [
      { value: 60, frontColor: getColorForValue(60) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '7h',
    items: [
      { value: 55, frontColor: getColorForValue(55) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '8h',
    items: [
      { value: 70, frontColor: getColorForValue(70) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '9h',
    items: [
      { value: 85, frontColor: getColorForValue(85) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '10h',
    items: [
      { value: 90, frontColor: getColorForValue(90) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '11h',
    items: [
      { value: 78, frontColor: getColorForValue(78) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '12h',
    items: [
      { value: 65, frontColor: getColorForValue(65) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '13h',
    items: [
      { value: 50, frontColor: getColorForValue(50) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '14h',
    items: [
      { value: 40, frontColor: getColorForValue(40) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '15h',
    items: [
      { value: 82, frontColor: getColorForValue(82) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '16h',
    items: [
      { value: 88, frontColor: getColorForValue(88) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '17h',
    items: [
      { value: 33, frontColor: getColorForValue(33) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '18h',
    items: [
      { value: 66, frontColor: getColorForValue(66) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '19h',
    items: [
      { value: 59, frontColor: getColorForValue(59) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '20h',
    items: [
      { value: 47, frontColor: getColorForValue(47) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '21h',
    items: [
      { value: 52, frontColor: getColorForValue(52) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '22h',
    items: [
      { value: 61, frontColor: getColorForValue(61) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '23h',
    items: [
      { value: 69, frontColor: getColorForValue(69) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
  {
    label: '24h',
    items: [
      { value: 56, frontColor: getColorForValue(56) },
      { value: 45, frontColor: '#fcba03' },
    ],
  },
]

function ProductionOutputByHours() {
  const router = useRouter()
  const title = 'Sản lượng theo giờ'
  const subtitle = 'Hôm nay, 14/11/2025'
  const currentValue = 98
  const currentHour = '20H'
  const changePercent = 0.117
  const averageValue = 105
  const hourlyData = [
    { hour: '0h', value: 105 },
    { hour: '1h', value: 120 },
    { hour: '2h', value: 123 },
    { hour: '3h', value: 128 },
  ]
  const unit = 'MWh'
  const chartWidth = 280
  const chartHeight = 100
  const maxValue = Math.max(...hourlyData.map((d) => d.value))
  const minValue = Math.min(...hourlyData.map((d) => d.value))
  const range = maxValue - minValue || 1

  const pointSpacing = chartWidth / (hourlyData.length - 1)

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

  // const isPositiveChange = changePercent >= 0;
  const isPositiveChange = false

  const onPressCard = () => {
    router.push({ pathname: '/product-output-detail', params: { type: 'output' } })
  }
  return (
    <AnimatedCardContainer onPress={() => onPressCard()}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Giờ hiện tại ({currentHour})</Text>
            <Text style={styles.statValueCurrent}>
              {currentValue} {unit}
            </Text>
            <View style={styles.changeRow}>
              <MetricDiff diff={98} compareTo={105} />
            </View>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Hợp đồng (20h)</Text>
            <Text style={styles.statValueAverage}>
              {averageValue} {unit}
            </Text>
          </View>
        </View>

        <View style={styles.chartWrapper}>
          <BarChart data={rawBarGroups} rounded />
        </View>

        {/* Unit Label */}
        <Text style={styles.unitLabel}>Đơn vị: {unit}</Text>
      </View>
    </AnimatedCardContainer>
  )
}

export default ProductionOutputByHours
