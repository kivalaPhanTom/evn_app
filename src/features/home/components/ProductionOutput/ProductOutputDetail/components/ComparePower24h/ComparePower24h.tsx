import React from 'react'
import { View, Text } from 'react-native'
import styles from './ComparePower24h.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { useRouter } from 'expo-router'
import CompareDetailStats from '../../shared/CompareDetailStats'
import CompareLegend from '../../shared/CompareLegend'
import CompareDashboard from '../../shared/CompareDashboard'

function ProductOutputRencentDays() {
  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>So sánh công suất 24h</Text>
          <Text style={styles.live}>LIVE</Text>
        </View>

        {/* Legend */}
        <CompareLegend />

        {/* Dashboard */}
        <CompareDashboard />
        {/* Compare Detail Stats */}
        <CompareDetailStats currentDate="14/11/2024" compareDate="10/11/2023" />
        <CompareDetailStats currentDate="14/11/2024" compareDate="10/11/2023" />
      </View>
    </AnimatedCardContainer>
  )
}

export default ProductOutputRencentDays
