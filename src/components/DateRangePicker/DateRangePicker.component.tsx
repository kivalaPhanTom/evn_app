import React, { useMemo, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import DateTimePicker, { CalendarComponents, useDefaultStyles } from 'react-native-ui-datepicker'
import dayjs from 'dayjs'
import { Ionicons } from '@expo/vector-icons'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { createThemePalette } from '@/core/constants/themePalette'

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
  allowToBeforeFrom?: boolean
  isCheckDisableDate?: boolean
  noRangeConstraint?: boolean
}

export default function DateRangePicker({
  value,
  onChange,
  mode = 'modal',
  chooseMode = 'day',
  labelFrom = 'TỪ NGÀY',
  labelTo = 'ĐẾN NGÀY',
  iconColor,
  textColor,
  labelColor,
  borderColor,
  backgroundColor,
  format = 'DD/MM/YYYY',
  containerStyle,
  inputStyle,
  labelStyle,
  allowToBeforeFrom = false,
  isCheckDisableDate = true,
  noRangeConstraint = false,
}: Props) {
  const [focused, setFocused] = useState<'from' | 'to' | null>(null)
  const defaultStyles = useDefaultStyles()
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const palette = createThemePalette(isDark)
  const styles = createStyles(isDark)
  const resolvedIconColor = iconColor ?? palette.icon
  const resolvedTextColor = textColor ?? palette.textPrimary
  const resolvedLabelColor = labelColor ?? palette.textSecondary
  const resolvedBorderColor = borderColor ?? palette.border
  const resolvedBackgroundColor = backgroundColor ?? palette.inputBg

  // const formatDate = useCallback((d: any) => dayjs(d).format(format), [format])
  const formatDate = useCallback(
    (d: any) => {
      if (!d) return ''
      const day = dayjs(d)
      return day.isValid() ? day.format(format) : ''
    },
    [format],
  )
  const components: CalendarComponents = useMemo(
    () => ({
      IconNext: chooseMode === 'year' ? null : <Ionicons name="chevron-forward" size={20} color={palette.iconStrong} />,
      IconPrev: chooseMode === 'year' ? null : <Ionicons name="chevron-back" size={20} color={palette.iconStrong} />,
    }),
    [chooseMode, palette.iconStrong],
  )

  const pickerStyles: any = {
    ...defaultStyles,
    today: { borderColor: chooseMode === 'day' ? '#4f9cff' : palette.disabledText, borderWidth: 1 },
    today_label: { color: chooseMode === 'day' ? '#4f9cff' : palette.disabledText, fontWeight: 'bold' },
    selected: { backgroundColor: chooseMode === 'day' ? '#4f9cff' : isDark ? '#333' : '#4f9cff' },
    selected_label: { color: '#fff' },
    day_label: { color: palette.textPrimary },
    weekday_label: chooseMode === 'day' ? { color: palette.textSecondary } : { display: 'none' },
    header: { backgroundColor: palette.modalBackground },
    month_label: { color: palette.textPrimary, fontWeight: 'bold' },
    month_selector_label:
      chooseMode === 'year'
        ? { display: 'none' }
        : { color: palette.textPrimary, fontSize: chooseMode !== 'day' ? 30 : 12, marginRight: 10 },
    year_label: { color: palette.textPrimary, fontWeight: 'bold' },
    year_selector_label: {
      color: palette.textPrimary,
      fontSize: chooseMode === 'year' ? 40 : chooseMode === 'month' ? 30 : 12,
    },
    selected_month: { backgroundColor: '#4f9cff' },
    selected_year: { backgroundColor: '#4f9cff' },
    disabled_label: { color: palette.disabledText },
    button_next: chooseMode === 'year' ? { display: 'none' } : {},
    button_prev: chooseMode === 'year' ? { display: 'none' } : {},
  }

  const handleDateChange = useCallback(
    (newDate: any) => {
      const isFrom = focused === 'from'
      const nextFrom = isFrom ? newDate : value.from
      let nextTo = focused === 'to' ? newDate : value.to

      // Chỉ tự động cập nhật value.to khi allowToBeforeFrom=false
      if (!noRangeConstraint && isFrom && value.to && !allowToBeforeFrom) {
        const unit = chooseMode === 'day' ? 'day' : chooseMode === 'month' ? 'month' : 'year'
        if (dayjs(newDate).isAfter(dayjs(value.to), unit)) {
          nextTo = newDate
        }
      }

      onChange({ from: nextFrom, to: nextTo })
    },
    [focused, onChange, value, chooseMode, allowToBeforeFrom, noRangeConstraint],
  )

  const getQuickDate = useCallback(() => {
    const base = dayjs()
    if (chooseMode === 'year') return base.startOf('year').toDate()
    if (chooseMode === 'month') return base.startOf('month').toDate()
    return base.toDate()
  }, [chooseMode])

  const getQuickLabel = useMemo(
    () => (chooseMode === 'year' ? 'Năm hiện tại' : chooseMode === 'month' ? 'Tháng hiện tại' : 'Hôm nay'),
    [chooseMode],
  )

  const handleQuickSelect = useCallback(() => {
    const quickDate = getQuickDate()
    const unit = chooseMode === 'day' ? 'day' : chooseMode === 'month' ? 'month' : 'year'

    let nextFrom = focused === 'from' ? quickDate : value.from
    let nextTo = focused === 'to' ? quickDate : value.to

    // Chỉ tự động điều chỉnh khi allowToBeforeFrom=false
    if (!allowToBeforeFrom && nextFrom && nextTo) {
      if (dayjs(nextFrom).isAfter(dayjs(nextTo), unit)) {
        if (focused === 'from') {
          nextTo = nextFrom
        } else {
          nextFrom = nextTo
        }
      }
    }

    onChange({ from: nextFrom, to: nextTo })
  }, [focused, getQuickDate, onChange, value.from, value.to, chooseMode, allowToBeforeFrom])

  const renderInput = useCallback(
    (label: string, date: any, key: 'from' | 'to') => (
      <View style={{ flex: 1 }}>
        <Text style={[styles.label, { color: resolvedLabelColor }, labelStyle]}>{label}</Text>
        <TouchableOpacity
          style={[
            styles.input,
            { borderColor: resolvedBorderColor, backgroundColor: resolvedBackgroundColor },
            inputStyle,
            focused === key && { borderColor: '#4f9cff' },
          ]}
          onPress={() => setFocused(key)}
        >
          <Text style={[styles.dateText, { color: resolvedTextColor }]}>{formatDate(date)}</Text>
          <Ionicons name="calendar-outline" size={15} color={resolvedIconColor} />
        </TouchableOpacity>
      </View>
    ),
    [
      resolvedBackgroundColor,
      resolvedBorderColor,
      focused,
      formatDate,
      resolvedIconColor,
      inputStyle,
      resolvedLabelColor,
      labelStyle,
      resolvedTextColor,
    ],
  )

  const picker = (
    <DateTimePicker
      mode="single"
      date={focused === 'from' ? value.from : value.to}
      components={components}
      styles={pickerStyles}
      locale="vi"
      disabledDates={(date) => {
        if (isCheckDisableDate) {
          const today = dayjs()
          if (chooseMode !== 'day') return true
          // Không cho chọn ngày sau hôm nay
          if (dayjs(date).isAfter(today, 'day')) return true
          if (focused === 'to' && !allowToBeforeFrom && value.from) {
            return dayjs(date).isBefore(dayjs(value.from), 'day')
          }
        } else {
          return false
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

        // Chi gioi han moc toi (to) khong duoc truoc moc tu (from).
        // Mốc from phai duoc phep lui ve cac thang/nam trong qua khu.
        if (!noRangeConstraint && focused === 'to' && !allowToBeforeFrom && value.from) {
          const minDate = dayjs(value.from).startOf('month')
          if (newDate.isBefore(minDate, 'month')) {
            newDate = minDate
          }
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
        let newDate = chooseMode === 'year' ? d.startOf('year') : d.startOf('month')
        // Khong so sanh from moi voi chinh value.from cu; chi clamp khi dang chon to.
        if (!noRangeConstraint && focused === 'to' && !allowToBeforeFrom && value.from) {
          const minDate = dayjs(value.from).startOf(chooseMode === 'year' ? 'year' : 'month')

          if (newDate.isBefore(minDate, chooseMode === 'year' ? 'year' : 'month')) {
            newDate = minDate
          }
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
                <TouchableOpacity
                  onPress={handleQuickSelect}
                  style={[
                    styles.closeBtn,
                    {
                      flex: 1,
                      backgroundColor: isDark ? '#2e3348' : 'rgba(0,0,0,0.06)',
                      marginRight: 10,
                    },
                  ]}
                >
                  <Text style={[styles.closeText, !isDark && { color: '#374151' }]}>{getQuickLabel}</Text>
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

const createStyles = (isDark: boolean) => {
  const palette = createThemePalette(isDark)
  return StyleSheet.create({
    row: { flexDirection: 'row', padding: 10 },
    label: { fontSize: 12, marginBottom: 6 },
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
    modalContent: { backgroundColor: palette.modalBackground, borderRadius: 18, padding: 12 },
    closeBtn: { marginTop: 12, padding: 12, backgroundColor: '#4f9cff', borderRadius: 10 },
    closeText: { textAlign: 'center', color: '#fff', fontWeight: '600' },
  })
}
