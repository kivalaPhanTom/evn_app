export type GradientColors = readonly [string, string, ...string[]]

export type ThemeValue<T> = {
  light?: T
  dark?: T
}

export type TabType = 'day' | 'month' | 'year'

export type BarGroup ={
  label: string
  items: {
    value: number
    frontColor?: string
    showValuesOnTop?: boolean
    showPrefix?: boolean
  }[]
}