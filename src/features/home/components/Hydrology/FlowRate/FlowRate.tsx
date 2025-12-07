import React, { useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import GradientText from '@/components/GradientText/GradientText.component'
import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber.component'
import { px } from '@/core/utils/scale'
import StackedBar, { StackedItem } from '@/components/StackedBar/StackedBar.component'
import styles from './FlowRate.styles'
import FlowMetricCard from '@/components/FlowMetricCard/FlowMetricCard.component'
import { LineChart } from '@/components/ChartView/LineChart.component'
import { Image } from 'expo-image'
import { CircleLineIcon } from '@/components/ui/circle-line-icon'
import CompareLegend from '@/core/shared/CompareLegend'

interface LegendItemData {
  type: 'box' | 'line'
  color?: string
  label: string
}

interface FlowRateProps {
  data: Array<{ value: number; label: string }>
  currentColor?: string
  unit?: string
  title?: string
  flowRateInfo?: Array<{ label: string; value: number; color: string }>
}

const FlowRate: React.FC<FlowRateProps> = ({ data, currentColor = '#fff', unit, title, flowRateInfo = [] }) => {
  data = [
    { value: 118, label: '0h' },
    { value: 120, label: '1h' },
    { value: 200, label: '2h' },
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
  const data2 = [
    { value: 50, label: '00:00' },
    { value: 70, label: '01:00' },
    { value: 100, label: '02:00' },
    { value: 130, label: '03:00' },
    { value: 120, label: '04:00' },
    { value: 90, label: '05:00' },
    { value: 130, label: '06:00' },
    { value: 70, label: '07:00' },
    { value: 80, label: '08:00' },
    { value: 90, label: '09:00' },
    { value: 100, label: '10:00' },
    { value: 120, label: '11:00' },
    { value: 120, label: '12:00' },
    { value: 123, label: '13:00' },
    { value: 140, label: '14:00' },
    { value: 200, label: '15:00' },
    { value: 190, label: '16:00' },
    { value: 180, label: '17:00' },
    { value: 170, label: '18:00' },
    { value: 200, label: '19:00' },
    { value: 100, label: '20:00' },
    { value: 90, label: '21:00' },
    { value: 130, label: '22:00' },
    { value: 80, label: '23:00' },
  ]

  // Nếu type = 'output', hiển thị đầy đủ 3 items
  const legendItems: LegendItemData[] = [
    { type: 'line', label: 'Hôm nay', color: currentColor },
    { type: 'line', label: 'Cùng kỳ', color: '#A78BFA' },
  ]

  return (
    <AnimatedCardContainer>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <CompareLegend items={legendItems} displayType="output" />
      </View>
      <View style={{ marginBottom: 20 }}>
        <LineChart
          data={data}
          data2={data2}
          height={px(200)}
          color={currentColor}
          color2="#A78BFA"
          areaChart={false}
          hideDataPoints2
          strokeDashArray2={[12, 3]}
        />
      </View>

      <View style={styles.container}>
        {flowRateInfo.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemLabel}>{item.label}</Text>
            <Text style={[styles.itemValue, { color: item.color }]}>
              {item.value} {unit}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendText}>Đơn vị: {unit === 'm' ? 'mét (m)' : 'mét khối/giây (m³/s)'}</Text>
      </View>
    </AnimatedCardContainer>
  )
}

export default FlowRate
