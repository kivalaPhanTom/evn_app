import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import styles from './TotalPower.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber.component'
import { px } from '@/core/utils/scale'
import GradientText from '@/components/GradientText/GradientText.component'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import DotBarSkeleton from '@/components/Skeletons/DotBarSkeleton'
import { Colors } from '@/core/constants/colors'

interface PowerDetail {
    code: string
    color: string
    name: string
    value: number
}
interface Props {
    total: number
    average: number
    isLoading: boolean
    detail: PowerDetail[]
    title?: string
    unit:string
}
function TotalPower(props: Props) {
    const [firstLoading, setFirstLoading] = useState(true)
    const { total = 0, average = 0, isLoading = false, detail = [], title ="TỔNG CÔNG SUẤT", unit } = props
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
            <View style={styles.content}>
                {/* Left side - Total Power */}
                <View style={styles.leftSection}>

                    {firstLoading || isLoading ? <BarSkeleton /> :
                        <>
                            <Text style={styles.title}>{title}</Text>
                            <AnimatedNumber
                                value={total}
                                isInitZero={true}
                                duration={1}
                                decimals={2}
                                formatter={(n) => Number(n.toFixed(2)).toString()}
                                render={(text) => <GradientText text={text} fontSize={px.f(64)} colors={Colors.blue} />}
                            />
                        </>
                    }

                    {firstLoading || isLoading ?
                        <BarSkeleton
                            width={95}
                            height={28}
                        /> :
                        <>
                            <Text style={styles.unit}>{unit}</Text>
                            <Text style={styles.average}>TB: {average} {unit}</Text>
                        </>
                    }
                </View>

                {/* Right side - Power Sources */}
                <View style={styles.rightSection}>
                    {firstLoading || isLoading ?
                        <>
                            <DotBarSkeleton />
                        </> : <>
                            {detail.map((source, index) => (
                                <View key={index} style={styles.sourceItem}>
                                    <View style={styles.sourceInfo}>
                                        <View style={[styles.dot, { backgroundColor: source.color }]} />
                                        <Text style={styles.sourceName}>
                                            {source.name} <Text style={styles.sourceCode}>({source.code})</Text>
                                        </Text>
                                    </View>
                                    <Text style={[styles.sourcePower, { color: source.color }]}>{source.value} {unit}</Text>
                                </View>
                            ))}
                        </>}
                </View>
            </View>
        </AnimatedCardContainer>
    )
}

export default TotalPower
