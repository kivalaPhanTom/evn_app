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

  useEffect(() => {
    if (!isScrollingRef.current) {
      const activeIndex = tabs.findIndex((tab) => tab.id === activeTab)
      if (activeIndex !== -1 && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: activeIndex * TAB_WIDTH,
          animated: true,
        })
      }
    }
  }, [activeTab, tabs])

  const handleScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x
    const currentIndex = Math.round(scrollX / TAB_WIDTH)
    
    if (currentIndex >= 0 && currentIndex < tabs.length) {
      const newActiveTab = tabs[currentIndex].id
      if (newActiveTab !== activeTab) {
        isScrollingRef.current = true
        onTabChange(newActiveTab)
        setTimeout(() => {
          isScrollingRef.current = false
        }, 100)
      }
    }
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.tabBarContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={TAB_WIDTH}
          decelerationRate="fast"
          contentContainerStyle={[
            styles.scrollContent,
            { width: TAB_WIDTH * tabs.length },
          ]}
          style={styles.scrollView}
          onScroll={handleScroll}
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
                  {isActive && (
                    <>
                      {/* Left shadow gradient */}
                      <LinearGradient
                        // colors={['rgba(79, 156, 255, 0.4)', 'transparent']}
                        colors={['rgba(0, 0, 0, 0.4)', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.shadowGradientLeft}
                        pointerEvents="none"
                      />
                      {/* Right shadow gradient */}
                      <LinearGradient
                        // colors={['transparent', 'rgba(79, 156, 255, 0.4)']}
                        colors={['transparent', 'rgba(0, 0, 0, 0.4)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.shadowGradientRight}
                        pointerEvents="none"
                      />
                    </>
                  )}
                  <View style={styles.textContainer}>
                    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab.label}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    </View>
  )
}

