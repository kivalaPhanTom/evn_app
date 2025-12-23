import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { px } from '@/core/utils/scale'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { dashboardCommonStyles } from '@/core/styles/sharedStyles'
import { Ionicons } from '@expo/vector-icons'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import { Colors } from '@/core/constants/colors'
import { BarGroup } from '@/core/types'
import BarChart from '@/components/BarChart/BarChart.component'

export default function ProfitDetail() {
  const RevenueData = [
    { label: 'Biên LN', value: 24.5, unit: '%' },
    { label: 'Hôm qua', value: 0.42, unit: 'tỷ' },
  ]

  const values = [
    { label: '', value: 120 },
    { label: '', value: 80 },
    { label: '', value: 250 },
    { label: '', value: -200 },
    { label: '', value: 60 },
    { label: '', value: 500 },
    { label: '', value: 50 },
  ]

  const rawBarGroups: BarGroup[] = values.map(({ label, value }) => ({
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

  // Build x-axis labels: last 6 days + "Nay" for today
  const today = new Date()
  const formatDay = (d: Date) => `${String(d.getDate()).padStart(2, '0')}`
  const formatDayWithMonth = (d: Date) =>
    `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
  const xAxisLabels = values.map((_, idx) => {
    const isToday = idx === values.length - 1
    if (isToday) return 'Nay'
    const d = new Date(today)
    d.setDate(today.getDate() - (values.length - 1 - idx))
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

  return (
    <SectionContainer title="Lợi nhuận">
      <AnimatedCardContainer>
        <View>
          <Text style={styles.revenueTitle}>{`Lợi nhuận hôm nay`}</Text>
          <Text style={[styles.cardValue, { fontSize: px.f(70) }]}>
            {1.92} <Text style={styles.cardUnit}>{`tỷ`}</Text>
          </Text>
          <MetricDiff
            style={{ fontSize: px.f(20) }}
            withBackground
            diff={1.85}
            compareTo={1.77}
            label="so với hôm qua"
          />
        </View>
        <View style={[dashboardCommonStyles.summaryRow]}>
          {RevenueData.map((item, idx) => (
            <View key={idx} style={styles.cumulativeCard}>
              <Text style={styles.cardTitle}>{item.label}</Text>
              <Text style={styles.cardValue}>
                {item.value} <Text style={styles.cardUnit}>{item.unit}</Text>
              </Text>
              <MetricDiff diff={1.85} compareTo={1.77} unit={item.unit} />
            </View>
          ))}
        </View>
        <View style={{ marginTop: px.v(10) }}>
          <View style={styles.revenueCard}>
            <View>
              <Text style={[styles.cardTitle, { color: '#A5B4FC' }]}>{`Lũy kế tuần`}</Text>
              <Text style={styles.cardValue}>
                {2.49} <Text style={styles.cardUnit}>{`tỷ`}</Text>
              </Text>
            </View>
            <View>
              <MetricDiff withBackground diff={1.95} compareTo={1.77} />
            </View>
          </View>
        </View>
        <View>
          <View style={[styles.revenueCard, { backgroundColor: 'rgba(251, 191, 36, 0.1)' }]}>
            <View>
              <Text style={[styles.cardTitle, { color: '#FCD34D' }]}>{`Lũy kế tháng 11`}</Text>
              <Text style={styles.cardValue}>
                {6.38} <Text style={styles.cardUnit}>{`tỷ`}</Text>
              </Text>
            </View>
            <View>
              <MetricDiff withBackground diff={1.85} compareTo={1.77} />
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
                <Text style={{ color: '#8b92a0', fontSize: px.f(16) }}>08 - 14/11</Text>
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
                  const color = isToday ? '#FBBF24' : isNegative ? Colors.red : '#8b92a0'
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
            {['Buôn Kuốp', 'Srepok 3', 'Buôn Tua Srah'].map((name, idx) => {
              const palette = ['#F87171', '#60A5FA', '#34D399']
              const circleColor = palette[idx % palette.length]
              return (
                <View key={idx} style={[styles.revenueCard, { backgroundColor: '#1e2838' }]}>
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View
                        style={{
                          width: px.h(20),
                          height: px.h(20),
                          borderRadius: '100%',
                          backgroundColor: circleColor,
                          marginRight: px.h(10),
                        }}
                      />
                      <View>
                        <Text style={[styles.cardTitle, { fontSize: px.f(20) }]}>{name}</Text>
                        <Text style={{ color: Colors.green, fontSize: px.f(30) }}>
                          <Ionicons name="analytics-outline" size={px.f(24)} color={Colors.green} />
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text style={[styles.cardValue, { fontSize: px.f(24) }]}>
                      {6.38} <Text style={[styles.cardUnit, { fontSize: px.f(20) }]}>{`tỷ`}</Text>
                    </Text>
                    <MetricDiff diff={1.85} compareTo={1.77} />
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
})
