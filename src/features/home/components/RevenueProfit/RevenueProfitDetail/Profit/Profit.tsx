import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { px } from '@/core/utils/scale'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { dashboardCommonStyles } from '@/core/styles/sharedStyles'
import { Ionicons } from '@expo/vector-icons'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import { Colors } from '@/core/constants/colors'
import { BarGroup } from '@/core/types'
import BarChart from '@/components/BarChart/BarChart.component'
import { useDispatch, useSelector } from 'react-redux'
import { getProfit } from '@/core/redux/Actions/RevenueProfitActions'
import { RootState } from '@/core/redux/store'
import { LineChart } from '@/components/ChartView/LineChart.component'

export default function ProfitDetail() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { profit, isLoadingProfit } = useSelector((state: RootState) => state.revenueProfitSlice)
  const { countRefesh } = useSelector((state: any) => state.homeSlice)
  const fromParts = profit.Chart.Period.From?.split('-') ?? []
  const toParts = profit.Chart.Period.To?.split('-') ?? []
  const fromDay = fromParts[2] ?? ''
  const toDay = toParts[2] ?? ''
  const toMonth = toParts[1] ?? ''
  // console.log('profit data in ProfitDetail ewew:', profit.Cumulative.Week)
  const values: { label: string; value: number }[] = profit.Chart.Data.map((item: { value: number }) => ({
    label: '',
    value: Number(item.value),
  }))

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
    dispatch(getProfit())
  }, [countRefesh])

  // Build x-axis labels: last 6 days + "Nay" for today
  const today = new Date()
  const formatDay = (d: Date) => `${String(d.getDate()).padStart(2, '0')}`
  const formatDayWithMonth = (d: Date) =>
    `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
  const endDate = new Date(today)
  endDate.setDate(today.getDate() - 1) //
  const xAxisLabels = values.map((_, idx) => {
    const d = new Date(endDate)
    d.setDate(endDate.getDate() - (values.length - 1 - idx))
    return formatDay(d)
  })

  // Collect negative days for warning cards
  const negativeDays = values
    .map((v, idx) => {
      const d = new Date(today)
      d.setDate(today.getDate() - (values.length - 1 - idx))
      return { dateStr: formatDayWithMonth(d), value: v.value }
    })
    .filter((x) => x.value < 0)
  const onPressCard = () => {
    router.navigate({ pathname: '/factory-profit-detail' as any })
  }

  return (
    <SectionContainer
      title="Lợi nhuận"
      actionButton={{
        label: 'Thêm chi tiết',
        onPress: onPressCard,
      }}
    >
      <AnimatedCardContainer>
        <View>
          <Text style={styles.revenueTitle}>{`Lợi nhuận hôm nay`}</Text>
          <Text style={[styles.cardValue, { fontSize: px.f(70) }]}>
            {profit.Today.Value} <Text style={styles.cardUnit}>{profit.Today.Unit}</Text>
          </Text>
          <MetricDiff
            style={{ fontSize: px.f(20) }}
            withBackground
            diff={profit.Today.ChangePercent / 100}
            label="so với hôm qua"
          />
        </View>
        <View style={{ marginTop: px.v(10) }}>
          <View style={styles.revenueCard}>
            <View>
              <Text style={[styles.cardTitle, { color: '#A5B4FC' }]}>{`Lũy kế tuần`}</Text>
              <Text style={styles.cardValue}>
                {profit.Cumulative.Week.Value} <Text style={styles.cardUnit}>{profit.Cumulative.Week.Unit}</Text>
              </Text>
            </View>
            <View>
              <MetricDiff withBackground diff={profit.Cumulative.Week.ChangePercent / 100} />
            </View>
          </View>
        </View>
        <View>
          <View style={[styles.revenueCard, { backgroundColor: 'rgba(251, 191, 36, 0.1)' }]}>
            <View>
              <Text
                style={[styles.cardTitle, { color: '#FCD34D' }]}
              >{`Lũy kế tháng ${profit.Cumulative.Month.month?.split('-')[1] ?? ''}`}</Text>
              <Text style={styles.cardValue}>
                {profit.Cumulative.Month.Value} <Text style={styles.cardUnit}>{profit.Cumulative.Month.Unit}</Text>
              </Text>
            </View>
            <View>
              <MetricDiff withBackground diff={profit.Cumulative.Month.ChangePercent / 100} />
            </View>
          </View>
        </View>
        <View>
          <View style={[styles.profitCard, { backgroundColor: '#1e2838' }]}>
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
              <BarChart data={rawBarGroups} rounded noOfSection={3} disableScroll />
            </View>

            {/* X-Axis below chart */}
            <View style={styles.axisContainer}>
              <View style={[styles.axisLabelsRow, { justifyContent: 'flex-start' }]}>
                {xAxisLabels.map((label, idx) => {
                  const isToday = idx === xAxisLabels.length - 1
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
                      {`Ngày ${item.dateStr} ghi nhận lỗ ${item.value.toFixed(0)} tỷ`}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: px.v(15) }}>
          <Text style={[styles.cardTitle, { fontSize: px.f(20), fontWeight: 'bold' }]}>Chi tiết theo nhà máy</Text>
          <View>
            {profit.Breakdown.map((plant, idx) => {
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => {
                    router.navigate({
                      pathname: '/profit-detail' as any,
                      params: {
                        plantName: plant.PlantName,
                        plantId: plant.PlantCode || idx.toString(),
                      },
                    })
                  }}
                  style={[styles.revenueCard, { backgroundColor: '#1e2838' }]}
                >
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View
                        style={{
                          width: px.h(20),
                          height: px.h(20),
                          borderRadius: '100%',
                          backgroundColor: plant.Color,
                          marginRight: px.h(10),
                        }}
                      />
                      <View>
                        <Text style={[styles.cardTitle, { fontSize: px.f(20) }]}>{plant.PlantName}</Text>
                        <Text style={{ color: Colors.green, fontSize: px.f(30) }}>
                          <Ionicons name="analytics-outline" size={px.f(24)} color={Colors.green} />
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text style={[styles.cardValue, { fontSize: px.f(24) }]}>
                      {plant.Value} <Text style={[styles.cardUnit, { fontSize: px.f(20) }]}>{plant.Unit}</Text>
                    </Text>
                    <MetricDiff diff={plant.Percent / 100} />
                  </View>
                </TouchableOpacity>
              )
            })}
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
