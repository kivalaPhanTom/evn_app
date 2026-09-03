import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'

/** Full-page blank skeleton used for lazy section placeholders. */
export default function BlankPageSkeleton() {
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(progress, { toValue: 0, duration: 800, useNativeDriver: true }),
      ]),
    ).start()
  }, [progress])

  const opacity = progress.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.block, styles.large, { opacity }]} />
      <Animated.View style={[styles.row, { opacity }]}>
        <View style={[styles.block, styles.small]} />
        <View style={[styles.block, styles.small]} />
      </Animated.View>
      <Animated.View style={[styles.block, styles.medium, { opacity }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  block: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 12 },
  large: { height: 200, marginBottom: 16 },
  medium: { height: 120 },
  row: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  small: { flex: 1, height: 90 },
})
