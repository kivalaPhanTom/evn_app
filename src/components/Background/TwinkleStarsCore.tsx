import React, { useEffect, useMemo } from 'react'
import { Dimensions, ImageBackground, ImageSourcePropType, StyleSheet, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

// const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface Star {
  id: number
  x: number
  y: number
  radius: number
  phase: number
  speed: number
}

interface TwinkleProps {
  star: Star
  color: string
}

const Twinkle = React.memo(({ star, color, clock }: {
  star: Star
  color: string
  clock: Animated.SharedValue<number>
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity =
      0.3 +
      0.7 *
      Math.abs(
        Math.sin(clock.value * star.speed + star.phase),
      )

    return { opacity }
  })

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          width: star.radius * 2,
          height: star.radius * 2,
          borderRadius: star.radius,
          backgroundColor: color,
          left: star.x,
          top: star.y,
        },
        animatedStyle,
      ]}
    />
  )
})


Twinkle.displayName = 'Twinkle'

interface TwinkleStarsProps {
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  particleColor?: string
  children?: React.ReactNode
  backgroundImage?: ImageSourcePropType
}

const TwinkleStars: React.FC<TwinkleStarsProps> = ({
  background = 'transparent',
  backgroundImage,
  minSize = 2,
  maxSize = 4,
  particleDensity = 100,
  particleColor = '#FFF',
  children,
}) => {
  const clock = useSharedValue(0)

  useEffect(() => {
    clock.value = withRepeat(
      withTiming(Math.PI * 2, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
      false,
    )
  }, [])

  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: particleDensity }).map((_, i) => ({
      id: i,
      x: Math.random() * SCREEN_WIDTH,
      y: Math.random() * SCREEN_HEIGHT,
      radius: Math.random() * (maxSize - minSize) + minSize,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random(),
    }))
  }, [particleDensity, minSize, maxSize])

  const Wrapper = backgroundImage ? ImageBackground : View

  return (
    <Wrapper
      source={backgroundImage}
      resizeMode="cover"
      style={[styles.container, !backgroundImage && { backgroundColor: background }]}
    >
      <View style={styles.starLayer} pointerEvents="none">
        {stars.map(star => (
          <Twinkle
            key={star.id}
            star={star}
            color={particleColor}
            clock={clock}
          />
        ))}
      </View>

      <View style={styles.content}>{children}</View>
    </Wrapper>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  content: {
    flex: 1,
  },
  starLayer: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default TwinkleStars
