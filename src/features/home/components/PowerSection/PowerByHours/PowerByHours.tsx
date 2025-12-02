import React, { useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styles from './PowerByHours.styles'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import ProfitCard from '@/features/dashboard/components/ProfitCard/ProfitCard'
import { LineChart } from '@/components/ChartView/LineChart.component'
import { useRouter } from 'expo-router'
import { getPowerByTime } from '@/core/redux/Actions/PowerActions'

function PowerByHours() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentDate, currentPower, currentTime, avgPower, HourlyPowerList } = useSelector(
    (state: any) => state.powerSlice.powerByTime,
  )

  useEffect(() => {
    dispatch(getPowerByTime())
  }, [])

  const title = 'Công suất theo giờ'
  const subtitle = 'Hôm nay, ' + currentDate
  const hourlyData = HourlyPowerList ? HourlyPowerList.map((d: any) => ({ ...d })) : []
  const unit = 'MW'

  const avgData = Array(hourlyData.length)
    .fill(0)
    .map((item, idx) => ({ value: avgPower, label: idx + 'h', hideDataPoint: true }))

  const onPressCard = () => {
    router.push({ pathname: '/product-power-detail' })
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
            <Text style={styles.statLabel}>HIỆN TẠI ({currentTime})</Text>
            <Text style={styles.statValueCurrent}>
              {currentPower} {unit}
            </Text>
            <View style={styles.changeRow}>
              <MetricDiff diff={currentPower} compareTo={avgPower} />
            </View>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>TRUNG BÌNH</Text>
            <Text style={styles.statValueAverage}>
              {avgPower} {unit}
            </Text>
          </View>
        </View>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View>
            <LineChart
              data={avgData}
              data2={hourlyData}
              color="#FBBF24"
              color2="#2563EB"
              hideDataPoints2={false}
              hideYAxisText={true}
              hideDataPoints1={true}
            />
          </View>
        </Pressable>
        {/* Unit Label */}
        <Text style={styles.unitLabel}>Đơn vị: {unit}</Text>
      </View>
    </AnimatedCardContainer>
  )
}

export default PowerByHours
