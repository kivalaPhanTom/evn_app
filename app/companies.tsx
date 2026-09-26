import { images } from '@/assets'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { Colors } from '@/core/constants/colors'
import { textGradients } from '@/core/constants/gradients'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { px } from '@/core/utils/scale'
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect, useRouter } from 'expo-router'
import React, { useContext, useMemo, useRef, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Constants from 'expo-constants'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/core/context/AuthProvider'
import { ThemeToggleContext } from '@/core/context/theme'

export default function CompaniesScreen() {
  const { t } = useTranslation();
  const COMPANIES = [{ name: t('companyName'), location: 'Đắk Lắk, Việt Nam' }]
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const router = useRouter()
  const { logout } = useAuth()
  const { setPreference } = useContext(ThemeToggleContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const lightOn = !isDark
  const onPress = (c: any) => {
    router.navigate({ pathname: '/home', params: { companyName: c.name, location: c.location } })
  }
  const appVersion = Constants.expoConfig?.version ?? ''
  const onLogout = async () => {
    await logout()
    router.replace('/login')
  }

  return (
    <TwinkleStars
      background={lightOn ? Colors.lightBackground : Colors.background}
      particleDensity={50}
      particleColor={Colors.textColor}
      minSize={0.5}
      maxSize={2}
    >
      <SafeAreaView style={styles.flex} edges={['top']}>
        {menuOpen && (
          <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)} />
        )}
        <View style={styles.header}>
          <Pressable onPress={() => setMenuOpen((v) => !v)} hitSlop={10}>
            <Ionicons
              name="settings"
              size={px.f(24)}
              color={lightOn ? '#374151' : isDark ? '#FFFFFF' : '#111827'}
            />
          </Pressable>
          {menuOpen && (
            <View style={styles.menu}>
              <View style={styles.menuRow}>
                <Text style={styles.menuText}>{t('common.backgroundColor')}</Text>
                <Pressable
                  onPress={() => setPreference(isDark ? 'light' : 'dark')}
                  hitSlop={8}
                  style={[styles.toggleTrack, { backgroundColor: lightOn ? '#F97316' : '#111827' }]}
                >
                  <View style={styles.toggleInner}>
                    {lightOn ? (
                      <>
                        <Ionicons name="sunny" size={px.f(13)} color="#FFFFFF" />
                        <View style={styles.toggleThumb} />
                      </>
                    ) : (
                      <>
                        <View style={styles.toggleThumb} />
                        <Ionicons name="moon-outline" size={px.f(13)} color="#FFFFFF" />
                      </>
                    )}
                  </View>
                </Pressable>
              </View>
              <Pressable
                style={styles.menuRow}
                onPress={() => {
                  setMenuOpen(false)
                  onLogout().catch(() => {})
                }}
              >
                <Text style={styles.menuText}>{t('auth.logout')}</Text>
                <Ionicons name="log-out-outline" size={px.f(20)} color="#1B6FC2" />
              </Pressable>
            </View>
          )}
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <SectionContainer title="">
            {COMPANIES.map((c) => (
              <Pressable key={c.name} onPress={() => onPress(c)} style={{ marginBottom: px.v(12) }}>
                <AnimatedCardContainer
                  borderRadius={px.h(14)}
                  backgroundColor={{ dark: '#0F1830', light: '#FFFFFF' }}
                  borderColor={{ dark: 'rgba(255,255,255,0.06)', light: 'rgba(0,0,0,0.06)' }}
                  borderWidth={1}
                  backgroundImageOpacity={lightOn ? 1 : 0.2}
                  backgroundImage={images.buonKuopBg}
                  showGradient={false}
                >
                  <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.company, { color: '#ffffff' }]} numberOfLines={2}>
                        {c.name}
                      </Text>
                      <View style={styles.locationRow}>
                        <Text style={[styles.location, { color: '#E6ECF2' }]}>{c.location}</Text>
                        <Ionicons
                          name="location-outline"
                          size={px.f(16)}
                          color="#FFF"
                          style={{ marginLeft: px.h(6) }}
                        />
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={px.f(25)} color="#FFF" />
                  </View>
                </AnimatedCardContainer>
              </Pressable>
            ))}
          </SectionContainer>
        </ScrollView>
        <View style={{ alignItems: 'center', marginVertical: px.v(16) }}>
          <Text style={{ color: lightOn ? '#111827' : '#fff', fontSize: px.f(13) }}>v{appVersion}</Text>
        </View>
      </SafeAreaView>
    </TwinkleStars>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    paddingHorizontal: px.h(16),
    paddingTop: px.v(12),
    paddingBottom: px.v(28),
  },
  title: {
    fontSize: px.f(18),
    fontWeight: '700',
    marginBottom: px.v(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: px.v(14),
    paddingHorizontal: px.h(12),
  },
  iconWrap: {
    width: px.h(36),
    height: px.h(36),
    borderRadius: px.h(18),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(123,97,240,0.12)',
    marginRight: px.h(12),
  },
  company: {
    fontSize: px.f(20),
    fontWeight: 'bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: px.v(6),
  },
  location: {
    color: '#C7D6E1',
    fontSize: px.m(12),
  },
  header: {
    position: 'absolute',
    top: px.v(8),
    right: px.h(16),
    zIndex: 10,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9,
  },
  menu: {
    position: 'absolute',
    top: px.v(36),
    right: 0,
    minWidth: px.h(190),
    backgroundColor: '#FFFFFF',
    borderRadius: px.h(12),
    paddingVertical: px.v(6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: px.h(12),
    paddingVertical: px.v(10),
    gap: px.h(12),
  },
  menuText: {
    color: '#1B6FC2',
    fontSize: px.f(14),
    fontWeight: '600',
  },
  toggleTrack: {
    width: px.h(48),
    height: px.v(26),
    borderRadius: px.h(13),
    padding: px.h(3),
    justifyContent: 'center',
  },
  toggleInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  toggleThumb: {
    width: px.h(20),
    height: px.h(20),
    borderRadius: px.h(10),
    backgroundColor: '#FFFFFF',
  },
})
