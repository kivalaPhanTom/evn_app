import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'

const BOX_SIZE = 100
const GAP = 12
const COLOR = 'rgba(255,255,255,0.10)'

export default function GridSquareSkeleton() {
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }, [])

  const getScale = (phase: number) =>
    progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange:
        phase === 0
          ? [1.05, 0.85, 1.05]
          : [0.85, 1.05, 0.85],
    })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, { transform: [{ scale: getScale(0) }] }]} />
      <Animated.View style={[styles.box, { transform: [{ scale: getScale(1) }] }]} />
      <Animated.View style={[styles.box, { transform: [{ scale: getScale(1) }] }]} />
      <Animated.View style={[styles.box, { transform: [{ scale: getScale(0) }] }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: BOX_SIZE * 2 + GAP,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: COLOR,
    borderRadius: 12,
  },
})
