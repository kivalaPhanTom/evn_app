import { Colors } from '@/core/constants/colors'
import { px } from '@/core/utils/scale'
import React from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

interface MetricDiffProps {
  diff: number
  decimals?: number
  style?: TextStyle
  label?: string
  compareTo?: number
  withBackground?: boolean
  containerStyle?: ViewStyle
  unit?: string
}

const hexToRgba = (hex: string, alpha: number) => {
  const clean = hex.replace('#', '')
  const bigint = parseInt(clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const MetricDiff: React.FC<MetricDiffProps> = ({
  diff,
  decimals = 1,
  style,
  label = '',
  compareTo,
  withBackground = false,
  containerStyle,
  unit = '%',
}) => {
  const base = typeof compareTo === 'number' ? compareTo : 0

  // Decide calculation based on unit
  const isPercent = unit === '%'
  const rawDelta = typeof compareTo === 'number' ? diff - base : diff
  const percent = base === 0 ? diff * 100 : ((diff - base) / base) * 100

  const signValue = isPercent ? percent : rawDelta
  const isUp = signValue >= 0
  const color = isUp ? Colors.green : Colors.red
  const arrow = isUp ? '▲' : '▼'
  const value = Math.abs(isPercent ? percent : rawDelta).toFixed(decimals)

  const content = isPercent ? `${arrow} ${value}% ${label}` : `${arrow} ${value} ${unit} ${label}`

  if (withBackground) {
    return (
      <View
        style={[
          styles.badge,
          { backgroundColor: hexToRgba(color, 0.15) },
          containerStyle,
        ]}
      >
        <Text style={[styles.text, { color }, style]}>{content}</Text>
      </View>
    )
  }

  return <Text style={[styles.text, { color }, style]}>{content}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontSize: px.m(14),
    fontWeight: 'bold',
  },
  badge: {
    paddingHorizontal: px.h(10),
    paddingVertical: px.v(6),
    borderRadius: px.h(12),
    alignSelf: 'flex-start',
  },
})

export default MetricDiff
