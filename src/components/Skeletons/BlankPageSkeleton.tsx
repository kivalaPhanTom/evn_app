import React from "react";
import { View, StyleSheet } from "react-native";
import TwinkleStars from "../Background/TwinkleStarsCore";
import { Colors } from '@/core/constants/colors';

interface SquareSkeletonProps {
    count?: number;
    size?: number;
}

export const BlankPageSkeleton = ({
    count = 4,
    size = 75,
}: SquareSkeletonProps) => {
    return (
        <TwinkleStars background={Colors.background} particleDensity={50} particleColor={Colors.textColor} minSize={0.5} maxSize={2}>
            <View style={styles.row}>
            </View>
        </TwinkleStars>

    );
};
export default BlankPageSkeleton

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
