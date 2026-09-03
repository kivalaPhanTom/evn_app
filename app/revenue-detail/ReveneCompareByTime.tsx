import React, { useEffect, useState, useMemo } from 'react'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'
import { px } from '@/core/utils/scale'
import { LineChart } from '@/components/ChartView/LineChart.component'
import { getRevenueByPeriod } from '@/core/redux/domains/revenue-profit'

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
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(OPTIONS[0])
  const revenueByPeriod = useAppSelector((state: any) => state.revenueProfitSlice.revenueByPeriod)
  const { countRefesh } = useAppSelector((state: any) => state.revenueProfitSlice)
  const onSelect = (value: any) => {
    setSelected(value)
    setOpen(false)
    // onChangeOption?.(value);
  }
  const [range, setRange] = useState({ from: dayjs().subtract(8, 'day'), to: dayjs().subtract(1, 'day') })
  const onChangeDateRage = (newRange: { from: any; to: any }) => {
    setRange(newRange)
    const fromDate = dayjs(newRange.from)
    const toDate = dayjs(newRange.to)
    // console.log('Selected Date Range:', { from: fromDate.format('DD/MM/YYYY'), to: toDate.format('DD/MM/YYYY') })

    // dispatch(
    //   getCompareProductOutput({
    //     tagetDate: fromDate.format('DD/MM/YYYY'),
    //     compareDate: toDate.format('DD/MM/YYYY'),
    //   }),
    // )
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

  return (
    <View style={styles.wrapper}>
      <AnimatedCardContainer>
        {/* <View style={styles.wrapper}> */}
        <Text style={styles.title}>So sánh theo thời gian</Text>
        <DateRangePicker
          labelFrom="Từ ngày"
          labelTo="Đến ngày"
          format={'DD/MM/YYYY'}
          value={range}
          onChange={onChangeDateRage}
          mode="modal"
          chooseMode={'day'}
        />
        {/* <View style={styles.row}> */}

        {/* <TouchableOpacity style={styles.dateBox} onPress={onPressFrom}>
                        <Text style={styles.dateText}>{fromDate}</Text>
                    </TouchableOpacity>

                    <Text style={styles.toText}>đến</Text>

                    <TouchableOpacity style={styles.dateBox} onPress={onPressTo}>
                        <Text style={styles.dateText}>{toDate}</Text>
                    </TouchableOpacity> */}
        {/* </View> */}
        {/* 
                <TouchableOpacity style={styles.dropdown} onPress={onPressMetric}>
                    <Text style={styles.dropdownText}>{metricLabel}</Text>
                    <Text style={styles.arrow}>▼</Text>
                </TouchableOpacity> */}
        {/* DROPDOWN */}
        <View style={{ marginHorizontal: 10 }}>
          <TouchableOpacity style={styles.dropdown} onPress={() => setOpen(!open)} activeOpacity={0.8}>
            <Text style={styles.dropdownText}>{selected?.label}</Text>
            <Text style={styles.arrow}>{open ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {open && (
            <View style={styles.menu}>
              {OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.menuItem, selected?.value === option.value && styles.menuItemActive]}
                  onPress={() => onSelect(option)}
                >
                  <Text style={[styles.menuText, selected?.label === option.label && styles.menuTextActive]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View>
          <View style={{ alignItems: 'flex-end', marginTop: px.v(24) }}>
            <Text style={{ color: '#8b92a0', fontSize: px.f(16) }}>{`Đơn vị: ${revenueByPeriod?.Unit}`}</Text>
          </View>
          <View style={[styles.chartWrapper]}></View>
          <LineChart
            data={chartData}
            data2={chartData2}
            data3={chartData3}
            color={data?.Color ? `#${data?.Color}` : '#A78BFA'}
            color2={data2?.Color ? `#${data2?.Color}` : '#4ADE80'}
            color3={data3?.Color ? `#${data3?.Color}` : '#22D3EE'}
            hideDataPoints2={false}
            hideYAxisText={true}
            hideDataPoints1={false}
            spacing={9}
            curved={false}
            ruleTypes="solid"
            areaChart2={true}
            areaChart3={true}
            showValuesAsDataPointsText={false}
            pointerConfig={true}
            label1={`${data?.PlantName}: `}
            label2={`${data2?.PlantName}: `}
            label3={`${data3?.PlantName}: `}
            animateOnDataChange={false}
          />
          <View style={styles.line} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <View style={[styles.circle, { backgroundColor: `${data?.Color ? `#${data?.Color}` : '#A78BFA'}` }]} />
              <Text style={styles.legendLabel}>{data?.PlantName}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <View style={[styles.circle, { backgroundColor: `${data2?.Color ? `#${data2?.Color}` : '#4ADE80'}` }]} />
              <Text style={styles.legendLabel}>{data2?.PlantName}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <View style={[styles.circle, { backgroundColor: `${data3?.Color ? `#${data3?.Color}` : '#22D3EE'}` }]} />
              <Text style={styles.legendLabel}>{data3?.PlantName}</Text>
            </View>
          </View>
        </View>
        {/* </View> */}
      </AnimatedCardContainer>
    </View>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    // paddingVertical: 16,
    // paddingHorizontal: 16,
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

  // dropdown: {
  //     height: 48,
  //     borderRadius: 14,
  //     backgroundColor: 'rgba(148,163,184,0.12)',
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  //     paddingHorizontal: 16,
  //     borderWidth: 1,
  //     borderColor: 'rgba(148,163,184,0.25)',
  // },

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
    backgroundColor: 'rgba(148,163,184,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.25)',
  },

  // dropdownText: {
  //     color: '#F8FAFC',
  //     fontSize: 13,
  //     fontWeight: '600',
  //     flex: 1,
  //     paddingRight: 8,
  // },

  // arrow: {
  //     color: '#CBD5E1',
  //     fontSize: 12,
  // },

  /* MENU */
  menu: {
    marginTop: 6,
    backgroundColor: '#0F172A',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.25)',
    overflow: 'hidden',
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  menuItemActive: {
    backgroundColor: 'rgba(59,130,246,0.12)',
  },

  menuText: {
    color: '#CBD5E1',
    fontSize: 13,
  },

  menuTextActive: {
    color: '#F8FAFC',
    fontWeight: '600',
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
