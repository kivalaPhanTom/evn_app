import { px } from '@/core/utils/scale'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, ColorValue, LayoutChangeEvent, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

interface GradientProgressProps {
  progress: number // 0..1
  height?: number
  colors?: readonly [ColorValue, ColorValue, ...ColorValue[]]
  backgroundColor?: string
  borderRadius?: number
  animate?: boolean
  duration?: number
  leftLabel?: React.ReactNode | string
  rightLabel?: React.ReactNode | string
  style?: ViewStyle
  labelStyle?: TextStyle
}

const GradientProgress: React.FC<GradientProgressProps> = ({
  progress,
  height = 12,
  colors = ['#34D1FF', '#6AF6FF'] as const,
  backgroundColor = 'rgba(255,255,255,0.06)',
  borderRadius = 999,
  animate = true,
  duration = 600,
  leftLabel,
  rightLabel,
  style,
  labelStyle,
}: GradientProgressProps) => {
  const [width, setWidth] = useState(0)
  const animatedWidth = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const clamped = Math.max(0, Math.min(1, progress))
    const target = clamped * width
    if (!animate) {
      animatedWidth.setValue(target)
      return
    }
    Animated.timing(animatedWidth, {
      toValue: target,
      duration,
      useNativeDriver: false,
    }).start()
  }, [progress, width, animate, duration, animatedWidth])

  function onLayout(e: LayoutChangeEvent) {
    const w = e.nativeEvent.layout.width
    setWidth(w)
    // initialize width instantly if needed
    const clamped = Math.max(0, Math.min(1, progress))
    animatedWidth.setValue(clamped * w)
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelsRow}>
        <Text numberOfLines={1} style={[styles.label, labelStyle]}>
          {leftLabel}
        </Text>
        <Text numberOfLines={1} style={[styles.label, labelStyle, styles.labelRight]}>
          {rightLabel}
        </Text>
      </View>

      <View
        style={[
          styles.track,
          {
            height: px(height),
            borderRadius: px(borderRadius),
            backgroundColor,
            overflow: 'hidden',
          },
        ]}
        onLayout={onLayout}
      >
        <Animated.View style={{ width: animatedWidth, height: '100%' }}>
          <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }} />
        </Animated.View>
      </View>
    </View>
  )
}

export default GradientProgress

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: px(8),
  },
  label: {
    color: '#C7D6E1',
    fontSize: px(13),
    flexShrink: 1,
  },
  labelRight: {
    textAlign: 'right',
  },
  track: {
    width: '100%',
  },
})
