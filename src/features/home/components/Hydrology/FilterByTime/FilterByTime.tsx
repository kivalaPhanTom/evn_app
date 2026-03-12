import React, { useRef, useState } from 'react'
import { View, Text, Animated } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import dayjs, { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import { Toast } from 'toastify-react-native'

import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { TabSwitcher } from '@/components/TabSwitcher/TabSwitcher.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'
import MonthPickerCustom from '@/components/MonthPickerCustom/MonthPickerCustom.component'
import { setFilterByTime } from '@/core/redux/slices/HydrologySlice'
import { px } from '@/core/utils/scale'
import styles from './FilterByTime.styles'

interface FilterByTimeProps {
  date: string
  currentPlantId: string
}

type FilterTab = 'hour' | 'day' | 'month' | 'year'
type RangeValue = { from: Dayjs; to: Dayjs }
type DateRangeKey = 'rangeCompareDate' | 'rangeTargetDate' | 'rangeCurrentDate'
type PeriodRangeKey = 'rangeCompareMonth' | 'rangeTargetMonth' | 'rangeCompareYear'

const rowStyle = {
  flexDirection: 'row' as const,
  justifyContent: 'space-between' as const,
  width: 'auto' as const,
  padding: px(12),
}

const colStyle = {
  width: '47%' as const,
}

const FilterByTime: React.FC<FilterByTimeProps> = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const contentAnim = useRef(new Animated.Value(1)).current

  const filterByTime = useSelector((state: any) => state.hydrologySlice.filterByTime)
  const [tab, setTab] = useState<FilterTab>('hour')

  const handleTabChange = (newTab: FilterTab) => {
    setTab(newTab)
    dispatch(setFilterByTime({ currentFilterTab: newTab }))
  }

  const updateDateRange = (key: DateRangeKey) => (newRange: RangeValue) => {
    const fromDate = dayjs(newRange.from)
    const toDate = dayjs(newRange.to)

    if (!fromDate.isValid() || !toDate.isValid() || fromDate.isAfter(toDate)) return

    dispatch(
      setFilterByTime({
        [key]: {
          from: fromDate,
          to: toDate,
        },
      }),
    )
  }

  const updatePeriodRange =
    ({
      key,
      field,
      unit,
      errorMessage,
    }: {
      key: PeriodRangeKey
      field: keyof RangeValue
      unit: 'month' | 'year'
      errorMessage: string
    }) =>
    (value: Dayjs | Date | string) => {
      const picked = dayjs(value)
      const nextDate = field === 'from' ? picked.startOf(unit) : picked.endOf(unit)
      const currentRange = filterByTime[key]
      const newRange = { ...currentRange, [field]: nextDate }

      if (dayjs(newRange.from).isAfter(dayjs(newRange.to))) {
        Toast.warn(errorMessage)
        return
      }

      dispatch(setFilterByTime({ [key]: newRange }))
    }

  const renderDateRange = ({
    title,
    keyRange,
    labelFrom,
    labelTo,
  }: {
    title?: string
    keyRange: DateRangeKey
    labelFrom?: string
    labelTo?: string
  }) => (
    <View>
      {title ? <Text style={styles.chartCompareByTime}>{title}</Text> : null}
      <DateRangePicker
        labelFrom={labelFrom}
        labelTo={labelTo}
        labelColor="#fff"
        format="DD/MM/YYYY"
        value={filterByTime[keyRange]}
        onChange={updateDateRange(keyRange)}
        mode="modal"
        chooseMode="day"
      />
    </View>
  )

  const renderPeriodPicker = ({
    keyRange,
    field,
    format,
    label,
    unit,
    errorMessage,
  }: {
    keyRange: PeriodRangeKey
    field: keyof RangeValue
    format: string
    label: string
    unit: 'month' | 'year'
    errorMessage: string
  }) => (
    <MonthPickerCustom
      selectedDate={dayjs(filterByTime[keyRange][field])}
      containerStyle={{ flexDirection: 'column', alignItems: 'flex-start' }}
      pickerStyle={{ width: '100%' }}
      selectedDateStyle={{ fontSize: px.f(20) }}
      label={label}
      pickerLabelStyle={{ fontSize: 12 }}
      formatMonth={(date) => date.format(format)}
      onConfirm={updatePeriodRange({
        key: keyRange,
        field,
        unit,
        errorMessage,
      })}
    />
  )

  const renderPeriodSection = ({
    title,
    keyRange,
    format,
    labelFrom,
    labelTo,
    errorMessage,
    titleStyle,
    unit,
  }: {
    title: string
    keyRange: PeriodRangeKey
    format: string
    labelFrom: string
    labelTo: string
    errorMessage: string
    titleStyle?: any
    unit: 'month' | 'year'
  }) => (
    <View>
      {unit === 'month' && <Text style={titleStyle ?? styles.chartCompareByTime}>{title}</Text>}

      <View style={rowStyle}>
        <View style={colStyle}>
          {renderPeriodPicker({
            keyRange,
            field: 'from',
            format,
            label: labelFrom,
            unit,
            errorMessage,
          })}
        </View>

        <View style={colStyle}>
          {renderPeriodPicker({
            keyRange,
            field: 'to',
            format,
            label: labelTo,
            unit,
            errorMessage,
          })}
        </View>
      </View>
    </View>
  )

  const renderHourTab = () =>
    renderDateRange({
      keyRange: 'rangeCurrentDate',
      labelFrom: 'Ngày mục tiêu:',
      labelTo: 'Ngày so sánh:',
    })

  const renderDayTab = () => (
    <View>
      {renderDateRange({
        title: 'Ngày so sánh',
        keyRange: 'rangeCompareDate',
        labelFrom: 'Từ ngày:',
        labelTo: 'Đến ngày:',
      })}
      {renderDateRange({
        title: 'Ngày mục tiêu',
        keyRange: 'rangeTargetDate',
        labelFrom: 'Từ ngày:',
        labelTo: 'Đến ngày:',
      })}
    </View>
  )

  const renderMonthTab = () => (
    <View>
      {renderPeriodSection({
        title: 'Tháng so sánh',
        keyRange: 'rangeCompareMonth',
        format: 'MM/YYYY',
        labelFrom: 'Từ tháng:',
        labelTo: 'Đến tháng:',
        errorMessage: 'Tháng bắt đầu không được sau tháng kết thúc',
        unit: 'month',
      })}

      {renderPeriodSection({
        title: 'Tháng mục tiêu',
        keyRange: 'rangeTargetMonth',
        format: 'MM/YYYY',
        labelFrom: 'Từ tháng:',
        labelTo: 'Đến tháng:',
        errorMessage: 'Tháng bắt đầu không được sau tháng kết thúc',
        titleStyle: [styles.chartCompareByTime, { marginTop: 0 }],
        unit: 'month',
      })}
    </View>
  )

  const renderYearTab = () =>
    renderPeriodSection({
      title: 'Năm so sánh',
      keyRange: 'rangeCompareYear',
      format: 'YYYY',
      labelFrom: 'Từ năm:',
      labelTo: 'Đến năm:',
      errorMessage: 'Năm bắt đầu không được sau năm kết thúc',
      unit: 'year',
    })

  const renderTabContent = () => {
    switch (tab) {
      case 'hour':
        return renderHourTab()
      case 'day':
        return renderDayTab()
      case 'month':
        return renderMonthTab()
      case 'year':
        return renderYearTab()
      default:
        return null
    }
  }

  return (
    <AnimatedCardContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Bộ lọc thời gian</Text>

        <TabSwitcher
          tabs={[
            { id: 'hour', label: t('byHour') },
            { id: 'day', label: t('byDay') },
            { id: 'month', label: t('byMonth') },
            { id: 'year', label: t('byYear') },
          ]}
          activeTab={tab}
          onTabChange={(newTab) => handleTabChange(newTab as FilterTab)}
          contentAnim={contentAnim}
        />

        <View>{renderTabContent()}</View>
      </View>
    </AnimatedCardContainer>
  )
}

export default FilterByTime
