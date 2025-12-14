import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, {
  Path,
  LinearGradient as SvgLinearGradient,
  Stop,
  Mask,
  Rect,
} from 'react-native-svg';

/* ================= CONFIG ================= */

const SHIMMER_BASE_COLOR = '#3A3F47';
const SHIMMER_HIGHLIGHT_COLOR = '#6F8196';

const DURATION = 2500;
const CHART_HEIGHT = 200;
const BAR_WIDTH = 35;

/* ================= SHIMMER BAR ================= */

interface ShimmerBlockProps {
  style: StyleProp<ViewStyle>;
  barWidth: number;
}

const ShimmerBlock: React.FC<ShimmerBlockProps> = ({ style, barWidth }) => {
  const translateX = useSharedValue(-barWidth);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(barWidth, {
        duration: DURATION,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [barWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.blockContainer, style]}>
      {/* nền */}
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: SHIMMER_BASE_COLOR },
        ]}
      />

      {/* shimmer */}
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={[
            SHIMMER_BASE_COLOR,
            SHIMMER_BASE_COLOR,
            SHIMMER_HIGHLIGHT_COLOR,
            SHIMMER_BASE_COLOR,
            SHIMMER_BASE_COLOR,
          ]}
          locations={[0, 0.42, 0.5, 0.58, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: barWidth * 2.5,
          }}
        />
      </Animated.View>
    </View>
  );
};

/* ================= LINE CHART ================= */

interface ShimmerLineChartProps {
  width: number;
}

const ShimmerLineChart: React.FC<ShimmerLineChartProps> = ({ width }) => {
  const points = [
    { x: 0, y: 160 },
    { x: width * 0.2, y: 150 },
    { x: width * 0.4, y: 100 },
    { x: width * 0.6, y: 130 },
    { x: width * 0.8, y: 70 },
    { x: width, y: 50 },
  ];

  const pathData = useMemo(() => {
    let d = `M${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L${points[i].x} ${points[i].y}`;
    }
    return d;
  }, [width]);

  return (
    <View style={styles.lineChartContainer}>
      <Svg width={width} height={CHART_HEIGHT}>
        <Mask id="lineMask">
          <Path d={pathData} fill="none" stroke="#fff" strokeWidth={3} />
        </Mask>

        <SvgLinearGradient id="lineBase" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor={SHIMMER_BASE_COLOR} />
          <Stop offset="100%" stopColor={SHIMMER_BASE_COLOR} />
        </SvgLinearGradient>

        <Rect
          x="0"
          y="0"
          width={width}
          height={CHART_HEIGHT}
          fill="url(#lineBase)"
          mask="url(#lineMask)"
        />
      </Svg>
    </View>
  );
};

/* ================= MAIN ================= */
interface LineBarChartSkeletonProps{
  isShowLine?:boolean
}
const LineBarChartSkeleton: React.FC<LineBarChartSkeletonProps>  = (props) => {
  const {isShowLine = true} = props
  const [chartWidth, setChartWidth] = useState(0);
  const barHeights = ['25%', '35%', '60%', '45%', '75%', '90%'];

  return (
    <View style={styles.container}>
      <View
        style={styles.chartFrame}
        onLayout={(e) => setChartWidth(e.nativeEvent.layout.width)}
      >
        {chartWidth > 0 && isShowLine && <ShimmerLineChart width={chartWidth} />}

        <View style={styles.barContainer}>
          {barHeights.map((height, index) => (
            <ShimmerBlock
              key={index}
              barWidth={BAR_WIDTH}
              style={{
                width: BAR_WIDTH,
                height,
                borderRadius: 4,
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#1F2329',
    padding: 20,
  },
  chartFrame: {
    height: CHART_HEIGHT,
    width: '100%',
    position: 'relative',
  },
  lineChartContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: CHART_HEIGHT,
    zIndex: 1,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  blockContainer: {
    overflow: 'hidden',
    backgroundColor: SHIMMER_BASE_COLOR,
  },
});

export default LineBarChartSkeleton;