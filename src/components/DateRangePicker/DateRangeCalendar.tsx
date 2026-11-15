import React, { memo, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Svg, { Circle } from 'react-native-svg'
import dayjs from 'dayjs'
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
const DAY_SIZE = 36
// Keep weekday headers, leading spaces and day buttons on the same column widths.
const DAY_WIDTH_PERCENT = 14.285714
const MONTH_HEIGHT = 48 + DAY_HEIGHT * 6
const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
const DAY_RIPPLE = { color: '#387FD230', radius: DAY_SIZE / 2 }

const validDate = (value: unknown) => {
  if (!value) return null
  const date = dayjs(value as Date)
  return date.isValid() ? date.startOf('day') : null
}

type CalendarStyles = ReturnType<typeof createStyles>

// Compare local calendar days without allocating Dayjs objects per cell.
const dateKey = (date: dayjs.Dayjs) => date.year() * 10000 + (date.month() + 1) * 100 + date.date()
const monthKey = (month: number) => Math.floor(month / 12) * 10000 + ((month % 12) + 1) * 100
const getMonthLayout = (_: unknown, index: number) => ({ length: MONTH_HEIGHT, offset: MONTH_HEIGHT * index, index })
const getYearLayout = (_: unknown, index: number) => ({ length: 52, offset: 52 * index, index })
const itemKey = (item: number) => String(item)

interface CalendarDayProps {
  day: number
  value: number
  label: string
  selected: boolean
  disabled: boolean
  isToday: boolean
  styles: CalendarStyles
  onSelect: (value: number) => void
}

const CalendarDay = memo(function CalendarDay({
  day,
  value,
  label,
  selected,
  disabled,
  isToday,
  styles,
  onSelect,
}: CalendarDayProps) {
  const handlePress = useCallback(() => onSelect(value), [onSelect, value])
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={handlePress}
      style={styles.dayCell}
      android_ripple={DAY_RIPPLE}
    >
      {/* Today's SVG stays mounted when its outline changes to a selected fill. */}
      {(selected || isToday) && (
        <Svg width={DAY_SIZE} height={DAY_SIZE} style={styles.dayIndicator} pointerEvents="none" accessible={false}>
          <Circle
            cx={DAY_SIZE / 2}
            cy={DAY_SIZE / 2}
            r={selected ? DAY_SIZE / 2 : (DAY_SIZE - 1) / 2}
            fill={selected ? '#387FD2' : 'none'}
            stroke={isToday && !selected ? styles.todayIndicator.color : 'none'}
            strokeWidth={1}
          />
        </Svg>
      )}
      <Text style={[styles.dayText, disabled && styles.disabledText, selected && styles.selectedText]}>{day}</Text>
    </Pressable>
  )
})

interface CalendarRangeProps {
  offset: number
  daysInMonth: number
  start: number
  end: number
  trimStart: boolean
  trimEnd: boolean
  styles: CalendarStyles
}

// Draw at most six bands per month. Range changes do not need to update day buttons.
const CalendarRange = memo(function CalendarRange({
  offset,
  daysInMonth,
  start,
  end,
  trimStart,
  trimEnd,
  styles,
}: CalendarRangeProps) {
  if (!start || !end) return null
  const firstCell = offset + start - 1
  const lastCell = offset + Math.min(daysInMonth, end) - 1
  const firstRow = Math.floor(firstCell / 7)
  const lastRow = Math.floor(lastCell / 7)

  return (
    <>
      {Array.from({ length: lastRow - firstRow + 1 }, (_, index) => {
        const row = firstRow + index
        const left = row === firstRow ? (firstCell % 7) + (trimStart ? 0.5 : 0) : 0
        const right = row === lastRow ? 6 - (lastCell % 7) + (trimEnd ? 0.5 : 0) : 0
        return (
          <View
            key={row}
            pointerEvents="none"
            accessible={false}
            style={[
              styles.rangeBand,
              {
                top: row * DAY_HEIGHT + (DAY_HEIGHT - DAY_SIZE) / 2,
                left: `${(left * 100) / 7}%`,
                right: `${(right * 100) / 7}%`,
              },
            ]}
          />
        )
      })}
    </>
  )
})

interface CalendarMonthProps {
  month: number
  startDay: number
  endDay: number
  rangeStart: number
  rangeEnd: number
  todayDay: number
  disabledAfter: number
  styles: CalendarStyles
  onSelect: (value: number) => void
}

const CalendarMonth = memo(function CalendarMonth({
  month,
  startDay,
  endDay,
  rangeStart,
  rangeEnd,
  todayDay,
  disabledAfter,
  styles,
  onSelect,
}: CalendarMonthProps) {
  const year = Math.floor(month / 12)
  const monthNumber = month % 12
  const { cells, offset, daysInMonth, leadingSpace } = useMemo(() => {
    const offset = new Date(year, monthNumber, 1).getDay()
    const daysInMonth = new Date(year, monthNumber + 1, 0).getDate()
    const key = monthKey(month)
    const cells = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1
      return {
        day,
        value: key + day,
        label: `${String(day).padStart(2, '0')}/${String(monthNumber + 1).padStart(2, '0')}/${year}`,
      }
    })
    // Combining fractional leading widths can wrap the last day of the first week
    // onto the next row in Yoga, so retain only these individual empty cells.
    const leadingSpace = Array.from({ length: offset }, (_, index) => (
      <View
        key={index}
        pointerEvents="none"
        accessible={false}
        style={{ width: `${DAY_WIDTH_PERCENT}%`, height: DAY_HEIGHT }}
      />
    ))
    return { cells, offset, daysInMonth, leadingSpace }
  }, [month, monthNumber, year])
  const dayButtons = useMemo(
    () =>
      cells.map((cell) => (
        <CalendarDay
          key={cell.day}
          {...cell}
          selected={cell.day === startDay || cell.day === endDay}
          disabled={cell.day > disabledAfter}
          isToday={cell.day === todayDay}
          styles={styles}
          onSelect={onSelect}
        />
      )),
    [cells, startDay, endDay, disabledAfter, todayDay, styles, onSelect],
  )

  return (
    <View style={styles.month}>
      <Text style={styles.monthTitle}>
        Tháng {monthNumber + 1} năm {year}
      </Text>
      <View style={styles.days}>
        <CalendarRange
          offset={offset}
          daysInMonth={daysInMonth}
          start={rangeStart}
          end={rangeEnd}
          trimStart={startDay > 0}
          trimEnd={endDay > 0}
          styles={styles}
        />
        {leadingSpace}
        {dayButtons}
      </View>
    </View>
  )
})

function DateRangeCalendar({ value, onChange, onClose, disableFutureDates, labelFrom, labelTo }: Props) {
  const isDark = useAppTheme() === 'dark'
  const { height } = useWindowDimensions()
  const styles = useMemo(() => createStyles(isDark), [isDark])
  const today = dayjs().startOf('day')
  const [from, setFrom] = useState(() => validDate(value.from))
  const [to, setTo] = useState(() => validDate(value.to))
  const [selectingEnd, setSelectingEnd] = useState(false)
  // Keep the list origin and initial offset fixed while the user selects a new range.
  const [initialDate] = useState(() => from ?? to ?? today)
  const [visibleYear, setVisibleYear] = useState(initialDate.year())
  const visibleYearRef = useRef(visibleYear)
  const [showYears, setShowYears] = useState(false)
  const listRef = useRef<FlatList<number>>(null)
  const firstYear = Math.min(1900, initialDate.year())
  const lastYear = disableFutureDates ? today.year() : Math.max(today.year() + 20, initialDate.year())
  const months = useMemo(
    () => Array.from({ length: (lastYear - firstYear + 1) * 12 }, (_, index) => firstYear * 12 + index),
    [firstYear, lastYear],
  )
  const initialIndex = Math.max(
    0,
    Math.min(months.length - 1, (initialDate.year() - firstYear) * 12 + initialDate.month()),
  )
  const years = useMemo(
    () => Array.from({ length: lastYear - firstYear + 1 }, (_, index) => lastYear - index),
    [firstYear, lastYear],
  )
  const complete = !!from && !!to && !selectingEnd

  const selectDateRef = useRef<(key: number) => void>(() => {})
  useLayoutEffect(() => {
    selectDateRef.current = (key) => {
      const date = dayjs(new Date(Math.floor(key / 10000), (Math.floor(key / 100) % 100) - 1, key % 100))
      if (!selectingEnd || !from) {
        setFrom(date)
        setTo(null)
        setSelectingEnd(true)
        return
      }
      // Keep the completed range local until OK/Save confirms it.
      const beforeStart = key < dateKey(from)
      const start = beforeStart ? date : from
      const end = beforeStart ? from : date
      setFrom(start)
      setTo(end)
      setSelectingEnd(false)
    }
  }, [from, selectingEnd])
  const confirmSelection = useCallback(() => {
    if (!from || !to || selectingEnd) return
    // Commit input values at normal priority before closing the modal. Parent
    // handlers may also dispatch chart requests, so do not defer this update.
    onChange({ from: from.toDate(), to: to.toDate() })
    onClose()
  }, [from, to, selectingEnd, onChange, onClose])
  // Stable identity lets days skip rendering without using stale selection state.
  const selectDate = useCallback((key: number) => selectDateRef.current(key), [])
  const fromKey = from ? dateKey(from) : 0
  const toKey = to ? dateKey(to) : 0
  const todayKey = dateKey(today)
  const renderMonth = useCallback(
    ({ item: month }: { item: number }) => {
      const key = monthKey(month)
      const hasRange = fromKey > 0 && toKey > fromKey && fromKey <= key + 31 && toKey >= key + 1
      return (
        <CalendarMonth
          month={month}
          startDay={fromKey > key && fromKey <= key + 31 ? fromKey - key : 0}
          endDay={toKey > key && toKey <= key + 31 ? toKey - key : 0}
          rangeStart={hasRange ? Math.max(1, fromKey - key) : 0}
          rangeEnd={hasRange ? Math.min(31, toKey - key) : 0}
          todayDay={todayKey > key && todayKey <= key + 31 ? todayKey - key : 0}
          disabledAfter={disableFutureDates ? Math.max(0, Math.min(31, todayKey - key)) : 31}
          styles={styles}
          onSelect={selectDate}
        />
      )
    },
    [fromKey, toKey, todayKey, disableFutureDates, styles, selectDate],
  )
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.max(
        0,
        Math.min(months.length - 1, Math.floor(event.nativeEvent.contentOffset.y / MONTH_HEIGHT)),
      )
      const year = Math.floor(months[index] / 12)
      if (year !== visibleYearRef.current) {
        visibleYearRef.current = year
        setVisibleYear(year)
      }
    },
    [months],
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
              onPress={confirmSelection}
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
              keyExtractor={itemKey}
              initialScrollIndex={initialIndex}
              getItemLayout={getMonthLayout}
              initialNumToRender={3}
              maxToRenderPerBatch={2}
              updateCellsBatchingPeriod={16}
              windowSize={5}
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={100}
            />
            {showYears && (
              <FlatList
                style={styles.yearList}
                data={years}
                numColumns={3}
                keyExtractor={itemKey}
                initialScrollIndex={Math.max(0, Math.floor(years.indexOf(visibleYear) / 3))}
                getItemLayout={getYearLayout}
                renderItem={({ item: year }) => (
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={`Năm ${year}`}
                    onPress={() => {
                      setShowYears(false)
                      visibleYearRef.current = year
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
              onPress={confirmSelection}
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

export default memo(DateRangeCalendar)

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
    weekday: { width: `${DAY_WIDTH_PERCENT}%`, textAlign: 'center', color: isDark ? text : accent, fontSize: 13 },
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
    // Keep six rows of space without mounting trailing empty cells.
    days: { height: DAY_HEIGHT * 6, flexDirection: 'row', flexWrap: 'wrap', alignContent: 'flex-start' },
    dayCell: { width: `${DAY_WIDTH_PERCENT}%`, height: DAY_HEIGHT, alignItems: 'center', justifyContent: 'center' },
    dayIndicator: {
      position: 'absolute',
      top: (DAY_HEIGHT - DAY_SIZE) / 2,
      left: '50%',
      marginLeft: -DAY_SIZE / 2,
      width: DAY_SIZE,
      height: DAY_SIZE,
    },
    todayIndicator: { color: isDark ? '#28CEE0' : '#2F7BEE' },
    dayText: { color: text, fontSize: 14 },
    rangeBand: {
      position: 'absolute',
      height: DAY_SIZE,
      backgroundColor: isDark ? '#43658E' : '#C8F4FC',
    },
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
