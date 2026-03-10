import React, { useState, useMemo, useEffect } from 'react'
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native'
import dayjs from 'dayjs'
import { Ionicons } from '@expo/vector-icons'
import { px } from '@/core/utils/scale'
import styles from './MonthPickerCustom.styles'

interface MonthPickerCustomProps {
  selectedDate: dayjs.Dayjs
  onConfirm: (date: dayjs.Dayjs) => void
  onSelectCurrentMonth?: () => void
  label?: string
  title?: string
  confirmText?: string
  currentMonthText?: string
  formatMonth?: (date: dayjs.Dayjs) => string
  containerStyle?: any
  pickerStyle?: any
  selectedDateStyle?: any
  pickerLabelStyle?: any
}

const MonthPickerCustom: React.FC<MonthPickerCustomProps> = ({
  selectedDate,
  onConfirm,
  onSelectCurrentMonth,
  label = 'Chọn tháng:',
  title = 'Chọn tháng',
  confirmText = 'Xác nhận',
  currentMonthText = 'Tháng hiện tại',
  formatMonth = (date: dayjs.Dayjs) => `Tháng ${date.format('MM/YYYY')}`,
  containerStyle,
  pickerStyle,
  selectedDateStyle,
  pickerLabelStyle,
}) => {
  const [visible, setVisible] = useState(false)
  const [tempMonth, setTempMonth] = useState(selectedDate.month() + 1)
  const [tempYear, setTempYear] = useState(selectedDate.year())

  // Tạo danh sách tháng (1-12)
  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => i + 1)
  }, [])

  // Tạo danh sách năm (từ năm hiện tại - 10 đến năm hiện tại + 10)
  const years = useMemo(() => {
    const currentYear = dayjs().year()
    return Array.from({ length: 21 }, (_, i) => currentYear - 10 + i)
  }, [])

  // Cập nhật tempMonth và tempYear khi selectedDate thay đổi
  useEffect(() => {
    if (visible) {
      setTempMonth(selectedDate.month() + 1)
      setTempYear(selectedDate.year())
    }
  }, [visible, selectedDate])

  const handleMonthSelect = (month: number) => {
    setTempMonth(month)
  }

  const handleYearSelect = (year: number) => {
    setTempYear(year)
  }

  const handleOpenPicker = () => {
    setTempMonth(selectedDate.month() + 1)
    setTempYear(selectedDate.year())
    setVisible(true)
  }

  const handleClose = () => {
    setVisible(false)
  }

  const handleConfirm = () => {
    const newDate = dayjs()
      .month(tempMonth - 1)
      .year(tempYear)
    onConfirm(newDate)
    setVisible(false)
  }

  const handleSelectCurrentMonth = () => {
    if (onSelectCurrentMonth) {
      onSelectCurrentMonth()
    } else {
      const today = dayjs()
      setTempMonth(today.month() + 1)
      setTempYear(today.year())
      onConfirm(today)
    }
    setVisible(false)
  }

  return (
    <>
      {/* Input */}
      <View style={[styles.monthPickerContainer, containerStyle]}>
        {label && <Text style={[styles.monthPickerLabel, pickerLabelStyle]}>{label}</Text>}
        <TouchableOpacity style={[styles.monthPickerInput, pickerStyle]} onPress={handleOpenPicker}>
          <Text style={[styles.monthPickerText, selectedDateStyle]}>{formatMonth(selectedDate)}</Text>
          <Ionicons name="calendar-outline" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{title}</Text>

            <View style={styles.pickerContainer}>
              {/* Month Picker */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Tháng</Text>
                <ScrollView style={styles.pickerScrollView} showsVerticalScrollIndicator={false}>
                  {months.map((month) => (
                    <TouchableOpacity
                      key={month}
                      style={[styles.pickerItem, tempMonth === month && styles.pickerItemSelected]}
                      onPress={() => handleMonthSelect(month)}
                    >
                      <Text style={[styles.pickerItemText, tempMonth === month && styles.pickerItemTextSelected]}>
                        {month.toString().padStart(2, '0')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Year Picker */}
              <View style={styles.pickerColumn}>
                <Text style={styles.pickerLabel}>Năm</Text>
                <ScrollView style={styles.pickerScrollView} showsVerticalScrollIndicator={false}>
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[styles.pickerItem, tempYear === year && styles.pickerItemSelected]}
                      onPress={() => handleYearSelect(year)}
                    >
                      <Text style={[styles.pickerItemText, tempYear === year && styles.pickerItemTextSelected]}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={handleSelectCurrentMonth}
                style={[styles.modalButton, styles.modalButtonSecondary]}
              >
                <Text style={styles.modalButtonText}>{currentMonthText}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirm} style={[styles.modalButton, styles.modalButtonPrimary]}>
                <Text style={styles.modalButtonText}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default MonthPickerCustom
