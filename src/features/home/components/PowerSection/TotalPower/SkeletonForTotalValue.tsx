import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

const BackgroundColor = "rgba(255,255,255,0.15)";

function SkeletonForTotalValue() {
    const opacity = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        opacity.setValue(0.7);

        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: false, // <── FIX QUAN TRỌNG
                }),
                Animated.timing(opacity, {
                    toValue: 0.4,
                    duration: 600,
                    useNativeDriver: false, // <── FIX
                }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View style={[styles.bigBlock, { opacity }]} />
    );
}

export default SkeletonForTotalValue;

const styles = StyleSheet.create({
    bigBlock: {
        width: "95%",
        height: 50,
        borderRadius: 10,
        backgroundColor: BackgroundColor,
    },
});
