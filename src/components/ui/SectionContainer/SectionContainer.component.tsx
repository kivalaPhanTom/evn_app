import GradientText from '@/components/GradientText/GradientText.component'
import { Colors } from '@/core/constants/colors'
import { lightGradients } from '@/core/constants/gradients'
import { GradientColors } from '@/core/types'
import { px } from '@/core/utils/scale'
import { useTheme } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, View, ViewStyle, Text, TouchableOpacity } from 'react-native'

interface SectionContainerProps {
  title: string
  children: React.ReactNode
  style?: ViewStyle
  showDivider?: boolean
  backgroundColor?: string // allow passing custom background color, e.g. 'transparent'
  actionButton?: {
    label: string
    onPress: () => void
  }
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  children,
  style,
  showDivider = false,
  backgroundColor = 'transparent',
  actionButton,
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
  const widthLine = '93%'
  const heightLine = 1
  const colorLine = '#7a8596'
  const lineStyle = { marginVertical: 10 }
  return (
    <LinearGradient
      colors={backgroundColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      <View style={styles.gradientBackground}>
        {title && <View style={styles.headerRow}>
          <GradientText
            text={title.toUpperCase()}
            colors={['#fff', '#fff']}
            fontSize={px.m(18)}
            fontWeight="600"
            style={styles.title}
          />
        </View>}
        {actionButton && (
          <TouchableOpacity onPress={actionButton.onPress} delayPressIn={0} activeOpacity={0.7} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{actionButton.label}</Text>
            <Text style={styles.actionButtonIcon}>{'>'}</Text>
          </TouchableOpacity>
        )}
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
      <View style={[styles.lineContainer, lineStyle]}>
        <LinearGradient
          colors={[`${colorLine}00`, `${colorLine}AA`, `${colorLine}00`]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          locations={[0, 0.5, 1]}
          style={[styles.gradientLine, { width: widthLine, height: heightLine }]}
        />
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    flex: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 4,
  },
  actionButtonText: {
    color: '#9CA3AF',
    fontSize: px.m(14),
  },
  actionButtonIcon: {
    color: '#9CA3AF',
    fontSize: px.m(14),
  },
  divider: {
    height: px.v(2),
    width: '100%',
  },
  content: {
    paddingHorizontal: px.h(30),
    marginBottom: px.v(8),
  },
  lineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientLine: {
    borderRadius: 1,
  },
})

export default SectionContainer
