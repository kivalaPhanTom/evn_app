import { Colors } from '@/core/constants/colors'
import { px } from '@/core/utils/scale'
import React from 'react'
import { StyleSheet, Text, TextStyle } from 'react-native'

interface MetricDiffProps {
  diff: number
  decimals?: number
  style?: TextStyle
  label?: string
  compareTo?: number // value to compare with `diff`; defaults to 0
}

const MetricDiff: React.FC<MetricDiffProps> = ({
  diff,
  decimals = 0,
  style,
  label = 'so với ngày trước',
  compareTo,
}) => {
  const base = typeof compareTo === 'number' ? compareTo : 0

  // If base === 0, treat `diff` as a percentage (e.g., 0.15 => 15%)
  // If base !== 0, calculate % change = (diff - base) / base
  const percent = base === 0 ? diff * 100 : ((diff - base) / base) * 100

  const isUp = percent >= 0
  const color = isUp ? Colors.lightRed : Colors.red
  const arrow = isUp ? '↑' : '↓'
  const value = Math.abs(percent).toFixed(decimals)

  return (
    <Text style={[styles.text, { color }, style]}>
      {arrow} {value}% {label}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: px.m(12),
    marginTop: px.v(6),
  },
})

export default MetricDiff
