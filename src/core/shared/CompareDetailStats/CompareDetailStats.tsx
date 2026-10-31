import React from 'react'
import { View, Text } from 'react-native'
import createStyles from './CompareDetailStats.styles'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import { useAppTheme } from '@/core/hooks/use-app-theme'

interface StatItemProps {
  title: string
  currentDate: string
  currentValue: number
  compareDate: string
  compareValue: number
  difference?: number
  unit?: string
  isLoading?: boolean
}

const StatItem: React.FC<StatItemProps> = ({
  title,
  currentDate,
  currentValue,
  compareDate,
  compareValue,
  difference,
  unit = 'MWh',
  isLoading = false
}) => {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const styles = createStyles(isDark)
  const calculatedDifference = difference ?? currentValue - compareValue
  const isPositive = calculatedDifference >= 0

  return (
    <View style={styles.statCard}>
      <Text style={styles.statTitle}>{title}</Text>

      <View style={styles.statsRow}>
        {/* Compare Date Stats */}
        <View style={styles.statColumn}>
          {
            isLoading ?
              <>
                <BarSkeleton
                  marginBottom={3}
                />
                <BarSkeleton
                  width={70}
                  height={20}
                  marginBottom={0}
                  marginTop={2}
                />
              </> :
              <>
                <View style={[styles.dateBadge, styles.compareDateBadge]}>
                  <Text style={styles.dateText}>{compareDate}</Text>
                </View>
                <Text style={[styles.valueText, styles.compareDateColor]}>
                  {compareValue}
                  <Text style={styles.unitText}>{unit}</Text>
                </Text>
              </>
          }
        </View>
        {/* Current Date Stats */}

        <View style={styles.statColumn}>
          {
            isLoading ?
              <>
                <BarSkeleton
                  marginBottom={3}
                />
                <BarSkeleton
                  width={70}
                  height={20}
                  marginBottom={0}
                  marginTop={2}
                />
              </> :
              <>

                <View style={[styles.dateBadge, styles.currentDateBadge]}>
                  <Text style={styles.dateText}>{currentDate}</Text>
                </View>
                <Text style={[styles.valueText, styles.currentDateColor]}>
                  {currentValue}
                  <Text style={styles.unitText}>{unit}</Text>
                </Text>
              </>
          }

        </View>


      </View>

      {/* Difference Badge */}
      {
        isLoading && <View style={[styles.differenceBadge, isPositive ? styles.positiveChange : styles.negativeChange]}>
          <Text style={[styles.differenceIcon, isPositive ? styles.positiveColor : styles.negativeColor]}>
            {isPositive ? '↑' : '↓'}
          </Text>
          <Text style={[styles.differenceText, isPositive ? styles.positiveColor : styles.negativeColor]}>
            {isPositive ? '+' : ''}
            {calculatedDifference} {unit}
          </Text>
        </View>
      }
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
  isLoading?: boolean
}

// API có thể trả Summary thiếu/null từng cấp (average/target/compare/value) khi đổi ngày so sánh
const safeValue = (obj: any) => {
  const num = Number(obj?.value)
  return Number.isFinite(num) ? Number(num.toFixed(2)) : 0
}

const CompareDetailStats: React.FC<CompareDetailStatsProps> = ({ summary, isLoading = false }) => {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const styles = createStyles(isDark)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>So sánh chi tiết</Text>

      <StatItem
        title="Trung bình"
        currentDate={summary?.average?.target?.date || ''}
        currentValue={safeValue(summary?.average?.target)}
        compareDate={summary?.average?.compare?.date || ''}
        compareValue={safeValue(summary?.average?.compare)}
        unit={summary?.average?.target?.unit || 'MWh'}
        isLoading={isLoading}
      />

      <StatItem
        title="Cao nhất"
        currentDate={summary?.max?.target?.date || ''}
        currentValue={safeValue(summary?.max?.target)}
        compareDate={summary?.max?.compare?.date || ''}
        compareValue={safeValue(summary?.max?.compare)}
        unit={summary?.max?.target?.unit || 'MWh'}
        isLoading={isLoading}
      />

      <StatItem
        title="Thấp nhất"
        currentDate={summary?.min?.target?.date || ''}
        currentValue={safeValue(summary?.min?.target)}
        compareDate={summary?.min?.compare?.date || ''}
        compareValue={safeValue(summary?.min?.compare)}
        unit={summary?.min?.target?.unit || 'MWh'}
        isLoading={isLoading}
      />
    </View>
  )
}

export default CompareDetailStats
