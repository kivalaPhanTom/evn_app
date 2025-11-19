import React from 'react'
import { View, Text } from 'react-native'
import styles from './CompareOutput24h.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { useRouter } from 'expo-router'
import CompareDetailStats from '../../shared/CompareDetailStats'
import CompareLegend from '../../shared/CompareLegend'
import CompareDashboard from '../../shared/CompareDashboard'

function ProductOutputRencentDays() {
  const router = useRouter()
  const productionData = [
    { date: 'Hôm nay', actual: 2.4, contract: 2.5 },
    { date: 'Hôm qua', actual: 2.6, contract: 2.5 },
    { date: '12/11', actual: 2.7, contract: 2.5 },
    { date: '11/11', actual: 2.3, contract: 2.5 },
    { date: '10/11', actual: 2.6, contract: 2.5 },
    { date: '09/11', actual: 2.2, contract: 2.5 },
    { date: '08/11', actual: 2.4, contract: 2.5 },
  ]
  const unit = 'tr.Wh'

  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>So sánh sản lượng 24h</Text>
          <Text style={styles.live}>LIVE</Text>
        </View>

        {/* Legend */}
        <CompareLegend />

        {/* Dashboard */}
        <CompareDashboard />
        {/* Compare Detail Stats */}
        <CompareDetailStats currentDate="14/11/2024" compareDate="10/11/2023" />
      </View>
    </AnimatedCardContainer>
  )
}

export default ProductOutputRencentDays
