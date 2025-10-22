import { ThemePref, ThemeToggleContext } from '@/core/context/theme'
import { useColorScheme as useSystemColorScheme } from '@/core/hooks/use-color-scheme.web'
import { TranslationProvider } from '@/core/i18n/TranslationProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import 'react-native-reanimated'

export const THEME_PREFERENCE_KEY = 'user:themePreference'

export const unstable_settings = {
  anchor: '(tabs)',
}

export default function RootLayout() {
  const systemScheme = useSystemColorScheme() ?? 'light'
  const [preference, setPreferenceState] = useState<ThemePref>('system')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    void (async () => {
      try {
        const raw = await AsyncStorage.getItem(THEME_PREFERENCE_KEY)
        if (raw === 'light' || raw === 'dark' || raw === 'system') {
          setPreferenceState(raw)
        }
      } catch {
        /* ignore */
      } finally {
        setLoaded(true)
      }
    })()
  }, [])

  const setPreference = async (p: ThemePref) => {
    try {
      await AsyncStorage.setItem(THEME_PREFERENCE_KEY, p)
    } catch {
      /* ignore */
    }
    setPreferenceState(p)
  }

  const toggle = () => {
    // simple toggle between dark and light (if currently system => switch to opposite of system)
    setPreferenceState((prev) => {
      const next = prev === 'system' ? (systemScheme === 'dark' ? 'light' : 'dark') : prev === 'dark' ? 'light' : 'dark'
      // persist
      AsyncStorage.setItem(THEME_PREFERENCE_KEY, next).catch(() => {})
      return next
    })
  }

  const effectiveScheme = useMemo(
    () => (preference === 'system' ? systemScheme : preference),
    [preference, systemScheme],
  )

  // don't render until loaded to avoid flicker
  if (!loaded) return null

  return (
    <TranslationProvider>
      <ThemeToggleContext.Provider value={{ preference, setPreference, toggle }}>
        <ThemeProvider value={effectiveScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack initialRouteName="splash">
            <Stack.Screen name="splash" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>

          {/* Floating switch to toggle theme */}
          <View style={styles.switchContainer} pointerEvents="box-none">
            <View style={styles.inner}>
              <Text style={[styles.label, effectiveScheme === 'dark' ? styles.labelDark : styles.labelLight]}>
                {effectiveScheme === 'dark' ? 'Dark' : 'Light'}
              </Text>
              <Switch
                value={effectiveScheme === 'dark'}
                onValueChange={() => {
                  toggle()
                }}
                trackColor={{ false: '#ccc', true: '#4f46e5' }}
                thumbColor={effectiveScheme === 'dark' ? '#fff' : '#fff'}
              />
            </View>
          </View>

          <StatusBar style={effectiveScheme === 'dark' ? 'light' : 'dark'} />
        </ThemeProvider>
      </ThemeToggleContext.Provider>
    </TranslationProvider>
  )
}

const styles = StyleSheet.create({
  switchContainer: {
    position: 'absolute',
    top: 14,
    right: 12,
    zIndex: 50,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  label: {
    marginRight: 8,
    fontSize: 12,
  },
  labelDark: {
    color: '#fff',
  },
  labelLight: {
    color: '#000',
  },
})
