import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { px } from '@/core/utils/scale'
import { styles } from './ReservoirMetric.styles'
import GradientCard from '@/components/GradientCard/GradientCard.component'

interface ReservoirFlowCardProps {
  label: string // "Qvề" hoặc "Qxa"
  value: number // 184.6 hoặc 26.3
  unit: string // "m³/s"
  color: string // màu chủ đạo (xanh hoặc cam)
  icon: string // "↓" hoặc "↑"
  samePeriodValue: number // giá trị cùng kỳ
  samePeriodUnit: string // đơn vị cùng kỳ
  gradientColors: [string, string] // màu gradient cho background
}

const ReservoirFlowCard: React.FC<ReservoirFlowCardProps> = ({
  label,
  value,
  unit,
  color,
  icon,
  samePeriodValue,
  samePeriodUnit,
  gradientColors,
}) => {
  return (
    <GradientCard
      colors={gradientColors}
      locations={[0, 1]}
      angle={132.12}
      style={styles.card}
    >
      {/* Header với icon tròn và label */}
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* Giá trị chính */}
      <Text style={[styles.value, { color }]}>{value}</Text>

      {/* Đơn vị */}
      <Text style={styles.unit}>{unit}</Text>

      {/* Đường ngăn cách */}
      <View style={styles.divider} />

      {/* So sánh cùng kỳ */}
      <View style={styles.samePeriodContainer}>
        <Text style={styles.samePeriodLabel}>Cùng kỳ: </Text>
        <Text style={styles.samePeriodValue}>
          {samePeriodValue} {samePeriodUnit}
        </Text>
      </View>
    </GradientCard>
  )
}

interface ReservoirMetricData {
  inflow: {
    value: number
    unit: string
    samePeriodValue: number
    samePeriodUnit: string
  }
  outflow: {
    value: number
    unit: string
    samePeriodValue: number
    samePeriodUnit: string
  }
}

const DEFAULT_DATA: ReservoirMetricData = {
  inflow: {
    value: 184.6,
    unit: 'm³/s',
    samePeriodValue: 156.2,
    samePeriodUnit: 'm³/s',
  },
  outflow: {
    value: 26.3,
    unit: 'm³/s',
    samePeriodValue: 31.5,
    samePeriodUnit: 'm³/s',
  },
}

function ReservoirMetric(props: { currentPlantId: string }) {
  const { currentPlantId } = props;
  const data = DEFAULT_DATA

  return (
    <View style={styles.container}>
      <ReservoirFlowCard
        label="Qvề"
        value={data.inflow.value}
        unit={data.inflow.unit}
        color="#00DF73"
        icon="↓"
        samePeriodValue={data.inflow.samePeriodValue}
        samePeriodUnit={data.inflow.samePeriodUnit}
        gradientColors={['rgba(34, 197, 94, 0.2)', 'rgba(16, 185, 129, 0.1)']}
      />
      <ReservoirFlowCard
        label="Qxả"
        value={data.outflow.value}
        unit={data.outflow.unit}
        color="#FB923C"
        icon="↑"
        samePeriodValue={data.outflow.samePeriodValue}
        samePeriodUnit={data.outflow.samePeriodUnit}
        gradientColors={['rgba(249, 115, 22, 0.2)', 'rgba(239, 68, 68, 0.1)']}
      />
    </View>
  )
}

export default ReservoirMetric
