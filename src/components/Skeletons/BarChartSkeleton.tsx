import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface BarChartSkeletonProps {
  barCount?: number;
  height?: number;
}

const BarChartSkeleton = ({
  barCount = 6,
  height = 160,
}: BarChartSkeletonProps) => {
  const translateX = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 200,
        duration: 2200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View style={[styles.container, { height }]}>
      {/* GRID LINES */}
      <View style={styles.grid}>
        {[...Array(4)].map((_, i) => (
          <View key={i} style={styles.gridLine} />
        ))}
      </View>

      {/* BARS */}
      <View style={styles.barRow}>
        {[...Array(barCount)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.bar,
              { height: 40 + i * 15 }, // fake data cho giống ảnh
            ]}
          />
        ))}
      </View>

      {/* SHIMMER SWEEP (PHỦ TOÀN CHART) */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.shimmerWrap,
          { transform: [{ translateX }] },
        ]}
      >
        <LinearGradient
          colors={[
            "transparent",
            "rgba(255,255,255,0.10)",
            "rgba(255,255,255,0.20)",
            "rgba(255,255,255,0.10)",
            "transparent",
          ]}
          locations={[0, 0.35, 0.5, 0.65, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};
export default BarChartSkeleton;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0F1726",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 14,
    overflow: "hidden",
  },

  grid: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    paddingVertical: 16,
  },

  gridLine: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  barRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: "100%",
    gap: 14,
  },

  bar: {
    width: 22,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.10)",
  },

  shimmerWrap: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "140%",
  },
});
