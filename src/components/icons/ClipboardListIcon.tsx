import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

interface ClipboardListIconProps {
  size?: number
  color?: string
  style?: object
}

const ClipboardListIcon = ({ size = 24, color = '#1E3A8A', style }: ClipboardListIconProps) => {
  const rowCenters = [10, 12.2, 14.4, 16.6, 18.8]
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Rect x={4.8} y={3} width={14.4} height={18.4} rx={1.6} fill="none" stroke={color} strokeWidth={1.7} />
      <Path
        fill={color}
        fillRule="evenodd"
        d="M9.8 1.2 H14.2 Q15.4 1.2 15.4 2.4 V3.6 Q15.4 4.8 14.2 4.8 H9.8 Q8.6 4.8 8.6 3.6 V2.4 Q8.6 1.2 9.8 1.2 Z M12 2.2 A0.8 0.8 0 1 0 12 3.8 A0.8 0.8 0 1 0 12 2.2 Z"
      />
      <Rect x={6.7} y={6.4} width={10.6} height={1.8} rx={0.4} fill={color} />
      {rowCenters.map((cy) => (
        <React.Fragment key={cy}>
          <Rect x={6.7} y={cy - 0.7} width={1.4} height={1.4} rx={0.35} fill={color} />
          <Rect x={9.6} y={cy - 0.7} width={7.7} height={1.4} rx={0.7} fill={color} />
        </React.Fragment>
      ))}
    </Svg>
  )
}

export default ClipboardListIcon
