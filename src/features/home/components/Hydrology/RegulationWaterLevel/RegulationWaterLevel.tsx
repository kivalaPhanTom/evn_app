import React, { useState, useEffect, useMemo } from 'react'
import { View, Text } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import MonthPickerCustom from '@/components/MonthPickerCustom/MonthPickerCustom.component'
import dayjs from 'dayjs'
import styles from './RegulationWaterLevel.style'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { RootState } from '@/core/redux/store'
import { getOperateWaterLevel } from '@/core/redux/domains/hydrology'

interface RegulationWaterLevelProps {
  title?: string
}

interface TimeRangeData {
  fromDate: string
  toDate: string
  mnqtFrom: number
  mnqtTo: number
}

const RegulationWaterLevel: React.FC<RegulationWaterLevelProps> = () => {
  const dispatch = useAppDispatch()
  const { operateWaterLevel, countRefesh } = useAppSelector((state: RootState) => state.hydrologySlice)
  const [selectedMonth, setSelectedMonth] = useState(dayjs())

  // Tạo dữ liệu mặc định khi không có dữ liệu từ API
  const generateDefaultData = (month: dayjs.Dayjs): TimeRangeData[] => {
    const daysInMonth = month.daysInMonth()
    const startOfMonth = month.startOf('month')

    return [
      {
        fromDate: startOfMonth.clone().date(1).format('DD/MM/YYYY'),
        toDate: startOfMonth.clone().date(10).format('DD/MM/YYYY'),
        mnqtFrom: 0,
        mnqtTo: 0,
      },
      {
        fromDate: startOfMonth.clone().date(11).format('DD/MM/YYYY'),
        toDate: startOfMonth.clone().date(20).format('DD/MM/YYYY'),
        mnqtFrom: 0,
        mnqtTo: 0,
      },
      {
        fromDate: startOfMonth.clone().date(21).format('DD/MM/YYYY'),
        toDate: startOfMonth.clone().date(daysInMonth).format('DD/MM/YYYY'),
        mnqtFrom: 0,
        mnqtTo: 0,
      },
    ]
  }

  // Map dữ liệu từ API sang format của component, hoặc tạo dữ liệu mặc định nếu rỗng
  const tableData: TimeRangeData[] = useMemo(() => {
    const apiData = operateWaterLevel?.waterLevelRange || []
    
    if (apiData.length === 0) {
      return generateDefaultData(selectedMonth)
    }
    
    return apiData.map((item) => ({
      fromDate: item.fromDate,
      toDate: item.toDate,
      mnqtFrom: item.fromLevel,
      mnqtTo: item.toLevel,
    }))
  }, [operateWaterLevel?.waterLevelRange, selectedMonth])

  // Gọi API khi component mount hoặc khi selectedMonth thay đổi
  useEffect(() => {
    const formattedDate = selectedMonth.format('MM/YYYY')
    dispatch(getOperateWaterLevel({ selectedMonth: formattedDate }))
  }, [selectedMonth, dispatch, countRefesh])

  const handleConfirm = (date: dayjs.Dayjs) => {
    setSelectedMonth(date)
  }

  const handleSelectCurrentMonth = () => {
    const today = dayjs()
    setSelectedMonth(today)
  }

  return (
    <AnimatedCardContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Khoảng MNQT theo thời gian</Text>

        {/* Month Picker */}
        <MonthPickerCustom
          selectedDate={selectedMonth}
          onConfirm={handleConfirm}
          onSelectCurrentMonth={handleSelectCurrentMonth}
        />

        {/* Bảng dữ liệu */}
        <View style={styles.tableContainer}>
          {/* Header */}
          <View style={styles.tableHeader}>
            <View style={[styles.tableHeaderCell, styles.timeColumn]}>
              <Text style={styles.tableHeaderText}>THỜI GIAN</Text>
              <View style={styles.tableSubHeader}>
                <Text style={styles.tableSubHeaderText}>Từ ngày</Text>
                <Text style={styles.tableSubHeaderText}>Đến ngày</Text>
              </View>
            </View>
            <View style={[styles.tableHeaderCell, styles.mnqtColumn]}>
              <Text style={styles.tableHeaderText}>MNQT (M)</Text>
              <View style={styles.tableSubHeader}>
                <Text style={styles.tableSubHeaderText}>Từ</Text>
                <Text style={styles.tableSubHeaderText}>Đến</Text>
              </View>
            </View>
          </View>

          {/* Rows */}
          {tableData.map((row, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                index === tableData.length - 1 && styles.tableRowLast,
              ]}
            >
              <View style={[styles.tableCell, styles.timeColumn]}>
                <Text style={styles.tableCellText}>{row.fromDate}</Text>
                <Text style={styles.tableCellText}>{row.toDate}</Text>
              </View>
              <View style={[styles.tableCell, styles.mnqtColumn]}>
                <Text style={styles.tableCellText}>{row.mnqtFrom}</Text>
                <Text style={styles.tableCellText}>{row.mnqtTo}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default RegulationWaterLevel
