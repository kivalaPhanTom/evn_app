import React from 'react'
import { View, Text } from 'react-native'
import CommonCard from '@/components/CommonCard/CommonCard'
import styles from './TotalPower.styles'

function TotalPower() {

    const powerSources = [
        {
            name: 'Buôn Tua Srah',
            code: 'BTS',
            power: 30,
            color: '#fb923c', // Orange
        },
        {
            name: 'Buôn Kuốp',
            code: 'BK',
            power: 54,
            color: '#4ade80', // Green
        },
        {
            name: 'Srepok 3',
            code: 'SPS3',
            power: 42,
            color: '#c084fc', // Purple
        },

    ];
    const totalPower = 126
    const averagePower = 118

    return (
        <CommonCard>
            <View style={styles.content}>
                {/* Left side - Total Power */}
                <View style={styles.leftSection}>
                    <Text style={styles.title}>TỔNG CÔNG SUẤT</Text>
                    <Text style={styles.totalPower}>{totalPower}</Text>
                    <Text style={styles.unit}>MW</Text>
                    <Text style={styles.average}>TB: {averagePower} MW</Text>
                </View>

                {/* Right side - Power Sources */}
                <View style={styles.rightSection}>
                    {powerSources.map((source, index) => (
                        <View key={index} style={styles.sourceItem}>
                            <View style={styles.sourceInfo}>
                                <View style={[styles.dot, { backgroundColor: source.color }]} />
                                <Text style={styles.sourceName}>
                                    {source.name}{' '}
                                    <Text style={styles.sourceCode}>({source.code})</Text>
                                </Text>
                            </View>
                            <Text style={[styles.sourcePower, { color: source.color }]}>
                                {source.power} MW
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </CommonCard>
    )
}

export default TotalPower
