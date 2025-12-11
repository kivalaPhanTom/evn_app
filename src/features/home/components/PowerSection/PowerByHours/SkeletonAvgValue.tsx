import React, { FC } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

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
function SkeletonAvgValue() {

    return (
        <View style={styles.row}>
            <View>
                <Shimmer style={{ width: 95, height: 28, marginBottom: 6 }} />
            </View>
        </View>
    )
}

export default SkeletonAvgValue
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
         marginTop: 15
    },

    skeletonBlock: {
        borderRadius: 7,
    },
});
