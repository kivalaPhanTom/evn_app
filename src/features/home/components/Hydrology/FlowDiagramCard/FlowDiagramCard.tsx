import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import FlowDiagram from '@/components/FlowDiagram/FlowDiagram'
import { getHydrologyflowChart } from '@/core/redux/Actions/HydrologyActions'

const BLUE_BG = "rgba(59, 130, 246, 0.10)";     // nền xanh nhạt
const BLUE_BORDER = "rgba(59, 130, 246, 0.45)";

const RED_BG = "rgba(239, 68, 68, 0.10)";        // nền đỏ nhạt
const RED_BORDER = "rgba(239, 68, 68, 0.45)";
interface flowDiagramCardProps {
    dateStr: string
    currentPlantId: string
    oneYearAgo: string
}
function FlowDiagramCard(props: flowDiagramCardProps) {
    const { dateStr, currentPlantId, oneYearAgo} = props
    const dispatch = useDispatch();
    const { countRefesh } = useSelector((state: any) => state.hydrologySlice)
    const { flowChart, flowChartSummary } = useSelector((state: any) => state.hydrologySlice)
    useEffect(() => {
        const payload = {
            date: dateStr,
            currentPlantId
        }
        dispatch(getHydrologyflowChart(payload))
    }, [dateStr, currentPlantId, countRefesh])

    return (
        <AnimatedCardContainer>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{"Sơ đồ dòng chảy"}</Text>
                    <Text style={styles.ck}>{`CK = Cùng kỳ năm ngoái (${oneYearAgo})`}</Text>
                </View>
                <View style={styles.flowDiagramDetail}>
                    <FlowDiagram
                        data={flowChart}
                    />
                </View>
                <View style={styles.container}>
                    {/* Line phía trên */}
                    <View style={styles.line} />

                    <View style={styles.traffic}>

                        {/* BOX XANH */}
                        <View style={[styles.box, styles.inboundTraffic]}>
                            <Text style={styles.titleSection}>LƯU LƯỢNG VỀ</Text>
                            <Text style={styles.valueBlue}>
                                {flowChartSummary.totalInflow} <Text style={styles.unit}>{flowChartSummary.unit}</Text>
                            </Text>
                        </View>

                        {/* BOX ĐỎ */}
                        <View style={[styles.box, styles.dischargeFlow]}>
                            <Text style={styles.titleSection}>LƯU LƯỢNG XẢ</Text>
                            <Text style={styles.valueRed}>
                                {flowChartSummary.totalOutflow} <Text style={styles.unit}>{flowChartSummary.unit}</Text>
                            </Text>
                        </View>

                    </View>
                </View>



            </View>
        </AnimatedCardContainer>
    )
}
const styles = StyleSheet.create({
    flowDiagramDetail: {
        width: '97%',
        marginLeft: "auto",
        marginRight: "auto",
    },
    content: {
        zIndex: 1,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        color: '#e8eaed',
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 4,
    },
    ck: {
        textAlign: 'center',
        marginTop: 10,
        color: "#b7b7b7",      // màu xám nhạt giống hình
        fontStyle: "italic",   // chữ nghiêng
        fontSize: 14,
    },
    container: {
        paddingTop: 20,
    },
    line: {
        height: 1,
        backgroundColor: "rgba(255,255,255,0.1)",
        marginBottom: 15,
    },
    traffic: {
        flexDirection: "row",
        gap: 15,
        width: "95%",
        marginRight: "auto",
        marginLeft: "auto",
    },
    box: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1.5,
    },

    // BOX XANH
    inboundTraffic: {
        backgroundColor: BLUE_BG,
        borderColor: BLUE_BORDER,
    },

    // BOX ĐỎ
    dischargeFlow: {
        backgroundColor: RED_BG,
        borderColor: RED_BORDER,
    },

    titleSection: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 6,
        letterSpacing: 1,
    },

    valueBlue: {
        color: "#3B82F6",
        fontSize: 20,
        fontWeight: "700",
    },
    valueRed: {
        color: "#EF4444",
        fontSize: 20,
        fontWeight: "700",
    },
    unit: {
        fontSize: 12,
        color: "rgba(255,255,255,0.6)",
    },
})
export default FlowDiagramCard
