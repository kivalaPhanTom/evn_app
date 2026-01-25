import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const CHART_HEIGHT = 180;
const BASE_COLOR = '#3A3F47';
const HIGHLIGHT_COLOR = '#6F8196';
const DURATION = 2200;

export const LineChartSkeleton = () => {
  const translateX = useSharedValue(-320);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(320, {
        duration: DURATION,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: 0.6,
  }));

  return (
    <View style={styles.container}>
      {/* ===== AREA CHART (HIỆN NGAY) ===== */}
      <Svg
        width="100%"
        height={CHART_HEIGHT}
        viewBox="0 0 320 180"
        preserveAspectRatio="none"
        style={StyleSheet.absoluteFill}
      >
        <Path
          d="
            M 0 180
            L 0 130
            L 48 100
            L 96 110
            L 144 80
            L 192 95
            L 240 65
            L 288 55
            L 320 45
            L 320 180
            Z
          "
          fill={BASE_COLOR}
        />
      </Svg>

      {/* ===== SHIMMER ===== */}
      <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
        <LinearGradient
          colors={['transparent', HIGHLIGHT_COLOR, 'transparent']}
          locations={[0.45, 0.5, 0.55]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: 640,
            height: CHART_HEIGHT,
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: CHART_HEIGHT,
    backgroundColor: '#1F2329',
    borderRadius: 12,
    overflow: 'hidden',
  },
});
