import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import styles from './ComparePower24h.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { useRouter } from 'expo-router'
import CompareDetailStats from '@/core/shared/CompareDetailStats'
import CompareLegend from '@/core/shared/CompareLegend'
import CompareDashboard from '@/core/shared/CompareDashboard'
import { useDispatch, useSelector } from 'react-redux'
import { getComparePower } from '@/core/redux/Actions/PowerActions'
import dayjs from 'dayjs'

function ComparePower24h() {
  const dispatch = useDispatch()
  const comparePowerData = useSelector((state: any) => state.powerSlice.comparePower || {})
  const {isLoadingComparePower} = useSelector((state: any) => state.powerSlice)
  const { Unit = '', BarChartData, compareLineChartData, Summary } = comparePowerData

  const [range, setRange] = useState({
    from: dayjs().subtract(1, 'day'),
    to: dayjs(),
  })
  useEffect(() => {
    dispatch(
      getComparePower({
        tagetDate: range.from.format('DD/MM/YYYY'),
        compareDate: range.to.format('DD/MM/YYYY'),
      }),
    )
  }, [dispatch])

  const onChangeDateRage = (newRange: { from: dayjs.Dayjs; to: dayjs.Dayjs }) => {
    setRange(newRange)
    const fromDate = dayjs(newRange.from)
    const toDate = dayjs(newRange.to)

    if (fromDate.isAfter(toDate)) {
      return
    }

    dispatch(
      getComparePower({
        tagetDate: fromDate.format('DD/MM/YYYY'),
        compareDate: toDate.format('DD/MM/YYYY'),
      }),
    )
  }

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
        <CompareDashboard
          data={BarChartData}
          lineData2={compareLineChartData}
          range={range}
          onChangeDateRage={onChangeDateRage}
          isLoading ={isLoadingComparePower}
        />
        {/* Compare Detail Stats */}
        <CompareDetailStats summary={Summary} />
      </View>
    </AnimatedCardContainer>
  )
}

export default ComparePower24h
