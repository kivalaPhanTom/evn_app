import React, { useMemo, useRef, useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import dayjs, { Dayjs } from 'dayjs'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import type { DateRange } from './DateRangePicker.component'

interface Props {
  value: DateRange
  onChange: (range: DateRange) => void
  onClose: () => void
  disableFutureDates: boolean
  labelFrom: string
  labelTo: string
}

const DAY_HEIGHT = 42
const MONTH_HEIGHT = 48 + DAY_HEIGHT * 6
const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

const validDate = (value: unknown) => {
  if (!value) return null
  const date = dayjs(value as Date)
  return date.isValid() ? date.startOf('day') : null
}

export default function DateRangeCalendar({ value, onChange, onClose, disableFutureDates, labelFrom, labelTo }: Props) {
  const isDark = useAppTheme() === 'dark'
  const { height } = useWindowDimensions()
  const styles = useMemo(() => createStyles(isDark), [isDark])
  const today = dayjs().startOf('day')
  const [from, setFrom] = useState(() => validDate(value.from))
  const [to, setTo] = useState(() => validDate(value.to))
  const [selectingEnd, setSelectingEnd] = useState(false)
  const initialDate = from ?? to ?? today
  const [visibleYear, setVisibleYear] = useState(initialDate.year())
  const [showYears, setShowYears] = useState(false)
  const listRef = useRef<FlatList<Dayjs>>(null)
  const firstYear = Math.min(1900, initialDate.year())
  const lastYear = disableFutureDates ? today.year() : Math.max(today.year() + 20, initialDate.year())
  const months = useMemo(
    () => Array.from({ length: (lastYear - firstYear + 1) * 12 }, (_, index) => dayjs(new Date(firstYear, index, 1))),
    [firstYear, lastYear],
  )
  const initialIndex = Math.max(
    0,
    Math.min(months.length - 1, (initialDate.year() - firstYear) * 12 + initialDate.month()),
  )
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, index) => lastYear - index)
  const complete = !!from && !!to && !selectingEnd

  const selectDate = (date: Dayjs) => {
    if (!selectingEnd || !from) {
      setFrom(date)
      setTo(null)
      setSelectingEnd(true)
      return
    }
    // The second tap completes the range, including when it precedes the first tap.
    const start = date.isBefore(from, 'day') ? date : from
    const end = date.isBefore(from, 'day') ? from : date
    setFrom(start)
    setTo(end)
    setSelectingEnd(false)
    onChange({ from: start.toDate(), to: end.toDate() })
  }

  const renderMonth = ({ item: month }: { item: Dayjs }) => (
    <View style={styles.month}>
      <Text style={styles.monthTitle}>
        Tháng {month.month() + 1} năm {month.year()}
      </Text>
      <View style={styles.days}>
        {Array.from({ length: 42 }, (_, index) => {
          const day = index - month.day() + 1
          if (day < 1 || day > month.daysInMonth()) return <View key={index} style={styles.dayCell} />
          const date = month.date(day)
          const isStart = !!from && date.isSame(from, 'day')
          const isEnd = !!to && date.isSame(to, 'day')
          const inRange = !!from && !!to && !date.isBefore(from, 'day') && !date.isAfter(to, 'day')
          const disabled = disableFutureDates && date.isAfter(today, 'day')
          const selected = isStart || isEnd
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityLabel={date.format('DD/MM/YYYY')}
              accessibilityState={{ selected, disabled }}
              disabled={disabled}
              onPress={() => selectDate(date)}
              style={styles.dayCell}
            >
              {inRange && !from?.isSame(to, 'day') && (
                <View style={[styles.rangeBand, isStart && styles.rangeStart, isEnd && styles.rangeEnd]} />
              )}
              <View style={[styles.dayCircle, date.isSame(today, 'day') && styles.today, selected && styles.selected]}>
                <Text style={[styles.dayText, disabled && styles.disabledText, selected && styles.selectedText]}>
                  {day}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.overlay}>
        <View accessibilityViewIsModal style={[styles.dialog, { height: Math.min(height * 0.9, 780) }]}>
          <View style={styles.toolbar}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Đóng lịch"
              onPress={onClose}
              style={styles.toolbarButton}
            >
              <Ionicons name="close" size={24} color={isDark ? '#E5E7EB' : '#2F7BEE'} />
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              disabled={!complete}
              onPress={onClose}
              style={styles.toolbarButton}
            >
              <Text style={[styles.actionText, !complete && styles.disabledText]}>Lưu</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.summary}>
            <View style={styles.summaryText}>
              <Text style={styles.caption}>
                {labelFrom} – {labelTo}
              </Text>
              <Text style={styles.rangeText}>
                {from ? from.format('DD/MM/YYYY') : 'Chọn ngày bắt đầu'}
                {to ? ` – ${to.format('DD/MM/YYYY')}` : from ? ' – …' : ''}
              </Text>
              <Text accessibilityLiveRegion="polite" style={styles.hint}>
                {selectingEnd ? 'Chọn ngày kết thúc' : 'Chọn hai ngày để tạo khoảng thời gian'}
              </Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Chọn năm"
              onPress={() => setShowYears(!showYears)}
              style={styles.yearButton}
            >
              <Text style={styles.yearButtonText}>{visibleYear}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.weekdays}>
            {WEEKDAYS.map((day) => (
              <Text key={day} style={styles.weekday}>
                {day}
              </Text>
            ))}
          </View>
          <View style={styles.calendar}>
            <FlatList
              ref={listRef}
              data={months}
              renderItem={renderMonth}
              keyExtractor={(month) => month.format('YYYY-MM')}
              initialScrollIndex={initialIndex}
              getItemLayout={(_, index) => ({ length: MONTH_HEIGHT, offset: MONTH_HEIGHT * index, index })}
              initialNumToRender={3}
              windowSize={5}
              extraData={{ from, to, isDark }}
              showsVerticalScrollIndicator={false}
              onScroll={(event) => {
                const index = Math.floor(event.nativeEvent.contentOffset.y / MONTH_HEIGHT)
                if (months[index]) setVisibleYear(months[index].year())
              }}
              scrollEventThrottle={100}
            />
            {showYears && (
              <FlatList
                style={styles.yearList}
                data={years}
                numColumns={3}
                keyExtractor={String}
                initialScrollIndex={Math.max(0, Math.floor(years.indexOf(visibleYear) / 3))}
                getItemLayout={(_, index) => ({ length: 52, offset: 52 * index, index })}
                renderItem={({ item: year }) => (
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={`Năm ${year}`}
                    onPress={() => {
                      setShowYears(false)
                      setVisibleYear(year)
                      listRef.current?.scrollToIndex({ index: (year - firstYear) * 12, animated: false })
                    }}
                    style={styles.yearCell}
                  >
                    <Text style={[styles.yearText, year === visibleYear && styles.actionText]}>{year}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={{ disabled: !complete }}
              disabled={!complete}
              onPress={onClose}
              style={[styles.okButton, !complete && styles.disabledButton]}
            >
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const createStyles = (isDark: boolean) => {
  const background = isDark ? '#1E2643' : '#FFFFFF'
  const text = isDark ? '#E5E7EB' : '#222222'
  const accent = isDark ? '#419AFF' : '#2F7BEE'
  const divider = isDark ? '#596078' : '#D5D8E0'
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    dialog: { width: '100%', maxWidth: 420, borderRadius: 30, backgroundColor: background, overflow: 'hidden' },
    toolbar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, paddingTop: 6 },
    toolbarButton: { minWidth: 48, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
    actionText: { color: accent, fontSize: 14, fontWeight: '500' },
    summary: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingBottom: 16, gap: 10 },
    summaryText: { flex: 1, gap: 6 },
    caption: { color: isDark ? text : accent, fontSize: 12 },
    rangeText: { color: isDark ? text : accent, fontSize: 17, fontWeight: '500' },
    hint: { color: isDark ? '#B6BDD2' : '#64748B', fontSize: 11 },
    yearButton: { backgroundColor: isDark ? '#D3D5DA' : '#E5E5E5', borderRadius: 8, padding: 7 },
    yearText: { color: text, fontSize: 18 },
    yearButtonText: { color: '#272727', fontSize: 18 },
    weekdays: {
      flexDirection: 'row',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: divider,
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
    weekday: { width: '14.285714%', textAlign: 'center', color: isDark ? text : accent, fontSize: 13 },
    calendar: { flex: 1, marginHorizontal: 12 },
    month: { height: MONTH_HEIGHT },
    monthTitle: {
      height: 48,
      paddingTop: 18,
      paddingLeft: 14,
      color: isDark ? text : accent,
      fontSize: 13,
      fontWeight: '500',
    },
    days: { flexDirection: 'row', flexWrap: 'wrap' },
    dayCell: { width: '14.285714%', height: DAY_HEIGHT, alignItems: 'center', justifyContent: 'center' },
    dayCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    dayText: { color: text, fontSize: 14 },
    rangeBand: { position: 'absolute', left: 0, right: 0, height: 36, backgroundColor: isDark ? '#43658E' : '#C8F4FC' },
    rangeStart: { left: '50%' },
    rangeEnd: { right: '50%' },
    today: { borderWidth: 1, borderColor: isDark ? '#28CEE0' : accent },
    selected: { backgroundColor: '#387FD2', borderWidth: 0 },
    selectedText: { color: '#FFFFFF' },
    disabledText: { color: isDark ? '#737D99' : '#B8BEC9' },
    yearList: { ...StyleSheet.absoluteFillObject, backgroundColor: background },
    yearCell: { width: '33.333333%', height: 52, justifyContent: 'center', alignItems: 'center' },
    footer: { borderTopWidth: StyleSheet.hairlineWidth, borderColor: divider, padding: 10 },
    okButton: {
      backgroundColor: isDark ? '#3297FA' : '#2F7BFF',
      borderRadius: 24,
      height: 46,
      alignItems: 'center',
      justifyContent: 'center',
    },
    disabledButton: { opacity: 0.45 },
    okText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  })
}
