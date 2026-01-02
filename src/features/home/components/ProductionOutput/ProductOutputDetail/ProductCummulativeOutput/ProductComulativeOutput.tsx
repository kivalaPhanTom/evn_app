import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import BarChart, { BarGroup } from '@/components/BarChart/BarChart.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'
import { TabSwitcher } from '@/components/TabSwitcher/TabSwitcher.component'
import WaterDrop from '@/components/WaterDrop/WaterDrop.component'
import { getProductCummulativeOutput } from '@/core/redux/Actions/ProductOutputActions'
import { RootState } from '@/core/redux/store'
import { dashboardCommonStyles } from '@/core/styles/sharedStyles'
import { TabType } from '@/core/types'
import { px } from '@/core/utils/scale'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Toast } from 'toastify-react-native'
interface CumulativeSummaryItem {
  label: string
  value: string
  unit: string
  periodLabel: string
}

export default function ProductCumulativeOutput(props: { currentPlantId?: string }) {
  const dispatch = useDispatch()
  const { productCummulativeOutput } = useSelector((state: RootState) => state.productOutputSlice)
  const [tab, setTab] = useState<'day' | 'month' | 'year'>('day')
  const { t } = useTranslation()
  const [range, setRange] = useState({
    from: dayjs().subtract(10, 'day'),
    to: dayjs(),
  })

  const contentAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    dispatch(
      getProductCummulativeOutput({
        type: tab,
        from: dayjs().subtract(10, 'day').format('DD/MM/YYYY'),
        to: dayjs().format('DD/MM/YYYY'),
        currentPlantId: props.currentPlantId || '',
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const summary = productCummulativeOutput?.summary ?? {}
  const orderedKeys = ['Max', 'Min', 'Average', 'Total'] as const

  const cumulativeSummaryData: CumulativeSummaryItem[] = orderedKeys
    .map((key) => {
      const item = (summary as any)?.[key] ?? {}
      return {
        label: String(item?.Label ?? ''),
        value: String(item?.Value ?? ''),
        unit: String(item?.Unit ?? ''),
        periodLabel: String(item?.PeriodLabel ?? ''),
      }
    })
    .filter((item) => item.label !== '' || item.value !== '' || item.unit !== '' || item.periodLabel !== '')

  const rawBarGroups: BarGroup[] = (productCummulativeOutput.barGroups || []).map(
    (group: { label: string; value: number }) => ({
      label: group.label,
      items: [{ value: group.value, showValuesOnTop: false }],
    }),
  )

  const onChangeDateRage = (newRange: { from: any; to: any }) => {
    setRange(newRange)
    const fromDate = dayjs(newRange.from)
    const toDate = dayjs(newRange.to)

    if (fromDate.isAfter(toDate)) {
      return
    }

    dispatch(
      getProductCummulativeOutput({
        type: tab,
        from: fromDate.format('DD/MM/YYYY'),
        to: toDate.format('DD/MM/YYYY'),
        currentPlantId: props.currentPlantId || '',
      }),
    )
  }

  const onTabChange = (newTab: TabType) => {
    setTab(newTab)

    if (dayjs(range.from).isAfter(dayjs(range.to))) {
      return
    }
    dispatch(
      getProductCummulativeOutput({
        type: newTab,
        from: dayjs(range.from).format('DD/MM/YYYY'),
        to: dayjs(range.to).format('DD/MM/YYYY'),
        currentPlantId: props.currentPlantId || '',
      }),
    )
  }

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
          onTabChange={(newTab) => onTabChange(newTab as TabType)}
          contentAnim={contentAnim}
        />
      </View>

      <DateRangePicker
        format={tab === 'day' ? 'DD/MM/YYYY' : tab === 'month' ? 'MM/YYYY' : 'YYYY'}
        value={range}
        onChange={onChangeDateRage}
        mode="modal"
        chooseMode={tab}
      />

      <View style={dashboardCommonStyles.chartWrapper}>
        <BarChart
          data={rawBarGroups}
          frontColor="#60a5fa"
          rounded
          barWidth={25}
          spacing={20}
          showHorizontalGrid={false}
        />
      </View>

      <View style={[dashboardCommonStyles.summaryRow]}>
        {cumulativeSummaryData.map((item, idx) => (
          <View key={idx} style={styles.cumulativeCard}>
            <Text style={styles.cardTitle}>{item.label}</Text>
            <Text style={styles.cardValue}>
              {item.value} <Text style={styles.cardUnit}>{item.unit}</Text>
            </Text>
            <Text style={styles.cardTitle}>{item.periodLabel}</Text>
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
