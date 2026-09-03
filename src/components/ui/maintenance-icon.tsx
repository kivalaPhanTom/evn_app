import React from 'react'
import Svg, { Path, Circle, G } from 'react-native-svg'

export function MaintenanceIcon({ size = 24, width, height, color = '#fff', opacity }: { size?: number; width?: number | string; height?: number | string; color?: string; opacity?: number | string }) {
  return (
    <Svg width={width ?? size} height={height ?? size} viewBox="0 0 24 24" fill="none" opacity={opacity === undefined ? undefined : Number(opacity)}>
      <G stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </G>
    </Svg>
  )
}
