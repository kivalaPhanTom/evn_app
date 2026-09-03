import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { px } from '@/core/utils/scale'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { Ionicons } from '@expo/vector-icons'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import { Colors } from '@/core/constants/colors'
import { BarGroup } from '@/core/types'
import BarChart from '@/components/BarChart/BarChart.component'
import { useDispatch, useSelector } from 'react-redux'
import { getProfitFactDetail } from '@/core/redux/domains/revenue-profit'
import { RootState } from '@/core/redux/store'
import { LineChart } from '@/components/ChartView/LineChart.component'

interface ProfitFactDetailProps {
  currentPlantId: string
  keyTab: number
  currentPlantName?: string
}

export default function ProfitDetail(props: ProfitFactDetailProps) {
  const { currentPlantId, keyTab, currentPlantName } = props
  const dispatch = useDispatch()
  const router = useRouter()
  const { profitFactDetail, isLoadingProfit } = useSelector((state: RootState) => state.revenueProfitSlice)
  const { activeTabIndex } = useSelector((state: RootState) => state.powerSlice)
  const { countRefesh } = useSelector((state: any) => state.refreshSlice)
  const fromParts = profitFactDetail.Chart.Period.From?.split('-') ?? []
  const toParts = profitFactDetail.Chart.Period.To?.split('-') ?? []
  const fromDay = fromParts[2] ?? ''
  const toDay = toParts[2] ?? ''
  const toMonth = toParts[1] ?? ''
  // console.log('profitFactDetail data in ProfitDetail ewew:', profitFactDetail.Cumulative.Week)
  const values: { label: string; value: number }[] = profitFactDetail.Chart.Data.map((item: { value: number }) => ({
    label: '',
    value: Number(item.value),
  }))

  const data = [
    { value: 1.3, label: '01/11' },
    { value: 1.8, label: '02/11' },
    { value: 1.1, label: '03/11' },
    { value: 1.6, label: '04/11' },
    { value: 1.9, label: '05/11' },
    { value: 1.4, label: '06/11' },
    { value: 1.2, label: '07/11' },
    { value: 1.7, label: '08/11' },
    { value: 1.5, label: '09/11' },
    { value: 1.8, label: '10/11' },
    { value: 1.3, label: '11/11' },
    { value: 1.9, label: '12/11' },
    { value: 1.1, label: '13/11' },
    { value: 1.6, label: '14/11' },
    { value: 1.4, label: '15/11' },
    { value: 1.7, label: '16/11' },
    { value: 1.2, label: '17/11' },
    { value: 1.8, label: '18/11' },
    { value: 1.5, label: '19/11' },
    { value: 1.9, label: '20/11' },
    { value: 1.3, label: '21/11' },
    { value: 1.6, label: '22/11' },
    { value: 1.1, label: '23/11' },
    { value: 1.7, label: '24/11' },
    { value: 1.4, label: '25/11' },
    { value: 1.8, label: '26/11' },
    { value: 1.2, label: '27/11' },
    { value: 1.5, label: '28/11' },
    { value: 1.9, label: '29/11' },
    { value: 1.3, label: '30/11' },
    { value: 1.6, label: '31/11' },
  ]

  const data2 = [
    { value: 1.7, label: '01/11' },
    { value: 1.2, label: '02/11' },
    { value: 1.9, label: '03/11' },
    { value: 1.4, label: '04/11' },
    { value: 1.6, label: '05/11' },
    { value: 1.1, label: '06/11' },
    { value: 1.8, label: '07/11' },
    { value: 1.3, label: '08/11' },
    { value: 1.5, label: '09/11' },
    { value: 1.9, label: '10/11' },
    { value: 1.2, label: '11/11' },
    { value: 1.6, label: '12/11' },
    { value: 1.4, label: '13/11' },
    { value: 1.8, label: '14/11' },
    { value: 1.1, label: '15/11' },
    { value: 1.7, label: '16/11' },
    { value: 1.3, label: '17/11' },
    { value: 1.9, label: '18/11' },
    { value: 1.5, label: '19/11' },
    { value: 1.2, label: '20/11' },
    { value: 1.6, label: '21/11' },
    { value: 1.8, label: '22/11' },
    { value: 1.4, label: '23/11' },
    { value: 1.7, label: '24/11' },
    { value: 1.1, label: '25/11' },
    { value: 1.9, label: '26/11' },
    { value: 1.3, label: '27/11' },
    { value: 1.5, label: '28/11' },
    { value: 1.8, label: '29/11' },
    { value: 1.2, label: '30/11' },
    { value: 1.6, label: '31/11' },
  ]

  const data3 = [
    { value: 1.2, label: '01/11' },
    { value: 1.7, label: '02/11' },
    { value: 1.4, label: '03/11' },
    { value: 1.8, label: '04/11' },
    { value: 1.1, label: '05/11' },
    { value: 1.2, label: '06/11' },
    { value: 1.5, label: '07/11' },
    { value: 1.6, label: '08/11' },
    { value: 1.9, label: '09/11' },
    { value: 1.7, label: '10/11' },
    { value: 1, label: '11/11' },
    { value: 1.3, label: '12/11' },
    { value: 1.2, label: '13/11' },
    { value: 1.1, label: '14/11' },
    { value: 1.4, label: '15/11' },
    { value: 1.5, label: '16/11' },
    { value: 1.9, label: '17/11' },
    { value: 1.8, label: '18/11' },
    { value: 1.5, label: '19/11' },
    { value: 1.6, label: '20/11' },
    { value: 1.8, label: '21/11' },
    { value: 1.4, label: '22/11' },
    { value: 1.8, label: '23/11' },
    { value: 1.1, label: '24/11' },
    { value: 1.7, label: '25/11' },
    { value: 1.4, label: '26/11' },
    { value: 1.6, label: '27/11' },
    { value: 1.2, label: '28/11' },
    { value: 1.3, label: '29/11' },
    { value: 1.7, label: '30/11' },
    { value: 1.9, label: '31/11' },
  ]

  const rawBarGroups: BarGroup[] = values.map(({ label, value }: { label: string; value: number }) => ({
    label,
    items: [
      {
        value,
        frontColor: value < 0 ? Colors.red : Colors.green,
        showValuesOnTop: true,
        showPrefix: value > 0,
      },
    ],
  }))

  useEffect(() => {
    if (activeTabIndex === keyTab) {
      dispatch(getProfitFactDetail({ currentPlantId }))
    }
  }, [dispatch, currentPlantId, activeTabIndex, keyTab, countRefesh])

  // Build x-axis labels: last 6 days + "Nay" for today
  const today = new Date()
  const formatDay = (d: Date) => `${String(d.getDate()).padStart(2, '0')}`
  const formatDayWithMonth = (d: Date) =>
    `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
  const endDate = new Date(today)
  endDate.setDate(today.getDate() - 1) //
  const prevDate = new Date(endDate)
  prevDate.setDate(prevDate.getDate() - 1)
  const xAxisLabels = values.map((_, idx) => {
    const d = new Date(endDate)
    d.setDate(endDate.getDate() - (values.length - 1 - idx))
    return formatDay(d)
  })

  // Collect negative days for warning cards
  const negativeDays = values
    .map((v, idx) => {
      const d = new Date(endDate)
      d.setDate(endDate.getDate() - (values.length - 1 - idx))
      return { dateStr: formatDayWithMonth(d), value: v.value }
    })
    .filter((x) => x.value < 0)
  const onPressCard = () => {
    router.navigate({
      pathname: '/profit-detail' as any,
      params: {
        plantId: currentPlantId,
        plantName: currentPlantName
      },
    })
  }

  return (
    <SectionContainer title="Lợi nhuận">
      <AnimatedCardContainer onPress={onPressCard}>
        <View>
          <Text style={styles.revenueTitle}>{`Lợi nhuận ngày ${formatDayWithMonth(endDate)}`}</Text>
          <Text style={[styles.cardValue, { fontSize: px.f(70) }]}>
            {profitFactDetail.Today.Value} <Text style={styles.cardUnit}>{profitFactDetail.Today.Unit}</Text>
          </Text>
          <MetricDiff
            style={{ fontSize: px.f(20) }}
            withBackground
            unit={profitFactDetail.Today.Unit}
            diff={profitFactDetail.Today.ChangeValue}
            label={`so với ngày ${formatDayWithMonth(prevDate)}`}
          />
        </View>
        <View style={{ marginTop: px.v(10) }}>
          <View style={styles.revenueCard}>
            <View>
              <Text style={[styles.cardTitle, { color: '#A5B4FC' }]}>{`Lũy kế tuần`}</Text>
              <Text style={styles.cardValue}>
                {profitFactDetail.Cumulative.Week.Value} <Text style={styles.cardUnit}>{profitFactDetail.Cumulative.Week.Unit}</Text>
              </Text>
            </View>
            <View>
              <MetricDiff withBackground unit={profitFactDetail.Cumulative.Week.Unit} diff={profitFactDetail.Cumulative.Week.ChangeValue} />
            </View>
          </View>
        </View>
        <View>
          <View style={[styles.revenueCard, { backgroundColor: 'rgba(251, 191, 36, 0.1)' }]}>
            <View>
              <Text
                style={[styles.cardTitle, { color: '#FCD34D' }]}
              >{`Lũy kế tháng ${profitFactDetail.Cumulative.Month.month?.split('-')[1] ?? ''}`}</Text>
              <Text style={styles.cardValue}>
                {profitFactDetail.Cumulative.Month.Value} <Text style={styles.cardUnit}>{profitFactDetail.Cumulative.Month.Unit}</Text>
              </Text>
            </View>
            <View>
              <MetricDiff withBackground unit={profitFactDetail.Cumulative.Month.Unit} diff={profitFactDetail.Cumulative.Month.ChangeValue} />
            </View>
          </View>
        </View>
        <View>
          <View
            style={[styles.profitCard, { backgroundColor: '#1e2838' }]}
            onStartShouldSetResponder={() => true}
            onResponderTerminationRequest={() => false}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.profitByDayTitle}>Lãi/Lỗ theo ngày</Text>
              <View
                style={{
                  paddingHorizontal: px.h(12),
                  paddingVertical: px.v(6),
                  backgroundColor: '#1f2937',
                  borderRadius: px.h(18),
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.12)',
                }}
              >
                <Text style={{ color: '#8b92a0', fontSize: px.f(16) }}>
                  {fromDay} - {toDay}/{toMonth}
                </Text>
              </View>
            </View>
            <View style={[styles.chartWrapper]}>
              <BarChart topLabelOffset={0} data={rawBarGroups} rounded noOfSection={3} disableScroll />
            </View>

            {/* X-Axis below chart */}
            <View style={styles.axisContainer}>
              <View style={[styles.axisLabelsRow, { justifyContent: 'flex-start' }]}>
                {xAxisLabels.map((label, idx) => {
                  const isToday = idx === xAxisLabels.length
                  const isNegative = values[idx].value < 0
                  const color = isToday ? '#8b92a0' : isNegative ? Colors.red : '#8b92a0'
                  return (
                    <View key={idx} style={{ flex: 1, alignItems: 'center' }}>
                      <Text style={[styles.axisLabel, { color }]}>{label}</Text>
                    </View>
                  )
                })}
              </View>
              <View style={styles.axisDivider} />
              {/* Legend */}
              <View style={styles.legendRow}>
                <View style={[styles.legendItem]}>
                  <View style={[styles.legendSwatch, { backgroundColor: Colors.green }]} />
                  <Text style={styles.legendText}>Lãi</Text>
                </View>
                <View style={[styles.legendItem, { marginLeft: px.h(24) }]}>
                  <View style={[styles.legendSwatch, { backgroundColor: Colors.red }]} />
                  <Text style={styles.legendText}>Lỗ</Text>
                </View>
              </View>

              {/* Warning cards for negative days */}
              <View style={{ marginTop: px.v(12) }}>
                {negativeDays.map((item, idx) => (
                  <View key={idx} style={styles.warningCard}>
                    <Ionicons
                      name="warning-outline"
                      size={px.f(18)}
                      color={Colors.red}
                      style={{ marginRight: px.h(8) }}
                    />
                    <Text style={styles.warningText}>
                      {`Ngày ${item.dateStr} ghi nhận lỗ ${item.value} tỷ`}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </AnimatedCardContainer>
    </SectionContainer>
  )
}

const styles = StyleSheet.create({
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
  profitCard: {
    flexDirection: 'column',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 12,
    marginTop: px.v(20),
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  chartWrapper: {
    marginTop: px.v(8),
    marginBottom: px.v(12),
    marginLeft: px.h(-12),
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  // X-Axis & Legend styles
  axisContainer: {
    marginTop: px.v(8), // space below chart
    paddingTop: px.v(8),
  },
  axisDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginVertical: px.v(20),
  },
  axisLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  axisLabel: {
    fontSize: px.f(14),
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendSwatch: {
    width: px.h(16),
    height: px.h(16),
    borderRadius: 4,
    marginRight: px.h(8),
  },
  legendText: {
    color: '#8b92a0',
    fontSize: px.f(16),
  },
  // Warning card styles
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: px.h(12),
    paddingHorizontal: px.h(12),
    paddingVertical: px.v(10),
    marginTop: px.v(8),
  },
  warningText: {
    color: Colors.red,
    fontSize: px.f(16),
  },
  cardTitle: {
    color: '#8b92a0',
    fontSize: px.f(16),
    textTransform: 'uppercase',
  },
  profitByDayTitle: {
    color: '#fff',
    fontSize: px.f(20),
  },
  revenueTitle: {
    color: '#8b92a0',
    fontSize: px(20),
    textTransform: 'uppercase',
  },
  revenueCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 12,
    marginTop: px.v(20),
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: px.v(6),
  },
  cardUnit: {
    fontSize: 16,
    fontWeight: '300',
  },
  line: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 15,
  },
  legendLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
})
