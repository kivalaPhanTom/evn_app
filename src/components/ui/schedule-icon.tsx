import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

export interface ScheduleIconProps {
  color?: string
  opacity?: string
  width?: string
  height?: string
}

export const ScheduleIcon: React.FC<ScheduleIconProps> = ({
  color = '#22D3EE',
  opacity = '1',
  width = '38',
  height = '38',
}) => {
  return (
    <Svg width={width} height={height} viewBox={`0 0 38 38`} fill="none">
      <G opacity={opacity}>
        <Path
          d="M12.6667 3.1665V9.49984"
          stroke="#22D2ED"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M25.3333 3.1665V9.49984"
          stroke="#22D2ED"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M30.0833 6.3335H7.91667C6.16776 6.3335 4.75 7.75126 4.75 9.50016V31.6668C4.75 33.4157 6.16776 34.8335 7.91667 34.8335H30.0833C31.8322 34.8335 33.25 33.4157 33.25 31.6668V9.50016C33.25 7.75126 31.8322 6.3335 30.0833 6.3335Z"
          stroke="#22D2ED"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M4.75 15.8335H33.25"
          stroke="#22D2ED"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
    </Svg>
  )
}
