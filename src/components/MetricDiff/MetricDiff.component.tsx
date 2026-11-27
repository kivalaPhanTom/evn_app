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
  bgColor?: string
  textColor?: string
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
  bgColor,
  textColor,
}) => {
  const base = typeof compareTo === 'number' ? compareTo : 0
  const isPercent = unit === '%'
  const delta = diff - base
  // An explicit zero means the caller already supplied a percentage.
  const percent = compareTo === 0 ? diff : (base === 0 ? diff : delta / base) * 100
  const change = isPercent ? percent : delta

  const isDown = change < 0
  const color = isDown ? Colors.red : textColor ?? Colors.green
  const backgroundColor = isDown ? hexToRgba(Colors.red, 0.15) : bgColor ?? hexToRgba(color, 0.15)
  const arrow = isDown ? '▼' : '▲'
  const value = Math.abs(change).toFixed(decimals)

  const content = isPercent ? `${arrow} ${value}% ${label}` : `${arrow} ${value} ${unit} ${label}`

  if (withBackground) {
    return (
      <View
        style={[styles.badge, containerStyle, { backgroundColor }]}
      >
        <Text style={[styles.text, style, { color }]}>{content}</Text>
      </View>
    )
  }

  return <Text style={[styles.text, style, { color }]}>{content}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontSize: px.m(14),
    fontWeight: 'bold',
  },
  badge: {
    paddingHorizontal: px.h(10),
    paddingVertical: px.v(6),
    borderRadius: px.h(8),
    alignSelf: 'flex-start',
  },
})

export default MetricDiff
