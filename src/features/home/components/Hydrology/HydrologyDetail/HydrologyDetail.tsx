import { hydrologyLight as light } from '@/core/constants/hydrologyPalette'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, ScrollView, View } from 'react-native'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import GeneralInformation from '../GeneralInformation/GeneralInformation'
import RegulationWaterLevel from '../RegulationWaterLevel/RegulationWaterLevel'
import FlowRate from '../FlowRate/FlowRate'
import FlowDiagramCard from '../FlowDiagramCard/FlowDiagramCard'
import DatePicker from '@/components/DatePicker/DatePicker.component'
import ScrollableTabBar from '@/components/ScrollableTabBar/ScrollableTabBar.component'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { RootState } from '@/core/redux/store'
import {
  getInflow,
  getOutflow,
  getTurbineflow,
  getUpstreamWaterLevel,
  getHydrologyComparison,
} from '@/core/redux/domains/hydrology'
import { formatDate } from '@/core/utils/date'
import { LazySection } from '@/components/LazySection/LazySection'
import FilterByTime from '../FilterByTime/FilterByTime'
import { useAppTheme } from '@/core/hooks/use-app-theme'

interface HydrologyDetailProps {
  currentPlantId?: string
  scrollY?: Animated.Value
}

function getCurrentPlantId(activeTab: string): string {
  let result: string = ''
  switch (activeTab) {
    case 'buon-tua-srah':
      result = 'BTS'
      break
    case 'buon-kuop':
      result = 'BK'
      break
    case 'srepok-3':
      result = 'SP3'
      break
    default:
      break
  }
  return result
}

function prepareChartData(data: any[] | undefined, currentFilterTab: string, currentHour: number) {
  if (!data) return []
  // filter() khong lam thay doi du lieu API, vi vay khong can deep-clone bang JSON truoc moi lan ve bieu do.
  return currentFilterTab === 'hour'
    ? data.filter((item: any) => Number(item.label?.slice(0, -1)) <= currentHour)
    : data
}

function HydrologyDetail(props: HydrologyDetailProps) {
  const { currentPlantId, scrollY } = props
  const dispatch = useAppDispatch()
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const { countRefesh } = useAppSelector((state: any) => state.hydrologySlice)
  const { hydrologyPlants, filterByTime } = useAppSelector((state: RootState) => state.hydrologySlice)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [activeTab, setActiveTab] = useState<string>(currentPlantId ?? 'BTS')
  const [shouldLoadGeneralInfo, setShouldLoadGeneralInfo] = useState(false)
  const [shouldLoadUpstreamChart, setShouldLoadUpstreamChart] = useState(false)
  const [shouldLoadInflowChart, setShouldLoadInflowChart] = useState(false)
  const [shouldLoadTurbineflowChart, setShouldLoadTurbineflowChart] = useState(false)
  const [shouldLoadOutflowChart, setShouldLoadOutflowChart] = useState(false)

  const formattedOneYearAgo = new Date(
    new Date(selectedDate).setFullYear(selectedDate.getFullYear() - 1),
  ).toLocaleDateString('vi-VN')
  const tabs = hydrologyPlants?.plantsData?.map((plant) => {
    const plantId = getCurrentPlantId(plant.abbreviation)
    return {
      id: plantId,
      label: plant.name,
    }
  })

  const upstreamData = useAppSelector((state: any) => state.hydrologySlice.upstreamWaterLevel || {})
  const inflow = useAppSelector((state: any) => state.hydrologySlice.inflow || {})
  const outflow = useAppSelector((state: any) => state.hydrologySlice.outflow || {})
  const turbineflow = useAppSelector((state: any) => state.hydrologySlice.turbineflow || {})
  const currentHour = new Date().getHours()

  useEffect(() => {
    console.log('getHydrologyPlantsInfo reload')
    const payload = {
      currentPlantId: activeTab,
      date: formatDate(selectedDate),
    }
    switch (filterByTime.currentFilterTab) {
      case 'hour':
        const currentDateH = filterByTime?.rangeCurrentDate?.from
        const compareDateH = filterByTime?.rangeCurrentDate?.to
        const payloadH = {
          currentPlantId: activeTab,
          currentDate: formatDate(new Date(currentDateH.toDate())),
          compareDate: formatDate(new Date(compareDateH.toDate())),
          type: 'hour',
        }
        // Gom 4 request thanh mot batch va chi cap nhat Redux mot lan sau khi hoan tat.
        dispatch(getHydrologyComparison({ version: 2, ...payloadH }))
        break
      case 'year':
        const currentDateY = filterByTime?.rangeCompareYear?.from
        const compareDateY = filterByTime?.rangeCompareYear?.to
        const payloadY = {
          currentPlantId: activeTab,
          currentDate: formatDate(new Date(currentDateY.toDate())),
          compareDate: formatDate(new Date(compareDateY.toDate())),
          type: 'year',
        }
        dispatch(getHydrologyComparison({ version: 2, ...payloadY }))
        break

      case 'day':
        const targetFromDateD = filterByTime?.rangeTargetDate?.from
        const targetToDateD = filterByTime?.rangeTargetDate?.to
        const compareFromDateD = filterByTime?.rangeCompareDate?.from
        const compareToDateD = filterByTime?.rangeCompareDate?.to
        const payloadD = {
          currentPlantId: activeTab,
          currentFromDate: formatDate(new Date(targetFromDateD.toDate())),
          currentToDate: formatDate(new Date(targetToDateD.toDate())),
          compareFromDate: formatDate(new Date(compareFromDateD.toDate())),
          compareToDate: formatDate(new Date(compareToDateD.toDate())),
          type: 'day',
        }
        dispatch(getHydrologyComparison({ version: 3, ...payloadD }))
        break
      case 'month':
        const currentFromMonth = filterByTime?.rangeTargetMonth?.from
        const currentToMonth = filterByTime?.rangeTargetMonth?.to
        const compareFromMonth = filterByTime?.rangeCompareMonth?.from
        const compareToMonth = filterByTime?.rangeCompareMonth?.to
        const payloadM = {
          currentPlantId: activeTab,
          currentFromDate: formatDate(new Date(currentFromMonth.toDate())),
          currentToDate: formatDate(new Date(currentToMonth.toDate())),
          compareFromDate: formatDate(new Date(compareFromMonth.toDate())),
          compareToDate: formatDate(new Date(compareToMonth.toDate())),
          type: 'month',
        }
        dispatch(getHydrologyComparison({ version: 3, ...payloadM }))
        break

      default:
        dispatch(getUpstreamWaterLevel(payload))
        dispatch(getInflow(payload))
        dispatch(getOutflow(payload))
        dispatch(getTurbineflow(payload))
        break
    }
  }, [
    activeTab,
    selectedDate,
    countRefesh,
    dispatch,
    filterByTime.currentFilterTab,
    filterByTime?.rangeCurrentDate?.from,
    filterByTime?.rangeCurrentDate?.to,
    filterByTime?.rangeCompareYear?.from,
    filterByTime?.rangeCompareYear?.to,
    filterByTime?.rangeTargetDate?.from,
    filterByTime?.rangeTargetDate?.to,
    filterByTime?.rangeCompareDate?.from,
    filterByTime?.rangeCompareDate?.to,
    filterByTime?.rangeTargetMonth?.from,
    filterByTime?.rangeTargetMonth?.to,
    filterByTime?.rangeCompareMonth?.from,
    filterByTime?.rangeCompareMonth?.to,
  ])

  const preloadOffset = 300 // px before entering viewport
  const thresholds = useRef({
    generalInfo: 200 - preloadOffset,
    upstreamChart: 600 - preloadOffset,
    inflowChart: 1000 - preloadOffset,
    turbineflowChart: 1400 - preloadOffset,
    outflowChart: 1800 - preloadOffset,
  }).current

  useEffect(() => {
    if (!scrollY) return
    const id = scrollY.addListener(({ value }) => {
      if (value >= thresholds.generalInfo) setShouldLoadGeneralInfo(true)
      if (value >= thresholds.upstreamChart) setShouldLoadUpstreamChart(true)
      if (value >= thresholds.inflowChart) setShouldLoadInflowChart(true)
      if (value >= thresholds.turbineflowChart) setShouldLoadTurbineflowChart(true)
      if (value >= thresholds.outflowChart) setShouldLoadOutflowChart(true)
    })
    return () => scrollY.removeListener(id)
  }, [scrollY, thresholds])

  // Keep unaffected chart props stable when another hydrology response changes.
  const convertedUpstreamData = useMemo(
    () => ({
      title: 'Mực nước thượng lưu (MNTL)',
      activeTab: activeTab,
      data: prepareChartData(upstreamData?.todayUpstream, filterByTime.currentFilterTab, currentHour),
      data2: prepareChartData(upstreamData?.samePeriodUpstream, filterByTime.currentFilterTab, currentHour),
      currentColor: isDark ? '#0EA5E9' : light.water,
      unit: upstreamData?.unit,
      flowRateInfo: [
        { label: 'Hiện tại', value: upstreamData?.currentValue, color: isDark ? '#0EA5E9' : light.water },
        { label: 'Cao nhất', value: upstreamData?.maxValue, color: isDark ? '#fff' : light.text },
        { label: 'Thấp nhất', value: upstreamData?.minValue, color: isDark ? '#fff' : light.text },
      ],
    }),
    [upstreamData, filterByTime.currentFilterTab, currentHour, isDark],
  )

  const convertedInflowData = useMemo(
    () => ({
      title: 'Lưu lượng về (Qve)',
      // data: inflow?.todayInflow ? getFromPastToCurrentData(inflow?.todayInflow) : [],  // api v1 dùng todayInflow và samePeriodInflow
      // data2: inflow?.samePeriodInflow ? getFromPastToCurrentData(inflow?.samePeriodInflow) : [], // api v1 dùng todayInflow và samePeriodInflow
      data: prepareChartData(inflow?.todayUpstream, filterByTime.currentFilterTab, currentHour),
      data2: prepareChartData(inflow?.samePeriodUpstream, filterByTime.currentFilterTab, currentHour),
      currentColor: isDark ? '#3B82F6' : light.inflow,
      unit: inflow?.unit,
      flowRateInfo: [
        { label: 'Hiện tại', value: inflow?.currentValue, color: isDark ? '#3B82F6' : light.inflow },
        { label: 'Cao nhất', value: inflow?.maxValue, color: isDark ? '#fff' : light.text },
        { label: 'TB ngày', value: inflow?.avgValue, color: isDark ? '#fff' : light.text },
      ],
    }),
    [inflow, filterByTime.currentFilterTab, currentHour, isDark],
  )

  const convertedOutflowData = useMemo(
    () => ({
      title: 'Lưu lượng xả tràn (Qxt)',
      // data: outflow?.turbinflowData ? getFromPastToCurrentData(outflow?.turbinflowData) : [],  // api v1 dùng turbinflowData và samePeriodTurbinflowData
      // data2: outflow?.samePeriodTurbinflowData ? getFromPastToCurrentData(outflow?.samePeriodTurbinflowData) : [],   // api v1 dùng turbinflowData và samePeriodTurbinflowData
      data: prepareChartData(outflow?.todayUpstream, filterByTime.currentFilterTab, currentHour),
      data2: prepareChartData(outflow?.samePeriodUpstream, filterByTime.currentFilterTab, currentHour),
      currentColor: isDark ? '#F59E0B' : light.outflow,
      unit: outflow?.unit,
      flowRateInfo: [
        { label: 'Hiện tại', value: outflow?.currentValue, color: isDark ? '#F59E0B' : light.outflow },
        { label: 'Cao nhất', value: outflow?.maxValue, color: isDark ? '#fff' : light.text },
        { label: 'TB ngày', value: outflow?.avgValue, color: isDark ? '#fff' : light.text },
      ],
    }),
    [outflow, filterByTime.currentFilterTab, currentHour, isDark],
  )

  const convertedTurbineflowData = useMemo(
    () => ({
      title: 'Lưu lượng chạy máy (Qcm)',
      // data: turbineflow?.turbinflowData ? getFromPastToCurrentData(turbineflow?.turbinflowData) : [],  // api v1 dùng turbinflowData và samePeriodTurbinflowData
      // data2: turbineflow?.samePeriodTurbinflowData ? getFromPastToCurrentData(turbineflow?.samePeriodTurbinflowData) : [],   // api v1 dùng turbinflowData và samePeriodTurbinflowData
      data: prepareChartData(turbineflow?.todayUpstream, filterByTime.currentFilterTab, currentHour),
      data2: prepareChartData(turbineflow?.samePeriodUpstream, filterByTime.currentFilterTab, currentHour),
      currentColor: isDark ? '#10B981' : light.outflow,
      unit: turbineflow?.unit,
      flowRateInfo: [
        { label: 'Hiện tại', value: turbineflow?.currentValue, color: isDark ? '#10B981' : light.outflow },
        { label: 'Cao nhất', value: turbineflow?.maxValue, color: isDark ? '#fff' : light.text },
        { label: 'TB ngày', value: turbineflow?.avgValue, color: isDark ? '#fff' : light.text },
      ],
    }),
    [turbineflow, filterByTime.currentFilterTab, currentHour, isDark],
  )

  return (
    <ScrollView>
      <SectionContainer title="">
        {/* Scrollable Tab Bar */}
        <ScrollableTabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Date Picker */}
        <View style={{ marginBottom: 20, paddingHorizontal: 0 }}>
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            format="DD/MM/YYYY"
            textColor={isDark ? '#fff' : light.text}
            borderColor={isDark ? 'rgba(255,255,255,0.15)' : light.border}
            backgroundColor={isDark ? 'rgba(26, 35, 50, 0.6)' : '#FFFFFF'}
          />
        </View>
        {/* flow diagram here */}
        <View>
          <FlowDiagramCard
            dateStr={formatDate(selectedDate)}
            oneYearAgo={formattedOneYearAgo}
            currentPlantId={activeTab}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <LazySection shouldLoad={shouldLoadGeneralInfo} minHeight={300}>
            <GeneralInformation date={formatDate(selectedDate)} currentPlantId={activeTab} />
          </LazySection>
        </View>
        <View style={{ marginBottom: 20 }}>
          <LazySection shouldLoad={shouldLoadGeneralInfo} minHeight={300}>
            <FilterByTime date={formatDate(selectedDate)} currentPlantId={activeTab} />
          </LazySection>
        </View>
        <View style={{ marginBottom: 20 }}>
          <LazySection shouldLoad={shouldLoadUpstreamChart} minHeight={300}>
            <FlowRate
              title={convertedUpstreamData.title}
              data={convertedUpstreamData.data}
              data2={convertedUpstreamData.data2}
              currentColor={convertedUpstreamData.currentColor}
              unit={convertedUpstreamData.unit}
              flowRateInfo={convertedUpstreamData.flowRateInfo}
              showPointer={
                filterByTime.currentFilterTab === 'day' || filterByTime.currentFilterTab === 'month' ? true : false
              }
            />
          </LazySection>
        </View>
        <View style={{ marginBottom: 20 }}>
          <LazySection shouldLoad={shouldLoadInflowChart} minHeight={300}>
            <FlowRate
              title={convertedInflowData.title}
              data={convertedInflowData.data}
              data2={convertedInflowData.data2}
              currentColor={convertedInflowData.currentColor}
              unit={convertedInflowData.unit}
              flowRateInfo={convertedInflowData.flowRateInfo}
              showPointer={
                filterByTime.currentFilterTab === 'day' || filterByTime.currentFilterTab === 'month' ? true : false
              }
            />
          </LazySection>
        </View>
        <View style={{ marginBottom: 20 }}>
          <LazySection shouldLoad={shouldLoadTurbineflowChart} minHeight={300}>
            <FlowRate
              title={convertedTurbineflowData.title}
              data={convertedTurbineflowData.data}
              data2={convertedTurbineflowData.data2}
              currentColor={convertedTurbineflowData.currentColor}
              unit={convertedTurbineflowData.unit}
              flowRateInfo={convertedTurbineflowData.flowRateInfo}
              showPointer={
                filterByTime.currentFilterTab === 'day' || filterByTime.currentFilterTab === 'month' ? true : false
              }
            />
          </LazySection>
        </View>
        <View style={{ marginBottom: 20 }}>
          <LazySection shouldLoad={shouldLoadOutflowChart} minHeight={300}>
            <FlowRate
              title={convertedOutflowData.title}
              data={convertedOutflowData.data}
              data2={convertedOutflowData.data2}
              currentColor={convertedOutflowData.currentColor}
              unit={convertedOutflowData.unit}
              flowRateInfo={convertedOutflowData.flowRateInfo}
              showPointer={
                filterByTime.currentFilterTab === 'day' || filterByTime.currentFilterTab === 'month' ? true : false
              }
            />
          </LazySection>
        </View>
        <View style={{ marginBottom: 20 }}>
          {activeTab === 'BTS' && <RegulationWaterLevel title="Mực nước thượng lưu (MNTL)" />}
        </View>
      </SectionContainer>
    </ScrollView>
  )
}

export default HydrologyDetail
