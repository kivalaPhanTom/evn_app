import { darkGradients, lightGradients } from '@/core/constants/gradients'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { GradientColors } from '@/core/types'
import { isTablet, px } from '@/core/utils/scale'
import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, Dimensions, View } from 'react-native'
import { LineChart as GiftedLineChart } from 'react-native-gifted-charts'

export interface LineCharProps {
  data: any[]
  data2?: any[]
  color: string
  color2: string
  gradient?: boolean
  height?: number
  loading?: boolean
  animationDuration?: number
  gradientColors?: GradientColors
  initialScrollIndex?: number
}

export const LineChart: React.FC<LineCharProps> = ({
  data,
  data2 = [],
  color = '#FBBF24',
  color2 = '#2563EB',
  gradient = true,
  height = isTablet() ? px.v(320) : px.v(220),
  loading = false,
  animationDuration = 1000,
  initialScrollIndex,
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
    animateOnDataChange: true,
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
  const maxValue2 = data2 && data2.length > 0 ? Math.max(...data2.map((item) => item.value)) : 0
  const yAxisMaxValue = maxValue2 + 10

  // ===== Render Chart =====
  return (
    <View style={{ overflow: 'hidden', paddingTop: px.v(4) }}>
      <GiftedLineChart
        {...commonProps}
        curved
        areaChart
        startFillColor2={color2}
        endFillColor2={color2}
        startOpacity={0.3}
        endOpacity={0.3}
        spacing={screenWidth / 5}
        thickness={px.h(5)}
        dataPointsRadius2={px.h(5)}
        color={color}
        color2={color2}
        height={height + px.v(40)}
        maxValue={yAxisMaxValue}
        hideDataPoints2={false}
        dataPointsColor2={color2}
        showValuesAsDataPointsText
        textColor2={color2}
        textFontSize2={px.m(13)}
        textShiftY={-10}
        textShiftX={-5}
        showVerticalLines={false}
        hideYAxisText
        yAxisColor="transparent"
        noOfSections={3}
        dashWidth={0}
        dashGap={0}
        scrollAnimation
        scrollToIndex={initialScrollIndex}
        initialSpacing={15}
        endSpacing={15}
      />
    </View>
  )
}
