import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import Svg, { Path, Rect, Defs, ClipPath, LinearGradient, Stop } from 'react-native-svg'

interface Props {
  percent: number
  fontSize?: number
  height?: number
  width?: number
  vbWidth?: number
  vbHeight?: number
}

const AnimatedRect = Animated.createAnimatedComponent(Rect)

export default function WaterDrop({
  percent,
  fontSize = 14,
  height = 80,
  width = 50,
  vbWidth = 24,
  vbHeight = 24,
}: Props) {
  const isHigh = percent >= 50
  const critical = percent < 20

  const anim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(anim, {
      toValue: percent,
      duration: 1200,
      useNativeDriver: false,
    }).start()
  }, [percent, anim])

  // blink if <20%
  const blink = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (critical) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(blink, { toValue: 0.3, duration: 500, useNativeDriver: false }),
          Animated.timing(blink, { toValue: 1, duration: 500, useNativeDriver: false }),
        ]),
      )
      loop.start()
      return () => loop.stop()
    } else {
      blink.setValue(1)
    }
  }, [critical, blink])

  // animate water height in viewBox units (not pixels)
  const waterHeight = anim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, vbHeight],
  })

  const fillColor1 = isHigh ? '#1fb7ff' : '#ff7070'
  const fillColor2 = isHigh ? '#0099ff' : '#ff2b2b'
  const borderColor = isHigh ? '#0099ff' : '#ff2b2b'

  // Path assumed to be authored in vbWidth x vbHeight coordinate system
  const dropPath = 'M12.58,2.19a1,1,0,0,0-1.16,0C11.12,2.4,4,7.56,4,14a8,8,0,0,0,16,0C20,7.56,12.88,2.4,12.58,2.19Z'

  return (
    <Animated.View style={{ alignItems: 'center', opacity: critical ? blink : 1 }}>
      {/*
        Shrink the drop slightly so its stroke doesn't get clipped.
        Scale around the center of the viewBox.
      */}
      <Svg height={height} width={width} viewBox={`0 0 ${vbWidth} ${vbHeight}`} preserveAspectRatio="xMidYMid meet">
        <Defs>
          <ClipPath id="clip">
            <Path
              d={dropPath}
              transform={`translate(${vbWidth / 2} ${vbHeight / 2}) scale(0.93) translate(${-vbWidth / 2} ${-vbHeight / 2})`}
            />
          </ClipPath>

          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={fillColor1} />
            <Stop offset="100%" stopColor={fillColor2} />
          </LinearGradient>
        </Defs>

        {/* Border (same transform as clip to keep alignment) */}
        <Path
          d={dropPath}
          transform={`translate(${vbWidth / 2} ${vbHeight / 2}) scale(1) translate(${-vbWidth / 2} ${-vbHeight / 2})`}
          fill="#e8f8ff"
          stroke={borderColor}
          strokeWidth={1.5}
        />

        {/* Animated water */}
        <AnimatedRect
          x={0}
          width={vbWidth}
          fill="url(#grad)"
          clipPath="url(#clip)"
          y={Animated.subtract(vbHeight, waterHeight)}
          height={waterHeight}
        />
      </Svg>

      <Text
        style={[
          styles.percentText,
          {
        color: isHigh ? '#0369A1' : '#ff0000',
        top: Math.max(12, height * (fontSize < 10 ? 0.45 : 0.4)),
        fontSize: fontSize,
          },
        ]}
      >
        {percent}%
      </Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  percentText: {
    position: 'absolute',
    fontWeight: 'bold',
  },
})
