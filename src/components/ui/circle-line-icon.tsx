import React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

export function CircleLineIcon({ size = 24, color = '#fff', opacity }: { size?: number; color?: string; opacity?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" opacity={opacity}>
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.5} fill="none" />
      <Path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke={color} strokeWidth={1.5} fill="none" />
    </Svg>
  )
}
