import { darkGradients, lightGradients } from '@/core/constants/gradients'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { GradientColors } from '@/core/types'
import { isTablet, px } from '@/core/utils/scale'
import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, View } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'

export interface PieChartViewProps {
  data: any[]
  color?: 'blue' | 'green' | 'red' | 'orange'
  gradient?: boolean
  height?: number
  loading?: boolean
  animationDuration?: number
  gradientColors?: GradientColors
}

export const PieChartView: React.FC<PieChartViewProps> = ({
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
    </Animated.View>
  )
}
