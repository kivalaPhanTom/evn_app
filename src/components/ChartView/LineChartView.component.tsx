import { darkGradients, lightGradients } from '@/core/constants/gradients'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { GradientColors } from '@/core/types'
import { isTablet, px } from '@/core/utils/scale'
import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, Dimensions, Text, View } from 'react-native'
import { LineChart } from 'react-native-gifted-charts'

export interface LineChartViewProps {
  data: any[]
  data2?: any[]
  color?: 'blue' | 'green' | 'red' | 'orange'
  gradient?: boolean
  height?: number
  loading?: boolean
  animationDuration?: number
  gradientColors?: GradientColors
  title?: string
}

export const LineChartView: React.FC<LineChartViewProps> = ({
  data,
  data2 = [],
  color = 'blue',
  gradient = true,
  height = isTablet() ? px.v(320) : px.v(220),
  loading = false,
  animationDuration = 1000,
  title,
}) => {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const fadeAnim = useRef(new Animated.Value(0)).current

  const gradients = isDark ? darkGradients : lightGradients
  const [startColor, endColor] = gradients[color] || gradients.blue

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

  // Calculate max value from data2 for Y-axis scaling
  const maxValue2 = data2 && data2.length > 0 ? Math.max(...data2.map((item) => item.value)) : 0
  const yAxisMaxValue = maxValue2 + 10

  // ===== Loading Skeleton =====
  if (loading) {
    return (
      <View
        style={{
          height,
          borderRadius: px.h(12),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isDark ? '#1f2937' : '#f3f4f6',
        }}
      >
        <ActivityIndicator size="large" color={startColor} />
      </View>
    )
  }

  // ===== Render Chart =====
  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={{ overflow: 'hidden', paddingTop: px.v(50) }}>
        <LineChart
          {...commonProps}
          curved
          areaChart
          startFillColor2="#2563EB"
          endFillColor2="#2563EB"
          startOpacity={0.3}
          endOpacity={0.3}
          spacing={screenWidth / 5}
          thickness={px.h(5)}
          color="#FBBF24"
          color2="#2563EB"
          height={height + px.v(40)}
          maxValue={yAxisMaxValue}
          hideDataPoints2={false}
          dataPointsColor2="#2563EB"
          showValuesAsDataPointsText
          textColor2="#2563EB"
          textFontSize2={px.m(10)}
          textShiftY={-10}
          textShiftX={0}
          showVerticalLines={false}
          hideYAxisText
          yAxisColor="transparent"
          noOfSections={3}
          //stepValue={(yAxisMaxValue - 100) / 3}
          dashWidth={0}
          dashGap={0}
          scrollAnimation
          initialSpacing={5}
          endSpacing={0}
        />
      </View>
      {title && (
        <Text
          style={{
            textAlign: 'center',
            marginTop: px.v(12),
            color: isDark ? '#d1d5db' : '#6b7280',
            fontSize: px.m(14),
            fontWeight: '500',
            fontStyle: 'italic',
          }}
        >
          {title}
        </Text>
      )}
    </Animated.View>
  )
}
