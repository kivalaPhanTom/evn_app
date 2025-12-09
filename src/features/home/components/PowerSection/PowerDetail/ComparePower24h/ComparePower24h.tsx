import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import styles from './ComparePower24h.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { useRouter } from 'expo-router'
import CompareDetailStats from '@/core/shared/CompareDetailStats'
import CompareLegend from '@/core/shared/CompareLegend'
import CompareDashboard from '@/core/shared/CompareDashboard'
import { useDispatch, useSelector } from 'react-redux'
import { getComparePower } from '@/core/redux/Actions/PowerActions'

function ComparePower24h() {
  const dispatch = useDispatch()
  const comparePowerData = useSelector((state: any) => state.powerSlice.comparePower || {})
  const { Unit = '', BarChartData, compareLineChartData, Summary } = comparePowerData

  console.log('Rendering ComparePower24h with data:', Summary)

  useEffect(() => {
    dispatch(getComparePower({ tagetDate: '06/12/2025', compareDate: '06/12/2025' }))
  }, [dispatch])

  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>So sánh công suất 24h</Text>
          <Text style={styles.live}>LIVE</Text>
        </View>

        {/* Legend */}
        <CompareLegend displayType="power" />

        {/* Dashboard */}
        <CompareDashboard data={BarChartData} lineData2={compareLineChartData} />
        {/* Compare Detail Stats */}
        <CompareDetailStats summary={Summary} />
      </View>
    </AnimatedCardContainer>
  )
}

export default ComparePower24h
