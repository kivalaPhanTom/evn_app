import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './ProductionOutputByHoursFactDetail.styles'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import BarChart from '@/components/BarChart/BarChart.component'
import { useRouter } from 'expo-router'
import { BarGroup } from '@/core/types'

import { useDispatch, useSelector } from 'react-redux'
import { getProductOutputByHours } from '@/core/redux/Actions/ProductOutputActions'
import { RootState } from '@/core/redux/store'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import BarChartSkeleton from '@/components/Skeletons/BarChartSkeleton'

function ProductionOutputByHoursFactDetail() {
  const router = useRouter()
  const dispatch = useDispatch()
  // const { productOutputByHours, isLoadingByHours } = useSelector((state: RootState) => state.productOutputSlice)
  const isLoadingByHours = false
  const title = 'Sản lượng theo giờ'
  const subtitle = `Hôm nay, ${'22/12/2025'}`
  // const unit = productOutputByHours.unit
  const unit ='MWh'

  // const THRESHOLD = productOutputByHours.contractPowerValue
  const THRESHOLD = 0
  const getColorForValue = (value: number, threshold = THRESHOLD): string =>
    value >= threshold ? '#00b300' : '#ee0033'

  // const rawBarGroups: BarGroup[] = (productOutputByHours.barGroups || []).map(
  //   (group: { label: string; value: number }) => ({
  //     label: group.label,
  //     items: [
  //       { value: group.value, frontColor: getColorForValue(group.value) },
  //       { value: THRESHOLD, frontColor: '#fcba03' },
  //     ],
  //   })
  // )

  useEffect(() => {
    dispatch(getProductOutputByHours())
  }, [dispatch])

  const onPressCard = () => {
    router.push({ pathname: '/product-output-detail' })
  }
  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.headerTop}>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <TouchableOpacity onPress={onPressCard} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Thêm chi tiết</Text>
              <Text style={styles.actionButtonIcon}>{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Giờ hiện tại ({'22/12/2025'})</Text>
            {isLoadingByHours ?
              <>
                <BarSkeleton />
                <BarSkeleton
                  width={70}
                  height={20}
                  marginBottom={0}
                />
              </> :
              <>
                <Text style={[styles.statValueCurrent, { color: getColorForValue(0) }]}>
                  {0} {unit}
                </Text>
                <View style={styles.changeRow}>
                  <MetricDiff diff={0} compareTo={0} />
                </View>
              </>}
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Hợp đồng ({'22/12/2025'})</Text>
            {isLoadingByHours ?
              <BarSkeleton
                width={95}
                height={28}
              /> :
              <>
                <Text style={styles.statValueAverage}>
                  {0} {unit}
                </Text>
              </>}
          </View>
        </View>

        <View style={styles.chartWrapper}>
          {isLoadingByHours ? <BarChartSkeleton /> : <BarChart data={[]} rounded />}
        </View>

        {/* Unit Label */}
        <Text style={styles.unitLabel}>Đơn vị: {unit}</Text>
      </View>
    </AnimatedCardContainer>
  )
}

export default ProductionOutputByHoursFactDetail
