import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import ScrollableTabBar from '@/components/ScrollableTabBar/ScrollableTabBar.component'
import { MaintenanceLevelCard } from '@/components/MaintenanceLevelCard/MaintenanceLevelCard.component'
import styles from './UnitMaintenanceDetails.styles'

const TABS = [
  { id: 'buon-tua-srah', label: 'Buôn Tua Srah' },
  { id: 'buon-kuop', label: 'Buôn Kuôp' },
  { id: 'srepok-3', label: 'Srepok 3' },
]

const MOCK_MAINTENANCE_ITEMS = [
  {
    title: 'SCBD theo RCM - H1',
    level: 'major' as const,
    planned: {
      days: 30,
      startDate: '01/03/2024',
      endDate: '30/03/2024',
    },
    actual: {
      days: 36,
      startDate: '05/03/2024',
      endDate: '10/04/2024',
    },
    timeline: {
      activeMonths: [2, 3],
    },
  },
  {
    title: 'SCBD theo RCM - H2',
    level: 'medium' as const,
    planned: {
      days: 10,
      startDate: '01/03/2025',
      endDate: '10/03/2025',
    },
    actual: {
      days: 9,
      startDate: '02/03/2025',
      endDate: '10/03/2025',
    },
    timeline: {
      activeMonths: [0, 1, 2],
    },
  },
  {
    title: 'SCBD theo RCM - H3',
    level: 'minor' as const,
    planned: {
      days: 2,
      startDate: '10/08/2024',
      endDate: '12/08/2024',
    },
    actual: {
      days: null,
      startDate: null,
      endDate: null,
    },
    timeline: {
      activeMonths: [7],
    },
  },
]

function UnitMaintenanceDetails() {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].id)

  return (
    <ScrollView>
      <ScrollableTabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      <SectionContainer title="Chi tiết hạng mục bảo dưỡng">
        <View style={styles.contentContainer}>
          {MOCK_MAINTENANCE_ITEMS.map((item, index) => (
            <MaintenanceLevelCard
              key={`${item.title}-${index}`}
              title={item.title}
              level={item.level}
              planned={item.planned}
              actual={item.actual}
              timeline={item.timeline}
            />
          ))}
        </View>
      </SectionContainer>
    </ScrollView>
  )
}

export default UnitMaintenanceDetails
