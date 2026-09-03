import React from 'react'
import Svg, { Path, Rect, Circle } from 'react-native-svg'

export function ScheduleIcon({ size = 24, color = '#fff', opacity }: { size?: number; color?: string; opacity?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" opacity={opacity}>
      <Rect x={3} y={4} width={18} height={18} rx={2} ry={2} stroke={color} strokeWidth={2} fill="none" />
      <Path d="M16 2v4M8 2v4M3 10h18" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={12} cy={15} r={2} fill={color} />
    </Svg>
  )
}
