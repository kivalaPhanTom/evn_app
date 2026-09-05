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
import { useAppSelector } from '@/core/redux/hooks'

interface LegendItemData {
  type: 'box' | 'line'
  color?: string
  label: string
}

interface FlowRateProps {
  data: Array<{ value: number; label: string }>
  data2: Array<{ value: number; label: string }>
  currentColor?: string
  unit?: string
  title?: string
  flowRateInfo?: Array<{ label: string; value: number; color: string }>
  showPointer?: boolean
}

const FlowRate: React.FC<FlowRateProps> = ({
  data,
  data2,
  currentColor = '#fff',
  unit,
  title,
  flowRateInfo = [],
  showPointer = false,
}) => {
  // Nếu type = 'output', hiển thị đầy đủ 3 items
  const filterByTime = useAppSelector((state: any) => state.hydrologySlice.filterByTime)
  const currentFilterTab = filterByTime?.currentFilterTab
  // Giu nguyen reference du lieu khi parent render vi ly do khong lien quan, vi du khi cuon doc.
  const chartData = useMemo(() => data.map((item, index) => ({ ...item, id: index })), [data])
  const comparisonChartData = useMemo(() => data2.map((item, index) => ({ ...item, id: index })), [data2])
  const legendItems: LegendItemData[] =
    currentFilterTab === 'year'
      ? []
      : currentFilterTab === 'month'
        ? [
            { type: 'line', label: 'Tháng mục tiêu', color: currentColor },
            { type: 'line', label: 'Tháng so sánh', color: '#A78BFA' },
          ]
        : [
            { type: 'line', label: 'Ngày mục tiêu', color: currentColor },
            { type: 'line', label: 'Ngày so sánh', color: '#A78BFA' },
          ]

  return (
    <AnimatedCardContainer>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        {filterByTime.currentFilterTab !== 'year' && <CompareLegend items={legendItems} displayType="output" />}
      </View>
      <View style={{ marginBottom: 20 }}>
        <LineChart
          data={chartData}
          data2={comparisonChartData}
          height={px(200)}
          color={currentColor}
          color2="#A78BFA"
          areaChart={false}
          strokeDashArray2={[12, 3]}
          scrollToEnd={true}
          pointerConfig={showPointer}
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

// Tranh ve lai bieu do khi bieu do thuy van khac hoac vi tri cuon thay doi.
export default React.memo(FlowRate)
