import React, { FC, useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing, DimensionValue, StyleProp, ViewStyle } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@/core/hooks/use-app-theme";
import { createThemePalette } from "@/core/constants/themePalette";

interface ShimmerProps {
    style?: StyleProp<ViewStyle>;
}

const Shimmer: FC<ShimmerProps> = ({ style }) => {
    const colors = createThemePalette(useAppTheme() === 'dark');
    return (
        <ShimmerPlaceHolder
            shimmerColors={[colors.skeletonBase, colors.skeletonHighlight, colors.skeletonBase]}
            duration={1400}
            LinearGradient={LinearGradient}
            style={[styles.skeletonBlock, style]}
        />
    );
};
interface BarSkeletonProps {
    width?: DimensionValue;
    height?: number;
    marginBottom?: number;
    marginTop?: number;
    alignSelf?: ViewStyle["alignSelf"];
}
function BarSkeleton({
    width = 120,
    height = 50,
    marginBottom = 7,
    marginTop = 5,
    alignSelf
}: BarSkeletonProps) {
    return (
        <View style={styles.row}>
            <View style={{ flex: 1, marginTop: marginTop }}>
                <Shimmer
                    style={[
                        {
                            width,
                            height,
                            marginBottom,
                        },
                        alignSelf ? { alignSelf } : null,
                    ]}
                />
            </View>
        </View>
    )
}

export default BarSkeleton;

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
    },
    bigBlock: {
        width: "95%",
        height: 50,
        borderRadius: 10,
    },
    skeletonBlock: {
        borderRadius: 7,
    },
});
