import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface FlowMetricCardProps {
  label: string // Q về / Q xả tràn
  label1?: string
  value: number // 184.6
  unit: string // m3/s
  color?: string // màu viền hoặc text
  icon?: string
}

export default function FlowMetricCard({ label, label1, value, unit, color = '#2563EB', icon }: FlowMetricCardProps) {
  return (
    <View
      style={{
        padding: 12,
        borderRadius: 12,
        //borderWidth: 1,
        //borderColor: '#OD1253',
        backgroundColor: '#00054A',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={styles.title}>
        <Text allowFontScaling={false} style={{ fontSize: 24, fontWeight: 'bold', color: color }}>
          {icon}
        </Text>
        <Text allowFontScaling={false} style={{ fontSize: 24, fontWeight: 'bold', color: '#8082A5' }}>
          {label}
          {label1 && (
            <Text allowFontScaling={false} style={{ fontSize: 16 }}>
              {label1}
            </Text>
          )}
        </Text>
      </View>
      <Text allowFontScaling={false} style={{ fontSize: 28, fontWeight: 'bold', color: '#CCCDDB' }}>
        {value}
      </Text>
      <Text allowFontScaling={false} style={{ fontSize: 14, fontWeight: 'bold', color: '#CCCDDB' }}>
        {unit}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
  },
})
