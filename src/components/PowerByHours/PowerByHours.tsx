import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './PowerByHours.styles'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { LineChart } from '@/components/ChartView/LineChart.component'
import { LineChartSkeleton } from '@/components/Skeletons/LineChartSkeleton'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import { Colors } from 'toastify-react-native/config/theme'

interface HourlyPowerList {
    value: number
    label: string
}
interface Props {
    isLoading: boolean
    currentDate: string
    currentPower: number
    currentTime: string
    avgPower: number
    HourlyPowerList: HourlyPowerList[]
    onPressCard:any
}

function PowerByHours(props: Props) {
    const [firstLoading, setFirstLoading] = useState(true)
    const { isLoading, currentDate, currentPower, currentTime, avgPower, HourlyPowerList, onPressCard } = props
    const title = 'Công suất theo giờ'
    const subtitle = 'Hôm nay, ' + currentDate
    const hourlyData = HourlyPowerList ? HourlyPowerList.map((d: any) => ({ ...d })) : []
    const unit = 'MW'
    useEffect(() => {
        setFirstLoading(true)
    }, [])

    useEffect(() => {
        if (!isLoading) {
            setFirstLoading(false)
        }
    }, [isLoading])
    const avgData = Array(hourlyData.length)
        .fill(0)
        .map((item, idx) => ({ value: avgPower, label: idx + 'h', hideDataPoint: true }))

    return (
        <AnimatedCardContainer>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.headerTop}>
                        <Text style={styles.subtitle}>{subtitle}</Text>
                        <TouchableOpacity onPress={onPressCard} style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>Thêm chi tiết</Text>
                            <Text style={styles.actionButtonIcon}>{'>'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>HIỆN TẠI ({currentTime})</Text>
                        {firstLoading || isLoading ?
                            <>
                                <BarSkeleton />
                                <BarSkeleton
                                    width={70}
                                    height={20}
                                    marginBottom={0}
                                />
                            </> :
                            <>
                                <Text style={styles.statValueCurrent}>
                                    {currentPower} {unit}
                                </Text>
                                <View style={styles.changeRow}>
                                    <MetricDiff diff={currentPower} compareTo={avgPower} />
                                </View>
                            </>}
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>TRUNG BÌNH</Text>
                        {firstLoading || isLoading ?
                            <BarSkeleton
                                width={95}
                                height={28}
                            /> :
                            <>
                                <Text style={styles.statValueAverage}>
                                    {avgPower} {unit}
                                </Text>
                            </>}
                    </View>
                </View>
                <View>
                    {firstLoading || isLoading ? <LineChartSkeleton /> : <LineChart
                        data={avgData}
                        data2={hourlyData}
                        color={Colors.orange}
                        color2={Colors.blue}
                        hideDataPoints2={false}
                        hideYAxisText={true}
                        hideDataPoints1={true}
                    />}
                </View>
                {/* Unit Label */}
                <Text style={styles.unitLabel}>Đơn vị: {unit}</Text>
            </View>
        </AnimatedCardContainer>
    )
}

export default PowerByHours
