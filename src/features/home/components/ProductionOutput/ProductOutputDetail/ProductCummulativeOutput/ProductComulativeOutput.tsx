import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import BarChart, { BarGroup } from '@/components/BarChart/BarChart.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'
import MonthPickerCustom from '@/components/MonthPickerCustom/MonthPickerCustom.component'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import LineBarChartSkeleton from '@/components/Skeletons/LineBarChartSkeleton'
import { TabSwitcher } from '@/components/TabSwitcher/TabSwitcher.component'
import WaterDrop from '@/components/WaterDrop/WaterDrop.component'
import { getProductCummulativeOutput } from '@/core/redux/domains/production-output'
import { RootState } from '@/core/redux/store'
import { dashboardCommonStyles } from '@/core/styles/sharedStyles'
import { TabType } from '@/core/types'
import { px } from '@/core/utils/scale'
import dayjs from 'dayjs'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { Toast } from 'toastify-react-native'
interface CumulativeSummaryItem {
  label: string
  value: string
  unit: string
  periodLabel: string
}

export default function ProductCumulativeOutput(props: { currentPlantId?: string }) {
  const dispatch = useAppDispatch()
  const { productCummulativeOutput, isLoadingProductCummulativeOutput } = useAppSelector((state: RootState) => state.productOutputSlice)
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const [tab, setTab] = useState<'day' | 'month' | 'year'>('day')
  const [comparePeriodEnabled, setComparePeriodEnabled] = useState(false)
  const { t } = useTranslation()

  const getDefaultRange = (type: 'day' | 'month' | 'year') => {
    const now = dayjs()

    if (type === 'day') {
      return {
        from: now.subtract(10, 'day'),
        to: now,
      }
    }

    if (type === 'month') {
      return {
        from: now.startOf('year'),   // January of current year
        to: now.endOf('month'),      // End of current month
      }
    }

    if (type === 'year') {
      return {
        from: now.subtract(4, 'year').startOf('year'), // currentYear - 4
        to: now.endOf('year'),                         // currentYear
      }
    }

    return { from: now, to: now }
  }
  const [range, setRange] = useState(getDefaultRange('day'))
  console.log(range);

  const contentAnim = useRef(new Animated.Value(1)).current

  const fetchProductCummulativeOutput = (params: {
    type: string
    from: string
    to: string
    startEndOnly?: boolean
  }) => {
    dispatch(
      getProductCummulativeOutput({
        ...params,
        currentPlantId: props.currentPlantId || '',
      }),
    )
  }

  useEffect(() => {
    fetchProductCummulativeOutput({
      type: tab,
      from: dayjs(range.from).format('DD/MM/YYYY'),
      to: dayjs(range.to).format('DD/MM/YYYY'),
      startEndOnly: comparePeriodEnabled || undefined,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countRefesh])

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
      items: [{ value: group.value, showValuesOnTop: true }],
    }),
  )

  const onChangeDateRage = (newRange: { from: any; to: any }) => {
    const fromDate = dayjs(newRange.from)
    const toDate = dayjs(newRange.to)
    if (fromDate.isAfter(toDate)) {
      Toast.warn('Ngày bắt đầu không được sau ngày kết thúc')
      return
    }
    setRange(newRange)
    fetchProductCummulativeOutput({
      type: tab,
      from: fromDate.format('DD/MM/YYYY'),
      to: toDate.format('DD/MM/YYYY'),
      startEndOnly: comparePeriodEnabled || undefined,
    })
  }

  const onTabChange = (newTab: TabType) => {
    setTab(newTab)

    const newRange = getDefaultRange(newTab)
    setRange(newRange)
    if (dayjs(range.from).isAfter(dayjs(range.to))) {
      return
    }
    fetchProductCummulativeOutput({
      type: newTab,
      from: newRange.from.format('DD/MM/YYYY'),
      to: newRange.to.format('DD/MM/YYYY'),
      startEndOnly: comparePeriodEnabled || undefined,
    })
  }

  const onToggleComparePeriod = () => {
    const newValue = !comparePeriodEnabled
    setComparePeriodEnabled(newValue)
    fetchProductCummulativeOutput({
      type: tab,
      from: dayjs(range.from).format('DD/MM/YYYY'),
      to: dayjs(range.to).format('DD/MM/YYYY'),
      startEndOnly: newValue || undefined,
    })
  }

  return (
    <AnimatedCardContainer>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Sản lượng lũy kế</Text>
      </View>
      <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={onToggleComparePeriod}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, comparePeriodEnabled && styles.checkboxChecked]}>
            {comparePeriodEnabled && <Ionicons name="checkmark" size={14} color="#fff" />}
          </View>
          <Text style={styles.checkboxLabel}>So sánh đầu kỳ – cuối kỳ</Text>
        </TouchableOpacity>
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

      {tab === 'day' ? (
        <DateRangePicker format="DD/MM/YYYY" value={range} onChange={onChangeDateRage} mode="modal" noRangeConstraint chooseMode="day" />
      ) : (
        <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
          <MonthPickerCustom
            selectedDate={dayjs(range.from)}
            containerStyle={{ width: px(190) }}
            label={tab === 'year' ? 'Từ năm:' : 'Từ tháng:'}
            formatMonth={(date) => (tab === 'year' ? `${date.format('YYYY')}` : `${date.format('MM/YYYY')}`)}
            onConfirm={(date) => {
              const picked = dayjs(date)
              const fromDate = tab === 'year' ? picked.startOf('year') : picked.startOf('month')
              const newRange = { ...range, from: fromDate }
              if (fromDate.isAfter(dayjs(newRange.to))) {
                Toast.warn(
                  tab === 'year'
                    ? 'Năm bắt đầu không được sau năm kết thúc'
                    : 'Tháng bắt đầu không được sau tháng kết thúc',
                )
                return
              }
              setRange(newRange)
              fetchProductCummulativeOutput({
                type: tab,
                from: fromDate.format('DD/MM/YYYY'),
                to: dayjs(newRange.to).format('DD/MM/YYYY'),
                startEndOnly: comparePeriodEnabled || undefined,
              })
            }}
          />
          <MonthPickerCustom
            selectedDate={dayjs(range.to)}
            label={tab === 'year' ? 'Đến năm:' : 'Đến tháng:'}
            formatMonth={(date) => (tab === 'year' ? `${date.format('YYYY')}` : `${date.format('MM/YYYY')}`)}
            containerStyle={{ width: px(190) }}
            onConfirm={(date) => {
              const picked = dayjs(date)
              const toDate = tab === 'year' ? picked.endOf('year') : picked.endOf('month')
              const newRange = { ...range, to: toDate }
              if (dayjs(newRange.from).isAfter(toDate)) {
                Toast.warn(
                  tab === 'year'
                    ? 'Năm bắt đầu không được sau năm kết thúc'
                    : 'Tháng bắt đầu không được sau tháng kết thúc',
                )
                return
              }
              setRange(newRange)
              fetchProductCummulativeOutput({
                type: tab,
                from: dayjs(newRange.from).format('DD/MM/YYYY'),
                to: toDate.format('DD/MM/YYYY'),
                startEndOnly: comparePeriodEnabled || undefined,
              })
            }}
          />
        </View>
      )}

      <View style={dashboardCommonStyles.chartWrapper}>
        {
          isLoadingProductCummulativeOutput ? <LineBarChartSkeleton isShowLine={false} /> :
            <BarChart
              data={rawBarGroups}
              frontColor="#60a5fa"
              rounded
              barWidth={25}
              spacing={20}
              showHorizontalGrid={false}
            />
        }
      </View>

      <View style={[dashboardCommonStyles.summaryRow]}>
        {cumulativeSummaryData.map((item, idx) => (
          <View key={idx} style={styles.cumulativeCard}>
            <Text style={styles.cardTitle}>{item.label}</Text>
            {
              isLoadingProductCummulativeOutput ?
                <>
                  <BarSkeleton height={20} />
                  <BarSkeleton width={80} height={15} />
                </> :
                <>
                  <Text style={styles.cardValue}>
                    {item.value} <Text style={styles.cardUnit}>{item.unit}</Text>
                  </Text>
                  <Text style={styles.cardTitle}>{item.periodLabel}</Text>
                </>
            }
          </View>
        ))}
      </View>
    </AnimatedCardContainer>
  )
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: px.f(24),
    fontWeight: 'bold',
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#60a5fa',
    borderColor: '#60a5fa',
  },
  checkboxLabel: {
    color: '#fff',
    fontSize: px.f(14),
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
