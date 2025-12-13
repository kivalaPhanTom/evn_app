import React, { FC } from "react";
import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { StyleProp, ViewStyle } from "react-native";
import { DimensionValue } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
const BackgroundColor = "rgba(255,255,255,0.15)";

interface ShimmerProps {
    style?: StyleProp<ViewStyle>;
}

const Shimmer: FC<ShimmerProps> = ({ style }) => {
    return (
        <ShimmerPlaceHolder
            shimmerColors={["#3A3F47", "#575E68", "#3A3F47"]}
            duration={1400}
            LinearGradient={LinearGradient}
            style={[styles.skeletonBlock, style]}
        />
    );
};
interface BarSkeletonProps {
    width?:DimensionValue;
    height?: number;
    marginBottom?: number;
}
function BarSkeleton({
    width = 120,
    height = 50,
    marginBottom = 7,
}: BarSkeletonProps) {
    // const opacity = useRef(new Animated.Value(0.4)).current;

    // useEffect(() => {
    //     opacity.setValue(0.7);

    //     Animated.loop(
    //         Animated.sequence([
    //             Animated.timing(opacity, {
    //                 toValue: 1,
    //                 duration: 600,
    //                 easing: Easing.inOut(Easing.quad),
    //                 useNativeDriver: true,
    //             }),
    //             Animated.timing(opacity, {
    //                 toValue: 0.4,
    //                 duration: 600,
    //                 easing: Easing.inOut(Easing.quad),
    //                 useNativeDriver: true,
    //             }),
    //         ])
    //     ).start();
    // }, []);

    // return (
    //     <Animated.View style={[styles.bigBlock, { opacity }]} />
    // );
    return (
        <View style={styles.row}>
            <View style={{ flex: 1, marginTop: 5 }}>
                <Shimmer style={{ flex: 1, width: width, height: height, marginBottom: marginBottom }} />
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
        // marginTop: 15
    },
    bigBlock: {
        width: "95%",
        height: 50,
        borderRadius: 10,
        backgroundColor: BackgroundColor,
    },
    skeletonBlock: {
        borderRadius: 7,
    },
});
