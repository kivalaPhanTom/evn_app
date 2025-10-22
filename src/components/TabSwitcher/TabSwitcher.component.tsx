import { textGradients } from '@/core/constants/gradients'
import { px } from '@/core/utils/scale'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type TabId = 'day' | 'month' | 'year' | string

export function TabSwitcher<T extends TabId>({
  tabs,
  activeTab,
  onTabChange,
  contentAnim,
  durationOut = 140,
  durationIn = 220,
}: {
  tabs: { id: T; label: string }[]
  activeTab: T
  onTabChange: (id: T) => void
  contentAnim?: Animated.Value
  durationOut?: number
  durationIn?: number
}) {
  const handlePress = (id: T) => {
    if (id === activeTab) return
    if (contentAnim) {
      // animate out -> call onTabChange -> animate in
      Animated.timing(contentAnim, {
        toValue: 0,
        duration: durationOut,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start(() => {
        onTabChange(id)
        Animated.timing(contentAnim, {
          toValue: 1,
          duration: durationIn,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start()
      })
    } else {
      onTabChange(id)
    }
  }

  return (
    <View style={styles.segment}>
      {tabs.map((t) => {
        const active = t.id === activeTab
        return (
          <TouchableOpacity
            key={String(t.id)}
            style={{ flex: 1 }}
            onPress={() => handlePress(t.id)}
            activeOpacity={0.9}
          >
            {active ? (
              <LinearGradient
                colors={textGradients.tab}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.segmentItem]}
              >
                <Text style={[styles.segmentText, styles.segmentTextActive]}>{t.label}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.segmentItem}>
                <Text style={styles.segmentText}>{t.label}</Text>
              </View>
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  segment: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: px.v(4),
    borderRadius: px.h(24),
    overflow: 'hidden',
  },
  segmentItem: {
    flex: 1,
    paddingHorizontal: px.h(8),
    paddingVertical: px.v(8),
    borderRadius: px.h(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentText: {
    color: '#A6B0BE',
    fontSize: px.m(12),
    fontWeight: '600',
  },
  segmentTextActive: {
    color: '#FFF',
  },
})
