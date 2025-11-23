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
}

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
  const bobAnim = useRef(new Animated.Value(0)).current
  // NEW: wave phase animation
  const wavePhaseAnim = useRef(new Animated.Value(0)).current

  // NEW: state holders for animated numeric values (percent, bob offset, wave phase)
  const [animatedPercent, setAnimatedPercent] = useState(percent)
  const [bobOffsetValue, setBobOffsetValue] = useState(0)
  const [wavePhase, setWavePhase] = useState(0)

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnim, { toValue: 1, duration: 2200, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
        Animated.timing(bobAnim, { toValue: 0, duration: 2200, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [bobAnim])

  useEffect(() => {
    Animated.timing(anim, {
      toValue: percent,
      duration: 1200,
      useNativeDriver: false,
    }).start()
  }, [percent, anim])

  // NEW: listeners to drive re-render with animated values
  useEffect(() => {
    const id = anim.addListener(v => setAnimatedPercent(v.value))
    const bobId = bobAnim.addListener(v => setBobOffsetValue(
      (-vbHeight * 0.03) + (v.value * (vbHeight * 0.06))
    ))
    return () => {
      anim.removeListener(id)
      bobAnim.removeListener(bobId)
    }
  }, [anim, bobAnim, vbHeight])

  // NEW: wave phase looping (0 -> 2π)
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(wavePhaseAnim, {
        toValue: Math.PI * 2,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    )
    loop.start()
    const phaseId = wavePhaseAnim.addListener(v => setWavePhase(v.value))
    return () => {
      loop.stop()
      wavePhaseAnim.removeListener(phaseId)
    }
  }, [wavePhaseAnim])

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

  // NEW: build wavy water clip path based on animated percent & phase
  const waterHeightUnits = (animatedPercent / 100) * vbHeight * Math.min(Math.max(0.9, 0), 1)
  const topYBase = vbHeight - waterHeightUnits + bobOffsetValue
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

  const fillColor1 = isHigh ? '#1fb7ff' : '#ff7070'
  const fillColor2 = isHigh ? '#0099ff' : '#ff2b2b'
  const borderColor = isHigh ? '#0099ff' : '#ff2b2b'
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
          fill="#e8f8ff"
          stroke={borderColor}
          strokeWidth={1.5}
        />
        <G clipPath="url(#clip)">
          <Path d={wavePath} fill="url(#grad)" />
        </G>
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
