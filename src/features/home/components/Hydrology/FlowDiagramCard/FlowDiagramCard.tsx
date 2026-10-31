import { hydrologyLight as light, hydrologyDark as dark } from '@/core/constants/hydrologyPalette'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import FlowDiagram from '@/components/FlowDiagram/FlowDiagram'
import { getHydrologyflowChart } from '@/core/redux/domains/hydrology'
import { useAppTheme } from '@/core/hooks/use-app-theme'


interface flowDiagramCardProps {
    dateStr: string
    currentPlantId: string
    oneYearAgo: string
}
function FlowDiagramCard(props: flowDiagramCardProps) {
    const { dateStr, currentPlantId, oneYearAgo} = props
    const dispatch = useAppDispatch();
    const scheme = useAppTheme()
    const isDark = scheme === 'dark'
    const styles = createStyles(isDark)
    const { countRefesh, isLoadingFlowChart } = useAppSelector((state: any) => state.hydrologySlice)
    const { flowChart, flowChartSummary } = useAppSelector((state: any) => state.hydrologySlice)
    useEffect(() => {
        const payload = {
            date: dateStr,
            currentPlantId
        }
        dispatch(getHydrologyflowChart(payload))
    }, [dateStr, currentPlantId, countRefesh])

    return (
        <AnimatedCardContainer noneBackground={!isDark} borderColor={isDark ? undefined : light.border}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{"Sơ đồ dòng chảy"}</Text>
                    <Text style={styles.ck}>{`CK = Cùng kỳ năm ngoái (${oneYearAgo})`}</Text>
                </View>
                <View style={styles.flowDiagramDetail}>
                    <FlowDiagram
                        data={flowChart}
                        isLoading={isLoadingFlowChart}
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
const createStyles = (isDark: boolean) => StyleSheet.create({
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
        color: isDark ? dark.diagram.title : light.text,
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 4,
    },
    ck: {
        textAlign: 'center',
        marginTop: 10,
        color: isDark ? dark.diagram.caption : light.muted,      // màu xám nhạt giống hình
        fontStyle: "italic",   // chữ nghiêng
        fontSize: 14,
    },
    container: {
        paddingTop: 20,
    },
    line: {
        height: 1,
        backgroundColor: isDark ? dark.detail.border : light.border,
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
        backgroundColor: isDark ? dark.inflowTint : light.inflowTint,
        borderColor: isDark ? dark.diagram.summaryInflowBorder : light.border,
    },

    // BOX ĐỎ
    dischargeFlow: {
        backgroundColor: isDark ? dark.outflowTint : light.outflowTint,
        borderColor: isDark ? dark.diagram.summaryOutflowBorder : light.border,
    },

    titleSection: {
        color: isDark ? dark.muted : light.muted,
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 6,
        letterSpacing: 1,
    },

    valueBlue: {
        color: isDark ? dark.diagram.summaryInflow : light.inflow,
        fontSize: 20,
        fontWeight: "700",
    },
    valueRed: {
        color: isDark ? dark.diagram.summaryOutflow : light.outflow,
        fontSize: 20,
        fontWeight: "700",
    },
    unit: {
        fontSize: 12,
        color: isDark ? dark.diagram.unit : light.muted,
    },
})
export default FlowDiagramCard
