import React from 'react'
import { ViewStyle, ColorValue, StyleProp } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface GradientCardProps {
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]]
  locations?: readonly [number, number, ...number[]] | null
  start?: { x: number; y: number }
  end?: { x: number; y: number }
  angle?: number
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

function GradientCard({
  colors,
  locations,
  start,
  end,
  angle,
  children,
  style,
}: GradientCardProps) {
  // Calculate start and end points from angle if provided
  let calculatedStart = start
  let calculatedEnd = end

  if (angle !== undefined) {
    const angleRad = angle * (Math.PI / 180)
    calculatedStart = {
      x: 0.5 - 0.5 * Math.sin(angleRad),
      y: 0.5 - 0.5 * Math.cos(angleRad),
    }
    calculatedEnd = {
      x: 0.5 + 0.5 * Math.sin(angleRad),
      y: 0.5 + 0.5 * Math.cos(angleRad),
    }
  }

  return (
    <LinearGradient
      colors={colors}
      locations={locations}
      start={calculatedStart}
      end={calculatedEnd}
      style={style}
    >
      {children}
    </LinearGradient>
  )
}

export default GradientCard

