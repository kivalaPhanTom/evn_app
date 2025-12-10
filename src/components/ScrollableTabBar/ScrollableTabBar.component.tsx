import React, { useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, ViewStyle } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styles, { TAB_WIDTH } from './ScrollableTabBar.styles'

interface Tab {
  id: string
  label: string
}

interface Props {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  containerStyle?: ViewStyle
}

export default function ScrollableTabBar({ tabs, activeTab, onTabChange, containerStyle }: Props) {
  const scrollViewRef = useRef<ScrollView>(null)
  const isScrollingRef = useRef(false)
  const lastActiveIndexRef = useRef<number>(-1)

  useEffect(() => {
    if (!isScrollingRef.current) {
      const activeIndex = tabs.findIndex((tab) => tab.id === activeTab)
      if (activeIndex !== -1 && scrollViewRef.current) {
        lastActiveIndexRef.current = activeIndex
        scrollViewRef.current.scrollTo({
          x: activeIndex * TAB_WIDTH,
          animated: true,
        })
      }
    }
  }, [activeTab, tabs])

  const handleMomentumScrollEnd = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x
    const currentIndex = Math.round(scrollX / TAB_WIDTH)
    
    if (currentIndex >= 0 && currentIndex < tabs.length) {
      const newActiveTab = tabs[currentIndex].id
      if (newActiveTab !== activeTab) {
        lastActiveIndexRef.current = currentIndex
        onTabChange(newActiveTab)
      }
    }
    isScrollingRef.current = false
  }

  const handleScrollBeginDrag = () => {
    isScrollingRef.current = true
  }

  const handleScroll = (event: any) => {
    // Chỉ track vị trí scroll, không cập nhật activeTab ngay
    // Để tránh bỏ qua tab khi scroll nhanh
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.tabBarContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={TAB_WIDTH}
          snapToAlignment="start"
          decelerationRate="fast"
          contentContainerStyle={[
            styles.scrollContent,
            { width: TAB_WIDTH * tabs.length },
          ]}
          style={styles.scrollView}
          onScroll={handleScroll}
          onScrollBeginDrag={handleScrollBeginDrag}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          bounces={false}
          scrollEnabled={true}
        >
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeTab
            const isFirst = index === 0
            const isLast = index === tabs.length - 1
            
            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  {
                    width: TAB_WIDTH,
                  },
                  isFirst && styles.tabFirst,
                  isLast && styles.tabLast,
                ]}
                onPress={() => onTabChange(tab.id)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.tabContent,
                    isActive && styles.tabContentActive,
                    isFirst && styles.tabContentFirst,
                    isLast && styles.tabContentLast,
                  ]}
                >
                  <View style={styles.textContainer}>
                    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab.label}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        {/* Left shadow gradient - fixed position */}
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.4)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.shadowGradientLeft}
          pointerEvents="none"
        />
        {/* Right shadow gradient - fixed position */}
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.4)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.shadowGradientRight}
          pointerEvents="none"
        />
      </View>
    </View>
  )
}

