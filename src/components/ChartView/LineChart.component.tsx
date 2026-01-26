import { darkGradients, lightGradients } from '@/core/constants/gradients'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { GradientColors } from '@/core/types'
import { isTablet, px } from '@/core/utils/scale'
import React, { useEffect, useMemo, useRef } from 'react'
import { ActivityIndicator, Animated, Dimensions, View, Text } from 'react-native'
import { LineChart as GiftedLineChart } from 'react-native-gifted-charts'

export interface LineCharProps {
  data: any[]
  data2?: any[]
  data3?: any[]
  color: string
  color2: string
  color3?: string
  startFillColor2?: string
  endFillColor2?: string
  gradient?: boolean
  height?: number
  loading?: boolean
  animationDuration?: number
  gradientColors?: GradientColors
  ruleTypes?: string
  areaChart?: boolean
  hideDataPoints1?: boolean
  hideDataPoints2?: boolean
  hideDataPoints3?: boolean
  hideYAxisText?: boolean
  customDataPoint?: React.ReactElement
  customDataPoint2?: React.ReactElement
  rulesColor?: string
  label1?: string
  label2?: string
  label3?: string
  pointerConfig?: boolean
  xAxisColor?: string
  strokeDashArray2?: number[]
  strokedashArray1?: number[]
  spacing?: number
  curved?: boolean
  areaChart2?: boolean
  areaChart3?: boolean
  showValuesAsDataPointsText?: boolean
  animateOnDataChange?: boolean
  scrollToEnd?: boolean
}

export const LineChart: React.FC<LineCharProps> = ({
  data,
  data2 = undefined,
  data3 = undefined,
  color = '#FBBF24',
  color2 = '#2563EB',
  color3 = '#22D3EE',
  startFillColor2 = '#2563EB',
  endFillColor2 = '#2563EB',
  gradient = true,
  height = isTablet() ? px.v(320) : px.v(220),
  loading = false,
  animationDuration = 1000,
  ruleTypes = 'dash',
  areaChart = true,
  hideDataPoints1 = false,
  hideDataPoints2 = false,
  hideDataPoints3 = false,
  hideYAxisText = false,
  customDataPoint,
  customDataPoint2,
  rulesColor = 'rgba(255,255,255, 0.1)',
  label1,
  label2,
  label3,
  pointerConfig,
  xAxisColor = 'rgba(255,255,255,0.05)',
  strokeDashArray2,
  strokedashArray1,
  spacing = 5,
  curved = false,
  areaChart2 = false,
  areaChart3 = false,
  showValuesAsDataPointsText = true,
  animateOnDataChange = true,
  scrollToEnd = false,
}) => {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const fadeAnim = useRef(new Animated.Value(0)).current

  //const gradients = isDark ? darkGradients : lightGradients
  //const [startColor, endColor] = gradients[color] || gradients.blue

  // ===== Fade-in Animation =====
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  const commonProps = {
    data,
    data2,
    data3,
    animateOnDataChange: animateOnDataChange,
    animationDuration,
    yAxisTextStyle: {
      color: isDark ? '#d1d5db' : '#6b7280',
      fontSize: px.m(12),
    },
    xAxisLabelTextStyle: {
      color: isDark ? '#d1d5db' : '#6b7280',
      fontSize: px.m(12),
    },
    rulesColor: isDark ? '#374151' : '#e5e7eb',
    yAxisColor: isDark ? '#4b5563' : '#e5e7eb',
    xAxisColor: isDark ? '#4b5563' : '#e5e7eb',
  }

  const screenWidth = Dimensions.get('window').width
  const maxValue1 = data && data.length > 0 ? Math.max(...data.map((item) => item.value)) : 0
  const maxValue2 = data2 && data2.length > 0 ? Math.max(...data2.map((item) => item.value)) : 0
  const overallMax = Math.max(maxValue1, maxValue2)
  const yAxisMaxValue = overallMax > 0 ? Math.ceil(overallMax * 1.15) : 10

  // ===== Render Chart =====
  return (
    <View style={{ overflow: 'hidden', paddingTop: px.v(4) }}>
      <GiftedLineChart
        key={`${data.length}-${data2?.length || 0}-${data3?.length || 0}`}
        {...commonProps}
        curved={curved}
        areaChart={areaChart}
        areaChart2={areaChart2}
        areaChart3={areaChart3}
        startFillColor2={startFillColor2}
        endFillColor2={endFillColor2}
        startOpacity={0.3}
        endOpacity={0.3}
        spacing={screenWidth / spacing}
        thickness={px.h(5)}
        color={color}
        color2={color2}
        color3={color3}
        startOpacity2={0.3}
        endOpacity1={0}
        height={height}
        maxValue={yAxisMaxValue}
        hideDataPoints1={hideDataPoints1}
        hideDataPoints2={hideDataPoints2}
        hideDataPoints3={hideDataPoints3}
        dataPointsColor1={color}
        dataPointsColor2={color2}
        dataPointsColor3={color3}
        dataPointsRadius1={px.h(6)}
        dataPointsRadius2={px.h(6)}
        dataPointsRadius3={px.h(6)}
        showValuesAsDataPointsText={showValuesAsDataPointsText}
        textColor2={color2}
        textFontSize2={px.m(13)}
        textShiftY={-10}
        textShiftX={-5}
        textColor1={color}
        showVerticalLines={false}
        hideYAxisText={hideYAxisText}
        yAxisColor="transparent"
        {...(ruleTypes && { xAxisColor, rulesColor: rulesColor, dashGap: 10, dashWidth: 5 })}
        noOfSections={3}
        rulesType={ruleTypes}
        initialSpacing={15}
        endSpacing={15}
        strokeDashArray1={strokedashArray1}
        strokeDashArray2={strokeDashArray2}
        showXAxisIndices={true}
        scrollToEnd={scrollToEnd}
        //customDataPoint={customDataPoint ? () => customDataPoint : undefined}
        pointerConfig={
          pointerConfig
            ? {
                pointerStripHeight: height,
                pointerStripColor: 'rgba(255,255,255,0.3)',
                pointerStripWidth: 2,
                strokeDashArray: [5, 5],
                pointerColor: color,
                radius: px.h(6),
                pointerLabelWidth: px.h(100),
                pointerLabelHeight: px.v(90),
                activatePointersOnLongPress: true,
                autoAdjustPointerLabelPosition: true,
                persistPointer: true,
                resetPointerOnDataChange: false,
                pointer1Color: color,
                pointer2Color: color2,
                pointerLabelComponent: (items: any) => {
                  return (
                    <View
                      style={{
                        height: px.v(90),
                        width: px.h(200),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: px.v(-5),
                        marginLeft: px.h(-40),
                      }}
                    >
                      <View
                        style={{
                          paddingHorizontal: px.h(14),
                          paddingVertical: px.v(6),
                          borderRadius: px.m(8),
                          backgroundColor: isDark ? '#1f2937' : '#f9fafb',
                          borderWidth: 1,
                          borderColor: isDark ? '#374151' : '#e5e7eb',
                        }}
                      >
                        <Text
                          style={{
                            textAlign: 'left',
                            color: color,
                            fontSize: px.m(16),
                          }}
                        >
                          {label1 + items[0]?.value}
                        </Text>
                        {items[1] && (
                          <Text
                            style={{
                              textAlign: 'left',
                              color: color2,
                              fontSize: px.m(16),
                              marginTop: px.v(4),
                            }}
                          >
                            {label2 + items[1]?.value}
                          </Text>
                        )}
                        {items[2] && (
                          <Text
                            style={{
                              textAlign: 'left',
                              color: color3,
                              fontSize: px.m(16),
                              marginTop: px.v(4),
                            }}
                          >
                            {label3 + items[2]?.value}
                          </Text>
                        )}
                      </View>
                    </View>
                  )
                },
              }
            : undefined
        }
      />
    </View>
  )
}
