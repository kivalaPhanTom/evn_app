import React from 'react'
import { View, Text } from 'react-native'
import styles from './CompareOutput24h.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { useRouter } from 'expo-router'
import CompareDetailStats from '@/core/shared/CompareDetailStats'
import CompareLegend from '@/core/shared/CompareLegend'
import CompareDashboardOutput from '@/core/shared/CompareDashboard/CompareDashboardOutput'

function ProductOutputRencentDays() {
  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>So sánh sản lượng 24h</Text>
          <Text style={styles.live}>LIVE</Text>
        </View>

        {/* Legend */}
        <CompareLegend displayType="output" />

        {/* Dashboard */}
        <CompareDashboardOutput />
        {/* Compare Detail Stats */}
        <CompareDetailStats currentDate="14/11/2024" compareDate="10/11/2023" />
      </View>
    </AnimatedCardContainer>
  )
}

export default ProductOutputRencentDays
