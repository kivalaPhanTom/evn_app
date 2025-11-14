import React, { useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedProps,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Star {
  id: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
  velocity: number;
}

interface SparkleProps {
  star: Star;
  color: string;
}

const Sparkle: React.FC<SparkleProps> = ({ star, color }) => {
  const cy = useSharedValue(star.y);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    // Animate upward movement
    cy.value = withRepeat(
      withTiming(-50 - Math.random() * 100, {
        // CHANGED: Bay lên đến -50 đến -150 (ra khỏi màn hình phía trên)
        duration: 5000 + Math.random() * 3000, // CHANGED: Tăng thời gian từ 3000-5000ms lên 5000-8000ms để bay chậm và đều hơn
        easing: Easing.linear,
      }),
      -1,
      false
    );

    // Opacity animation (fade in and out)
    opacity.value = withDelay(
      Math.random() * 1000,
      withRepeat(
        withTiming(star.opacity, {
          duration: 1000 + Math.random() * 1000,
          easing: Easing.ease,
        }),
        -1,
        true
      )
    );

    // Scale animation (pulse effect)
    scale.value = withDelay(
      Math.random() * 500,
      withRepeat(
        withTiming(1, {
          duration: 800 + Math.random() * 700,
          easing: Easing.ease,
        }),
        -1,
        true
      )
    );
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return {
      cy: cy.value,
      opacity: opacity.value,
      r: star.radius * scale.value,
    };
  });

  return <AnimatedCircle cx={star.x} fill={color} animatedProps={animatedProps} />;
};

interface SparklesCoreProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  children?: React.ReactNode;
}

const SparklesCore: React.FC<SparklesCoreProps> = ({
  background = 'transparent',
  minSize = 3,
  maxSize = 3,
  particleDensity = 100,
  // particleColor = '#f4f5f0', // OLD: Màu trắng ngà hơi tối
  particleColor = '#FFFFFF', // CHANGED: Đổi sang màu trắng tinh sáng hơn
  children,
}) => {
  const stars = useMemo(() => {
    const starArray: Star[] = [];
    for (let i = 0; i < particleDensity; i++) {
      starArray.push({
        id: i,
        x: Math.random() * SCREEN_WIDTH,
        // y: SCREEN_HEIGHT + Math.random() * SCREEN_HEIGHT,
        y: SCREEN_HEIGHT + Math.random() * SCREEN_HEIGHT,
        radius: Math.random() * (maxSize - minSize) + minSize,
        opacity: Math.random() * 0.5 + 0.5,
        velocity: Math.random() * 1 + 0.5,
      });
    }
    return starArray;
  }, [particleDensity, minSize, maxSize]);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Svg style={styles.svg} width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
        {stars.map((star) => (
          <Sparkle key={star.id} star={star} color={particleColor} />
        ))}
      </Svg>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

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
});

export default SparklesCore;
