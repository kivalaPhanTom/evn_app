import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import styles from './ProductionOutputByHours.styles'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import BarChart from '@/components/BarChart/BarChart.component'
import { BarGroup } from '@/core/types'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import BarChartSkeleton from '@/components/Skeletons/BarChartSkeleton'
import { Colors } from '@/core/constants/colors'

interface Props {
  isLoading: boolean
  currentDate: string
  contractPowerValue: number
  currentPowerValue: number
  currentTime: string
  unit: string
  barGroups: { label: string; value: number }[]
  onPressCard: any
}
function ProductionOutputByHours(props: Props) {
  const { isLoading, currentDate, contractPowerValue, currentPowerValue, currentTime, unit, barGroups, onPressCard } = props
  const [firstLoading, setFirstLoading] = useState(true)
  const title = 'Q theo giờ'
  const subtitle = `Hôm nay, ${currentDate}`
  const THRESHOLD = contractPowerValue
  const getColorForValue = (value: number, threshold = THRESHOLD): string =>
    value >= threshold ? Colors.green : Colors.red

  const rawBarGroups: BarGroup[] = (barGroups || []).map(
    (group: { label: string; value: number }) => ({
      label: group.label,
      items: [
        { value: group.value, frontColor: getColorForValue(group.value) },
        { value: THRESHOLD, frontColor: Colors.orange },
      ],
    })
  )

  useEffect(() => {
    setFirstLoading(true)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      setFirstLoading(false)
    }
  }, [isLoading])

  return (
    <AnimatedCardContainer onPress={onPressCard}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.headerTop}>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Giờ hiện tại ({currentTime})</Text>
            {firstLoading || isLoading ?
              <>
                <BarSkeleton />
                <BarSkeleton
                  width={70}
                  height={20}
                  marginBottom={0}
                />
              </> :
              <>
                <Text style={[styles.statValueCurrent, { color: getColorForValue(currentPowerValue) }]}>
                  {currentPowerValue} {unit}
                </Text>
                <View style={styles.changeRow}>
                  <MetricDiff diff={currentPowerValue} compareTo={contractPowerValue} />
                </View>
              </>}
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Hợp đồng ({currentTime})</Text>
            {firstLoading || isLoading ?
              <BarSkeleton
                width={95}
                height={28}
              /> :
              <>
                <Text style={styles.statValueAverage}>
                  {contractPowerValue} {unit}
                </Text>
              </>}
          </View>
        </View>

        <View 
          style={styles.chartWrapper}
          onStartShouldSetResponder={() => true}
          onResponderTerminationRequest={() => false}
        >
          {firstLoading || isLoading ? <BarChartSkeleton /> : <BarChart data={rawBarGroups} rounded scrollToEnd/>}
        </View>

        {/* Unit Label */}
        <Text style={styles.unitLabel}>Đơn vị: {unit}</Text>
      </View>
    </AnimatedCardContainer>
  )
}

export default ProductionOutputByHours
