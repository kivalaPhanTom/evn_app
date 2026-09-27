import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@/core/hooks/use-app-theme";

interface SquareSkeletonProps {
  count?: number;
  size?: number;
}

const Square = ({ size, isDark }: { size: number; isDark: boolean }) => {
  const styles = createStyles(isDark);
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
          colors={
            isDark
              ? [
                  "rgba(255,255,255,0.00)",
                  "rgba(255,255,255,0.06)",
                  "rgba(255,255,255,0.18)", // tâm sáng
                  "rgba(255,255,255,0.06)",
                  "rgba(255,255,255,0.00)",
                ]
              : [
                  "rgba(255,255,255,0.00)",
                  "rgba(255,255,255,0.35)",
                  "rgba(255,255,255,0.75)", // tâm sáng
                  "rgba(255,255,255,0.35)",
                  "rgba(255,255,255,0.00)",
                ]
          }
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
  const scheme = useAppTheme();
  const isDark = scheme === 'dark';
  const styles = createStyles(isDark);
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, i) => (
        <Square key={i} size={size} isDark={isDark} />
      ))}
    </View>
  );
};
export default SquareSkeleton

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 12,
    },

    square: {
      borderRadius: 18,
      overflow: 'hidden',
      backgroundColor: isDark ? '#0F1726' : '#ECEDEF',
    },

    base: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: isDark ? 'rgba(255,255,255,0.045)' : 'rgba(255,255,255,0.4)',
    },

    lightWrap: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '140%',
    },

    light: {
      flex: 1,
    },
  });
