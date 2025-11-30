import React, { useState } from 'react'
import { View, Text } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import MonthPickerCustom from '@/components/MonthPickerCustom/MonthPickerCustom.component'
import dayjs from 'dayjs'
import styles from './RegulationWaterLevel.style'

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
  const [selectedMonth, setSelectedMonth] = useState(dayjs())

  // Dữ liệu mẫu - 3 hàng dữ liệu
  const tableData: TimeRangeData[] = [
    {
      fromDate: '21/11/2025',
      toDate: '30/11/2025',
      mnqtFrom: 482,
      mnqtTo: 484,
    },
    {
      fromDate: '11/11/2025',
      toDate: '20/11/2025',
      mnqtFrom: 480,
      mnqtTo: 483,
    },
    {
      fromDate: '01/11/2025',
      toDate: '10/11/2025',
      mnqtFrom: 478,
      mnqtTo: 481,
    },
  ]

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
