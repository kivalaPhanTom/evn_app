import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styles from './PowerByHoursFactDetail.styles'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import ProfitCard from '@/features/dashboard/components/ProfitCard/ProfitCard'
import { LineChart } from '@/components/ChartView/LineChart.component'
import { useRouter } from 'expo-router'
import { getPowerByTime } from '@/core/redux/Actions/PowerActions'
import { LineChartSkeleton } from '@/components/Skeletons/LineChartSkeleton'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import { getPowerByTimeFactDetail } from '@/core/redux/Actions/PowerActions'
import { setPowerOverviewFactDetail, setPowerByTimeFactDetail, setPowerByDaysFactDetail, setComparePowerFactDetail, setLoadingFactDetail } from '@/core/redux/slices/PowerFactDetailSlice'
interface Props { 
   currentPlantId: string
}
interface HourlyPowerList {
  value: number
  label: string
}
interface PowerByTime {
  currentDate: string
  currentPower: number
  currentTime: string
  avgPower: number
  HourlyPowerList: HourlyPowerList[]
}
function PowerByHoursFactDetail(props: Props) {
  const { currentPlantId } = props
  const router = useRouter()
  const dispatch = useDispatch()
  const [HourlyPowerList, setHourlyPowerList] = useState<HourlyPowerList[]>([])
  const [avgPower, setAvgPower] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPower, setCurrentPower] = useState<number>(0)
  const { currentDate } = useSelector((state: any) => state.powerSlice.powerByTime)

  useEffect(() => {
    dispatch(getPowerByTimeFactDetail({
      factoryId: currentPlantId,
      getDataFromApi: getDataFromApi,
      setLoading: setLoading
    }))
  }, [currentPlantId])

  const title = 'Công suất theo giờ'
  const subtitle = 'Hôm nay, ' + currentDate
  const hourlyData = HourlyPowerList ? HourlyPowerList.map((d: any) => ({ ...d })) : []
  const unit = 'MW'

  const getDataFromApi = (data: PowerByTime) => {
    setAvgPower(data.avgPower)
    setCurrentPower(data.currentPower)
    setHourlyPowerList(data.HourlyPowerList)
  }

  const setLoading = (value: boolean) => {
    setIsLoading(value)
  }
  const avgData = Array(hourlyData.length)
    .fill(0)
    .map((item, idx) => ({ value: avgPower, label: idx + 'h', hideDataPoint: true }))

  const onPressCard = () => {
    router.push({ pathname: '/product-power-detail' })
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
            <Text style={styles.statLabel}>HIỆN TẠI ({currentDate})</Text>
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
                <Text style={styles.statValueCurrent}>
                  {currentPower} {unit}
                </Text>
                <View style={styles.changeRow}>
                  <MetricDiff diff={0} compareTo={avgPower} />
                </View>
              </>}
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>TRUNG BÌNH</Text>
            {isLoading ?
              <BarSkeleton
                width={95}
                height={28}
              /> :
              <>
                <Text style={styles.statValueAverage}>
                  {avgPower} {unit}
                </Text>
              </>}
          </View>
        </View>
        <View>
          {isLoading ? <LineChartSkeleton /> : <LineChart
            data={avgData}
            data2={hourlyData}
            color="#FBBF24"
            color2="#2563EB"
            hideDataPoints2={false}
            hideYAxisText={true}
            hideDataPoints1={true}
          />}
        </View>
        {/* Unit Label */}
        <Text style={styles.unitLabel}>Đơn vị: {unit}</Text>
      </View>
    </AnimatedCardContainer>
  )
}

export default PowerByHoursFactDetail
