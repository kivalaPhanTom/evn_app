import React, { useMemo, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import DateTimePicker, { CalendarComponents, useDefaultStyles } from 'react-native-ui-datepicker'
import dayjs from 'dayjs'
import { Ionicons } from '@expo/vector-icons'

export interface DateRange {
  from: any
  to: any
}

interface Props {
  value: DateRange
  onChange: (v: DateRange) => void
  mode?: 'modal' | 'inline'
  chooseMode?: 'day' | 'month' | 'year'
  labelFrom?: string
  labelTo?: string
  iconColor?: string
  textColor?: string
  labelColor?: string
  borderColor?: string
  backgroundColor?: string
  format?: string
  containerStyle?: ViewStyle
  inputStyle?: ViewStyle
  labelStyle?: TextStyle
}

export default function DateRangePicker({
  value,
  onChange,
  mode = 'modal',
  chooseMode = 'day',
  labelFrom = 'TỪ NGÀY',
  labelTo = 'ĐẾN NGÀY',
  iconColor = '#fff',
  textColor = '#fff',
  labelColor = '#999',
  borderColor = 'rgba(255,255,255,0.15)',
  backgroundColor = 'rgba(255,255,255,0.06)',
  format = 'DD/MM/YYYY',
  containerStyle,
  inputStyle,
  labelStyle,
}: Props) {
  const [focused, setFocused] = useState<'from' | 'to' | null>(null)
  const defaultStyles = useDefaultStyles()

  const formatDate = useCallback((d: any) => dayjs(d).format(format), [format])

  const components: CalendarComponents = useMemo(
    () => ({
      IconNext: chooseMode === 'year' ? null : <Ionicons name="chevron-forward" size={20} color="#fff" />,
      IconPrev: chooseMode === 'year' ? null : <Ionicons name="chevron-back" size={20} color="#fff" />,
    }),
    [chooseMode]
  )

  const pickerStyles: any = {
    ...defaultStyles,
    today: { borderColor: chooseMode === 'day' ? '#4f9cff' : '#555', borderWidth: 1 },
    today_label: { color: chooseMode === 'day' ? '#4f9cff' : '#555', fontWeight: 'bold' },
    selected: { backgroundColor: chooseMode === 'day' ? '#4f9cff' : '#333' },
    selected_label: { color: '#fff' },
    day_label: { color: '#fff' },
    weekday_label: chooseMode === 'day' ? { color: '#fff' } : { display: 'none' },
    header: { backgroundColor: '#1A1D2E' },
    month_label: { color: '#fff', fontWeight: 'bold' },
    month_selector_label:
      chooseMode === 'year' ? { display: 'none' } : { color: '#fff', fontSize: chooseMode !== 'day' ? 30 : 12, marginRight: 10 },
    year_label: { color: '#fff', fontWeight: 'bold' },
    year_selector_label: { color: '#fff', fontSize: chooseMode === 'year' ? 40 : chooseMode === 'month' ? 30 : 12 },
    selected_month: { backgroundColor: '#4f9cff' },
    selected_year: { backgroundColor: '#4f9cff' },
    disabled_label: { color: '#555' },
    button_next: chooseMode === 'year' ? { display: 'none' } : {},
    button_prev: chooseMode === 'year' ? { display: 'none' } : {},
  }

  const handleDateChange = useCallback(
    (newDate: any) => {
      const isFrom = focused === 'from'
      const nextFrom = isFrom ? newDate : value.from
      let nextTo = focused === 'to' ? newDate : value.to

      if (isFrom && value.to) {
        const unit = chooseMode === 'day' ? 'day' : chooseMode === 'month' ? 'month' : 'year'
        if (dayjs(newDate).isAfter(dayjs(value.to), unit)) {
          nextTo = newDate
        }
      }

      onChange({ from: nextFrom, to: nextTo })
    },
    [focused, onChange, value, chooseMode]
  )

  const getQuickDate = useCallback(() => {
    const base = dayjs()
    if (chooseMode === 'year') return base.startOf('year').toDate()
    if (chooseMode === 'month') return base.startOf('month').toDate()
    return base.toDate()
  }, [chooseMode])

  const getQuickLabel = useMemo(
    () => (chooseMode === 'year' ? 'Năm hiện tại' : chooseMode === 'month' ? 'Tháng hiện tại' : 'Hôm nay'),
    [chooseMode]
  )

  const handleQuickSelect = useCallback(() => {
    const quickDate = getQuickDate()
    const unit = chooseMode === 'day' ? 'day' : chooseMode === 'month' ? 'month' : 'year'

    let nextFrom = focused === 'from' ? quickDate : value.from
    let nextTo = focused === 'to' ? quickDate : value.to

    if (nextFrom && nextTo) {
      if (dayjs(nextFrom).isAfter(dayjs(nextTo), unit)) {
        if (focused === 'from') {
          nextTo = nextFrom
        } else {
          nextFrom = nextTo
        }
      }
    }

    onChange({ from: nextFrom, to: nextTo })
  }, [focused, getQuickDate, onChange, value.from, value.to, chooseMode])

  const renderInput = useCallback(
    (label: string, date: any, key: 'from' | 'to') => (
      <View style={{ flex: 1 }}>
        <Text style={[styles.label, { color: labelColor }, labelStyle]}>{label}</Text>
        <TouchableOpacity
          style={[
            styles.input,
            { borderColor, backgroundColor },
            inputStyle,
            focused === key && { borderColor: '#4f9cff' },
          ]}
          onPress={() => setFocused(key)}
        >
          <Text style={[styles.dateText, { color: textColor }]}>{formatDate(date)}</Text>
          <Ionicons name="calendar-outline" size={15} color={iconColor} />
        </TouchableOpacity>
      </View>
    ),
    [backgroundColor, borderColor, focused, formatDate, iconColor, inputStyle, labelColor, labelStyle, textColor]
  )

  const picker = (
    <DateTimePicker
      mode="single"
      date={focused === 'from' ? value.from : value.to}
      components={components}
      styles={pickerStyles}
      locale="vi"
      disabledDates={(date) => {
        const today = dayjs()
        if (chooseMode !== 'day') return true
        // Không cho chọn ngày sau hôm nay
        if (dayjs(date).isAfter(today, 'day')) return true
        if (focused === 'to') {
          return dayjs(date).isBefore(dayjs(value.from), 'day')
        }
        return false
      }}
      disableMonthPicker={chooseMode === 'year'}
      onChange={(params) => {
        const today = dayjs()
        const d = dayjs(params.date)
        // Clamp về hôm nay nếu chọn quá hôm nay
        const safeDate = d.isAfter(today, 'day') ? today.toDate() : d.toDate()
        handleDateChange(safeDate)
      }}
      onMonthChange={(monthIndex: number) => {
        const today = dayjs()
        const base = focused === 'from' ? value.from : value.to
        let newDate = dayjs(base).month(monthIndex).startOf('month')
        const minDate = dayjs(value.from).startOf('month')
        if (newDate.isBefore(minDate, 'month')) {
          newDate = minDate
        }
        // Không vượt quá tháng hiện tại
        if (newDate.isAfter(today, 'month')) {
          newDate = today.startOf('month')
        }
        handleDateChange(newDate.toDate())
      }}
      onYearChange={(year: number) => {
        const today = dayjs()
        const base = focused === 'from' ? value.from : value.to
        let d = dayjs(base).year(year)
        let newDate = (chooseMode === 'year' ? d.startOf('year') : d.startOf('month'))
        const minDate = dayjs(value.from).startOf(chooseMode === 'year' ? 'year' : 'month')
        if (newDate.isBefore(minDate, chooseMode === 'year' ? 'year' : 'month')) {
          newDate = minDate
        }
        // Không vượt quá năm hiện tại
        const unit = chooseMode === 'year' ? 'year' : 'month'
        if (newDate.isAfter(today, unit)) {
          newDate = chooseMode === 'year' ? today.startOf('year') : today.startOf('month')
        }
        handleDateChange(newDate.toDate())
      }}
    />
  )

  return (
    <View style={[styles.row, containerStyle]}>
      {renderInput(labelFrom, value.from, 'from')}
      <View style={{ width: 20 }} />
      {renderInput(labelTo, value.to, 'to')}

      {mode === 'modal' && !!focused && (
        <Modal visible transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {picker}
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={handleQuickSelect} style={[styles.closeBtn, { flex: 1, backgroundColor: '#2e3348', marginRight: 10 }]}>
                  <Text style={styles.closeText}>{getQuickLabel}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFocused(null)} style={[styles.closeBtn, { flex: 1 }]}>
                  <Text style={styles.closeText}>Đóng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {mode === 'inline' && focused && <View style={{ marginTop: 20 }}>{picker}</View>}
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', padding: 10 },
  label: { fontSize: 12, marginBottom: 6, letterSpacing: 1 },
  input: {
    height: 30,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: { fontSize: 14, fontWeight: '500' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#1A1D2E', borderRadius: 18, padding: 12 },
  closeBtn: { marginTop: 12, padding: 12, backgroundColor: '#4f9cff', borderRadius: 10 },
  closeText: { textAlign: 'center', color: '#fff', fontWeight: '600' },
})
