import React from 'react'
import { View } from 'react-native'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import HydrographicChart from '@/components/HydrographicChart/HydrographicChart'
import PowerStoreInLake from './PowerStoreInLake/PowerStoreInLake'
import Overview from './Overview/Overview'
import InflowOutflow from './InflowOutflow/InflowOutflow'
import FlowRate from './FlowRate/FlowRate'
import RegulationWaterLevel from './RegulationWaterLevel/RegulationWaterLevel'
import GeneralInformation from './GeneralInformation/GeneralInformation'

function Hydrology() {
  const flowRateData = [
    {
      title: 'Mực nước thượng lưu (MNTL)',
      data: [],
      currentColor: '#0EA5E9',
      unit: 'm',
      flowRateInfo: [
        { label: 'Hiện tại', value: 184.6, color: '#0EA5E9' },
        { label: 'Cao nhất', value: 210.4, color: '#fff' },
        { label: 'Thấp nhất', value: 26.3, color: '#fff' },
      ],
    },
    {
      title: 'Lưu lượng về (Qve)',
      data: [],
      currentColor: '#3B82F6',
      unit: 'm³/s',
      flowRateInfo: [
        { label: 'Hiện tại', value: 184.6, color: '#3B82F6' },
        { label: 'Cao nhất', value: 210.4, color: '#fff' },
        { label: 'TB ngày', value: 26.3, color: '#fff' },
      ],
    },
    {
      title: 'Lưu lượng chạy máy (Qcm)',
      data: [],
      currentColor: '#10B981',
      unit: 'm³/s',
      flowRateInfo: [
        { label: 'Hiện tại', value: 184.6, color: '#10B981' },
        { label: 'Cao nhất', value: 210.4, color: '#fff' },
        { label: 'TB ngày', value: 26.3, color: '#fff' },
      ],
    },
    {
      title: 'Lưu lượng xả tràn (Qxt)',
      data: [],
      currentColor: '#F59E0B',
      unit: 'm³/s',
      flowRateInfo: [
        { label: 'Hiện tại', value: 184.6, color: '#F59E0B' },
        { label: 'Cao nhất', value: 210.4, color: '#fff' },
        { label: 'TB ngày', value: 26.3, color: '#fff' },
      ],
    },
  ] // Dữ liệu mẫu cho FlowRate

  return (
    <SectionContainer title="Thủy văn">
      <View style={{ marginBottom: 20 }}>
        <Overview />
        <HydrographicChart />
        <InflowOutflow />
      </View>
      <View style={{ marginBottom: 20 }}>
        <PowerStoreInLake />
      </View>
      {/* <View style={{ marginBottom: 20 }}>
        <FlowRate title="Mực nước thượng lưu (MNTL)" data={[]} currentColor="#0EA5E9" unit="m" />
      </View>
      <View style={{ marginBottom: 20 }}>
        <FlowRate title="Lưu lượng về (Qve)" data={[]} currentColor="#3B82F6" unit="m³/s" />
      </View>
      <View style={{ marginBottom: 20 }}>
        <FlowRate title="Lưu lượng chạy máy (Qcm)" data={[]} currentColor="#10B981" unit="m³/s" />
      </View>
      <View style={{ marginBottom: 20 }}>
        <FlowRate title="Lưu lượng xả tràn (Qxt)" data={[]} currentColor="#F59E0B" unit="m³/s" />
      </View> */}
      <View style={{ marginBottom: 20 }}>
        <GeneralInformation />
      </View>
      {flowRateData.map((item, index) => (
        <View key={index} style={{ marginBottom: 20 }}>
          <FlowRate
            title={item.title}
            data={item.data}
            currentColor={item.currentColor}
            unit={item.unit}
            flowRateInfo={item.flowRateInfo}
          />
        </View>
      ))}
      <View style={{ marginBottom: 20 }}>
        <RegulationWaterLevel title="Mực nước thượng lưu (MNTL)" />
      </View>
    </SectionContainer>
  )
}

export default Hydrology
