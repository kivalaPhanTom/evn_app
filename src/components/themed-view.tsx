import React from 'react'
import { View as RNView, ViewProps } from 'react-native'
import { useAppTheme } from '@/core/hooks/use-app-theme'

export function ThemedView({ style, ...props }: ViewProps) {
  const scheme = useAppTheme()
  const bg = scheme === 'dark' ? 'transparent' : '#fff'
  return <RNView style={[{ backgroundColor: bg }, style]} {...props} />
}
