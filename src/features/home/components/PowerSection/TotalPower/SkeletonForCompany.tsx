import { View, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";

const BackgroundColor = "rgba(255,255,255,0.15)"
function SkeletonForCompany() {
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
        <View>
            <View style={styles.bottomRow}>
                <Animated.View style={[styles.dot, { opacity }]} />
                <Animated.View style={[styles.lineSmall, { opacity }]} />
            </View>

            <View style={styles.bottomRow}>
                <Animated.View style={[styles.dot, { opacity }]} />
                <Animated.View style={[styles.lineSmall, { opacity }]} />
            </View>

            <View style={styles.bottomRow}>
                <Animated.View style={[styles.dot, { opacity }]} />
                <Animated.View style={[styles.lineSmall, { opacity }]} />
            </View>
        </View>
    )
}

export default SkeletonForCompany
const styles = StyleSheet.create({
    bottomRow: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: BackgroundColor,
    },
    lineSmall: {
        height: 12,
        width: "90%",
        borderRadius: 6,
        backgroundColor: BackgroundColor,
    },
});
