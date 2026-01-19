import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import styles from './PowerRecentDays.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import SquareSkelenton from '@/components/Skeletons/SquareSkelenton'

interface PowerByDays {
  value: number
  date: string
}
interface Props {
  isLoading: boolean
  powerData: PowerByDays[]
}
function PowerRecentDays(props: Props) {
  const { isLoading, powerData } = props
  const [firstLoading, setFirstLoading] = useState(true)

  const unit = 'MW'
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
                  <View key={index} style={styles.valueCard}>
                    <View style={styles.valueItem}>
                      <Text style={styles.powerValue}>{day.value}</Text>
                      <Text style={styles.dayLabel}>{day.date}</Text>
                    </View>
                  </View>
                ))}
              </>
            }

          </ScrollView>

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
