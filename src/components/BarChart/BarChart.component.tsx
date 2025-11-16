import { useAppTheme } from '@/core/hooks/use-app-theme'
import { px } from '@/core/utils/scale'
import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BarChart as GiftedBarChart } from 'react-native-gifted-charts'

export interface BarPoint {
  value: number
  label?: string
  labelWidth?: number
  frontColor?: string
  spacing?: number
  showValuesOnTop?: boolean
}

export interface BarGroup {
  label: string
  items: BarPoint[]
}

interface Props {
  data: BarGroup[]
  height?: number
  barWidth?: number
  spacing?: number
  rounded?: boolean
  frontColor?: string
  showHorizontalGrid?: boolean // hiển thị grid ngang
  showYAxis?: boolean // hiển thị trục tung và nhãn trục tung
  groupInnerSpacing?: number
}

const BarChart: React.FC<Props> = ({
  data,
  height = px.v(180),
  barWidth = px.h(18),
  spacing = px.h(30),
  groupInnerSpacing = 3,
  rounded = false,
  frontColor,
  showHorizontalGrid = true,
  showYAxis = false,
}) => {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'

  const allValues = useMemo(() => data.flatMap((g) => g.items.map((i) => i.value)), [data])
  const paddedMax = useMemo(() => {
    const m = Math.max(0, ...allValues)
    return m > 0 ? Math.ceil(m * 1.05) : 10
  }, [allValues])

  const processed = useMemo(() => {
    const COLORS = ['#ee0033', '#00b300', '#fcba03', '#0ff', '#ff00ff', '#00f', '#ffff00']
    const result: any[] = []

    data.forEach((group, gIdx) => {
      const startIndex = result.length
      const n = group.items.length
      const isGrouped = n >= 2
      const groupWidth = n * barWidth + Math.max(0, n - 1) * groupInnerSpacing

      group.items.forEach((item, idx) => {
        const isLastInGroup = idx === group.items.length - 1
        const globalIndex = startIndex + idx
        const front = item.frontColor ?? COLORS[globalIndex % COLORS.length]

        const isLastOverall = gIdx === data.length - 1 && isLastInGroup

        result.push({
          value: item.value,
          frontColor: front,
          spacing: isLastOverall ? 0 : isGrouped && !isLastInGroup ? groupInnerSpacing : item.spacing,
          labelWidth: isGrouped && !isLastInGroup ? groupWidth : item.labelWidth,
          onPress: () => {
            console.log('Pressed bar:', {
              groupIndex: gIdx,
              itemIndex: idx,
              globalIndex,
              value: item.value,
              groupLabel: group.label,
            })
          },
          topLabelComponent:
            (item.showValuesOnTop ?? true)
              ? () => (
                  <Text style={[styles.topLabel, { color: front, width: 200 }]} numberOfLines={1} adjustsFontSizeToFit>
                    {item.value}
                  </Text>
                )
              : undefined,
        })
      })

      result[startIndex].label = group.label
    })

    return result
  }, [data, barWidth, groupInnerSpacing])

  return (
    <View style={styles.wrap}>
      <GiftedBarChart
        data={processed}
        height={height}
        barWidth={barWidth}
        // focusBarOnPress
        // focusedBarIndex={3}
        // highlightedBarIndex={3}
        // highlightEnabled
        spacing={spacing}
        maxValue={paddedMax}
        noOfSections={6}
        yAxisThickness={showYAxis ? 1 : 0}
        yAxisColor={showYAxis ? (isDark ? '#FFF' : '#6B7280') : 'transparent'}
        xAxisThickness={1}
        xAxisColor={'rgb(255,255,255,0.1)'}
        hideYAxisText={!showYAxis}
        yAxisTextStyle={{
          color: isDark ? '#FFF' : '#6B7280',
          fontSize: px.m(11),
        }}
        hideRules={!showHorizontalGrid}
        rulesType="solid"
        rulesColor="rgb(255,255,255,0.1)"
        isAnimated
        roundedTop={rounded}
        activeOpacity={1}
        autoShiftLabels
        initialSpacing={spacing}
        endSpacing={10}
        xAxisLabelTextStyle={{ color: isDark ? '#FFF' : '#6B7280', fontSize: px.m(11) }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: px.h(8),
    paddingTop: px.v(4),
  },
  topLabel: {
    fontSize: px.m(12),
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default BarChart
