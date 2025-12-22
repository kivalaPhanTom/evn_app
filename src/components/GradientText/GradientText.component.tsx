import { px } from '@/core/utils/scale'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text as RNText, StyleSheet, TextProps, TextStyle } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'

interface GradientTextProps extends TextProps {
  text: string | number
  colors?: string | readonly string[]
  start?: { x: number; y: number }
  end?: { x: number; y: number }
  fontSize?: number
  fontWeight?: TextStyle['fontWeight']
  animated?: boolean
}

const GradientText: React.FC<GradientTextProps> = ({
  text,
  colors = ['#0EA5E9', '#06B6D4'],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  fontSize = px.f(20),
  fontWeight = '700',
  style,
  animated = true,
  ...props
}) => {
  const TextComponent = animated ? Animated.Text : RNText

  // normalize colors to an array with at least two entries
  let gradientColors: string[]
  if (typeof colors === 'string') {
    gradientColors = [colors, colors]
  } else {
    gradientColors = colors.length === 1 ? [colors[0], colors[0]] : [...colors]
  }

  return (
    <MaskedView
      maskElement={
        <TextComponent
          entering={animated ? FadeIn.duration(300) : undefined}
          style={[styles.text, { fontSize, fontWeight }, style]}
          {...props}
        >
          {text}
        </TextComponent>
      }
    >
      <LinearGradient colors={gradientColors as [string, string, ...string[]]} start={start} end={end}>
        <TextComponent
          style={[
            styles.text,
            { fontSize, fontWeight, opacity: 0 }, // ẩn text thực
          ]}
        >
          {text}
        </TextComponent>
      </LinearGradient>
    </MaskedView>
  )
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'transparent',
  },
})

export default GradientText
