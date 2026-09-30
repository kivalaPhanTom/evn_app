import React from "react";
import { View, StyleSheet } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@/core/hooks/use-app-theme";
import { createThemePalette } from "@/core/constants/themePalette";

interface Props {
  width1?: string | number;
  width2?: string | number;
  width3?: string | number;
}

export const DotBarSkeleton: React.FC<Props> = ({
  width1 = "80%",
  width2 = "60%",
  width3 = "70%",
}) => {
  const isDark = useAppTheme() === 'dark';
  const styles = createStyles(isDark);
  const colors = createThemePalette(isDark);
  const shimmerColors = [colors.skeletonBase, colors.skeletonHighlight, colors.skeletonBase] as const;

  return (
    <View style={styles.rowContainer}>
      {/* DOT + LINE ROW 1 */}
      <View style={styles.row}>
        <View style={styles.dot} />
        <ShimmerPlaceHolder
          shimmerColors={[...shimmerColors]}
          LinearGradient={LinearGradient}
          style={[styles.line, { width: width1 }]}
        />
      </View>

      {/* DOT + LINE ROW 2 */}
      <View style={styles.row}>
        <View style={styles.dot} />
        <ShimmerPlaceHolder
          shimmerColors={[...shimmerColors]}
          LinearGradient={LinearGradient}
          style={[styles.line, { width: width2 }]}
        />
      </View>

      {/* DOT + LINE ROW 3 */}
      <View style={styles.row}>
        <View style={styles.dot} />
        <ShimmerPlaceHolder
          shimmerColors={[...shimmerColors]}
          LinearGradient={LinearGradient}
          style={[styles.line, { width: width3 }]}
        />
      </View>
    </View>
  );
};
export default DotBarSkeleton

const createStyles = (isDark: boolean) => {
  const p = createThemePalette(isDark)
  return StyleSheet.create({
    rowContainer: {
      paddingVertical: 10,
      gap: 10,
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },

    dot: {
      width: 16,
      height: 16,
      borderRadius: 999,
      backgroundColor: p.skeletonBase,
    },

    line: {
      height: 16,
      borderRadius: 999,
      backgroundColor: p.skeletonBase,
      overflow: 'hidden',
    },
  })
}
