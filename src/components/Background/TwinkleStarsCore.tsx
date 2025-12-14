import React, { useEffect, useMemo } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface Star {
  id: number
  x: number
  y: number
  radius: number
  delay: number
  duration: number
}

interface TwinkleProps {
  star: Star
  color: string
}

const Twinkle: React.FC<TwinkleProps> = React.memo(({ star, color }) => {
  const opacity = useSharedValue(0)

  useEffect(() => {
    // Chỉ dùng opacity animation, bỏ scale để tối ưu performance
    opacity.value = withDelay(
      star.delay,
      withRepeat(
        withSequence(
          withTiming(1, {
            duration: star.duration,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0.3, {
            duration: star.duration,
            easing: Easing.inOut(Easing.ease),
          }),
        ),
        -1,
        false,
      ),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [star.delay, star.duration])

  const animatedProps = useAnimatedProps(() => {
    return {
      opacity: opacity.value,
    }
  })

  return <AnimatedCircle cx={star.x} cy={star.y} r={star.radius} fill={color} animatedProps={animatedProps} />
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
}

const TwinkleStars: React.FC<TwinkleStarsProps> = ({
  background = 'transparent',
  minSize = 2,
  maxSize = 4,
  particleDensity = 100,
  particleColor = '#FFFFFF',
  children,
}) => {
  const stars = useMemo(() => {
    const starArray: Star[] = []
    for (let i = 0; i < particleDensity; i++) {
      starArray.push({
        id: i,
        x: Math.random() * SCREEN_WIDTH,
        y: Math.random() * SCREEN_HEIGHT,
        radius: Math.random() * (maxSize - minSize) + minSize,
        delay: Math.random() * 2000, // Delay ngẫu nhiên để không nhấp nháy cùng lúc
        duration: 800 + Math.random() * 1200, // Thời gian nhấp nháy từ 800-2000ms
      })
    }
    return starArray
  }, [particleDensity, minSize, maxSize])

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      {/* <Svg style={styles.svg} width={SCREEN_WIDTH} height={SCREEN_HEIGHT} pointerEvents="none">
        {stars.map((star) => (
          <Twinkle key={star.id} star={star} color={particleColor} />
        ))}
      </Svg> */}
      <View style={styles.content}>{children}</View>
    </View>
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
  },
  content: {
    flex: 1,
  },
})

export default TwinkleStars
