import React from 'react'
import { Text as RNText, TextProps } from 'react-native'
import { useAppTheme } from '@/core/hooks/use-app-theme'

export function ThemedText({ style, ...props }: TextProps) {
  const scheme = useAppTheme()
  const color = scheme === 'dark' ? '#ECEDEE' : '#11181C'
  return <RNText style={[{ color }, style]} {...props} />
}
