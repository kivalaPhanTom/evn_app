import { Colors } from '@/core/constants/colors'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { GradientColors, ThemeValue } from '@/core/types'
import { px } from '@/core/utils/scale'
import { resolveThemeValue } from '@/core/utils/utils'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useMemo, useState } from 'react'
import { Platform, StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native'

type InputType = 'text' | 'password' | 'email' | 'number'

interface GradientInputProps extends Omit<TextInputProps, 'style' | 'onChange' | 'onChangeText'> {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  type?: InputType
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
  // Background options
  gradientColors?: GradientColors | ThemeValue<GradientColors>
  backgroundColor?: string | ThemeValue<string>
  // Border options
  borderColor?: string | ThemeValue<string>
  borderWidth?: number
  height?: number
}

const GradientInput: React.FC<GradientInputProps> = ({
  value,
  onChangeText,
  placeholder,
  type = 'text',
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  gradientColors,
  backgroundColor,
  borderColor,
  borderWidth = 1,
  height = px.h(52),
  ...rest
}) => {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const [focused, setFocused] = useState(false)

  // Map type -> TextInput props
  const mappedProps: Partial<TextInputProps> = useMemo(() => {
    switch (type) {
      case 'password':
        return {
          secureTextEntry: true,
          textContentType: Platform.OS === 'ios' ? 'password' : 'none',
          autoCapitalize: 'none',
        }
      case 'email':
        return {
          keyboardType: 'email-address',
          autoCapitalize: 'none',
          textContentType: Platform.OS === 'ios' ? 'emailAddress' : 'none',
        }
      case 'number':
        return {
          keyboardType: Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric',
        }
      default:
        return {}
    }
  }, [type])

  // Default backgrounds similar to screenshot
  const defaultGradient: GradientColors = isDark
    ? [Colors.darkerGray, Colors.darkBlue]
    : [Colors.white, Colors.lightGray]
  const resolvedGradient = resolveThemeValue(gradientColors, isDark) ?? defaultGradient
  const resolvedSolid = resolveThemeValue(backgroundColor, isDark)
  const resolvedBorder = resolveThemeValue(borderColor, isDark) ?? (isDark ? Colors.dividerLight : Colors.dividerDark)

  const useGradient = !resolvedSolid

  return (
    <View style={[{ width: '100%' }, containerStyle]}>
      <View
        style={[
          styles.wrapper,
          {
            borderRadius: 10,
            borderWidth,
            borderColor: focused ? Colors.blue : resolvedBorder,
            height,
          },
        ]}
      >
        {useGradient ? (
          <LinearGradient
            colors={resolvedGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFill, { borderRadius: 10 }]}
          />
        ) : (
          <View style={[StyleSheet.absoluteFillObject, { backgroundColor: resolvedSolid, borderRadius: 10 }]} />
        )}

        {/* subtle inner highlight/shadow overlay */}
        <LinearGradient
          colors={[
            isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)',
            'rgba(0,0,0,0)',
            isDark ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.05)',
          ]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[StyleSheet.absoluteFill, { borderRadius: 10 }]}
          pointerEvents="none"
        />

        {/* Content row */}
        <View style={[styles.row, { paddingHorizontal: px.h(14), height }]}>
          {leftIcon ? <View style={[styles.iconLeft]}>{leftIcon}</View> : null}

          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={isDark ? '#A6B0BE' : '#6B7280'}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={[
              styles.input,
              {
                color: isDark ? '#E5E7EB' : '#111827',
                paddingLeft: leftIcon ? px.h(8) : 0,
                paddingRight: rightIcon ? px.h(8) : 0,
              },
              inputStyle,
            ]}
            {...mappedProps}
            {...rest}
          />

          {rightIcon ? <View style={[styles.iconRight]}>{rightIcon}</View> : null}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: px.f(15),
    fontWeight: '500',
  },
  iconLeft: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default GradientInput
