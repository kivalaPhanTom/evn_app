import React from 'react'
import { View, Text } from 'react-native'
import styles from './CompareDetailStats.styles'

interface StatItemProps {
  title: string
  currentDate: string
  currentValue: number
  compareDate: string
  compareValue: number
  difference?: number
  unit?: string
}

const StatItem: React.FC<StatItemProps> = ({
  title,
  currentDate,
  currentValue,
  compareDate,
  compareValue,
  difference,
  unit = 'MWh'
}) => {
  const calculatedDifference = difference ?? (currentValue - compareValue)
  const isPositive = calculatedDifference >= 0

  return (
    <View style={styles.statCard}>
      <Text style={styles.statTitle}>{title}</Text>

      <View style={styles.statsRow}>
        {/* Current Date Stats */}
        <View style={styles.statColumn}>
          <View style={[styles.dateBadge, styles.currentDateBadge]}>
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
          <Text style={[styles.valueText, styles.currentDateColor]}>
            {currentValue}
            <Text style={styles.unitText}>{unit}</Text>
          </Text>
        </View>

        {/* Compare Date Stats */}
        <View style={styles.statColumn}>
          <View style={[styles.dateBadge, styles.compareDateBadge]}>
            <Text style={styles.dateText}>{compareDate}</Text>
          </View>
          <Text style={[styles.valueText, styles.compareDateColor]}>
            {compareValue}
            <Text style={styles.unitText}>{unit}</Text>
          </Text>
        </View>
      </View>

      {/* Difference Badge */}
      <View style={[styles.differenceBadge, isPositive ? styles.positiveChange : styles.negativeChange]}>
        <Text style={[styles.differenceIcon, isPositive ? styles.positiveColor : styles.negativeColor]}>
          {isPositive ? '↑' : '↓'}
        </Text>
        <Text style={[styles.differenceText, isPositive ? styles.positiveColor : styles.negativeColor]}>
          {isPositive ? '+' : ''}{calculatedDifference} {unit}
        </Text>
      </View>
    </View>
  )
}

interface CompareDetailStatsProps {
  currentDate?: string
  compareDate?: string
}

const CompareDetailStats: React.FC<CompareDetailStatsProps> = ({
  currentDate = '14/11/2024',
  compareDate = '10/11/2023'
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>So sánh chi tiết</Text>

      <StatItem
        title="Trung bình"
        currentDate={currentDate}
        currentValue={5}
        compareDate={compareDate}
        compareValue={98}
      />

      <StatItem
        title="Cao nhất"
        currentDate={currentDate}
        currentValue={118}
        compareDate={compareDate}
        compareValue={108}
      />

      <StatItem
        title="Thấp nhất"
        currentDate={currentDate}
        currentValue={98}
        compareDate={compareDate}
        compareValue={90}
      />
    </View>
  )
}

export default CompareDetailStats
