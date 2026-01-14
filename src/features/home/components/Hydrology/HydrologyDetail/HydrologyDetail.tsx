import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import GeneralInformation from '../GeneralInformation/GeneralInformation'
import RegulationWaterLevel from '../RegulationWaterLevel/RegulationWaterLevel'
import FlowRate from '../FlowRate/FlowRate'
import FlowDiagramCard from '../FlowDiagramCard/FlowDiagramCard'
import DatePicker from '@/components/DatePicker/DatePicker.component'
import ScrollableTabBar from '@/components/ScrollableTabBar/ScrollableTabBar.component'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/core/redux/store'
import { getInflow, getOutflow, getTurbineflow, getUpstreamWaterLevel } from '@/core/redux/Actions/HydrologyActions'
import { formatDate } from '@/core/utils/date'
import { LazySection } from '@/components/LazySection/LazySection'

interface HydrologyDetailProps {
  currentPlantId?: string
  scrollY?: number
}

function getCurrentPlantId(activeTab: string): string {
  let result: string = '';
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

function HydrologyDetail(props: HydrologyDetailProps) {
  const { currentPlantId, scrollY = 0 } = props
  const dispatch = useDispatch()
  const { countRefesh } = useSelector((state: any) => state.hydrologySlice)
  const { hydrologyPlants } = useSelector((state: RootState) => state.hydrologySlice)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [activeTab, setActiveTab] = useState<string>(currentPlantId ?? 'BTS')

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

  const upstreamData = useSelector((state: any) => state.hydrologySlice.upstreamWaterLevel || {})
  const inflow = useSelector((state: any) => state.hydrologySlice.inflow || {})
  const outflow = useSelector((state: any) => state.hydrologySlice.outflow || {})
  const turbineflow = useSelector((state: any) => state.hydrologySlice.turbineflow || {})

  useEffect(() => {
    console.log("getHydrologyPlantsInfo reload");
    const payload = {
      currentPlantId: activeTab,
      date: formatDate(selectedDate),
    }
    dispatch(getUpstreamWaterLevel(payload));
    dispatch(getInflow(payload));
    dispatch(getOutflow(payload));
    dispatch(getTurbineflow(payload));
  }, [activeTab, selectedDate, countRefesh, dispatch])

  const preloadOffset = 300; // px before entering viewport

  const shouldLoadGeneralInfo = scrollY >= 200 - preloadOffset;
  const shouldLoadUpstreamChart = scrollY >= 600 - preloadOffset;
  const shouldLoadInflowChart = scrollY >= 1000 - preloadOffset;
  const shouldLoadTurbineflowChart = scrollY >= 1400 - preloadOffset;
  const shouldLoadOutflowChart = scrollY >= 1800 - preloadOffset;


  const convertedUpstreamData = {
    title: 'Mực nước thượng lưu (MNTL)',
    data: upstreamData?.todayUpstream ? JSON.parse(JSON.stringify(upstreamData?.todayUpstream)) : [],
    data2: upstreamData?.samePeriodUpstream ? JSON.parse(JSON.stringify(upstreamData?.samePeriodUpstream)) : [],
    currentColor: '#0EA5E9',
    unit: upstreamData?.unit,
    flowRateInfo: [
      { label: 'Hiện tại', value: upstreamData?.currentValue, color: '#0EA5E9' },
      { label: 'Cao nhất', value: upstreamData?.maxValue, color: '#fff' },
      { label: 'Thấp nhất', value: upstreamData?.minValue, color: '#fff' },
    ],
  }

  const convertedInflowData = {
    title: 'Lưu lượng về (Qve)',
    data: inflow?.todayInflow ? JSON.parse(JSON.stringify(inflow?.todayInflow)) : [],
    data2: inflow?.samePeriodInflow ? JSON.parse(JSON.stringify(inflow?.samePeriodInflow)) : [],
    currentColor: '#3B82F6',
    unit: inflow?.unit,
    flowRateInfo: [
      { label: 'Hiện tại', value: inflow?.currentValue, color: '#3B82F6' },
      { label: 'Cao nhất', value: inflow?.maxValue, color: '#fff' },
      { label: 'TB ngày', value: inflow?.avgValue, color: '#fff' },
    ],
  }

  const convertedOutflowData = {
    title: 'Lưu lượng xả tràn (Qxt)',
    data: outflow?.turbinflowData ? JSON.parse(JSON.stringify(outflow?.turbinflowData)) : [],
    data2: outflow?.samePeriodTurbinflowData ? JSON.parse(JSON.stringify(outflow?.samePeriodTurbinflowData)) : [],
    currentColor: '#F59E0B',
    unit: outflow?.unit,
    flowRateInfo: [
      { label: 'Hiện tại', value: outflow?.currentValue, color: '#F59E0B' },
      { label: 'Cao nhất', value: outflow?.maxValue, color: '#fff' },
      { label: 'TB ngày', value: outflow?.avgValue, color: '#fff' },
    ],
  }

  const convertedTurbineflowData = {
    title: 'Lưu lượng chạy máy (Qcm)',
    data: turbineflow?.turbinflowData ? JSON.parse(JSON.stringify(turbineflow?.turbinflowData)) : [],
    data2: turbineflow?.samePeriodTurbinflowData ? JSON.parse(JSON.stringify(turbineflow?.samePeriodTurbinflowData)) : [],
    currentColor: '#10B981',
    unit: turbineflow?.unit,
    flowRateInfo: [
      { label: 'Hiện tại', value: turbineflow?.currentValue, color: '#10B981' },
      { label: 'Cao nhất', value: turbineflow?.maxValue, color: '#fff' },
      { label: 'TB ngày', value: turbineflow?.avgValue, color: '#fff' },
    ],
  }

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
            textColor="#fff"
            borderColor="rgba(255,255,255,0.15)"
            backgroundColor="rgba(26, 35, 50, 0.6)"
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
        {/* {flowRateData.map((item, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <FlowRate
              title={item.title}
              data={item.data}
              data2={item.data2}
              currentColor={item.currentColor}
              unit={item.unit}
              flowRateInfo={item.flowRateInfo}
            />
          </View>
        ))} */}
        <View style={{ marginBottom: 20 }}>
          <LazySection shouldLoad={shouldLoadUpstreamChart} minHeight={300}>
            <FlowRate
              title={convertedUpstreamData.title}
              data={convertedUpstreamData.data}
              data2={convertedUpstreamData.data2}
              currentColor={convertedUpstreamData.currentColor}
              unit={convertedUpstreamData.unit}
              flowRateInfo={convertedUpstreamData.flowRateInfo}
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
