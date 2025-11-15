import { darkGradients, lightGradients } from '@/core/constants/gradients'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { GradientColors } from '@/core/types'
import { isTablet, px } from '@/core/utils/scale'
import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, View } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'

export interface BarChartViewProps {
  data: any[]
  color?: 'blue' | 'green' | 'red' | 'orange'
  gradient?: boolean
  height?: number
  loading?: boolean
  animationDuration?: number
  gradientColors?: GradientColors
}

export const BarChartView: React.FC<BarChartViewProps> = ({
  data,
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
      <View style={{ paddingHorizontal: px.h(8), overflow: 'visible' }}>
        <BarChart
          {...commonProps}
          barWidth={px.h(isTablet() ? 24 : 14)}
          spacing={px.h(isTablet() ? 30 : 20)}
          frontColor={startColor}
          gradientColor={endColor}
          height={height}
          showGradient={gradient}
          roundedTop
        />
      </View>
    </Animated.View>
  )
}
