import React from 'react'
import { View, Text } from 'react-native'
import CommonCard from '@/components/CommonCard/CommonCard'
import styles from './ProductionOutputByHours.styles'


function ProductionOutputByHours() {
    const title = 'Sản lượng theo giờ'
    const subtitle = 'Hôm nay, 14/11/2025'
    const currentValue = 98
    const currentHour = "20H"
    const changePercent = 11.7
    const averageValue = 105
    const hourlyData = [
        { hour: '0h', value: 105 },
        { hour: '1h', value: 120 },
        { hour: '2h', value: 123 },
        { hour: '3h', value: 128 },
    ];
    const unit = 'MWh'
    const chartWidth = 280;
    const chartHeight = 100;
    const maxValue = Math.max(...hourlyData.map(d => d.value));
    const minValue = Math.min(...hourlyData.map(d => d.value));
    const range = maxValue - minValue || 1;

    const pointSpacing = chartWidth / (hourlyData.length - 1);

    const getY = (value: number) => {
        return chartHeight - ((value - minValue) / range) * (chartHeight - 20) - 10;
    };

    const pathData = hourlyData.map((data, index) => {
        const x = index * pointSpacing;
        const y = getY(data.value);
        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');

    // const isPositiveChange = changePercent >= 0;
    const isPositiveChange = false
    return (
        <CommonCard>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Giờ hiện tại ({currentHour})</Text>
                        <Text style={styles.statValueCurrent}>{currentValue} {unit}</Text>
                        <View style={styles.changeRow}>
                            <Text style={[styles.changeText, isPositiveChange && styles.changePositive]}>
                                {isPositiveChange ? '▲' : '▼'} {Math.abs(changePercent)}%
                            </Text>
                        </View>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Hợp đồng (20h)</Text>
                        <Text style={styles.statValueAverage}>{averageValue} {unit}</Text>
                    </View>
                </View>

                {/* Unit Label */}
                <Text style={styles.unitLabel}>Đơn vị: {unit}</Text>
            </View>
        </CommonCard>
    )
}

export default ProductionOutputByHours
