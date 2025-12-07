import React, { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import styles from './PowerRecentDays.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { getPowerByDays } from '@/core/redux/Actions/PowerActions'
import { RootState } from '@/core/redux/store'

interface DayPower {
  value: number
  date: string
}

function PowerRecentDays() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { powerByDays: { powerData } } = useSelector((state: RootState) => state.powerSlice)

  const unit = 'tr.Wh'

  useEffect(() => {
    dispatch(getPowerByDays(7))
  }, [])

  return (
    <AnimatedCardContainer>
      <View>
        <View style={styles.content}>
          <Text style={styles.title}>CÔNG SUẤT 7 NGÀY GẦN NHẤT</Text>

          {/* Scrollable Power Values */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {powerData.map((day, index) => (
              <View key={index} style={styles.valueCard}>
                <View style={styles.valueItem}>
                  <Text style={styles.powerValue}>{day.value}</Text>
                  <Text style={styles.dayLabel}>{day.date}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Bottom Info */}
          <View style={styles.bottomInfo}>
            <View style={styles.hintRow}>
              <View style={styles.legendDot} />
              <Text style={styles.hintText}>Lướt ngang để xem thêm →</Text>
            </View>
            <Text style={styles.unitText}>Đơn vị: {unit}</Text>
          </View>
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default PowerRecentDays
