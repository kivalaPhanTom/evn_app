import React, { FC } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
import { StyleProp, ViewStyle } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
const BackgroundColor = "rgba(255,255,255,0.15)"


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
function SkeletonForUnit() {
    // const opacity = useRef(new Animated.Value(0.4)).current;

    // useEffect(() => {
    //     // chạy ngay lập tức frame đầu tiên
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
    //     <Animated.View style={[styles.smallBlock, { opacity }]} />
    // )
    return (
        <View style={styles.row}>
            <View>
                <Shimmer style={{ width: 95, height: 28, marginBottom: 7 }} />
            </View>
        </View>
    )

}

export default SkeletonForUnit
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
         marginTop: 10
    },
    smallBlock: {
        marginTop: 12,
        width: "80%",
        height: 35,
        borderRadius: 6,
        backgroundColor: BackgroundColor,
    },
    skeletonBlock: {
        borderRadius: 7,
    },
});
