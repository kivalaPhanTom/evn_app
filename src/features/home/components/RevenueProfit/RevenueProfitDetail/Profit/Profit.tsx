import React, { useCallback, useEffect, useMemo } from 'react'
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
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { getProfit } from '@/core/redux/domains/revenue-profit'
import { RootState } from '@/core/redux/store'
import { LineChart } from '@/components/ChartView/LineChart.component'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { createThemePalette } from '@/core/constants/themePalette'
import { LinearGradient } from 'expo-linear-gradient'

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

function ProfitDetail() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const theme = useAppTheme()
  const isDark = theme === 'dark'
  const p = createThemePalette(isDark)

  const { profit, isLoadingProfit } = useAppSelector((state: RootState) => state.revenueProfitSlice)
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const fromParts = profit.Chart.Period.From?.split('-') ?? []
  const toParts = profit.Chart.Period.To?.split('-') ?? []
  const fromDay = fromParts[2] ?? ''
  const toDay = toParts[2] ?? ''
  const toMonth = toParts[1] ?? ''

  const values = useMemo<{ label: string; value: number }[]>(
    () =>
      profit.Chart.Data.map((item: { value: number }) => ({
        label: '',
        value: Number(item.value),
      })),
    [profit.Chart.Data],
  )

  const rawBarGroups = useMemo<BarGroup[]>(
    () =>
      values.map(({ label, value }: { label: string; value: number }) => ({
        label,
        items: [
          {
            value,
            frontColor: value < 0 ? (isDark ? Colors.red : '#ef4444') : isDark ? Colors.green : '#22c55e',
            showValuesOnTop: true,
            showPrefix: value > 0,
          },
        ],
      })),
    [values, isDark],
  )

  useEffect(() => {
    dispatch(getProfit())
  }, [countRefesh])

  const today = new Date()
  const formatDay = (d: Date) => `${String(d.getDate()).padStart(2, '0')}`
  const formatDayWithMonth = (d: Date) =>
    `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
  const endDate = new Date(today)
  endDate.setDate(today.getDate() - 1)
  const prevDate = new Date(endDate)
  prevDate.setDate(prevDate.getDate() - 1)
  const xAxisLabels = useMemo(
    () =>
      values.map((_, idx) => {
        const d = new Date(endDate)
        d.setDate(endDate.getDate() - (values.length - 1 - idx))
        return formatDay(d)
      }),
    [values],
  )
  const unit = 'tỷ VNĐ'

  const negativeDays = useMemo(
    () =>
      values
        .map((v, idx) => {
          const d = new Date(endDate)
          d.setDate(endDate.getDate() - (values.length - 1 - idx))
          return { dateStr: formatDayWithMonth(d), value: v.value }
        })
        .filter((x) => x.value < 0),
    [values],
  )
  const onPressCard = useCallback(() => {
    router.navigate({ pathname: '/factory-profit-detail' as any })
  }, [router])

  const onPressPlant = useCallback(
    (plantName: string, plantId: string) => {
      router.navigate({
        pathname: '/profit-detail' as any,
        params: { plantName, plantId },
      })
    },
    [router],
  )

  // Theme-aware colors
  const cardLabelColor = isDark ? '#8b92a0' : '#475569'
  const cardValueColor = isDark ? '#ffffff' : '#475569'
  const cardUnitColor = isDark ? '#ffffff' : '#475569'
  const weekTitleColor = isDark ? '#A5B4FC' : '#001eac'
  const monthTitleColor = isDark ? '#FCD34D' : '#b28800'
  const weekBorderColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(99,102,241,0.2)'
  const monthBorderColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(251,191,36,0.2)'
  const chartCardBg = isDark ? '#1e2838' : 'rgba(255,255,255,0.06)'
  const chartCardBorder = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)'
  const chartTitleColor = isDark ? '#fff' : '#475569'
  const dateBadgeBg = isDark ? '#1f2937' : '#D9D9D9'
  const dateTextColor = isDark ? '#8b92a0' : '#475569'
  const axisLabelColor = isDark ? '#8b92a0' : 'rgba(0,0,0,0.4)'
  const axisLabelNegativeColor = isDark ? Colors.red : '#f87171'
  const axisLabelTodayColor = isDark ? '#8b92a0' : '#fbbf24'
  const dividerColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'
  const legendTextColor = isDark ? '#8b92a0' : 'rgba(0,0,0,0.4)'
  const lossIndicatorBg = isDark ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.15)'
  const lossIndicatorTextColor = isDark ? Colors.red : '#f87171'
  const plantCardBg = isDark ? '#1e2838' : '#FFFFFF'
  const plantCardBorder = isDark ? 'rgba(255,255,255,0.2)' : p.border
  const plantTitleColor = isDark ? '#8b92a0' : p.textLabel
  const moreLinkColor = isDark ? '#8b92a0' : '#848a9c'

  return (
    <SectionContainer title="Lợi nhuận">
      <AnimatedCardContainer onPress={onPressCard}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[styles.revenueTitle, { color: cardLabelColor, opacity: isDark ? 1 : 0.5 }]}>
              {`Lợi nhuận ngày ${formatDayWithMonth(endDate)}`}
            </Text>
            <TouchableOpacity onPress={onPressCard} style={styles.actionButton}>
              <Text style={[styles.actionButtonText, !isDark && { color: '#4E8DF9' }]}>Chi tiết</Text>
              <Text style={[styles.actionButtonIcon, !isDark && { color: '#4E8DF9' }]}>{'>'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.cardValue, { color: cardValueColor, fontSize: px.f(70) }]}>
            {profit.Today.Value}{' '}
            <Text style={[styles.cardUnit, { color: cardUnitColor, opacity: isDark ? 1 : 0.6 }]}>
              {profit.Today.Unit}
            </Text>
          </Text>
          <MetricDiff
            style={{ fontSize: px.f(20) }}
            withBackground
            unit={unit}
            compareTo={0}
            diff={profit.Today.ChangeValue}
            label={`so với ngày ${formatDayWithMonth(prevDate)}`}
            bgColor={isDark ? hexToRgba('#22C55E', 0.15) : hexToRgba('#22C55E', 0.15)}
            textColor={isDark ? '#22C55E' : '#00A73D'}
            containerStyle={{ borderRadius: px.h(20) }}
          />
        </View>

        {/* Lũy kế tuần */}
        <View style={{ marginTop: px.v(10) }}>
          <LinearGradient
            colors={
              isDark
                ? ['rgba(99,102,241,0.1)', 'rgba(99,102,241,0.1)']
                : ['rgba(99,102,241,0.12)', 'rgba(99,102,241,0.06)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.revenueCard, { borderColor: weekBorderColor }]}
          >
            <View>
              <Text style={[styles.cardTitle, { color: weekTitleColor }]}>{`Lũy kế tuần`}</Text>
              <Text style={[styles.cardValue, { color: cardValueColor }]}>
                {profit.Cumulative.Week.Value} <Text style={styles.cardUnit}>{profit.Cumulative.Week.Unit}</Text>
              </Text>
            </View>
            <View>
              <MetricDiff
                withBackground
                unit="%"
                compareTo={0}
                diff={profit.Cumulative.Week.ChangeValue}
                bgColor={isDark ? hexToRgba('#22C55E', 0.15) : hexToRgba('#22C55E', 0.15)}
                textColor={isDark ? '#22C55E' : '#00A73D'}
              />
            </View>
          </LinearGradient>
        </View>

        {/* Lũy kế tháng */}
        <View>
          <LinearGradient
            colors={
              isDark
                ? ['rgba(251,191,36,0.1)', 'rgba(251,191,36,0.1)']
                : ['rgba(251,191,36,0.12)', 'rgba(251,191,36,0.06)']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.revenueCard, { borderColor: monthBorderColor }]}
          >
            <View>
              <Text style={[styles.cardTitle, { color: monthTitleColor }]}>
                {`Lũy kế tháng ${profit.Cumulative.Month.month?.split('-')[1] ?? ''}`}
              </Text>
              <Text style={[styles.cardValue, { color: cardValueColor }]}>
                {profit.Cumulative.Month.Value} <Text style={styles.cardUnit}>{profit.Cumulative.Month.Unit}</Text>
              </Text>
            </View>
            <View>
              <MetricDiff
                withBackground
                unit="%"
                compareTo={0}
                diff={profit.Cumulative.Month.ChangeValue}
                bgColor={isDark ? hexToRgba('#22C55E', 0.15) : hexToRgba('#22C55E', 0.15)}
                textColor={isDark ? '#22C55E' : '#00A73D'}
              />
            </View>
          </LinearGradient>
        </View>

        {/* Chart section */}
        <View>
          <View
            style={[styles.profitCard, { backgroundColor: chartCardBg, borderColor: chartCardBorder }]}
            onStartShouldSetResponder={() => true}
            onResponderTerminationRequest={() => false}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={[styles.profitByDayTitle, { color: chartTitleColor }]}>Lãi/Lỗ theo ngày</Text>
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
            <View style={[styles.chartWrapper]}>
              <BarChart topLabelOffset={0} data={rawBarGroups} rounded noOfSection={3} disableScroll />
            </View>

            {/* X-Axis below chart */}
            <View style={styles.axisContainer}>
              <View style={[styles.axisLabelsRow, { justifyContent: 'flex-start' }]}>
                {xAxisLabels.map((label, idx) => {
                  const isToday = idx === xAxisLabels.length - 1
                  const isNegative = values[idx].value < 0
                  const color = isToday ? axisLabelTodayColor : isNegative ? axisLabelNegativeColor : axisLabelColor
                  return (
                    <View key={idx} style={{ flex: 1, alignItems: 'center' }}>
                      <Text style={[styles.axisLabel, { color }]}>{label}</Text>
                    </View>
                  )
                })}
              </View>
              <View style={[styles.axisDivider, { backgroundColor: dividerColor }]} />
              {/* Legend */}
              <View style={styles.legendRow}>
                <View style={[styles.legendItem]}>
                  <LinearGradient
                    colors={isDark ? [Colors.green, Colors.green] : ['#4ade80', '#22c55e']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[styles.legendSwatch, { borderRadius: 3 }]}
                  />
                  <Text style={[styles.legendText, { color: legendTextColor }]}>Lãi</Text>
                </View>
                <View style={[styles.legendItem, { marginLeft: px.h(24) }]}>
                  <LinearGradient
                    colors={isDark ? [Colors.red, Colors.red] : ['#f87171', '#ef4444']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[styles.legendSwatch, { borderRadius: 3 }]}
                  />
                  <Text style={[styles.legendText, { color: legendTextColor }]}>Lỗ</Text>
                </View>
              </View>

              {/* Warning cards for negative days */}
              <View style={{ marginTop: px.v(12) }}>
                {negativeDays.map((item, idx) => (
                  <View
                    key={idx}
                    style={[styles.warningCard, { backgroundColor: lossIndicatorBg, borderRadius: px.h(10) }]}
                  >
                    <Ionicons
                      name="warning-outline"
                      size={px.f(16)}
                      color={lossIndicatorTextColor}
                      style={{ marginRight: px.h(8) }}
                    />
                    <Text style={[styles.warningText, { color: lossIndicatorTextColor }]}>
                      {`Ngày ${item.dateStr} ghi nhận lỗ ${item.value} tỷ`}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Chi tiết theo nhà máy */}
        <View
          style={{ marginTop: px.v(15) }}
          onStartShouldSetResponder={() => true}
          onResponderTerminationRequest={() => false}
        >
          <Text style={[styles.cardTitle, { color: plantTitleColor, fontSize: px.f(20), fontWeight: 'bold' }]}>
            Chi tiết theo nhà máy
          </Text>
          <View>
            {profit.Breakdown.map((plant, idx) => {
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => onPressPlant(plant.PlantName, plant.PlantCode || idx.toString())}
                  style={[styles.revenueCard, { backgroundColor: plantCardBg, borderColor: plantCardBorder }]}
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
                        <Text style={[styles.cardTitle, { color: plantTitleColor, fontSize: px.f(20) }]}>
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
  profitCard: {
    flexDirection: 'column',
    borderRadius: 20,
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
  axisContainer: {
    marginTop: px.v(8),
    paddingTop: px.v(8),
  },
  axisDivider: {
    height: StyleSheet.hairlineWidth,
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
    fontSize: px.f(16),
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: px.h(12),
    paddingVertical: px.v(10),
    marginTop: px.v(8),
  },
  warningText: {
    fontSize: px.f(16),
  },
  cardTitle: {
    fontSize: px.f(16),
    textTransform: 'uppercase',
  },
  profitByDayTitle: {
    fontSize: px.f(20),
  },
  revenueTitle: {
    fontSize: px(20),
    textTransform: 'uppercase',
  },
  revenueCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 14,
    marginTop: px.v(20),
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 1,
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
  actionButton: {
    justifyContent: 'flex-end',
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

export default React.memo(ProfitDetail)
