import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import styles from './CompareOutputByTime.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import CompareLegend from '@/core/shared/CompareLegend'
import { useDispatch, useSelector } from 'react-redux'
import { getComparePower } from '@/core/redux/Actions/PowerActions'
import dayjs from 'dayjs'
import CompareDashboardV2 from '@/core/shared/CompareDashboard/CompareDashboardV2'

function CompareOutputByTime(props: { currentPlantId?: string; isCheckDisableDate: boolean }) {
  const { currentPlantId, isCheckDisableDate } = props
  const dispatch = useDispatch()
  const comparePowerData = useSelector((state: any) => state.powerSlice.comparePower || {})
  const { isLoadingComparePower } = useSelector((state: any) => state.powerSlice)
  const { Unit = '', BarChartData, compareLineChartData, Summary } = comparePowerData
  const { countRefesh } = useSelector((state: any) => state.homeSlice)
  const [rangeCompare, setRangeCompare] = useState({
    from: dayjs().subtract(14, 'day'),
    to: dayjs().subtract(7, 'day'),
  })
  const [rangeTarget, setRangeTarget] = useState({
    from: dayjs().subtract(7, 'day'),
    to: dayjs(),
  })
  useEffect(() => {
    dispatch(
      getComparePower({
        tagetDate: rangeCompare.to.format('DD/MM/YYYY'),
        compareDate: rangeCompare.from.format('DD/MM/YYYY'),
        currentPlantId: currentPlantId || '',
      }),
    )
  }, [countRefesh])

  const onChangeDateRangeCompare = (newRange: { from: dayjs.Dayjs; to: dayjs.Dayjs }) => {
    // Đảm bảo kiểu dayjs
    const fromDate = dayjs(newRange.from)
    const toDate = dayjs(newRange.to)

    // Nếu giá trị invalid, return luôn hoặc gán về mặc định (optional)
    if (!fromDate.isValid() || !toDate.isValid()) return
    setRangeCompare({ from: fromDate, to: toDate })

    if (fromDate.isAfter(toDate)) {
      return
    }
    dispatch(
      getComparePower({
        tagetDate: toDate.format('DD/MM/YYYY'),
        compareDate: fromDate.format('DD/MM/YYYY'),
        currentPlantId: currentPlantId || '',
      }),
    )
  }

  const onChangeDateRangeTarget = (newRange: { from: dayjs.Dayjs; to: dayjs.Dayjs }) => {
    // Đảm bảo kiểu dayjs
    const fromDate = dayjs(newRange.from)
    const toDate = dayjs(newRange.to)

    // Nếu giá trị invalid, return luôn hoặc gán về mặc định (optional)
    if (!fromDate.isValid() || !toDate.isValid()) return
    setRangeTarget({ from: fromDate, to: toDate })

    if (fromDate.isAfter(toDate)) {
      return
    }
    dispatch(
      getComparePower({
        tagetDate: toDate.format('DD/MM/YYYY'),
        compareDate: fromDate.format('DD/MM/YYYY'),
        currentPlantId: currentPlantId || '',
      }),
    )
  }
  const currentDate = new Date()
  const currentBarchartData =
    BarChartData?.filter((item: any) => Number(item.label?.slice(0, -1)) <= currentDate.getHours()) || []
  // const currentCompareLineChartData =
  //   compareLineChartData?.slice(0, currentBarchartData.length)?.map((item: any) => ({
  //     value: typeof item === 'number' ? item : item?.value,
  //   })) || []
  const currentCompareLineChartData =
    compareLineChartData
      ?.map((item: any, idx: number) => ({
        id: String(idx),
        label: idx + 'h',
        value: typeof item === 'number' ? item : item?.value,
      }))
      ?.filter((item: any) => Number(item.label?.slice(0, -1)) <= currentDate.getHours()) || []
  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Sản lượng theo thời gian</Text>
          {/* <Text style={styles.live}>LIVE</Text> */}
        </View>

        {/* Legend */}
        <CompareLegend displayType="compareByTime" />

        {/* Dashboard */}
        <CompareDashboardV2
          data={currentBarchartData}
          lineData2={currentCompareLineChartData}
          rangeCompare={rangeCompare}
          rangeTarget={rangeTarget}
          onChangeDateRangeCompare={onChangeDateRangeCompare}
          onChangeDateRangeTarget={onChangeDateRangeTarget}
          isLoading={isLoadingComparePower}
          isCheckDisableDate={isCheckDisableDate}
          scrollToEnd
        />
      </View>
    </AnimatedCardContainer>
  )
}

export default CompareOutputByTime
