import { darkGradients, lightGradients } from '@/core/constants/gradients'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { GradientColors } from '@/core/types'
import { isTablet, px } from '@/core/utils/scale'
import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, View } from 'react-native'
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts'

export interface ChartViewProps {
  type: 'line' | 'bar' | 'pie'
  data: any[]
  title?: string
  color?: 'blue' | 'green' | 'red' | 'orange'
  gradient?: boolean
  height?: number
  showLegend?: boolean
  loading?: boolean
  animationDuration?: number
  gradientColors?: GradientColors
}

export const ChartView: React.FC<ChartViewProps> = ({
  type,
  data,
  color = 'blue',
  gradient = true,
  height = isTablet() ? px.v(320) : px.v(220),
  showLegend = false,
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
      {type === 'line' && (
        // Keep padding for LineChart to maintain grid spacing
        <View style={{ padding: px.h(16) }}>
          <LineChart
            {...commonProps}
            curved
            areaChart={gradient}
            startFillColor={startColor}
            endFillColor={endColor}
            startOpacity={0.8}
            endOpacity={0.1}
            spacing={px.h(40)}
            thickness={px.h(3)}
            color={startColor}
            height={height}
            hideDataPoints={false}
            showVerticalLines
          />
        </View>
      )}

      {type === 'bar' && (
        // Remove outer padding that shifts axis; allow limited horizontal padding
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
      )}

      {type === 'pie' && (
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: px.h(16) }}>
          <PieChart
            {...commonProps}
            radius={height / 2.5}
            innerRadius={height / 5}
            showText
            textSize={px.m(12)}
            textColor="white"
            showTextBackground
            textBackgroundRadius={px.h(16)}
            donut
            showGradient={gradient}
            focusOnPress
          />
        </View>
      )}
    </Animated.View>
  )
}
