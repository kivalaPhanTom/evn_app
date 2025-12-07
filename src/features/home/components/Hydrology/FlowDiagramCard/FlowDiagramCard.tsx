import React from 'react'
import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'
import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import FlowDiagram from '@/components/FlowDiagram/FlowDiagram'


function FlowDiagramCard() {


    return (
        <AnimatedCardContainer>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>{"Sơ đồ dòng chảy"}</Text>
                    {/* <View style={styles.headerTop}>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                        <TouchableOpacity onPress={onPressCard} style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Thêm chi tiết</Text>
                            <Text style={styles.actionButtonIcon}>{'>'}</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
                <View style={styles.flowDiagramDetail}>
                    <FlowDiagram />
                </View>



            </View>
        </AnimatedCardContainer>
    )
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        padding: 24,
        minHeight: 340,
        position: 'relative',
        overflow: 'hidden',
    },
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
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: '#e8eaed',
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 4,
    },
    subtitle: {
        color: '#7a8596',
        fontSize: 13,
        fontWeight: '400',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    actionButtonText: {
        color: '#9CA3AF',
        fontSize: 13,
    },
    actionButtonIcon: {
        color: '#9CA3AF',
        fontSize: 13,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    statItem: {
        flex: 1,
    },
    statLabel: {
        color: '#7a8596',
        fontSize: 11,
        fontWeight: '600',
        // marginBottom: ,
        letterSpacing: 0.5,
    },
    statValueCurrent: {
        color: '#5b8def',
        fontSize: 24,
        fontWeight: '700',
        // marginBottom: 6,
    },
    statValueAverage: {
        color: '#eab308',
        fontSize: 24,
        fontWeight: '700',
    },
    changeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    changeText: {
        color: '#ef4444',
        fontSize: 13,
        fontWeight: '600',
    },
    changePositive: {
        color: '#4ade80',
    },
    chartContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    unitLabel: {
        color: '#7a8596',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 8,
    },
    chartWrapper: {
        marginTop: px.v(8),
        marginBottom: px.v(12),
        marginLeft: px.h(-12),
        width: '100%',
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
})
export default FlowDiagramCard
