import { GradientColors } from '@/core/types'
import { isTablet, px } from '@/core/utils/scale'
import React from 'react'
import { BarChartView } from './BarChartView.component'
import { LineChartView } from './LineChartView.component'
import { PieChartView } from './PieChartView.component'

export interface ChartViewProps {
  type: 'line' | 'bar' | 'pie'
  data: any[]
  data2?: any[]
  title?: string
  color?: 'blue' | 'green' | 'red' | 'orange'
  gradient?: boolean
  height?: number
  showLegend?: boolean
  loading?: boolean
  animationDuration?: number
  gradientColors?: GradientColors
}

export const ChartView: React.FC<ChartViewProps> = ({
  type,
  data,
  data2,
  color = 'blue',
  gradient = true,
  height = isTablet() ? px.v(320) : px.v(220),
  loading = false,
  animationDuration = 1000,
  title,
}) => {
  const commonProps = {
    data,
    color,
    gradient,
    height,
    loading,
    animationDuration,
    title,
  }

  if (type === 'line') {
    return <LineChartView {...commonProps} data2={data2} />
  }

  if (type === 'bar') {
    return <BarChartView {...commonProps} />
  }

  if (type === 'pie') {
    return <PieChartView {...commonProps} />
  }

  return null
}
