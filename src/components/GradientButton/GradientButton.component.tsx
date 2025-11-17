import { Colors } from '@/core/constants/colors'
import { textGradients } from '@/core/constants/gradients'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { GradientColors, ThemeValue } from '@/core/types'
import { px } from '@/core/utils/scale'
import { resolveThemeValue } from '@/core/utils/utils'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native'

interface Props {
  title: string
  onPress?: () => void
  style?: ViewStyle
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  height?: number
  uppercase?: boolean
  // Background options
  gradientColors?: GradientColors | ThemeValue<GradientColors>
  backgroundColor?: string | ThemeValue<string>
  // Border ring color
  borderColor?: string | ThemeValue<string>
  borderWidth?: number
  // Text color override
  textColor?: string | ThemeValue<string>
}

const GradientButton: React.FC<Props> = ({
  title,
  onPress,
  style,
  disabled = false,
  loading = false,
  fullWidth = true,
  height = px.h(54),
  uppercase = true,
  gradientColors,
  backgroundColor,
  borderColor,
  borderWidth = 2,
  textColor,
}) => {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'

  // Defaults similar to screenshot (purple solid/gradient with subtle ring)
  const defaultGradient: GradientColors = textGradients.accent
  const defaultSolid = isDark ? '#5136D6' : '#5A3BE7'
  const defaultBorder = isDark ? '#7B61F0' : '#7B61F0'
  const resolvedGradient = resolveThemeValue(gradientColors, isDark)
  const resolvedBg = resolveThemeValue(backgroundColor, isDark)
  const resolvedBorder = resolveThemeValue(borderColor, isDark) ?? defaultBorder
  const resolvedText = resolveThemeValue(textColor, isDark) ?? Colors.white

  const radius = height / 2

  // Determine if we render gradient or solid background
  const useGradient = !!resolvedGradient || !resolvedBg

  const content = (
    <>
      {loading ? (
        <ActivityIndicator size="small" color={resolvedText} />
      ) : (
        <Text style={[styles.label, { color: resolvedText }]} numberOfLines={1}>
          {uppercase ? title.toUpperCase() : title}
        </Text>
      )}
    </>
  )

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      android_ripple={{ color: 'rgba(255,255,255,0.15)', borderless: false }}
      style={({ pressed }) => [
        {
          height,
          borderRadius: radius,
          overflow: 'hidden',
          opacity: pressed ? 0.95 : 1,
          width: fullWidth ? '100%' : undefined,
        },
        // soft outer shadow/glow
        isDark
          ? {
              shadowColor: '#000',
              shadowOpacity: 0.35,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 6 },
              elevation: 6,
            }
          : {
              shadowColor: '#5B3FD6',
              shadowOpacity: 0.2,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
              elevation: 4,
            },
        style,
      ]}
    >
      {useGradient ? (
        <LinearGradient
          colors={resolvedGradient ?? defaultGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            borderRadius: radius,
            borderWidth,
            borderColor: resolvedBorder,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {content}
        </LinearGradient>
      ) : (
        <LinearGradient
          // subtle inner gradient even for solid to mimic depth; both stops same if only solid desired
          colors={[resolvedBg ?? defaultSolid, resolvedBg ?? defaultSolid] as GradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            borderRadius: radius,
            borderWidth,
            borderColor: resolvedBorder,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {content}
        </LinearGradient>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: px.f(16),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
})

export default GradientButton
