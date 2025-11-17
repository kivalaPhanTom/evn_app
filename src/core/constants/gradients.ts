import { GradientColors } from '../types'

export const textGradients = {
  primary: ['#00E0FF', '#48FFCC'] as GradientColors,
  accent: ['#FF4BC2', '#705CFF'] as GradientColors,
  tab: ['#8B5EFF', '#4AD8FF'] as GradientColors,
  border: ['#38445A', '#485A89'] as GradientColors,
  water: ['#3AB7FF', '#7DF0FF'] as GradientColors,
}

export const lightGradients = {
  blue: ['#3b82f6', '#60a5fa'] as GradientColors,
  green: ['#34d399', '#86efac'] as GradientColors,
  red: ['#fb7185', '#fda4af'] as GradientColors,
  orange: ['#fb923c', '#fdba74'] as GradientColors,
  purple: ['#c084fc', '#a78bfa'] as GradientColors,
}

export const darkGradients = {
  blue: ['#60a5fa', '#1e3a8a'] as GradientColors,
  green: ['#34d399', '#065f46'] as GradientColors,
  red: ['#f87171', '#7f1d1d'] as GradientColors,
  orange: ['#fb923c', '#78350f'] as GradientColors,
  purple: ['#a78bfa', '#4c1d95'] as GradientColors,
}

export const chartGradients = {
  light: lightGradients,
  dark: darkGradients,
}
