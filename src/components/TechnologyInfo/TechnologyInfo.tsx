import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ScrollableTabBar from '@/components/ScrollableTabBar/ScrollableTabBar.component'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { dashboardCommonStyles } from '@/core/styles/sharedStyles'
import GradientText from '@/components/GradientText/GradientText.component'
import { px } from '@/core/utils/scale'
import { lightGradients, textGradients } from '@/core/constants/gradients'
import GradientProgress from '@/components/GradientProgress/GradientProgress.component'
import BarChart from '@/components/BarChart/BarChart.component'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import { BarGroup } from '@/core/types'
import BarSkeleton from '../Skeletons/BarSkeleton'


type InfoItem = {
    label: string;
    value: string;
};

interface Props {
    data: InfoItem[];
    isLoading: boolean;
}
function TechnologyInfo(props: Props) {
    const [firstLoading, setFirstLoading] = useState(true)
    const { data, isLoading } = props
    useEffect(() => {
        setFirstLoading(true)
    }, [])

    useEffect(() => {
        if (!isLoading) {
            setFirstLoading(false)
        }
    }, [isLoading])
    return (
        <AnimatedCardContainer>
            <View>
                {
                    firstLoading || isLoading ?
                        <>
                            <BarSkeleton width={'100%'} height={30} />
                            <BarSkeleton width={'100%'} height={30} />
                            <BarSkeleton width={'100%'} height={30} />
                            <BarSkeleton width={'100%'} height={30} />
                            <BarSkeleton width={'100%'} height={30} />
                            <BarSkeleton width={'100%'} height={30} />
                        </> :
                        <>
                            {data.map((item, index) => (
                                <View key={index}>
                                    <View style={styles.row}>
                                        <Text style={styles.label} numberOfLines={0}>
                                            {item.label}
                                        </Text>
                                        <Text style={styles.value} numberOfLines={0}>
                                            {item.value}
                                        </Text>
                                    </View>
                                    {index < data.length - 1 && <View style={styles.divider} />}
                                </View>
                            ))}
                        </>
                }
            </View>
        </AnimatedCardContainer >
    )
}

export default TechnologyInfo
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "flex-start", // QUAN TRỌNG
        paddingVertical: 12,
    },
    label: {
        color: "#d6d9ff",
        fontSize: 14,
        flex: 1,              // chiếm 1 phần
        flexWrap: "wrap",     // cho phép xuống dòng
        paddingRight: 8,
    },
    value: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "600",
        flex: 1,              // chiếm 1 phần
        flexWrap: "wrap",     // cho phép xuống dòng
        textAlign: "right",   // giữ align phải
    },
    divider: {
        height: 1,
        backgroundColor: "rgba(255,255,255,0.15)",
    },
})
