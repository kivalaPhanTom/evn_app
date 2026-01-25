import { ThemePref, ThemeToggleContext } from '@/core/context/theme'
import { AuthProvider } from '@/core/context/AuthProvider'
import { useColorScheme as useSystemColorScheme } from '@/core/hooks/use-color-scheme.web'
import { TranslationProvider } from '@/core/i18n/TranslationProvider'
import StoreProvider from '@/core/redux/StoreProvider'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack, usePathname, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import ToastManager from 'toastify-react-native'
import VersionChecker from '@/components/VersionChecker/VersionChecker'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const THEME_PREFERENCE_KEY = 'user:themePreference'

export default function RootLayout() {
  const systemScheme = useSystemColorScheme() ?? 'light'
  const [preference, setPreferenceState] = useState<ThemePref>('system')
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const insets = useSafeAreaInsets()

  useEffect(() => {
    void (async () => {
      try {
        // const raw = await AsyncStorage.getItem(THEME_PREFERENCE_KEY)
        // if (raw === 'light' || raw === 'dark' || raw === 'system') {
        //   setPreferenceState(raw)
        // }
        setPreferenceState('dark') // default to dark
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
      AsyncStorage.setItem(THEME_PREFERENCE_KEY, next).catch(() => { })
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
    <AuthProvider>
      <TranslationProvider>
        <ThemeToggleContext.Provider value={{ preference, setPreference, toggle }}>
          <ThemeProvider value={effectiveScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <StoreProvider>
              <VersionChecker />
              <SafeAreaView style={{ flex: 1, backgroundColor: effectiveScheme === 'dark' ? '#0B0F2A' : '#F3F4F6' }}>
                <Stack
                  initialRouteName="splash"
                  screenOptions={{ headerShown: false, animation: 'slide_from_right', animationDuration: 200 }}
                >
                  <Stack.Screen name="splash" />
                  <Stack.Screen name="login" />
                  <Stack.Screen name="companies" />
                  <Stack.Screen name="charts" />
                  <Stack.Screen name="home/index" />
                  <Stack.Screen name="product-output-detail/index" />
                  <Stack.Screen name="product-power-detail/index" />
                  <Stack.Screen name="hydrology-detail/index" />
                  <Stack.Screen name="revenue-profit-detail/index" />
                  <Stack.Screen name="unit-maintenance-schedule-detail/index" />
                  <Stack.Screen name="revenue-detail/index" />
                  <Stack.Screen name="profit-detail/index" />
                  <Stack.Screen name="factory-profit-detail/index" />
                  {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
                  <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                </Stack>
                {router.canGoBack() && !pathname.startsWith('/(tabs)') && (
                 <View style={[styles.backContainer, { bottom: insets.bottom + 80 }]} pointerEvents="box-none">
                    <TouchableOpacity
                      onPress={() => router.back()}
                      style={styles.backButton}
                      delayPressIn={0}
                      hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    >
                      <Ionicons name="chevron-back" size={24} color={effectiveScheme === 'dark' ? '#fff' : '#000'} />
                    </TouchableOpacity>
                  </View>
                )}
                <ToastManager theme={'dark'} position={'top'} animationStyle="fade" />
                <StatusBar style={effectiveScheme === 'dark' ? 'light' : 'dark'} />
              </SafeAreaView>
            </StoreProvider>
          </ThemeProvider>
        </ThemeToggleContext.Provider>
      </TranslationProvider>
    </AuthProvider>
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
  backContainer: {
    position: 'absolute',
    // left: 12,
    // zIndex: 50,
    right: 16,
    zIndex: 50,
  },
  backButton: {
    // backgroundColor: 'transparent',
    // // padding: 8,
    // borderRadius: 20,

    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#2E3148',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
