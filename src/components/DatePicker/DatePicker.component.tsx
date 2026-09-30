import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, ViewStyle } from 'react-native'
import DateTimePicker, { CalendarComponents, useDefaultStyles } from 'react-native-ui-datepicker'
import dayjs from 'dayjs'
import { Ionicons } from '@expo/vector-icons'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { createThemePalette } from '@/core/constants/themePalette'

interface Props {
  value: Date
  onChange: (date: Date) => void

  textColor?: string
  borderColor?: string
  backgroundColor?: string

  format?: string

  containerStyle?: ViewStyle
  inputStyle?: ViewStyle
}

export default function DatePicker({
  value,
  onChange,
  textColor = '#fff',
  borderColor = 'rgba(255,255,255,0.15)',
  backgroundColor = 'rgba(255,255,255,0.06)',
  format = 'MM/DD/YYYY',
  containerStyle,
  inputStyle,
}: Props) {
  const [showModal, setShowModal] = useState(false)
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const palette = createThemePalette(isDark)
  const styles = createStyles(isDark)

  const defaultStyles = useDefaultStyles()

  const formatDate = (d: Date) => dayjs(d).format(format)

  const components: CalendarComponents = {
    IconNext: <Ionicons name="chevron-forward" size={20} color={palette.iconStrong} />,
    IconPrev: <Ionicons name="chevron-back" size={20} color={palette.iconStrong} />,
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.input,
          {
            borderColor,
            backgroundColor,
          },
          inputStyle,
        ]}
        onPress={() => setShowModal(true)}
      >
        <Text style={[styles.dateText, { color: textColor }]}>{formatDate(value)}</Text>
        <Ionicons name="calendar-outline" size={18} color={textColor} />
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <DateTimePicker
              mode="single"
              date={value}
              components={components}
              styles={{
                ...defaultStyles,
                today: { borderColor: '#4f9cff', borderWidth: 1 },
                today_label: { color: '#4f9cff', fontWeight: 'bold' },
                selected: { backgroundColor: '#4f9cff' },
                selected_label: { color: 'white' },
                day_label: { color: palette.textPrimary },
                weekday_label: { color: palette.textSecondary },
                header: { backgroundColor: palette.modalBackground },
                month_label: { color: palette.textPrimary, fontWeight: 'bold' },
                month_selector_label: { color: palette.textPrimary },
                year_label: { color: palette.textPrimary, fontWeight: 'bold' },
                year_selector_label: { color: palette.textPrimary },
                selected_month: { backgroundColor: '#4f9cff' },
                selected_year: { backgroundColor: '#4f9cff' },
                disabled_label: { color: palette.disabledText },
              }}
              locale="vi"
              onChange={(params) => {
                if (params.date) {
                  onChange(dayjs(params.date).toDate())
                  setShowModal(false)
                }
              }}
            />

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => {
                  const today = dayjs().toDate()
                  onChange(today)
                  setShowModal(false)
                }}
                style={[
                  styles.closeBtn,
                  {
                    flex: 1,
                    backgroundColor: isDark ? '#2e3348' : 'rgba(0,0,0,0.06)',
                    marginRight: 10,
                  },
                ]}
              >
                <Text style={[styles.closeText, !isDark && { color: '#374151' }]}>Hôm nay</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowModal(false)} style={[styles.closeBtn, { flex: 1 }]}>
                <Text style={styles.closeText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const createStyles = (isDark: boolean) => {
  const palette = createThemePalette(isDark)
  return StyleSheet.create({
    container: {
      width: '100%',
    },
    input: {
      height: 50,
      borderRadius: 12,
      borderWidth: 1,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dateText: {
      fontSize: 16,
      fontWeight: '500',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: palette.modalBackground,
      borderRadius: 18,
      padding: 12,
    },
    closeBtn: {
      marginTop: 12,
      padding: 12,
      backgroundColor: '#4f9cff',
      borderRadius: 10,
    },
    closeText: {
      textAlign: 'center',
      color: '#fff',
      fontWeight: '600',
    },
  })
}

