import { darkGradients, lightGradients } from '@/core/constants/gradients'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { GradientColors } from '@/core/types'
import { isTablet, px } from '@/core/utils/scale'
import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, Dimensions, View } from 'react-native'
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
}

export const LineChartView: React.FC<LineChartViewProps> = ({
  data,
  data2 = [],
  color = 'blue',
  gradient = true,
  height = isTablet() ? px.v(320) : px.v(220),
  loading = false,
  animationDuration = 1000,
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
      <View style={{ overflow: 'hidden' }}>
        <LineChart
          {...commonProps}
          curved
          areaChart
          startFillColor2="#667EEA"
          endFillColor2="#667EEA"
          startOpacity={0.3}
          endOpacity={0.3}
          spacing={screenWidth / 5}
          thickness={px.h(5)}
          dataPointsHeight2={px.h(20)}
          dataPointsWidth2={px.h(20)}
          color="#FBBF24"
          color2="#667EEA"
          height={height}
          dataPointsColor2="#667EEA"
          showVerticalLines={false}
          hideYAxisText
          yAxisColor="transparent"
          noOfSections={3}
          dashWidth={0}
          dashGap={0}
          scrollAnimation
          initialSpacing={0}
          endSpacing={0}
        />
      </View>
    </Animated.View>
  )
}
