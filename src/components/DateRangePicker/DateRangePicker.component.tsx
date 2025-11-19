import React, { useState } from 'react'
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

  const formatDate = (d: any) => dayjs(d).format(format)

  const components: CalendarComponents = {
    IconNext: <Ionicons name="chevron-forward" size={20} color="#fff" />,
    IconPrev: <Ionicons name="chevron-back" size={20} color="#fff" />,
  };

  const renderInput = (label: string, date: any, key: 'from' | 'to') => (
    <View style={{ flex: 1 }}>
      <Text style={[styles.label, { color: labelColor }, labelStyle]}>{label}</Text>

      <TouchableOpacity
        style={[
          styles.input,
          {
            borderColor,
            backgroundColor,
          },
          inputStyle,
          focused === key && { borderColor: '#4f9cff' },
        ]}
        onPress={() => setFocused(key)}
      >
        <Text style={[styles.dateText, { color: textColor }]}>{formatDate(date)}</Text>
        <Ionicons name="calendar-outline" size={15} color={iconColor} />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={[styles.row, containerStyle]}>
      {/* Input FROM */}
      {renderInput(labelFrom, value.from, 'from')}

      {/* Gap */}
      <View style={{ width: 20 }} />

      {/* Input TO */}
      {renderInput(labelTo, value.to, 'to')}

      {/* ------------ MODAL MODE ------------ */}
      {mode === 'modal' && (
        <Modal visible={!!focused} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <DateTimePicker
                mode="single"
                date={focused === 'from' ? value.from : value.to}
                components={components}
                styles={{
                  ...defaultStyles,
                  today: { borderColor: '#4f9cff', borderWidth: 1 },
                  today_label: { color: '#4f9cff', fontWeight: 'bold' },
                  selected: { backgroundColor: '#4f9cff' },
                  selected_label: { color: 'white' },
                  day_label: { color: '#fff' },
                  weekday_label: { color: '#fff' },
                  header: { backgroundColor: '#1A1D2E' },
                  month_label: { color: '#fff', fontWeight: 'bold' },
                  month_selector_label: { color: '#fff' },
                  year_label: { color: '#fff', fontWeight: 'bold' },
                  year_selector_label: { color: '#fff' },
                  selected_month: { backgroundColor: '#4f9cff' },
                  selected_year: { backgroundColor: '#4f9cff' },
                }}
                locale='vi'
                
                onChange={(params) => {
                  const newDate = params.date
                  onChange({
                    from: focused === 'from' ? newDate : value.from,
                    to: focused === 'to' ? newDate : value.to,
                  })
                }}
              />

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    const today = dayjs().toDate()
                    onChange({
                      from: focused === 'from' ? today : value.from,
                      to: focused === 'to' ? today : value.to,
                    })
                  }}
                  style={[styles.closeBtn, { flex: 1, backgroundColor: '#2e3348', marginRight: 10 }]}
                >
                  <Text style={styles.closeText}>Hôm nay</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFocused(null)} style={[styles.closeBtn, { flex: 1 }]}>
                  <Text style={styles.closeText}>Đóng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* ------------ INLINE MODE ------------ */}
      {mode === 'inline' && focused && (
        <View style={{ marginTop: 20 }}>
          <DateTimePicker
            mode="single"
            // theme={theme}
            date={focused === 'from' ? value.from : value.to}
            onChange={(params) => {
              const newDate = params.date
              onChange({
                from: focused === 'from' ? newDate : value.from,
                to: focused === 'to' ? newDate : value.to,
              })
            }}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
  },
  label: {
    fontSize: 12,
    marginBottom: 6,
    letterSpacing: 1,
  },
  input: {
    height: 30,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1A1D2E',
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
