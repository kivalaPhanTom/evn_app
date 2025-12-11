import React from "react";
import { View, StyleSheet } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  width1?: string | number;
  width2?: string | number;
  width3?: string | number;
}

export const SkeletonForCompany: React.FC<Props> = ({
  width1 = "80%",
  width2 = "60%",
  width3 = "70%",
}) => {
  return (
    <View style={styles.rowContainer}>
      {/* DOT + LINE ROW 1 */}
      <View style={styles.row}>
        <View style={styles.dot} />
        <ShimmerPlaceHolder
          shimmerColors={["#3A3F47", "#575E68", "#3A3F47"]}
          LinearGradient={LinearGradient}
          style={[styles.line, { width: width1 }]}
        />
      </View>

      {/* DOT + LINE ROW 2 */}
      <View style={styles.row}>
        <View style={styles.dot} />
        <ShimmerPlaceHolder
          shimmerColors={["#3A3F47", "#575E68", "#3A3F47"]}
          LinearGradient={LinearGradient}
          style={[styles.line, { width: width2 }]}
        />
      </View>

      {/* DOT + LINE ROW 3 */}
      <View style={styles.row}>
        <View style={styles.dot} />
        <ShimmerPlaceHolder
          shimmerColors={["#3A3F47", "#575E68", "#3A3F47"]}
          LinearGradient={LinearGradient}
          style={[styles.line, { width: width3 }]}
        />
      </View>
    </View>
  );
};
export default SkeletonForCompany
const styles = StyleSheet.create({
  rowContainer: {
    // backgroundColor: "#1F242C",  // nền tối giống hình bạn
    paddingVertical: 10,
    gap: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  dot: {
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: "#2D333C", // màu dot giống hình
  },

  line: {
    height: 16,
    borderRadius: 999,
    backgroundColor: "#2D333C",
    overflow: "hidden",
  },
});
