import React from 'react'
import Svg, { Circle, Line } from 'react-native-svg'

export interface CircleLineProps {
  color: string
}

export const CircleLineIcon: React.FC<CircleLineProps> = ({ color = '#FB923C' }) => {
  return (
    <Svg width="40" height="15">
      <Line x1="10" y1="7" x2="16" y2="7" stroke={color} strokeWidth="2" />
      <Circle cx="20" cy="7" r="3" stroke={color} strokeWidth="2" fill="none" />
      <Line x1="23" y1="7" x2="30" y2="7" stroke={color} strokeWidth="2" />
    </Svg>
  )
}
