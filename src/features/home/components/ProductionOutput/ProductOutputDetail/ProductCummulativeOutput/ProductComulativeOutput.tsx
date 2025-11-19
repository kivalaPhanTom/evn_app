import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import BarChart, { BarGroup } from '@/components/BarChart/BarChart.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'
import { TabSwitcher } from '@/components/TabSwitcher/TabSwitcher.component'
import WaterDrop from '@/components/WaterDrop/WaterDrop.component'
import { dashboardCommonStyles } from '@/core/styles/sharedStyles'
import { TabType } from '@/core/types'
import { px } from '@/core/utils/scale'
import dayjs from 'dayjs'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, StyleSheet, Text, View } from 'react-native'

const randomValue = () => Math.floor(Math.random() * (100 - 10 + 1)) + 10

const rawBarGroups: BarGroup[] = [
  { label: '1/11', items: [{ value: randomValue(), showValuesOnTop: false }] },
  { label: '2/11', items: [{ value: randomValue(), showValuesOnTop: false }] },
  { label: '3/11', items: [{ value: randomValue(), showValuesOnTop: false }] },
  { label: '4/11', items: [{ value: randomValue(), showValuesOnTop: false }] },
  { label: '5/11', items: [{ value: randomValue(), showValuesOnTop: false }] },
  { label: '6/11', items: [{ value: randomValue(), showValuesOnTop: false }] },
  { label: '7/11', items: [{ value: randomValue(), showValuesOnTop: false }] },
  { label: '8/11', items: [{ value: randomValue(), showValuesOnTop: false }] },
  { label: '9/11', items: [{ value: randomValue(), showValuesOnTop: false }] },
  { label: '10/11', items: [{ value: randomValue(), showValuesOnTop: false }] },
  { label: '11/11', items: [{ value: randomValue(), showValuesOnTop: false, labelWidth: 30 }] },
]

interface CumulativeSummaryItem {
  title: string
  value: string
  unit: string
  date: string
}

const cumulativeSummaryData: CumulativeSummaryItem[] = [
  { title: 'CAO NHẤT', value: '1.96', unit: 'tr.Wh', date: '05/11/2024' },
  { title: 'THẤP NHẤT', value: '1.62', unit: 'tr.Wh', date: '05/11/2024' },
  { title: 'TRUNG BÌNH', value: '1.79', unit: 'tr.Wh', date: '05/11/2024' },
  { title: 'TỔNG LŨY KẾ', value: '17.9', unit: 'tr.Wh', date: '05/11/2024' },
]

export default function ProductCumulativeOutput() {
  const [tab, setTab] = useState<'day' | 'month' | 'year'>('day')
  const { t } = useTranslation()
  const [range, setRange] = useState({
    from: dayjs(),
    to: dayjs(),
  });

  const contentAnim = useRef(new Animated.Value(1)).current

  return (
    <AnimatedCardContainer>
      <Text style={styles.title}>Sản lượng lũy kế</Text>
      <View>
        <TabSwitcher
          tabs={[
            { id: 'day', label: t('byDay') },
            { id: 'month', label: t('byMonth') },
            { id: 'year', label: t('byYear') },
          ]}
          activeTab={tab}
          onTabChange={(newTab) => setTab(newTab as TabType)}
          contentAnim={contentAnim}
        />
      </View>

      <DateRangePicker value={range} onChange={setRange} mode="modal" />

      <View style={dashboardCommonStyles.chartWrapper}>
        <BarChart data={rawBarGroups} frontColor='#60a5fa' rounded barWidth={20} spacing={10} showHorizontalGrid={false} />
      </View>

      <View style={[dashboardCommonStyles.summaryRow]}>
        {cumulativeSummaryData.map((item, idx) => (
          <View key={idx} style={styles.cumulativeCard}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardValue}>
              {item.value} <Text style={styles.cardUnit}>{item.unit}</Text>
            </Text>
            <Text style={styles.cardTitle}>{item.date}</Text>
          </View>
        ))}
      </View>
    </AnimatedCardContainer>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: px.f(24),
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
  },
  cumulativeCard: {
    backgroundColor: '#1e2838',
    borderRadius: 12,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    width: '49%',
  },
  cardTitle: {
    color: '#8b92a0',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  cardValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  cardUnit: {
    fontSize: 16,
    fontWeight: '300',
  },
})
