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
}
interface Props {
  isLoading: boolean
  powerData: PowerByDays[]
}

function ValueCard({ day }: { day: PowerByDays }) {
  const opacity = useSharedValue(1)
  const isToday = day.date === 'Hôm nay'

  useEffect(() => {
    if (isToday) {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.5, { duration: 300 }),
          withTiming(1, { duration: 300 }),
        ),
        -1,
        true,
      )
    }
  }, [isToday, opacity])

  const blinkStyle = useAnimatedStyle(() => (isToday ? { opacity: opacity.value } : { opacity: 1 }))

  return (
    <View style={styles.valueCard}>
      {isToday ? ( 
        <View style={styles.valueItem}>
          <Text style={styles.powerValue}>{day.value}</Text>
          <Animated.View style={[styles.valueItem, blinkStyle]}>
            <Text style={styles.dayLabel}>{day.date}</Text>
          </Animated.View>
        </View>          
      ) : (
        <View style={styles.valueItem}>
          <Text style={styles.powerValue}>{day.value}</Text>
          <Text style={styles.dayLabel}>{day.date}</Text>
        </View>
      )}
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
            {firstLoading || isLoading ? <SquareSkelenton count={4} /> :
              <>
                {powerData.map((day, index) => (
                  <ValueCard key={index} day={day} />
                ))}
              </>
            }
          </ScrollView>
          {firstLoading || isLoading ?
           <View style={{ marginTop: 20 }}> 
            <LineChartSkeleton /> 
           </View>:
            <View>
              <LineChart
                data={lineChartData}
                data2={[{
                  value: 0,
                  label: ""
                }]}
                color={Colors.blue}
                color2={'transparent'}
                areaChart={false}
                hideYAxisText={true}
                marginLeftXLabel={20}
              />
            </View>
          }

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