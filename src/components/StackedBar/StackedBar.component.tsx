import React, { useMemo } from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import { px } from '@/core/utils/scale'

export interface StackedItem {
  label: string
  value: number
  color: string
}

interface Props {
  items: StackedItem[]
  height?: number
  radius?: number
  style?: ViewStyle
  barStyle?: ViewStyle
  totalOverride?: number
  maxValue?: number
  showPercent?: boolean
  legendGap?: number
  legendRowGap?: number
  valueDecimals?: number
}

const StackedBar: React.FC<Props> = ({
  items,
  height = px.v(18),
  radius = height / 2,
  style,
  barStyle,
  totalOverride,
  maxValue,
  showPercent = false,
  legendGap = px.h(16),
  legendRowGap = px.v(6),
  valueDecimals = 1,
}) => {
  const filtered = useMemo(() => items.filter(i => i.value > 0), [items])
  const sum = useMemo(() => filtered.reduce((a, b) => a + b.value, 0), [filtered])
  const total = totalOverride ?? sum
  const mv = maxValue ?? sum

  return (
    <View style={style}>
      {/* Stacked bar */}
      <View style={[styles.barContainer, { height, borderRadius: radius }, barStyle]}>
        {filtered.map((it, idx) => {
          const flex = total > 0 ? it.value / total : 0
          const isFirst = idx === 0
          const isLast = idx === filtered.length - 1
          return (
            <View
              key={it.label}
              style={[
                styles.segment,
                {
                  flex,
                  backgroundColor: it.color,
                  borderTopLeftRadius: isFirst ? radius : 0,
                  borderBottomLeftRadius: isFirst ? radius : 0,
                  borderTopRightRadius: isLast ? radius : 0,
                  borderBottomRightRadius: isLast ? radius : 0,
                },
              ]}
            />
          )
        })}
        {filtered.length === 0 && (
          <View style={[styles.segment, { flex: 1, backgroundColor: '#E5E7EB', borderRadius: radius }]} />
        )}
      </View>

      {/* Legend */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: px.v(8),
        }}
      >
        {items.map((it, idx) => {
          const percent = mv > 0 ? (it.value / mv) * 100 : 0
          return (
            <View
              key={it.label}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: legendGap,
                marginBottom: legendRowGap,
              }}
            >
              <View
                style={{
                  width: px.h(14),
                  height: px.h(14),
                  borderRadius: px.h(7),
                  backgroundColor: it.color,
                  marginRight: px.h(6),
                }}
              />
              <Text style={styles.labelText}>{it.label} </Text>
              <Text style={styles.valueText}>
                {it.value.toFixed(valueDecimals)}
                {showPercent ? ` (${percent.toFixed(1)}%)` : ''}
              </Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  barContainer: {
    width: '100%',
    backgroundColor: '#ffffff10', // faint background for empty space
    flexDirection: 'row',
    overflow: 'hidden',
  },
  segment: {
    height: '100%',
  },
  labelText: {
    color: '#E6ECF2',
    fontSize: px.m(13),
  },
  valueText: {
    color: '#E6ECF2',
    fontSize: px.m(13),
    fontWeight: '700',
  },
})

export default StackedBar
