import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import styles from './ProductionOutputByHoursFactDetail.styles'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import BarChart from '@/components/BarChart/BarChart.component'
import { useRouter } from 'expo-router'
import { BarGroup } from '@/core/types'

import { useDispatch, useSelector } from 'react-redux'
import { getProductOutputByHoursFactDetail } from '@/core/redux/Actions/ProductOutputActions'
import { RootState } from '@/core/redux/store'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import BarChartSkeleton from '@/components/Skeletons/BarChartSkeleton'
interface Props {
  currentPlantId: string
  keyTab: number
}
interface productOutputByHours {
  currentDate: string
  contractPowerValue: number
  currentPowerValue: number
  currentTime: string
  unit: string
  listValueByHours: { label: string; value: number }[]
}

function ProductionOutputByHoursFactDetail(props: Props) {
  const { currentPlantId, keyTab } = props
  const router = useRouter()
  const dispatch = useDispatch()
  const { activeTabIndex } = useSelector((state: RootState) => state.powerSlice)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [contractPowerValue, setContractPowerValue] = useState<number>(0)
  const [currentPowerValue, setCurrentPowerValue] = useState<number>(0)
  const [listValueByHours, setListValueByHours] = useState<{ label: string; value: number }[]>([])

  const { productOutputByHours } = useSelector((state: RootState) => state.productOutputSlice)
  const title = 'Sản lượng theo giờ'
  const subtitle = `Hôm nay, ${productOutputByHours.currentDate}`
  // const { productOutputByHours } = useSelector((state: RootState) => state.productOutputSlice)

  const unit = productOutputByHours.unit

  // const THRESHOLD = productOutputByHours.contractPowerValue
  const THRESHOLD = 0
  const getColorForValue = (value: number, threshold = THRESHOLD): string =>
    value >= threshold ? '#00b300' : '#ee0033'
  const setLoading = (value: boolean) => {
    setIsLoading(value)
  }

  const rawBarGroups: BarGroup[] = (listValueByHours || []).map(
    (group: { label: string; value: number }) => ({
      label: group.label,
      items: [
        { value: group.value, frontColor: getColorForValue(group.value) },
        { value: THRESHOLD, frontColor: '#fcba03' },
      ],
    })
  )

  useEffect(() => {
    if (activeTabIndex === keyTab) {
      dispatch(getProductOutputByHoursFactDetail({
        factoryId: currentPlantId,
        getDataFromApi: getDataFromApi,
        setLoading: setLoading
      }))
    }
  }, [activeTabIndex])

  const getDataFromApi = (data: productOutputByHours) => {
    // state.productOutputByHours.currentDate = action.payload.currentDate
    // state.productOutputByHours.contractPowerValue = action.payload.contractPowerValue
    // state.productOutputByHours.currentPowerValue = action.payload.currentPowerValue
    // state.productOutputByHours.currentTime = action.payload.currentTime
    // state.productOutputByHours.barGroups = action.payload.listValueByHours
    // state.productOutputByHours.unit = action.payload.unit
    // setProductionData(data)
    setContractPowerValue(data.contractPowerValue)
    setCurrentPowerValue(data.currentPowerValue)
    setListValueByHours(data.listValueByHours)
  }
  const onPressCard = () => {
    router.push({ pathname: '/product-output-detail', params: { currentPlantId: currentPlantId } })
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
            <Text style={styles.statLabel}>Giờ hiện tại ({productOutputByHours.currentDate})</Text>
            {isLoading ?
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
                  {currentPowerValue} {unit}
                </Text>
                <View style={styles.changeRow}>
                  <MetricDiff diff={0} compareTo={0} />
                </View>
              </>}
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Hợp đồng ({productOutputByHours.currentDate})</Text>
            {isLoading ?
              <BarSkeleton
                width={95}
                height={28}
              /> :
              <>
                <Text style={styles.statValueAverage}>
                  {contractPowerValue} {unit}
                </Text>
              </>}
          </View>
        </View>

        <View style={styles.chartWrapper}>
          {isLoading ? <BarChartSkeleton /> : <BarChart data={rawBarGroups} rounded />}
        </View>

        {/* Unit Label */}
        <Text style={styles.unitLabel}>Đơn vị: {unit}</Text>
      </View>
    </AnimatedCardContainer>
  )
}

export default ProductionOutputByHoursFactDetail
