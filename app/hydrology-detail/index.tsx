import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { Animated, ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native'
import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import GradientText from '@/components/GradientText/GradientText.component'
import { Colors } from '@/core/constants/colors'
import { px } from '@/core/utils/scale'
import HydrologyDetail from '@/features/home/components/Hydrology/HydrologyDetail/HydrologyDetail'
import { setCountRefesh } from '@/core/redux/domains/hydrology'
import { useLocalSearchParams } from 'expo-router'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { textGradients } from '@/core/constants/gradients'

const HydrologyDetailScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const { countRefesh } = useAppSelector((state: any) => state.hydrologySlice)
  const { currentPlantId } = useLocalSearchParams<{
    currentPlantId?: string
  }>()
  const onRefresh = async () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      dispatch(
        setCountRefesh({
          countRefesh: countRefesh + 1,
        }),
      )
    }, 80)
  }
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false },
      )}
      scrollEventThrottle={16}
    >
      <TwinkleStars
        background={isDark ? Colors.background : Colors.lightBackground}
        particleDensity={50}
        particleColor={Colors.textColor}
        minSize={0.5}
        maxSize={2}
      >
        <View style={styles.header}>
          <GradientText
            text={'Chi tiết Thủy văn'}
            colors={textGradients.water}
            fontSize={px.f(30)}
            style={{ textAlign: 'center' }}
          />
          <View style={styles.locationRow}>
            <Text style={[styles.locationText, { color: isDark ? '#C7D6E1' : '#6B7280' }]}>{'Công ty thủy điện Buôn Kuốp'}</Text>
          </View>
        </View>
        <HydrologyDetail scrollY={scrollY} currentPlantId={currentPlantId} />
      </TwinkleStars>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: px.v(20),
    paddingBottom: px.v(10),
  },
  locationRow: {
    alignItems: 'center',
    marginTop: px.v(8),
  },
  locationText: {
    color: '#9CA3AF',
    fontSize: px.m(14),
  },
})

export default HydrologyDetailScreen
