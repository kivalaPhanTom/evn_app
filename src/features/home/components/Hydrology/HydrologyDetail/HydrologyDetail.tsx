import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import GeneralInformation from '../GeneralInformation/GeneralInformation'
import RegulationWaterLevel from '../RegulationWaterLevel/RegulationWaterLevel'
import FlowRate from '../FlowRate/FlowRate'
import FlowDiagramCard from '../FlowDiagramCard/FlowDiagramCard'
import DatePicker from '@/components/DatePicker/DatePicker.component'
import ScrollableTabBar from '@/components/ScrollableTabBar/ScrollableTabBar.component'
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


function HydrologyDetail() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [activeTab, setActiveTab] = useState<string>('buon-tua-srah')

  const tabs = [
    { id: 'buon-tua-srah', label: 'Buôn Tua Srah' },
    { id: 'buon-kuop', label: 'Buôn Kuốp' },
    { id: 'srepok-3', label: 'Srepok 3' },
  ]

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
            format="MM/DD/YYYY"
            textColor="#fff"
            borderColor="rgba(255,255,255,0.15)"
            backgroundColor="rgba(26, 35, 50, 0.6)"
          />
        </View>
        {/* flow diagram here */}
        <View>
          <FlowDiagramCard />
        </View>
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
    </ScrollView>
  )
}

export default HydrologyDetail
