import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface SquareSkeletonProps {
  count?: number;
  size?: number;
}

const Square = ({ size }: { size: number }) => {
  const translateX = useRef(new Animated.Value(-size)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: size,
        duration: 2200, // chậm, rất sang
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [size]);

  return (
    <View style={[styles.square, { width: size, height: size }]}>
      {/* nền */}
      <View style={styles.base} />

      {/* vệt sáng bao trùm */}
      <Animated.View
        style={[
          styles.lightWrap,
          { transform: [{ translateX }] },
        ]}
      >
        <LinearGradient
          colors={[
            "rgba(255,255,255,0.00)",
            "rgba(255,255,255,0.06)",
            "rgba(255,255,255,0.18)", // tâm sáng
            "rgba(255,255,255,0.06)",
            "rgba(255,255,255,0.00)",
          ]}
          locations={[0, 0.25, 0.5, 0.75, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.light}
        />
      </Animated.View>
    </View>
  );
};

export const SquareSkeleton = ({
  count = 4,
  size = 75,
}: SquareSkeletonProps) => {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, i) => (
        <Square key={i} size={size} />
      ))}
    </View>
  );
};
export default SquareSkeleton

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },

  square: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#0F1726",
  },

  base: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.045)",
  },

  lightWrap: {
    position: "absolute",
    top: 0,
    bottom: 0,          // 👈 bao trùm full chiều cao
    width: "140%",      // 👈 rộng hơn card → ánh sáng lan
  },

  light: {
    flex: 1,
  },
});
