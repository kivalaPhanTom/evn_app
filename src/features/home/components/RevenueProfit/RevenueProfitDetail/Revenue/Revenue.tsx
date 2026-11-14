import React, { useCallback, useEffect, useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { getRevenue } from '@/core/redux/domains/revenue-profit'
import { RootState } from '@/core/redux/store'
import BarChart from '@/components/BarChart/BarChart.component'
import { BarGroup } from '@/core/types'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { createThemePalette } from '@/core/constants/themePalette'

const hexToRgba = (hex: string, alpha: number) => {
  const clean = hex.replace('#', '')
  const bigint = parseInt(
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean,
    16,
  )
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function RevenueDetail() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const theme = useAppTheme()
  const isDark = theme === 'dark'
  const p = createThemePalette(isDark)

  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const { revenue, isLoadingRevenue } = useAppSelector((state: RootState) => state.revenueProfitSlice)

  const onPressCard = useCallback(() => {
    router.navigate({ pathname: '/revenue-detail' })
  }, [router])

  useEffect(() => {
    dispatch(getRevenue())
  }, [countRefesh])

  const data = useMemo<{ label: string; value: number }[]>(
    () =>
      revenue.Chart.Data.map((item: { Contract: number; Date: string }) => ({
        value: item.Contract,
        label: item.Date?.split('-')[2] ?? '',
      })),
    [revenue.Chart.Data],
  )

  const data2 = useMemo<{ label: string; value: number }[]>(
    () =>
      revenue.Chart.Data.map((item: { Actual: number; Date: string }) => ({
        value: item.Actual,
        label: item.Date?.split('-')[2] ?? '',
      })),
    [revenue.Chart.Data],
  )

  const today = new Date()
  const formatDayWithMonth = (d: Date) =>
    `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
  const endDate = new Date(today)
  endDate.setDate(today.getDate() - 1) //
  const prevDate = new Date(endDate)
  prevDate.setDate(prevDate.getDate() - 1)
  const fromParts = revenue.Chart.Period.From?.split('-') ?? []
  const toParts = revenue.Chart.Period.To?.split('-') ?? []
  const fromDay = fromParts[2] ?? ''
  const toDay = toParts[2] ?? ''
  const toMonth = toParts[1] ?? ''
  const unit = 'tỷ VNĐ'

  // Theme-aware colors
  const cardBg = isDark ? '#1e2838' : '#FFFFFF'
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.2)' : p.border
  const weekTintBg = isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.08)'
  const monthTintBg = isDark ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.12)'
  const weekTitleColor = isDark ? '#A5B4FC' : '#6366F1'
  const monthTitleColor = isDark ? '#FCD34D' : '#B28800'
  const cardTitleColor = isDark ? '#8b92a0' : p.textLabel
  const cardValueColor = isDark ? '#ffffff' : p.textPrimary
  const profitByDayTitleColor = isDark ? '#fff' : '#475569'
  const revenueTitleColor = isDark ? '#8b92a0' : p.textLabel
  const dateBadgeBg = isDark ? '#1f2937' : '#D9D9D9'
  const dateBadgeBorder = isDark ? 'rgba(255,255,255,0.12)' : p.border
  const dateTextColor = isDark ? '#8b92a0' : '#475569'
  const lineColor = isDark ? 'rgba(255, 255, 255, 0.4)' : '#3B82F6'
  const lineColor2 = isDark ? '#4ADE80' : '#4ADE80'
  const startFillColor2 = isDark ? '#4ADE80' : '#4ADE80'
  const endFillColor2 = isDark ? '#4ADE80' : '#4ADE80'
  const legendLineColor = isDark ? '#4ADE80' : '#4ADE80'
  const legendDashColor = isDark ? 'rgba(255,255,255,0.4)' : '#3B82F6'
  const legendLabelColor = isDark ? '#9CA3AF' : 'rgba(0,0,0,0.4)'
  const chartCardBg = isDark ? 'rgba(255,255,255,0.06)' : '#FFFFFF'
  const chartCardBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'

  return (
    <SectionContainer title="Doanh thu">
      <AnimatedCardContainer onPress={onPressCard}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text
              style={[styles.revenueTitle, { color: revenueTitleColor }]}
            >{`Doanh thu ngày ${formatDayWithMonth(endDate)}`}</Text>
            <TouchableOpacity onPress={onPressCard} style={styles.actionButton}>
              <Text style={[styles.actionButtonText, !isDark && { color: '#4E8DF9' }]}>Chi tiết</Text>
              <Text style={[styles.actionButtonIcon, !isDark && { color: '#4E8DF9' }]}>{'>'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.cardValue, { color: cardValueColor, fontSize: px.f(70) }]}>
            {revenue.Today.Value} <Text style={styles.cardUnit}>{revenue.Today.Unit}</Text>
          </Text>
          <MetricDiff
            style={{ fontSize: px.f(20) }}
            withBackground
            unit="%"
            compareTo={0}
            diff={revenue.Today.ChangeValue}
            label={`so với ngày ${formatDayWithMonth(prevDate)}`}
            bgColor={isDark ? hexToRgba('#22C55E', 0.15) : hexToRgba('#22C55E', 0.15)}
            textColor={isDark ? '#22C55E' : '#00A73D'}
          />
        </View>
        <View style={{ marginTop: px.v(10) }}>
          <View style={[styles.revenueCard, { backgroundColor: weekTintBg, borderColor: cardBorder }]}>
            <View>
              <Text style={[styles.cardTitle, { color: weekTitleColor }]}>{`Lũy kế tuần`}</Text>
              <Text style={[styles.cardValue, { color: cardValueColor }]}>
                {revenue.Cumulative.Week.Value} <Text style={styles.cardUnit}>{revenue.Cumulative.Week.Unit}</Text>
              </Text>
            </View>
            <View>
              <MetricDiff
                withBackground
                unit="%"
                compareTo={0}
                diff={revenue.Cumulative.Week.ChangeValue}
                bgColor={isDark ? hexToRgba('#22C55E', 0.15) : hexToRgba('#22C55E', 0.15)}
                textColor={isDark ? '#22C55E' : '#00A73D'}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={[styles.revenueCard, { backgroundColor: monthTintBg, borderColor: cardBorder }]}>
            <View>
              <Text
                style={[styles.cardTitle, { color: monthTitleColor }]}
              >{`Lũy kế tháng ${revenue.Cumulative.Month.month?.split('-')[1] ?? ''}`}</Text>
              <Text style={[styles.cardValue, { color: cardValueColor }]}>
                {revenue.Cumulative.Month.Value} <Text style={styles.cardUnit}>{revenue.Cumulative.Month.Unit}</Text>
              </Text>
            </View>
            <View>
              <MetricDiff
                withBackground
                unit="%"
                compareTo={0}
                diff={revenue.Cumulative.Month.ChangeValue}
                bgColor={isDark ? hexToRgba('#22C55E', 0.15) : hexToRgba('#22C55E', 0.15)}
                textColor={isDark ? '#22C55E' : '#00A73D'}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={[styles.profitCard, { backgroundColor: chartCardBg, borderColor: chartCardBorder }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={[styles.profitByDayTitle, { color: profitByDayTitleColor }]}>Biểu đồ doanh thu</Text>
              <View
                style={{
                  paddingHorizontal: px.h(8),
                  paddingVertical: px.v(4),
                  backgroundColor: dateBadgeBg,
                  borderRadius: px.h(8),
                }}
              >
                <Text style={{ color: dateTextColor, fontSize: px.f(16) }}>
                  {fromDay} - {toDay}/{toMonth}
                </Text>
              </View>
            </View>
            <View style={[styles.chartWrapper]}></View>

            {/* X-Axis below chart */}
            <LineChart
              data={data}
              data2={data2}
              color={lineColor}
              color2={lineColor2}
              hideDataPoints2={false}
              hideYAxisText={true}
              hideDataPoints1={true}
              strokedashArray1={[12, 6]}
              spacing={9}
              startFillColor2={startFillColor2}
              endFillColor2={endFillColor2}
              areaChart={false}
              areaChart2={true}
              ruleTypes={undefined}
              showRules={false}
              animateOnDataChange={false}
              scrollToEnd={true}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <View style={[styles.legendLine, { backgroundColor: legendLineColor }]} />
                <Text style={[styles.legendLabel, { color: legendLabelColor }]}>{'Thực tế'}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 17 }}>
                <View style={[styles.legendDashLine, { backgroundColor: legendDashColor }]} />
                <Text style={[styles.legendLabel, { color: legendLabelColor }]}>{'Hợp đồng'}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{ marginTop: px.v(15) }}
          onStartShouldSetResponder={() => true}
          onResponderTerminationRequest={() => false}
        >
          <Text style={[styles.cardTitle, { color: cardTitleColor, fontSize: px.f(20), fontWeight: 'bold' }]}>
            Chi tiết theo nhà máy
          </Text>
          <View>
            {revenue.Breakdown.map(
              (
                plant: {
                  Sparkline: number[]
                  Color: string
                  PlantName: string
                  Value: number
                  Unit: string
                  ChangeValue: number
                },
                idx: number,
              ) => {
                const dataPlant: { label: string; value: number }[] = plant.Sparkline.map((item: number) => ({
                  value: item,
                  label: '',
                }))
                return (
                  <View key={idx} style={[styles.revenueCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
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
                          <Text style={[styles.cardTitle, { color: cardTitleColor, fontSize: px.f(20) }]}>
                            {plant.PlantName}
                          </Text>
                          <Text style={{ color: Colors.green, fontSize: px.f(30) }}>
                            <Ionicons name="analytics-outline" size={px.f(24)} color={isDark ? '#22C55E' : '#00A73D'} />
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={[styles.cardValue, { color: cardValueColor, fontSize: px.f(24) }]}>
                        {plant.Value} <Text style={[styles.cardUnit, { fontSize: px.f(20) }]}>{plant.Unit}</Text>
                      </Text>
                      <MetricDiff
                        withBackground
                        unit="%"
                        compareTo={0}
                        diff={plant.ChangeValue}
                        bgColor={isDark ? hexToRgba('#22C55E', 0.15) : hexToRgba('#22C55E', 0.15)}
                        textColor={isDark ? '#22C55E' : '#00A73D'}
                      />
                    </View>
                  </View>
                )
              },
            )}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
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
    fontSize: px(20),
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

export default React.memo(RevenueDetail)
