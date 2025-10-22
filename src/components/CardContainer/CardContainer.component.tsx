import { useAppTheme } from '@/core/hooks/use-app-theme'
import { GradientColors } from '@/core/types'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View, ViewStyle } from 'react-native'

export interface ThemeValue<T> {
  light?: T
  dark?: T
}

interface AnimatedCardContainerProps {
  children: React.ReactNode
  style?: ViewStyle
  delay?: number
  gradientColors?: GradientColors | ThemeValue<GradientColors> // Updated type
  gradientHeight?: number
  gradientPosition?: 'top' | 'bottom'
  borderRadius?: number
  borderWidth?: number
  showGradient?: boolean
  /**
   * backgroundColor can be:
   *  - string (applies to both themes)
   *  - { light: string, dark: string } (theme-specific)
   */
  backgroundColor?: string | ThemeValue<string>
  /**
   * borderColor can be:
   *  - string (applies to both themes)
   *  - { light: string, dark: string } (theme-specific)
   */
  borderColor?: string | ThemeValue<string>
}

const AnimatedCardContainer: React.FC<AnimatedCardContainerProps> = ({
  children,
  style,
  delay = 0,
  gradientColors = ['#FF4BC2', '#705CFF'] as const,
  gradientHeight = 4,
  gradientPosition = 'bottom',
  borderRadius = 16,
  borderWidth = 1,
  showGradient = true,
  backgroundColor: propBackgroundColor,
  borderColor: propBorderColor,
}) => {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'

  const opacity = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(0.95)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start()
  }, [opacity, scale, delay])

  // resolver helper
  const resolveThemeValue = <T,>(val?: T | ThemeValue<T>): T | undefined => {
    if (val == null) return undefined
    if (typeof val === 'object' && ('light' in (val as any) || 'dark' in (val as any))) {
      const v = val as ThemeValue<T>
      return (isDark ? v.dark : v.light) ?? v.light ?? v.dark ?? undefined
    }
    return val as T
  }

  const defaultBorder = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)'

  const backgroundColor = resolveThemeValue(propBackgroundColor) ?? (isDark ? '#07101A' : '#FFFFFF')
  const borderColor = resolveThemeValue(propBorderColor) ?? defaultBorder

  // gradient can be theme-specific too
  const resolvedGradient = resolveThemeValue(gradientColors) ?? (['#FF4BC2', '#705CFF'] as const)

  const gradientStyle =
    gradientPosition === 'top'
      ? { top: 0, borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }
      : { bottom: 0, borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderRadius,
          opacity,
          transform: [{ scale }],
          shadowColor: '#000',
        },
        style,
      ]}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor,
            borderColor,
            borderRadius,
            borderWidth,
          },
        ]}
      >
        {children}
      </View>

      <View style={[styles.gradientWrapper, gradientStyle]}>
        {showGradient ? (
          <LinearGradient
            colors={resolvedGradient as readonly [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ height: gradientHeight, width: '100%' }}
          />
        ) : (
          <View style={{ width: '100%', backgroundColor: borderColor }} />
        )}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    elevation: 6,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  card: {
    padding: 16,
  },
  gradientWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
})

export default AnimatedCardContainer
