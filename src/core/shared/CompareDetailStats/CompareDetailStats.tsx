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
  unit = 'MWh',
}) => {
  const calculatedDifference = difference ?? currentValue - compareValue
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
          {isPositive ? '+' : ''}
          {calculatedDifference} {unit}
        </Text>
      </View>
    </View>
  )
}

interface ISummary {
  average: {
    target: {
      date: string
      value: number
      unit: string
    }
    compare: {
      date: string
      value: number
      unit: string
    }
  }
  max: {
    target: {
      date: string
      value: number
      unit: string
    }
    compare: {
      date: string
      value: number
      unit: string
    }
  }
  min: {
    target: {
      date: string
      value: number
      unit: string
    }
    compare: {
      date: string
      value: number
      unit: string
    }
  }
}

interface CompareDetailStatsProps {
  summary?: ISummary
}

const CompareDetailStats: React.FC<CompareDetailStatsProps> = ({ summary }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>So sánh chi tiết</Text>

      <StatItem
        title="Trung bình"
        currentDate={summary?.average.target.date || ''}
        currentValue={Number(summary?.average.target.value.toFixed(2)) || 0}
        compareDate={summary?.average.compare.date || ''}
        compareValue={Number(summary?.average.compare.value.toFixed(2)) || 0}
        unit={summary?.average.target.unit || 'MWh'}
      />

      <StatItem
        title="Cao nhất"
        currentDate={summary?.max.target.date || ''}
        currentValue={Number(summary?.max.target.value.toFixed(2)) || 0}
        compareDate={summary?.max.compare.date || ''}
        compareValue={Number(summary?.max.compare.value.toFixed(2)) || 0}
        unit={summary?.max.target.unit || 'MWh'}
      />

      <StatItem
        title="Thấp nhất"
        currentDate={summary?.min.target.date || ''}
        currentValue={Number(summary?.min.target.value.toFixed(2)) || 0}
        compareDate={summary?.min.compare.date || ''}
        compareValue={Number(summary?.min.compare.value.toFixed(2)) || 0}
        unit={summary?.min.target.unit || 'MWh'}
      />
    </View>
  )
}

export default CompareDetailStats
