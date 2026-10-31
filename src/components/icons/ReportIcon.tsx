import React from 'react'
import Svg, { Path } from 'react-native-svg'

interface ReportIconProps {
  size?: number
  color?: string
  style?: object
}

const ReportIcon = ({ size = 24, color = '#144378', style }: ReportIconProps) => {
  const d = [
    'M3.5 0H14.2L22 7.8V22.5A1.5 1.5 0 0 1 20.5 24H3.5A1.5 1.5 0 0 1 2 22.5V1.5A1.5 1.5 0 0 1 3.5 0Z',
    'M13.2 4V9.9H19.1Z',
    'M5.6 15.1H8.4V22.5H5.6Z',
    'M11.1 12H13.9V22.5H11.1Z',
    'M16.6 17.8H19.4V22.5H16.6Z',
  ].join(' ')
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Path d={d} fill={color} fillRule="evenodd" clipRule="evenodd" />
    </Svg>
  )
}

export default ReportIcon
