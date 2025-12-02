import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import styles from './ProductionOutputByHours.styles'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import BarChart from '@/components/BarChart/BarChart.component'
import { useRouter } from 'expo-router'
import { BarGroup } from '@/core/types'
import { useDispatch, useSelector } from 'react-redux'
import { getProductOutputByHours } from '@/core/redux/Actions/ProductOutputActions'
import { RootState } from '@/core/redux/store'

function ProductionOutputByHours() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { productOutputByHours } = useSelector((state: RootState) => state.productOutputSlice)
  const title = 'Sản lượng theo giờ'
  const subtitle = `Hôm nay, ${productOutputByHours.currentDate}`
  const unit = productOutputByHours.unit

  const THRESHOLD = productOutputByHours.contractPowerValue
  const getColorForValue = (value: number, threshold = THRESHOLD): string =>
    value >= threshold ? '#00b300' : '#ee0033'

  const rawBarGroups: BarGroup[] = (productOutputByHours.barGroups || []).map(
    (group: { label: string; value: number }) => ({
      label: group.label,
      items: [
        { value: group.value, frontColor: getColorForValue(group.value) },
        { value: THRESHOLD, frontColor: '#fcba03' },
      ],
    })
  )

  useEffect(() => {
    dispatch(getProductOutputByHours())
  }, [dispatch])

  const onPressCard = () => {
    router.push({ pathname: '/product-output-detail' })
  }
  return (
    <AnimatedCardContainer onPress={() => onPressCard()}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Giờ hiện tại ({productOutputByHours.currentTime})</Text>
            <Text style={[styles.statValueCurrent, { color: getColorForValue(productOutputByHours.currentPowerValue) }]}>
              {productOutputByHours.currentPowerValue} {unit}
            </Text>
            <View style={styles.changeRow}>
              <MetricDiff diff={productOutputByHours.currentPowerValue} compareTo={productOutputByHours.contractPowerValue} />
            </View>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Hợp đồng ({productOutputByHours.currentTime})</Text>
            <Text style={styles.statValueAverage}>
              {productOutputByHours.contractPowerValue} {unit}
            </Text>
          </View>
        </View>

        <View style={styles.chartWrapper}>
          <BarChart data={rawBarGroups} rounded />
        </View>

        {/* Unit Label */}
        <Text style={styles.unitLabel}>Đơn vị: {unit}</Text>
      </View>
    </AnimatedCardContainer>
  )
}

export default ProductionOutputByHours
