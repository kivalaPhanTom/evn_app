import React, { useEffect, useState, useMemo } from 'react'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'
import { px } from '@/core/utils/scale'
import { LineChart } from '@/components/ChartView/LineChart.component'
import { getRevenueByPeriod } from '@/core/redux/domains/revenue-profit'
import { useAppTheme } from '@/core/hooks/use-app-theme'

interface Props {
  fromDate: string
  toDate: string
  metricLabel: string
  onPressFrom?: () => void
  onPressTo?: () => void
  onPressMetric?: () => void
}
const OPTIONS = [
  { value: 'market', label: 'Tổng doanh thu theo thị trường điện' },
  { value: 'contract', label: 'Tổng doanh thu theo giá hợp đồng' },
  { value: 'cost', label: 'Tổng chi phí' },
]
export default function ReveneCompareByTime({
  fromDate,
  toDate,
  metricLabel,
  onPressFrom,
  onPressTo,
  onPressMetric,
}: Props) {
  const isDark = useAppTheme() === 'dark'
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(OPTIONS[0])
  const revenueByPeriod = useAppSelector((state: any) => state.revenueProfitSlice.revenueByPeriod)
  const { countRefesh } = useAppSelector((state: any) => state.revenueProfitSlice)
  const onSelect = (value: any) => {
    setSelected(value)
    setOpen(false)
  }
  const [range, setRange] = useState({ from: dayjs().subtract(8, 'day'), to: dayjs().subtract(1, 'day') })
  const onChangeDateRage = (newRange: { from: any; to: any }) => {
    setRange(newRange)
  }
  const dispatch = useAppDispatch()
  const startDate = dayjs(range?.from).format('DD/MM/YYYY')
  const endDate = dayjs(range?.to).format('DD/MM/YYYY')

  useEffect(() => {
    dispatch(
      getRevenueByPeriod({
        startDate: startDate,
        endDate: endDate,
        type: selected.value,
      }),
    )
  }, [dispatch, startDate, endDate, selected.value, countRefesh])

  const data = revenueByPeriod?.Series[0]
  const data2 = revenueByPeriod?.Series[1]
  const data3 = revenueByPeriod?.Series[2]

  const chartData =
    data?.Values?.map((item: any, idx: number) => ({
      value: item,
      label: revenueByPeriod.Dates[idx].substring(0, 5),
    })) || []
  const chartData2 =
    data2?.Values?.map((item: any, idx: number) => ({
      value: item,
      label: revenueByPeriod.Dates[idx].substring(0, 5),
    })) || []
  const chartData3 =
    data3?.Values?.map((item: any, idx: number) => ({
      value: item,
      label: revenueByPeriod.Dates[idx].substring(0, 5),
    })) || []

  // Theme-aware colors
  const titleColor = isDark ? '#F8FAFC' : '#475569'
  const dropdownBg = isDark ? 'rgba(148,163,184,0.12)' : '#d9d9d9'
  const dropdownBorder = isDark ? 'rgba(148,163,184,0.25)' : 'rgba(255,255,255,0.12)'
  const dropdownTextColor = isDark ? '#F8FAFC' : '#475569'
  const arrowColor = isDark ? '#CBD5E1' : '#475569'
  const unitTextColor = isDark ? '#8b92a0' : '#475569'
  const lineColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)'
  const legendLabelColor = isDark ? '#9CA3AF' : '#475569'
  const menuBg = isDark ? '#0F172A' : '#FFFFFF'
  const menuBorder = isDark ? 'rgba(148,163,184,0.25)' : 'rgba(255,255,255,0.12)'
  const menuTextColor = isDark ? '#CBD5E1' : '#475569'
  const menuTextActiveColor = isDark ? '#F8FAFC' : '#475569'
  const menuItemActiveBg = isDark ? 'rgba(59,130,246,0.12)' : 'rgba(59,130,246,0.12)'

  return (
    <View style={styles.wrapper}>
      <AnimatedCardContainer>
        <Text style={[styles.title, { color: titleColor }]}>So sánh theo thời gian</Text>
        <DateRangePicker
          labelFrom="Từ ngày"
          labelTo="Đến ngày"
          format={'DD/MM/YYYY'}
          value={range}
          onChange={onChangeDateRage}
          mode="modal"
          chooseMode={'day'}
        />
        <View style={{ marginHorizontal: 10 }}>
          <TouchableOpacity
            style={[styles.dropdown, { backgroundColor: dropdownBg, borderColor: dropdownBorder }]}
            onPress={() => setOpen(!open)}
            activeOpacity={0.8}
          >
            <Text style={[styles.dropdownText, { color: dropdownTextColor }]}>{selected?.label}</Text>
            <Text style={[styles.arrow, { color: arrowColor }]}>{open ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {open && (
            <View style={[styles.menu, { backgroundColor: menuBg, borderColor: menuBorder }]}>
              {OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.menuItem, selected?.value === option.value && { backgroundColor: menuItemActiveBg }]}
                  onPress={() => onSelect(option)}
                >
                  <Text
                    style={[
                      styles.menuText,
                      { color: menuTextColor },
                      selected?.label === option.label && { color: menuTextActiveColor, fontWeight: '600' },
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View>
          <View style={{ alignItems: 'flex-end', marginTop: px.v(24) }}>
            <Text style={{ color: unitTextColor, fontSize: px.f(16) }}>{`Đơn vị: ${revenueByPeriod?.Unit}`}</Text>
          </View>
          <View style={[styles.chartWrapper]}></View>
          <LineChart
            data={chartData}
            data2={chartData2}
            data3={chartData3}
            color={data?.Color ? `#${data?.Color}` : '#4ADE80'}
            color2={data2?.Color ? `#${data2?.Color}` : '#22D3EE'}
            color3={data3?.Color ? `#${data3?.Color}` : '#A78BFA'}
            hideDataPoints2={false}
            hideYAxisText={true}
            hideDataPoints1={false}
            spacing={9}
            curved={false}
            ruleTypes="solid"
            rulesColor={isDark ? '#374151' : '#A2D0FF'}
            areaChart={true}
            areaChart2={true}
            areaChart3={true}
            showValuesAsDataPointsText={false}
            pointerConfig={true}
            label1={`${data?.PlantName}: `}
            label2={`${data2?.PlantName}: `}
            label3={`${data3?.PlantName}: `}
            animateOnDataChange={false}
            scrollToEnd
          />
          <View style={[styles.line, { backgroundColor: lineColor }]} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <View style={[styles.circle, { backgroundColor: `${data?.Color ? `#${data?.Color}` : '#4ADE80'}` }]} />
              <Text style={[styles.legendLabel, { color: legendLabelColor }]}>{data?.PlantName}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <View style={[styles.circle, { backgroundColor: `${data2?.Color ? `#${data2?.Color}` : '#22D3EE'}` }]} />
              <Text style={[styles.legendLabel, { color: legendLabelColor }]}>{data2?.PlantName}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <View style={[styles.circle, { backgroundColor: `${data3?.Color ? `#${data3?.Color}` : '#A78BFA'}` }]} />
              <Text style={[styles.legendLabel, { color: legendLabelColor }]}>{data3?.PlantName}</Text>
            </View>
          </View>
        </View>
      </AnimatedCardContainer>
    </View>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 14,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  title: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  dateBox: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(148,163,184,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.25)',
  },

  dateText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '600',
  },

  toText: {
    color: '#94A3B8',
    fontSize: 13,
    marginHorizontal: 10,
  },

  dropdownText: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '600',
  },

  arrow: {
    color: '#CBD5E1',
    fontSize: 12,
  },

  dropdown: {
    height: 48,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderWidth: 1,
  },

  menu: {
    marginTop: 6,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  menuText: {
    fontSize: 13,
  },

  line: {
    height: 1,
    marginBottom: 15,
  },
  legendLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  profitByDayTitle: {
    color: '#fff',
    fontSize: px.f(20),
  },
  chartWrapper: {
    marginLeft: px.h(-12),
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
})
