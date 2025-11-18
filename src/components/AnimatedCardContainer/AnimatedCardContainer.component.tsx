import { useAppTheme } from '@/core/hooks/use-app-theme'
import { GradientColors, ThemeValue } from '@/core/types'
import { resolveThemeValue } from '@/core/utils/utils'
import { Image, type ImageSource } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet, View, ViewStyle, type ImageStyle } from 'react-native'

const DEFAULT_CARD_BG: ThemeValue<string | GradientColors> = {
  dark: ['#1a2332', '#2a3544', '#1a2332'],
  light: '#fff',
}

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
  opacityBg?: number
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
  onPress?: () => void
}

const AnimatedCardContainer: React.FC<AnimatedCardContainerProps> = (props) => {
  const {
    children,
    style,
    delay = 0,
    gradientColors = ['#FF4BC2', '#705CFF'] as const,
    gradientHeight = 4,
    gradientPosition = 'bottom',
    borderRadius = 16,
    borderWidth = 1,
    showGradient = false,
    opacityBg = 0.8,
    backgroundColor: propBackgroundColor = DEFAULT_CARD_BG,
    borderColor: propBorderColor = 'rgba(255,255,255,0.04)',
    backgroundImage,
    backgroundImageOpacity = 1,
    backgroundImageContentFit = 'cover',
    backgroundImageStyle,
    onPress = () => {},
  } = props

  const hasOnPressProp = typeof props.onPress === 'function'

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
    <Pressable onPress={onPress} disabled={!hasOnPressProp}>
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
              opacity: opacityBg,
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
              colors={resolvedGradient as GradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ height: gradientHeight, width: '100%' }}
            />
          ) : (
            <View style={{ width: '100%', backgroundColor: borderColor }} />
          )}
        </View>
      </Animated.View>
    </Pressable>
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
