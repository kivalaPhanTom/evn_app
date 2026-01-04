import { lightGradients } from '@/core/constants/gradients'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { px } from '@/core/utils/scale'
import React, { Component, useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BarChart as GiftedBarChart } from 'react-native-gifted-charts'
import LineBarChartSkeleton from '@/components/Skeletons/LineBarChartSkeleton'

export interface BarPoint {
  value: number
  label?: string
  labelWidth?: number
  frontColor?: string
  spacing?: number
  showValuesOnTop?: boolean
  showPrefix?: boolean
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
  barRadius?: number
  showLine?: boolean
  lineDataPointsShift?: number // offset to shift line data points vertically
  noOfSection?: number
  rulesType?: string
  lineColor?: string
  customDataPoint?: React.ReactElement
  showCustomTooltip?: boolean
  disableScroll?: boolean
  lineData1?: any[] // first line data
  lineColor1?: string
  lineDataPointsShift1?: number
  customDataPoint1?: React.ReactElement
  lineData2?: any[] // second line data
  lineColor2?: string
  lineDataPointsShift2?: number
  customDataPoint2?: React.ReactElement
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
  barRadius = 4,
  showLine = false,
  lineDataPointsShift = 0,
  noOfSection = 6,
  rulesType = 'solid',
  lineColor = '#A78BFA',
  customDataPoint = null,
  lineData1,
  lineColor1 = '#FBBF24',
  lineDataPointsShift1 = 0,
  customDataPoint1,
  lineData2,
  lineColor2 = '#FBD34D',
  lineDataPointsShift2 = 0,
  customDataPoint2,
  showCustomTooltip = false,
  disableScroll = false,
}) => {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'

  // Trạng thái nhóm đang được chọn
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number | null>(null)
  const [selectedGroupItems, setSelectedGroupItems] = useState<BarPoint[] | null>(null)

  const allValues = useMemo(() => data.flatMap((g) => g.items.map((i) => i.value)), [data])

  const maxValue = Math.max(0, ...data.flatMap((g) => g.items.map((i) => i.value)))

  const roundedMax = Math.ceil(maxValue / 10) * 10

  const yAxisLabelTexts = Array.from({ length: noOfSection + 1 }).map((_, i) => {
    const value = (roundedMax / noOfSection) * i
    return formatCompact(value)
  })

  function formatCompact(value: number) {
    if (value >= 1_000_000) return `${Math.round((value / 1_000_000) * 10) / 10}M`
    if (value >= 1_000) return `${Math.round((value / 1_000) * 10) / 10}K`
    return `${value}`
  }

  const paddedMax = useMemo(() => {
    const barMax = allValues.length > 0 ? Math.max(0, ...allValues) : 0

    // Get max values from lineData1
    const line1Max = lineData1 && lineData1.length > 0 ? Math.max(...lineData1.map((item) => item.value || 0)) : 0

    // Get max values from lineData2
    const line2Max = lineData2 && lineData2.length > 0 ? Math.max(...lineData2.map((item) => item.value || 0)) : 0

    // Check barMax, line1Max, and line2Max
    const overallMax = Math.max(barMax, line1Max, line2Max)
    return overallMax > 0 ? Math.ceil(overallMax * 1.15) : 10
  }, [allValues, lineData1, lineData2])

  const processed =
    useMemo(() => {
      try {
        const COLORS = ['#ee0033', '#00b300', '#fcba03', '#0ff', '#ff00ff', '#00f', '#ffff00']
        const result: any[] = []

        if (!data || data.length === 0) {
          return result
        }

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

            // Tính toán offset cho label dựa trên chiều cao của lineData1 và lineData2
            // topLabelComponent được render ở trên cùng của bar (đầu bar)
            // Nếu line cao hơn bar, cần đẩy label lên trên để nằm trên cả line
            // Luôn có một offset nhỏ mặc định để label không quá gần đầu bar
            const defaultOffset = px.v(10) // Offset mặc định để label có khoảng cách với đầu bar
            let labelOffset = defaultOffset
            if (paddedMax > 0) {
              const barValue = item.value
              // Chiều cao của bar từ dưới lên trên (trong hệ tọa độ Y từ dưới lên)
              const barHeight = (barValue / paddedMax) * height

              // Kiểm tra lineData1
              if (lineData1 && lineData1.length > globalIndex && lineData1[globalIndex]) {
                const line1Value = lineData1[globalIndex].value || 0
                const line1Height = (line1Value / paddedMax) * height
                // Nếu line cao hơn bar, tính offset cần thiết
                if (line1Height > barHeight) {
                  const offset = line1Height - barHeight + px.v(12) // Thêm padding để label không quá gần line
                  labelOffset = Math.max(labelOffset, offset)
                }
              }

              // Kiểm tra lineData2
              if (lineData2 && lineData2.length > globalIndex && lineData2[globalIndex]) {
                const line2Value = lineData2[globalIndex].value || 0
                const line2Height = (line2Value / paddedMax) * height
                // Nếu line cao hơn bar, tính offset cần thiết
                if (line2Height > barHeight) {
                  const offset = line2Height - barHeight + px.v(12) // Thêm padding để label không quá gần line
                  labelOffset = Math.max(labelOffset, offset)
                }
              }
            }

            result.push({
              value: item.value,
              frontColor: front,
              spacing: isLastOverall ? 0 : isGrouped && !isLastInGroup ? groupInnerSpacing : item.spacing,
              labelWidth: isGrouped && !isLastInGroup ? groupWidth : item.labelWidth,
              onPress: () => {
                setSelectedGroupIndex(gIdx)
                setSelectedGroupItems(group.items)
              },
              topLabelComponent:
                (item.showValuesOnTop ?? true)
                  ? () => (
                      <View style={{ transform: [{ translateY: -labelOffset }] }}>
                        <Text
                          style={[styles.topLabel, { color: front, width: 200 }]}
                          numberOfLines={1}
                          adjustsFontSizeToFit
                        >
                          {item.showPrefix && '+'}{item.value}
                        </Text>
                      </View>
                    )
                  : undefined,
            })
          })

          result[startIndex].label = group.label
        })

        return result
      } catch (error) {
        console.error('Error in BarChart processed useMemo:', error)
        return []
      }
    }, [data, barWidth, groupInnerSpacing, frontColor, lineData1, lineData2, paddedMax, height]) || []

  // Tính toán vị trí overlay theo index nhóm
  const getGroupMetrics = (gIdx: number | null) => {
    if (gIdx === null) return null
    const n = data[gIdx]?.items.length ?? 0
    if (n === 0) return null

    const groupWidth = n * barWidth + Math.max(0, n - 1) * groupInnerSpacing

    const beforeGroupsWidth = data.slice(0, gIdx).reduce((acc, g) => {
      const wn = g.items.length * barWidth + Math.max(0, g.items.length - 1) * groupInnerSpacing
      return acc + wn
    }, 0)

    const wrapPadding = px.h(8)
    const initialSpacing = spacing
    const yAxisLabelWidthOffset = showYAxis ? 20 : 0 // default width used by gifted charts

    // Mép trái đúng của toàn nhóm (bắt đầu từ mép trái cột đầu tiên)
    const left = wrapPadding + yAxisLabelWidthOffset + initialSpacing + beforeGroupsWidth + gIdx * spacing

    return { left, width: groupWidth }
  }

  const selectedMetrics = getGroupMetrics(selectedGroupIndex)

  console.log('processed.length:', processed.length)

  return (
    <View style={styles.wrap}>
      {/* Overlay xám bao nhóm */}
      {selectedMetrics && showCustomTooltip && (
        <View
          pointerEvents="none"
          style={[
            styles.groupOverlay,
            {
              left: selectedMetrics.left + 10,
              width: selectedMetrics.width + px.h(15),
              // đặt overlay sao cho chân chạm trục hoành (x-axis)
              top:
                height -
                ((selectedGroupItems && selectedGroupItems.length > 0
                  ? Math.max(...selectedGroupItems.map((i) => i.value))
                  : 0) /
                  paddedMax) *
                  height +
                5,
              // chiều cao overlay = chiều cao cột cao nhất trong nhóm + 10
              height:
                ((selectedGroupItems && selectedGroupItems.length > 0
                  ? Math.max(...selectedGroupItems.map((i) => i.value))
                  : 0) /
                  paddedMax) *
                  height +
                5,
              backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
              borderRadius: px.h(10),
            },
          ]}
        />
      )}

      {/* Tooltip hiển thị giá trị từng cột */}
      {selectedMetrics && selectedGroupItems && showCustomTooltip && (
        <View
          pointerEvents="none"
          style={[
            styles.tooltip,
            {
              left: selectedMetrics.left + 10,
                // position tooltip clearly above the overlay (no overlap)
                top:
                height -
                ((selectedGroupItems && selectedGroupItems.length > 0
                  ? Math.max(...selectedGroupItems.map((i) => i.value))
                  : 0) /
                  paddedMax) *
                  height -
                px.v(35),
              },
              ]}
            >
          <View style={[styles.tooltipBubble, { backgroundColor: isDark ? '#1F2937' : '#111827' }]}>
            {selectedGroupItems.map((it, i) => (
              <View key={i} style={styles.tooltipRow}>
                <View
                  style={{
                    width: px.h(8),
                    height: px.h(8),
                    borderRadius: px.h(4),
                    backgroundColor: it.frontColor || '#5B9BF3',
                    marginRight: px.h(6),
                  }}
                />
                <Text style={{ color: '#FFF', fontSize: px(8) }}>{formatCompact(it.value)}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      {processed.length > 0 ? (
        <GiftedBarChart
          data={processed}
          height={height}
          barWidth={barWidth}
          // focusBarOnPress
          // focusedBarIndex={3}
          // highlightedBarIndex={3}
          // highlightEnabled
          frontColor={frontColor}
          spacing={spacing}
          maxValue={paddedMax}
          noOfSections={noOfSection}
          yAxisThickness={showYAxis ? 1 : 0}
          yAxisColor={showYAxis ? (isDark ? '#FFF' : '#6B7280') : 'transparent'}
          xAxisThickness={1}
          xAxisColor={'rgb(255,255,255,0.1)'}
          disableScroll={disableScroll}
          hideYAxisText={!showYAxis}
          yAxisLabelTexts={showYAxis ? yAxisLabelTexts : []}
          yAxisTextStyle={{
            color: isDark ? '#FFF' : '#6B7280',
            fontSize: px.m(11),
          }}
          hideRules={!showHorizontalGrid}
          rulesType={rulesType}
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
          showLine={showLine || (lineData1 && lineData1.length > 0)}
          lineData={lineData1 && lineData1.length > 0 ? lineData1 : undefined}
          lineConfig={
            lineData1 && lineData1.length > 0
              ? customDataPoint1
                ? {
                    isAnimated: true,
                    thickness: 2,
                    color: lineColor1,
                    dataPointsColor: lineColor1,
                    dataPointsRadius: 6,
                    shiftY: lineDataPointsShift1,
                    customDataPoint: () => customDataPoint1,
                  }
                : {
                    isAnimated: true,
                    thickness: 2,
                    color: lineColor1,
                    dataPointsColor: lineColor1,
                    dataPointsRadius: 6,
                    shiftY: lineDataPointsShift1,
                  }
              : customDataPoint
              ? {
                  isAnimated: true,
                  thickness: 2,
                  color: lineColor,
                  dataPointsColor: lineColor,
                  dataPointsRadius: 6,
                  shiftY: lineDataPointsShift,
                  customDataPoint: () => customDataPoint,
                }
              : {
                  isAnimated: true,
                  thickness: 2,
                  color: lineColor,
                  dataPointsColor: lineColor,
                  dataPointsRadius: 6,
                  shiftY: lineDataPointsShift,
                }
          }
          lineData2={lineData2 && lineData2.length > 0 ? lineData2 : undefined}
          lineConfig2={
            customDataPoint2
              ? {
                  isAnimated: true,
                  thickness: 2,
                  color: lineColor2,
                  dataPointsColor: lineColor2,
                  dataPointsRadius: 5,
                  shiftY: lineDataPointsShift2,
                  customDataPoint: () => customDataPoint2,
                }
              : {
                  isAnimated: true,
                  thickness: 2,
                  color: lineColor2,
                  dataPointsColor: lineColor2,
                  dataPointsRadius: 5,
                  shiftY: lineDataPointsShift2,
                }
          }
        />
      ) : (
        <View style={{ height, justifyContent: 'center' }}>
          <LineBarChartSkeleton isShowLine={showLine || (lineData1 && lineData1.length > 0) || (lineData2 && lineData2.length > 0)} />
        </View>
      )}
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
  groupOverlay: {
    position: 'absolute',
  },
  tooltip: {
    position: 'absolute',
    top: 0,
  },
  tooltipBubble: {
    paddingVertical: px.v(4),
    paddingHorizontal: px.h(4),
    borderRadius: px.h(10),
    flexDirection: 'column',
    gap: px.v(4),
    elevation: 2,
  },
  tooltipRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default BarChart
