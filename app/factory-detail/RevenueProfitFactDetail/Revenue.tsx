import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { px } from '@/core/utils/scale'
import { useRouter } from 'expo-router'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import { LineChart } from '@/components/ChartView/LineChart.component'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { getRevenueFactDetail } from '@/core/redux/domains/revenue-profit'
import { RootState } from '@/core/redux/store'
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

interface RevenueFactDetailProps {
  currentPlantId: string
  keyTab: number
}

export default function RevenueDetail(props: RevenueFactDetailProps) {
  const { currentPlantId, keyTab } = props
  const dispatch = useAppDispatch()
  const router = useRouter()
  const theme = useAppTheme()
  const isDark = theme === 'dark'
  const p = createThemePalette(isDark)

  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const { revenueFactDetail, isLoadingRevenue } = useAppSelector((state: RootState) => state.revenueProfitSlice)
  const { activeTabIndex } = useAppSelector((state: RootState) => state.powerSlice)

  const onPressCard = () => {
    router.navigate({
      pathname: '/revenue-detail',
      params: {
        currentPlantId: currentPlantId,
      },
    })
  }

  useEffect(() => {
    if (activeTabIndex === keyTab) {
      dispatch(getRevenueFactDetail({ currentPlantId }))
    }
  }, [dispatch, currentPlantId, activeTabIndex, keyTab, countRefesh])

  const data: { label: string; value: number }[] = revenueFactDetail.Chart.Data.map(
    (item: { Contract: number; Date: string }) => ({
      value: item.Contract,
      label: item.Date?.split('-')[2] ?? '',
    }),
  )

  const data2: { label: string; value: number }[] = revenueFactDetail.Chart.Data.map(
    (item: { Actual: number; Date: string }) => ({
      value: item.Actual,
      label: item.Date?.split('-')[2] ?? '',
    }),
  )

  const fromParts = revenueFactDetail.Chart.Period.From?.split('-') ?? []
  const toParts = revenueFactDetail.Chart.Period.To?.split('-') ?? []
  const fromDay = fromParts[2] ?? ''
  const toDay = toParts[2] ?? ''
  const toMonth = toParts[1] ?? ''

  const today = new Date()
  const formatDayWithMonth = (d: Date) =>
    `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
  const endDate = new Date(today)
  endDate.setDate(today.getDate() - 1) //
  const prevDate = new Date(endDate)
  prevDate.setDate(prevDate.getDate() - 1)

  // Theme-aware colors (giống src/features/home/components/.../Revenue.tsx)
  const weekTintBg = isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.08)'
  const monthTintBg = isDark ? 'rgba(251, 191, 36, 0.1)' : 'rgba(251, 191, 36, 0.12)'
  const weekTitleColor = isDark ? '#A5B4FC' : '#6366F1'
  const monthTitleColor = isDark ? '#FCD34D' : '#B28800'
  const cardTitleColor = isDark ? '#8b92a0' : p.textLabel
  const cardValueColor = isDark ? '#ffffff' : p.textPrimary
  const profitByDayTitleColor = isDark ? '#fff' : '#475569'
  const revenueTitleColor = isDark ? '#8b92a0' : p.textLabel
  const dateBadgeBg = isDark ? '#1f2937' : '#D9D9D9'
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
          <Text
            style={[styles.revenueTitle, { color: revenueTitleColor }]}
          >{`Doanh thu ngày ${formatDayWithMonth(endDate)}`}</Text>
          <Text style={[styles.cardValue, { color: cardValueColor, fontSize: px.f(70) }]}>
            {revenueFactDetail.Today.Value}{' '}
            <Text style={[styles.cardUnit, { color: cardValueColor }]}>
              {revenueFactDetail.Today.Unit}
            </Text>
          </Text>
          <MetricDiff
            style={{ fontSize: px.f(20) }}
            withBackground
            unit="%"
            compareTo={0}
            diff={revenueFactDetail.Today.ChangeValue}
            label={`so với ngày ${formatDayWithMonth(prevDate)}`}
            bgColor={isDark ? hexToRgba('#22C55E', 0.15) : hexToRgba('#22C55E', 0.15)}
            textColor={isDark ? '#22C55E' : '#00A73D'}
          />
        </View>
        <View style={{ marginTop: px.v(10) }}>
          <View style={[styles.revenueCard, { backgroundColor: weekTintBg, borderColor: p.border }]}>
            <View>
              <Text style={[styles.cardTitle, { color: weekTitleColor }]}>{`Lũy kế tuần`}</Text>
              <Text style={[styles.cardValue, { color: cardValueColor }]}>
                {revenueFactDetail.Cumulative.Week.Value}{' '}
                <Text style={[styles.cardUnit, { color: cardValueColor }]}>
                  {revenueFactDetail.Cumulative.Week.Unit}
                </Text>
              </Text>
            </View>
            <View>
              <MetricDiff
                withBackground
                unit="%"
                compareTo={0}
                diff={revenueFactDetail.Cumulative.Week.ChangeValue}
                bgColor={isDark ? hexToRgba('#22C55E', 0.15) : hexToRgba('#22C55E', 0.15)}
                textColor={isDark ? '#22C55E' : '#00A73D'}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={[styles.revenueCard, { backgroundColor: monthTintBg, borderColor: p.border }]}>
            <View>
              <Text
                style={[styles.cardTitle, { color: monthTitleColor }]}
              >{`Lũy kế tháng ${revenueFactDetail.Cumulative.Month.month?.split('-')[1] ?? ''}`}</Text>
              <Text style={[styles.cardValue, { color: cardValueColor }]}>
                {revenueFactDetail.Cumulative.Month.Value}{' '}
                <Text style={[styles.cardUnit, { color: cardValueColor }]}>
                  {revenueFactDetail.Cumulative.Month.Unit}
                </Text>
              </Text>
            </View>
            <View>
              <MetricDiff
                withBackground
                unit="%"
                compareTo={0}
                diff={revenueFactDetail.Cumulative.Month.ChangeValue}
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
    borderRadius: 12,
    marginTop: px.v(20),
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 1,
  },
  profitCard: {
    flexDirection: 'column',
    borderRadius: 12,
    marginTop: px.v(20),
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 1,
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
  // X-Axis & Legend styles
  axisContainer: {
    marginTop: px.v(8), // space below chart
    paddingTop: px.v(8),
  },
  axisDivider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: px.v(20),
  },
  axisLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: px.f(18),
  },
  cardTitle: {
    fontSize: px.f(16),
    textTransform: 'uppercase',
  },
  profitByDayTitle: {
    fontSize: px.f(20),
  },
  revenueTitle: {
    fontSize: 20,
    textTransform: 'uppercase',
  },
  cardValue: {
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
    marginBottom: 15,
  },
  legendLine: {
    width: 20,
    height: 2.5,
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
    fontSize: 13,
  },
  actionButtonIcon: {
    fontSize: 13,
  },
})
