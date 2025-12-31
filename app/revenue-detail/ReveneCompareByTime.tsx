import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'
import { px } from '@/core/utils/scale'
import { LineChart } from '@/components/ChartView/LineChart.component'

interface Props {
  fromDate: string
  toDate: string
  metricLabel: string
  onPressFrom?: () => void
  onPressTo?: () => void
  onPressMetric?: () => void
}
const OPTIONS = ['Tổng doanh thu theo thị trường điện', 'Tổng doanh thu theo giá hợp đồng', 'Tổng chi phí']
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

  const onSelect = (value: string) => {
    setSelected(value)
    setOpen(false)
    // onChangeOption?.(value);
  }

  const [range, setRange] = useState({ from: dayjs().subtract(1, 'day'), to: dayjs() })
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
  return (
    <View style={styles.wrapper}>
      <AnimatedCardContainer>
        {/* <View style={styles.wrapper}> */}
        <Text style={styles.title}>So sánh theo thời gian</Text>
        <DateRangePicker
          labelFrom="Ngày mục tiêu"
          labelTo="Ngày so sánh"
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
        <View>
          <TouchableOpacity style={styles.dropdown} onPress={() => setOpen(!open)} activeOpacity={0.8}>
            <Text style={styles.dropdownText}>{selected}</Text>
            <Text style={styles.arrow}>{open ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {open && (
            <View style={styles.menu}>
              {OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.menuItem, selected === option && styles.menuItemActive]}
                  onPress={() => onSelect(option)}
                >
                  <Text style={[styles.menuText, selected === option && styles.menuTextActive]}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View>
          <View style={{ alignItems: 'flex-end', marginTop: px.v(24) }}>
            <Text style={{ color: '#8b92a0', fontSize: px.f(16) }}>Đơn vị: Tr Đồng</Text>
          </View>
          <View style={[styles.chartWrapper]}></View>
          <LineChart
            data={data}
            data2={data2}
            data3={data3}
            color="#4ADE80"
            color2="#22D3EE"
            color3="#A78BFA"
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
            label1="Buôn Kuốp: "
            label2="Srepok 3: "
            label3="Buôn Tua Srah: "
          />
          <View style={styles.line} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <View style={[styles.circle, { backgroundColor: '#A78BFA' }]} />
              <Text style={styles.legendLabel}>{'Buôn Tua Srah'}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <View style={[styles.circle, { backgroundColor: '#4ADE80' }]} />
              <Text style={styles.legendLabel}>{'Buôn Kuốp'}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <View style={[styles.circle, { backgroundColor: '#22D3EE' }]} />
              <Text style={styles.legendLabel}>{'Srepok 3'}</Text>
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
