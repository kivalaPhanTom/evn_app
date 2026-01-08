import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './ProductionOutputByHours.styles'
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
import { Colors } from '@/core/constants/colors'

function ProductionOutputByHours() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { countRefesh } = useSelector((state: any) => state.homeSlice)
  const { productOutputByHours, isLoadingByHours } = useSelector((state: RootState) => state.productOutputSlice)
  const title = 'Sản lượng theo giờ'
  const subtitle = `Hôm nay, ${productOutputByHours.currentDate}`
  const unit = productOutputByHours.unit

  const THRESHOLD = productOutputByHours.contractPowerValue
  const getColorForValue = (value: number, threshold = THRESHOLD): string =>
    value >= threshold ? Colors.green : Colors.red

  const rawBarGroups: BarGroup[] = (productOutputByHours.barGroups || []).map(
    (group: { label: string; value: number }) => ({
      label: group.label,
      items: [
        { value: group.value, frontColor: getColorForValue(group.value) },
        { value: THRESHOLD, frontColor: Colors.orange },
      ],
    })
  )

  useEffect(() => {
    dispatch(getProductOutputByHours())
  }, [countRefesh])

  const onPressCard = () => {
    router.navigate({ pathname: '/product-output-detail' })
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
            <Text style={styles.statLabel}>Giờ hiện tại ({productOutputByHours.currentTime})</Text>
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
                <Text style={[styles.statValueCurrent, { color: getColorForValue(productOutputByHours.currentPowerValue) }]}>
                  {productOutputByHours.currentPowerValue} {unit}
                </Text>
                <View style={styles.changeRow}>
                  <MetricDiff diff={productOutputByHours.currentPowerValue} compareTo={productOutputByHours.contractPowerValue} />
                </View>
              </>}
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Hợp đồng ({productOutputByHours.currentTime})</Text>
            {isLoadingByHours ?
              <BarSkeleton
                width={95}
                height={28}
              /> :
              <>
                <Text style={styles.statValueAverage}>
                  {productOutputByHours.contractPowerValue} {unit}
                </Text>
              </>}
          </View>
        </View>

        <View style={styles.chartWrapper}>
          {isLoadingByHours ? <BarChartSkeleton /> : <BarChart data={rawBarGroups} rounded />}
        </View>

        {/* Unit Label */}
        <Text style={styles.unitLabel}>Đơn vị: {unit}</Text>
      </View>
    </AnimatedCardContainer>
  )
}

export default ProductionOutputByHours
