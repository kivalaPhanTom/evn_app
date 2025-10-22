import GradientText from '@/components/GradientText/GradientText.component'
import { Colors } from '@/core/constants/colors'
import { textGradients } from '@/core/constants/gradients'
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
}

const SectionContainer: React.FC<SectionContainerProps> = ({ title, children, style }) => {
  const theme = useTheme()
  const isDark = theme.dark

  const backgroundColors: GradientColors = isDark ? [Colors.darkerGray, Colors.darkBlue] : [Colors.white, Colors.lightGray]
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
          colors={textGradients.accent}
          fontSize={px.m(18)}
          fontWeight="600"
          style={styles.title}
        />
      </View>
      <View style={[styles.divider, { backgroundColor: dividerColor }]} />
      <View style={styles.content}>{children}</View>
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
    padding: px.h(16),
    paddingHorizontal: px.h(30),
    marginVertical: px.v(8),
  },
})

export default SectionContainer
