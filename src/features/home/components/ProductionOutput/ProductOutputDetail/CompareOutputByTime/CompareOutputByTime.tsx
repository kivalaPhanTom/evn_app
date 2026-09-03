import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import styles from './CompareOutputByTime.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import CompareLegend from '@/core/shared/CompareLegend'
import { useDispatch, useSelector } from 'react-redux'
import { getComparePower } from '@/core/redux/Actions/PowerActions'
import dayjs from 'dayjs'
import CompareDashboardV2 from '@/core/shared/CompareDashboard/CompareDashboardV2'
import { getProductOutputCompareChart } from '@/core/redux/Actions/ProductOutputActions'

function CompareOutputByTime(props: { currentPlantId?: string; isCheckDisableDate: boolean }) {
  const { currentPlantId, isCheckDisableDate } = props
  const dispatch = useDispatch()
  const productOutputCompareChartData = useSelector(
    (state: any) => state.productOutputSlice.productOutputCompareChart || {},
  )
  const { isLoadingProductOutputCompareChart } = useSelector((state: any) => state.productOutputSlice)
  const { countRefesh } = useSelector((state: any) => state.refreshSlice)
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
      getProductOutputCompareChart({
        currentFromDate: rangeTarget.from.format('DD/MM/YYYY'),
        currentToDate: rangeTarget.to.format('DD/MM/YYYY'),
        compareFromDate: rangeCompare.from.format('DD/MM/YYYY'),
        compareToDate: rangeCompare.to.format('DD/MM/YYYY'),
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
      getProductOutputCompareChart({
        currentFromDate: rangeTarget.from.format('DD/MM/YYYY'),
        currentToDate: rangeTarget.to.format('DD/MM/YYYY'),
        compareFromDate: fromDate.format('DD/MM/YYYY'),
        compareToDate: toDate.format('DD/MM/YYYY'),
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
      getProductOutputCompareChart({
        currentFromDate: fromDate.format('DD/MM/YYYY'),
        currentToDate: toDate.format('DD/MM/YYYY'),
        compareFromDate: rangeCompare.from.format('DD/MM/YYYY'),
        compareToDate: rangeCompare.to.format('DD/MM/YYYY'),
        currentPlantId: currentPlantId || '',
      }),
    )
  }

  const currentLineData = productOutputCompareChartData
    ?.map((item: any) => {
      return {
        label: item.date?.split('/').slice(0, 2).join('/'),
        value: item.currentValue,
      }
    })
    .filter((item: any) => item.value > -1)

  const compareLineData = productOutputCompareChartData
    ?.map((item: any) => {
      return {
        label: item.date?.split('/').slice(0, 2).join('/'),
        value: item.compareValue,
      }
    })
    .filter((item: any) => item.value > -1)
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
          data={currentLineData}
          lineData2={compareLineData}
          rangeCompare={rangeCompare}
          rangeTarget={rangeTarget}
          onChangeDateRangeCompare={onChangeDateRangeCompare}
          onChangeDateRangeTarget={onChangeDateRangeTarget}
          isLoading={isLoadingProductOutputCompareChart}
          isCheckDisableDate={isCheckDisableDate}
          scrollToEnd
        />
      </View>
    </AnimatedCardContainer>
  )
}

export default CompareOutputByTime
