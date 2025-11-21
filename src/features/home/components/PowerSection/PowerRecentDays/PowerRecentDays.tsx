import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import styles from './PowerRecentDays.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { useRouter } from 'expo-router'

interface DayPower {
  value: number
  label: string
}

function PowerRecentDays() {
  const router = useRouter()
  const powerData: DayPower[] = [
    { value: 126, label: 'Hôm nay' },
    { value: 124, label: 'Hôm qua' },
    { value: 128, label: '12/11' },
    { value: 122, label: '1/11' },
    { value: 130, label: '11/11' },
    { value: 125, label: '10/11' },
    { value: 127, label: '9/11' },
  ]
  const unit = 'tr.Wh'
  const onPressCard = () => {
    router.push({ pathname: '/product-power-detail' })
  }
  return (
    <AnimatedCardContainer onPress={() => onPressCard()}>
      <View>
        <View style={styles.content}>
          <Text style={styles.title}>CÔNG SUẤT 7 NGÀY GẦN NHẤT</Text>

          {/* Scrollable Power Values */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {powerData.map((day, index) => (
              <View key={index} style={styles.valueCard}>
                <View style={styles.valueItem}>
                  <Text style={styles.powerValue}>{day.value}</Text>
                  <Text style={styles.dayLabel}>{day.label}</Text>
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
