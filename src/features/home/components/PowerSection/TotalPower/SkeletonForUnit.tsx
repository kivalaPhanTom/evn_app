import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

const BackgroundColor = "rgba(255,255,255,0.15)"
function SkeletonForUnit() {
    const opacity = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        // chạy ngay lập tức frame đầu tiên
        opacity.setValue(0.7);

        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.4,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View style={[styles.smallBlock, { opacity }]} />
    )
}

export default SkeletonForUnit
const styles = StyleSheet.create({
    smallBlock: {
        marginTop: 12,
        width: "80%",
        height: 35,
        borderRadius: 6,
        backgroundColor: BackgroundColor,
    },
});
