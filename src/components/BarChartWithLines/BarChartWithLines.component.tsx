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

export interface LineDataPoint {
  value: number
  dataPointColor?: string
}

interface Props {
  data: BarGroup[]
  height?: number
  barWidth?: number
  spacing?: number
  rounded?: boolean
  frontColor?: string
  showHorizontalGrid?: boolean
  showYAxis?: boolean
  groupInnerSpacing?: number
  barRadius?: number
  // Line overlay support
  lineData?: LineDataPoint[]
  lineColor?: string
  lineThickness?: number
  showLineDataPoints?: boolean
  curvedLine?: boolean
  useCustomDataPoint?: boolean // Dùng custom data point (nền trắng viền màu)
}

const BarChartWithLines: React.FC<Props> = ({
  data,
  height = px.v(180),
  barWidth = px.h(18),
  spacing = px.h(30),
  groupInnerSpacing = 3,
  rounded = false,
  frontColor,
  showHorizontalGrid = true,
  showYAxis = false,
  barRadius = 4,
  lineData,
  lineColor = '#E879F9',
  lineThickness = 3,
  showLineDataPoints = true,
  curvedLine = true,
  useCustomDataPoint = true,
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
        const front = item.frontColor ?? frontColor ?? COLORS[globalIndex % COLORS.length]

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
  }, [data, barWidth, groupInnerSpacing, frontColor])

  return (
    <View style={styles.wrap}>
      <GiftedBarChart
        data={processed}
        height={height}
        barWidth={barWidth}
        frontColor={frontColor}
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
        barBorderRadius={rounded ? barRadius : 0}
        barBorderTopRightRadius={rounded ? barRadius : 0}
        barBorderTopLeftRadius={rounded ? barRadius : 0}
        barBorderBottomLeftRadius={0}
        barBorderBottomRightRadius={0}
        activeOpacity={1}
        autoShiftLabels
        initialSpacing={spacing}
        endSpacing={10}
        xAxisLabelTextStyle={{ color: isDark ? '#FFF' : '#6B7280', fontSize: px.m(11) }}
        // Line overlay - data points với viền màu
        showLine={!!lineData}
        lineData={lineData}
        lineConfig={
          lineData
            ? {
                color: lineColor,
                thickness: lineThickness,
                curved: curvedLine,
                hideDataPoints: !showLineDataPoints,
                dataPointsHeight: 8,
                dataPointsWidth: 8,
                dataPointsRadius: 4,
                dataPointsColor: useCustomDataPoint ? '#fff' : lineColor,
                textColor: 'transparent',
                textFontSize: 0,
                customDataPoint:
                  useCustomDataPoint && showLineDataPoints
                    ? () => (
                        <View
                          style={{
                            width: 14,
                            height: 14,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: 5,
                              backgroundColor: '#fff',
                              borderWidth: 1,
                              borderColor: lineColor,
                            }}
                          />
                        </View>
                      )
                    : undefined,
              }
            : undefined
        }
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
  dataPoint: {
    width: 10,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataPointInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 2,
  },
})

export default BarChartWithLines
