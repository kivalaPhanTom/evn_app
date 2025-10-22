// components/SummaryCard.tsx
import { textGradients } from '@/core/constants/gradients'
import { GradientColors } from '@/core/types'
import { px } from '@/core/utils/scale'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import AnimatedNumber from '../../AnimatedNumber/AnimatedNumber.component'
import AnimatedCardContainer, { ThemeValue } from '../../CardContainer/CardContainer.component'
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
  backgroundColor?: string | ThemeValue<string>
  borderColor?: string
  borderWidth?: number
  showGradient?: boolean
  style?: ViewStyle
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
}) => {
  const { t } = useTranslation()

  const alignItems = align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'

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
    >
      <View style={{ alignItems }}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            marginTop: px.v(6),
          }}
        >
          <AnimatedNumber
            value={value}
            duration={900}
            decimals={decimals}
            formatter={(n) => (decimals > 0 ? Number(n.toFixed(decimals)).toString() : Number(n.toFixed(0)).toString())}
            render={(text) => <GradientText text={text} fontSize={px.m(28)} colors={valueColors} />}
          />
          <Text style={[styles.summaryUnit, { marginLeft: px.h(8), alignSelf: 'baseline' }]}>{unit ?? t('unit')}</Text>
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
    fontSize: px.m(16),
  },
  summaryUnit: { color: '#9AA6B6', fontSize: px.m(16), fontWeight: '600' },
})

export default SummaryCard
