// components/SummaryCard.tsx
import { textGradients } from '@/core/constants/gradients'
import { GradientColors, ThemeValue } from '@/core/types'
import { px } from '@/core/utils/scale'
import type { ImageSource } from 'expo-image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import AnimatedCardContainer from '../../AnimatedCardContainer/AnimatedCardContainer.component'
import GradientText from '../../GradientText/GradientText.component'

interface SummaryCardProps {
  label: string
  value: number
  decimals?: number
  unit?: string
  align?: 'left' | 'center' | 'right'
  gradientColors?: GradientColors
  valueColors?: GradientColors
  gradientPosition?: 'top' | 'bottom'
  backgroundColor?: string | GradientColors | ThemeValue<string | GradientColors>
  borderColor?: string
  borderWidth?: number
  showGradient?: boolean
  style?: ViewStyle
  backgroundImage?: ImageSource
  backgroundImageOpacity?: number
  backgroundImageContentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  fontSizeLabel?: number
  fontSizeNumber?: number
  fontSizeUnit?: number
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  label,
  value,
  decimals = 1,
  align = 'left',
  unit,
  gradientColors = textGradients.border,
  gradientPosition = 'top',
  backgroundColor = { dark: '#1A2939', light: '#fff' },
  borderColor = 'rgba(255,255,255,0.02)',
  borderWidth = 1,
  style,
  showGradient = true,
  valueColors = textGradients.primary,
  backgroundImage,
  backgroundImageOpacity,
  backgroundImageContentFit,
  fontSizeLabel,
  fontSizeNumber,
  fontSizeUnit,
}) => {
  const { t } = useTranslation()

  const alignItems = align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'
  const numberFontSize = fontSizeNumber ?? px.m(28)
  const unitFontSize = fontSizeUnit ?? px.m(16)
  const labelFontSize = fontSizeLabel ?? px.m(16)

  return (
    <AnimatedCardContainer
      style={StyleSheet.flatten([styles.container, style])}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      borderRadius={px.h(12)}
      gradientPosition={gradientPosition}
      gradientColors={gradientColors}
      showGradient={showGradient}
      backgroundImage={backgroundImage}
      backgroundImageOpacity={backgroundImageOpacity}
      backgroundImageContentFit={backgroundImageContentFit}
    >
      <View style={{ alignItems }}>
        <Text style={[styles.summaryLabel, { fontSize: labelFontSize }]}>{label}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            marginTop: px.v(6),
          }}
        >
          <GradientText text={value} fontSize={numberFontSize} colors={valueColors} />
          <Text style={[styles.summaryUnit, { marginLeft: px.h(8), alignSelf: 'baseline', fontSize: unitFontSize }]}>
            {unit ?? t('unit')}
          </Text>
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryLabel: {
    color: '#9AA6B6',
  },
  summaryUnit: { color: '#9AA6B6', fontWeight: '600' },
})

export default SummaryCard
