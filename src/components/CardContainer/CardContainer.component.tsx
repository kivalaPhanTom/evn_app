import { useAppTheme } from '@/core/hooks/use-app-theme'
import { GradientColors, ThemeValue } from '@/core/types'
import { resolveThemeValue } from '@/core/utils/utils'
import { LinearGradient } from 'expo-linear-gradient'
import { Image, type ImageSource } from 'expo-image'
import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View, ViewStyle, type ImageStyle } from 'react-native'

interface AnimatedCardContainerProps {
  children: React.ReactNode
  style?: ViewStyle
  delay?: number
  gradientColors?: GradientColors | ThemeValue<GradientColors>
  gradientHeight?: number
  gradientPosition?: 'top' | 'bottom'
  borderRadius?: number
  borderWidth?: number
  showGradient?: boolean
  /**
   * backgroundColor can be:
   *  - string (applies to both themes)
   *  - GradientColors (applies to both themes)
   *  - { light: string, dark: string } (theme-specific)
   *  - { light: GradientColors, dark: GradientColors } (theme-specific)
   */
  backgroundColor?: string | GradientColors | ThemeValue<string | GradientColors>
  /**
   * borderColor can be:
   *  - string (applies to both themes)
   *  - { light: string, dark: string } (theme-specific)
   */
  borderColor?: string | ThemeValue<string>
  backgroundImage?: ImageSource
  backgroundImageOpacity?: number
  backgroundImageContentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  backgroundImageStyle?: ImageStyle
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
  backgroundImage,
  backgroundImageOpacity = 1,
  backgroundImageContentFit = 'cover',
  backgroundImageStyle,
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

  const defaultBorder = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)'

  const resolvedBg = resolveThemeValue<string | GradientColors>(propBackgroundColor, isDark)
  const borderColor = resolveThemeValue(propBorderColor, isDark) ?? defaultBorder

  // gradient can be theme-specific too
  const resolvedGradient = resolveThemeValue(gradientColors, isDark) ?? (['#FF4BC2', '#705CFF'] as const)

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
          Array.isArray(resolvedBg) ? { backgroundColor: 'transparent' } : { backgroundColor: resolvedBg as string },
          {
            borderColor,
            borderRadius,
            borderWidth,
          },
        ]}
      >
        {!!backgroundImage && (
          <Image
            source={backgroundImage}
            style={[
              StyleSheet.absoluteFillObject,
              { borderRadius },
              backgroundImageStyle,
              { opacity: backgroundImageOpacity },
            ]}
            contentFit={backgroundImageContentFit}
            pointerEvents="none"
          />
        )}
        {Array.isArray(resolvedBg) && (
          <LinearGradient
            colors={resolvedBg as GradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ ...StyleSheet.absoluteFillObject, borderRadius }}
            pointerEvents="none"
          />
        )}
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
