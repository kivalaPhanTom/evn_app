import GradientText from '@/components/GradientText/GradientText.component'
import { Colors } from '@/core/constants/colors'
import { lightGradients } from '@/core/constants/gradients'
import { GradientColors } from '@/core/types'
import { px } from '@/core/utils/scale'
import { useTheme } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

interface SectionContainerProps {
  title: string
  children: React.ReactNode
  style?: ViewStyle
  showDivider?: boolean
  backgroundColor?: string // allow passing custom background color, e.g. 'transparent'
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  children,
  style,
  showDivider = false,
  backgroundColor = 'transparent',
}) => {
  const theme = useTheme()
  const isDark = theme.dark

  const backgroundColors: GradientColors = backgroundColor
    ? backgroundColor === 'transparent'
      ? ['transparent', 'transparent']
      : [backgroundColor, backgroundColor]
    : isDark
      ? [Colors.darkerGray, Colors.darkerGray]
      : [Colors.white, Colors.lightGray]

  const dividerColor = isDark ? Colors.dividerLight : Colors.black

  return (
    <LinearGradient
      colors={backgroundColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      <View style={styles.gradientBackground}>
        <GradientText
          text={title.toUpperCase()}
          colors={['#fff', '#fff']}
          fontSize={px.m(18)}
          fontWeight="600"
          style={styles.title}
        />
      </View>
      {showDivider && <View style={[styles.divider, { backgroundColor: dividerColor }]} />}
      <View
        style={[
          styles.content,
          { paddingTop: showDivider ? px.v(16) : 0, paddingBottom: backgroundColor === 'transparent' ? 0 : px.v(16) },
        ]}
      >
        {children}
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: px.v(16),
  },
  gradientBackground: {
    padding: px.h(16),
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'left',
  },
  divider: {
    height: px.v(2),
    width: '100%',
  },
  content: {
    paddingHorizontal: px.h(30),
    marginBottom: px.v(8),
  },
})

export default SectionContainer
