import { px } from '@/core/utils/scale'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text as RNText, StyleSheet, TextProps, TextStyle } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'

interface GradientTextProps extends TextProps {
  text: string | number
  colors?: readonly string[]
  start?: { x: number; y: number }
  end?: { x: number; y: number }
  fontSize?: number
  fontWeight?: TextStyle['fontWeight']
  animated?: boolean
}

const GradientText: React.FC<GradientTextProps> = ({
  text,
  colors = ['#00E0FF', '#48FFCC'],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  fontSize = px.f(20),
  fontWeight = '700',
  style,
  animated = true,
  ...props
}) => {
  const TextComponent = animated ? Animated.Text : RNText

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
      <LinearGradient colors={colors as [string, string, ...string[]]} start={start} end={end}>
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
