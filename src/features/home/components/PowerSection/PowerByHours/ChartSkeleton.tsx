import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export const ChartSkeleton = () => {
  const opacity = useRef(new Animated.Value(0.3)).current; // bắt đầu mờ mờ

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.chartWrap}>
      <Animated.View style={{ opacity, width: "100%", height: "100%" }}>
        <Svg width="100%" height="100%">
          <Path
            d="
              M 0 80 
              L 40 78
              L 80 74
              L 120 76
              L 160 70
              L 200 72
              L 240 65
              L 280 60
              L 320 55
            "
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartWrap: {
    width: "100%",
    height: 230,
    backgroundColor: "#1A2433",
    borderRadius: 16,
    overflow: "hidden",
  },
});
