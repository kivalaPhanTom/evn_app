import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useAppTheme } from '@/core/hooks/use-app-theme'

interface FlowMetricCardProps {
  label: string // Q về / Q xả tràn
  label1?: string
  value: number // 184.6
  unit: string // m3/s
  color?: string // màu viền hoặc text
  icon?: string
}

export default function FlowMetricCard({ label, label1, value, unit, color = '#2563EB', icon }: FlowMetricCardProps) {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  return (
    <View
      style={{
        padding: isDark ? 12 : 8,
        borderRadius: 12,
        //borderWidth: 1,
        //borderColor: '#OD1253',
        backgroundColor: isDark ? '#00054A' : '#3B82F6',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={[
          styles.title,
          !isDark && {
            backgroundColor: '#FFFFFF',
            borderRadius: 999,
            paddingHorizontal: 10,
            paddingVertical: 2,
            marginBottom: 4,
          },
        ]}
      >
        <Text allowFontScaling={false} style={{ fontSize: isDark ? 24 : 14, fontWeight: 'bold', color: color }}>
          {icon}
        </Text>
        <Text
          allowFontScaling={false}
          style={{ fontSize: isDark ? 24 : 14, fontWeight: 'bold', color: isDark ? '#8082A5' : '#111827' }}
        >
          {label}
          {label1 && (
            <Text allowFontScaling={false} style={{ fontSize: isDark ? 16 : 12 }}>
              {label1}
            </Text>
          )}
        </Text>
      </View>
      <Text allowFontScaling={false} style={{ fontSize: 28, fontWeight: 'bold', color: isDark ? '#CCCDDB' : '#FFFFFF' }}>
        {value}
      </Text>
      <Text
        allowFontScaling={false}
        style={{ fontSize: 14, fontWeight: 'bold', color: isDark ? '#CCCDDB' : 'rgba(255,255,255,0.85)' }}
      >
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
