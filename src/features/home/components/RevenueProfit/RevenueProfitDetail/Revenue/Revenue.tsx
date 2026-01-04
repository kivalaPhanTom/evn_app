import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { px } from '@/core/utils/scale'
import { Stack, usePathname, useRouter } from 'expo-router'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { dashboardCommonStyles } from '@/core/styles/sharedStyles'
import { Ionicons } from '@expo/vector-icons'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import { Colors } from '@/core/constants/colors'
import { LineChart } from '@/components/ChartView/LineChart.component'
import CompareLegend from '@/core/shared/CompareLegend'
import { useDispatch, useSelector } from 'react-redux'
import { getRevenue } from '@/core/redux/Actions/RevenueProfitActions'
import { RootState } from '@/core/redux/store'
import BarChart from '@/components/BarChart/BarChart.component'
import { BarGroup } from '@/core/types'

export default function RevenueDetail() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { countRefesh } = useSelector((state: any) => state.homeSlice)
  const { revenue, isLoadingRevenue } = useSelector((state: RootState) => state.revenueProfitSlice)

  const onPressCard = () => {
    router.navigate({ pathname: '/revenue-detail' })
  }

  useEffect(() => {
    // Dispatch actions to fetch data if needed
    dispatch(getRevenue())
  }, [countRefesh])

  const data: { label: string; value: number }[] = revenue.Chart.Data.map(
    (item: { Contract: number; Date: string }) => ({
      value: item.Contract,
      label: item.Date?.split('-')[2] ?? '',
    }),
  )

  const data2: { label: string; value: number }[] = revenue.Chart.Data.map(
    (item: { Actual: number; Date: string }) => ({
      value: item.Actual,
      label: item.Date?.split('-')[2] ?? '',
    }),
  )

  const fromParts = revenue.Chart.Period.From?.split('-') ?? []
  const toParts = revenue.Chart.Period.To?.split('-') ?? []
  const fromDay = fromParts[2] ?? ''
  const toDay = toParts[2] ?? ''
  const toMonth = toParts[1] ?? ''

  return (
    <SectionContainer title="Doanh thu">
      <View style={styles.gotoDetail}>
        <TouchableOpacity onPress={onPressCard} delayPressIn={0} activeOpacity={0.7} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Thêm chi tiết</Text>
          <Text style={styles.actionButtonIcon}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <AnimatedCardContainer>
        <View>
          <Text style={styles.revenueTitle}>{`Doanh thu hôm nay`}</Text>
          <Text style={[styles.cardValue, { fontSize: px.f(70) }]}>
            {revenue.Today.Value} <Text style={styles.cardUnit}>{revenue.Today.Unit}</Text>
          </Text>
          <MetricDiff
            style={{ fontSize: px.f(20) }}
            withBackground
            diff={revenue.Today.ChangePercent / 100}
            label="so với hôm qua"
          />
        </View>
        <View style={{ marginTop: px.v(10) }}>
          <View style={styles.revenueCard}>
            <View>
              <Text style={[styles.cardTitle, { color: '#A5B4FC' }]}>{`Lũy kế tuần`}</Text>
              <Text style={styles.cardValue}>
                {revenue.Cumulative.Week.Value} <Text style={styles.cardUnit}>{revenue.Cumulative.Week.Unit}</Text>
              </Text>
            </View>
            <View>
              <MetricDiff withBackground diff={revenue.Cumulative.Week.ChangePercent / 100} />
            </View>
          </View>
        </View>
        <View>
          <View style={[styles.revenueCard, { backgroundColor: 'rgba(251, 191, 36, 0.1)' }]}>
            <View>
              <Text
                style={[styles.cardTitle, { color: '#FCD34D' }]}
              >{`Lũy kế tháng ${revenue.Cumulative.Month.month?.split('-')[1] ?? ''}`}</Text>
              <Text style={styles.cardValue}>
                {revenue.Cumulative.Month.Value} <Text style={styles.cardUnit}>{revenue.Cumulative.Month.Unit}</Text>
              </Text>
            </View>
            <View>
              <MetricDiff withBackground diff={revenue.Cumulative.Month.ChangePercent / 100} />
            </View>
          </View>
        </View>
        <View>
          <View style={[styles.profitCard, { backgroundColor: '#1e2838' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.profitByDayTitle}>Biểu đồ doanh thu</Text>
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
            <View style={[styles.chartWrapper]}></View>

            {/* X-Axis below chart */}
            <LineChart
              data={data}
              data2={data2}
              color="rgba(255, 255, 255, 0.25)"
              color2="#4ADE80"
              hideDataPoints2={false}
              hideYAxisText={true}
              hideDataPoints1={true}
              strokedashArray1={[12, 6]}
              spacing={9}
              startFillColor2="#4ADE80"
              endFillColor2="#4ADE80"
            />
            <View style={styles.line} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <View style={[styles.legendLine]} />
                <Text style={styles.legendLabel}>{'Thực tế'}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 17 }}>
                <View style={[styles.legendDashLine]} />
                <Text style={styles.legendLabel}>{'Hợp đồng'}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: px.v(15) }}>
          <Text style={[styles.cardTitle, { fontSize: px.f(20), fontWeight: 'bold' }]}>Chi tiết theo nhà máy</Text>
          <View>
            {revenue.Breakdown.map((plant, idx) => {
              const dataPlant: { label: string; value: number }[] = plant.Sparkline.map((item) => ({
                value: item,
                label: '',
              }))
              return (
                <View key={idx} style={[styles.revenueCard, { backgroundColor: '#1e2838' }]}>
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
                </View>
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
    fontSize: px.f(18),
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
    fontSize: 20,
    textTransform: 'uppercase',
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
  legendLine: {
    width: 20,
    height: 2.5,
    backgroundColor: '#4ADE80',
    borderRadius: 1.5,
  },
  legendDashLine: {
    width: 4,
    height: 2.5,
    backgroundColor: '#9CA3AF',
    boxShadow: `
    6px 0 #9CA3AF,
    12px 0 #9CA3AF
  `,
    borderRadius: 1.5,
  },
  legendLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },

  gotoDetail: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionButtonText: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  actionButtonIcon: {
    color: '#9CA3AF',
    fontSize: 13,
  },
})
