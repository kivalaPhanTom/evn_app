import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import styles from './PowerRecentDays.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import SquareSkelenton from '@/components/Skeletons/SquareSkelenton'
import { LineChart } from '@/components/ChartView/LineChart.component'
import { LineChartSkeleton } from '../Skeletons/LineChartSkeleton'
import { Colors } from '@/core/constants/colors'
interface PowerByDays {
  value: number
  date: string
  dayOfWeek: string
}
interface Props {
  isLoading: boolean
  powerData: PowerByDays[]
}

function ValueCard({ day }: { day: PowerByDays }) {
  const opacity = useSharedValue(1)
  const isToday = day.date === 'Hôm nay'
  const isWeekend = day.dayOfWeek === 'Thứ Bảy' || day.dayOfWeek === 'Chủ Nhật'
  const labelColor = isWeekend ? '#eab308' : '#8b92a0'

  useEffect(() => {
    if (isToday) {
      opacity.value = withRepeat(
        withSequence(withTiming(0.5, { duration: 300 }), withTiming(1, { duration: 300 })),
        -1,
        true,
      )
    } else {
      // stop any ongoing animation by forcing value to 1
      opacity.value = 1
    }
  }, [isToday, opacity])

  const blinkStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return (
    <View style={styles.valueCard}>
      <View style={styles.valueItem}>
        <Text style={styles.powerValue}>{day.value}</Text>

        {isToday ? (
          <Animated.View style={[styles.valueItem, blinkStyle]}>
            <Text style={[styles.dayLabel, { color: labelColor }]}>{day.date}</Text>
            <Text style={[styles.dayLabel, { color: labelColor }]}>{day.dayOfWeek}</Text>
          </Animated.View>
        ) : (
          <>
            <Text style={[styles.dayLabel, { color: labelColor }]}>{day.date}</Text>
            <Text style={[styles.dayLabel, { color: labelColor }]}>{day.dayOfWeek}</Text>
          </>
        )}
      </View>
    </View>
  )
}

function PowerRecentDays(props: Props) {
  const { isLoading, powerData } = props
  const [firstLoading, setFirstLoading] = useState(true)

  const unit = 'MW'
  const lineChartData = powerData.map((item, idx) => ({
    value: item.value,
    label: item.date,
  }))

  useEffect(() => {
    setFirstLoading(true)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      setFirstLoading(false)
    }
  }, [isLoading])

  return (
    <AnimatedCardContainer>
      <View>
        <View style={styles.content}>
          <Text style={styles.title}>P 7 NGÀY GẦN NHẤT</Text>

          {/* Scrollable Power Values */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {firstLoading || isLoading ? (
              <SquareSkelenton count={4} />
            ) : (
              <>
                {powerData.map((day, index) => (
                  <ValueCard key={index} day={day} />
                ))}
              </>
            )}
          </ScrollView>
          {firstLoading || isLoading ? (
            <View style={{ marginTop: 20 }}>
              <LineChartSkeleton />
            </View>
          ) : (
            <View>
              <LineChart
                data={lineChartData}
                data2={[
                  {
                    value: 0,
                    label: '',
                  },
                ]}
                color={Colors.blue}
                color2={'transparent'}
                areaChart={false}
                hideYAxisText={true}
                marginLeftXLabel={20}
              />
            </View>
          )}

          {/* Bottom Info */}
          <View style={styles.bottomInfo}>
            {/* <View style={styles.hintRow}>
              <View style={styles.legendDot} />
              <Text style={styles.hintText}>Lướt ngang để xem thêm →</Text>
            </View> */}
            <Text style={styles.unitText}>Đơn vị: {unit}</Text>
          </View>
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default PowerRecentDays
