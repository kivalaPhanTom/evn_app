import { Colors } from '@/core/constants/colors'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Animated, Easing } from 'react-native'
import Svg, { Path, Defs, ClipPath, LinearGradient, Stop, G } from 'react-native-svg'

interface Props {
  percent: number
  fontSize?: number
  height?: number
  width?: number
  vbWidth?: number
  vbHeight?: number
  isShowPercent?: boolean
  colors?: { top: string; bottom: string; border: string; background: string; text: string }
}

export default function WaterDrop({
  percent,
  fontSize = 14,
  height = 80,
  width = 50,
  vbWidth = 24,
  vbHeight = 24,
  isShowPercent = true,
  colors,
}: Props) {
  const isHigh = percent >= 50
  const critical = percent < 20

  const anim = useRef(new Animated.Value(0)).current

  // NEW: state holders for animated numeric values (percent, wave phase)
  const [animatedPercent, setAnimatedPercent] = useState(percent)
  const [wavePhase, setWavePhase] = useState(0)

  useEffect(() => {
    Animated.timing(anim, {
      toValue: percent,
      duration: 1200,
      useNativeDriver: false,
    }).start()
  }, [percent, anim])

  // NEW: listener to drive re-render with animated percent value
  useEffect(() => {
    const id = anim.addListener(v => setAnimatedPercent(v.value))
    return () => {
      anim.removeListener(id)
    }
  }, [anim])

  // NEW: wave phase loop - dùng setInterval ~120ms thay vì Animated listener (60Hz)
  // để giảm React re-render khi có nhiều WaterDrop đồng thời.
  useEffect(() => {
    let phase = 0
    const interval = setInterval(() => {
      phase = (phase + Math.PI * 2 * (120 / 6000)) % (Math.PI * 2)
      setWavePhase(phase)
    }, 120)
    return () => clearInterval(interval)
  }, [])

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
      return () => {
        loop.stop()
      }
    } else {
      blink.setValue(1)
    }
  }, [critical, blink])

  // NEW: build wavy water clip path based on animated percent & phase
  const waterHeightUnits = (animatedPercent / 100) * vbHeight * Math.min(Math.max(0.9, 0), 1)
  const topYBase = vbHeight - waterHeightUnits
  const amplitude = vbHeight * 0.05
  const segments = 14  // more segments = smoother wave
  const segmentWidth = vbWidth / segments

  // Clamp topY inside viewBox
  const topY = Math.min(Math.max(topYBase, 0), vbHeight)

  // Construct wave path (top wavy line + sides + bottom)
  let wavePath = `M0 ${vbHeight} L0 ${topY}`
  for (let i = 0; i <= segments; i++) {
    const x = i * segmentWidth
    const theta = (i / segments) * Math.PI * 2 + wavePhase
    const y = topY + amplitude * Math.sin(theta)
    wavePath += ` L${x} ${y}`
  }
  wavePath += ` L${vbWidth} ${vbHeight} Z`

  const fillColor1 = colors?.top ?? (isHigh ? '#1fb7ff' : Colors.warningZero)
  const fillColor2 = colors?.bottom ?? (isHigh ? '#0099ff' : Colors.warningHalf)
  const borderColor = colors?.border ?? (isHigh ? '#0099ff' : Colors.warningFull)
  const dropPath = 'M12.58,2.19a1,1,0,0,0-1.16,0C11.12,2.4,4,7.56,4,14a8,8,0,0,0,16,0C20,7.56,12.88,2.4,12.58,2.19Z'

  return (
    <Animated.View style={{ alignItems: 'center', opacity: critical ? blink : 1 }}>
      <Svg height={height} width={width} viewBox={`0 0 ${vbWidth} ${vbHeight}`} preserveAspectRatio="xMidYMid meet">
        <Defs>
          <ClipPath id="clip">
            <Path
              d={dropPath}
              transform={`translate(${vbWidth / 2} ${vbHeight / 2}) scale(0.93) translate(${-vbWidth / 2} ${-vbHeight / 2})`}
            />
          </ClipPath>
          {/* REMOVED waterClip */}
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={fillColor1} />
            <Stop offset="100%" stopColor={fillColor2} />
          </LinearGradient>
        </Defs>
        {/* Border */}
        <Path
          d={dropPath}
          transform={`translate(${vbWidth / 2} ${vbHeight / 2}) scale(1) translate(${-vbWidth / 2} ${-vbHeight / 2})`}
          fill={colors?.background ?? '#e8f8ff'}
          stroke={borderColor}
          strokeWidth={1.5}
        />
        <G clipPath="url(#clip)">
          <Path d={wavePath} fill="url(#grad)" />
        </G>
      </Svg>
      {isShowPercent && <Text
        style={[
          styles.percentText,
          {
            color: colors?.text ?? (isHigh ? '#0369A1' : Colors.red),
            top: Math.max(12, height * (fontSize < 10 ? 0.45 : 0.4)),
            fontSize: fontSize,
          },
        ]}
      >
        {percent}%
      </Text>
      }
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  percentText: {
    position: 'absolute',
    fontWeight: 'bold',
  },
})
