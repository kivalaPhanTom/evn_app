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
import React, { useMemo, useRef } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const COMPANIES = [{ name: 'CÔNG TY THỦY ĐIỆN BUÔN KUỐP', location: 'Đắk Lắk, Việt Nam' }]

export default function CompaniesScreen() {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const router = useRouter()
  const onPress = (c: any) => {
    router.navigate({ pathname: '/home', params: { companyName: c.name, location: c.location } })
  };
  return (
    <TwinkleStars background={Colors.background} particleDensity={50} particleColor={Colors.textColor} minSize={0.5} maxSize={2}>
      <SafeAreaView style={styles.flex} edges={['top']}>
        <ScrollView contentContainerStyle={styles.container}>
          <SectionContainer title='Danh sách công ty'>
            {COMPANIES.map((c) => (
              <Pressable
                key={c.name}
                onPress={() => onPress(c)}
                style={{ marginBottom: px.v(12) }}
              >
                <AnimatedCardContainer
                  borderRadius={px.h(14)}
                  backgroundColor={{ dark: '#0F1830', light: '#FFFFFF' }}
                  borderColor={{ dark: 'rgba(255,255,255,0.06)', light: 'rgba(0,0,0,0.06)' }}
                  borderWidth={1}
                  backgroundImageOpacity={0.2}
                  backgroundImage={images.buonKuopBg}
                  showGradient={false}
                >
                  <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.company, { color: isDark ? '#ffffff' : '#111827' }]} numberOfLines={2}>
                        {c.name}
                      </Text>
                      <View style={styles.locationRow}>
                        <Text style={[styles.location, { color: isDark ? '#E6ECF2' : '#111827' }]}>{c.location}</Text>
                        <Ionicons name="location-outline" size={px.f(16)} color="#FFF" style={{ marginLeft: px.h(6) }} />
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={px.f(25)} color={isDark ? '#FFF' : '#6B7280'} />
                  </View>
                </AnimatedCardContainer>
              </Pressable>
            ))}
          </SectionContainer>
        </ScrollView>
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
})
