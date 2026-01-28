import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { px } from '@/core/utils/scale'
import { styles } from './ReservoirMetric.styles'
import GradientCard from '@/components/GradientCard/GradientCard.component'
import { getInflowOutflow } from '@/core/redux/Actions/HydrologyActions'

interface ReservoirFlowCardProps {
  label: string // "Qvề" hoặc "Qxa"
  value: number // 184.6 hoặc 26.3
  unit: string // "m³/s"
  color: string // màu chủ đạo (xanh hoặc cam)
  icon: string // "↓" hoặc "↑"
  previousValue: number // giá trị cùng kỳ
  samePeriodUnit: string // đơn vị cùng kỳ
  gradientColors: [string, string] // màu gradient cho background
}

const ReservoirFlowCard: React.FC<ReservoirFlowCardProps> = ({
  label,
  value,
  unit,
  color,
  icon,
  previousValue,
  samePeriodUnit,
  gradientColors,
}) => {
  return (
    <GradientCard colors={gradientColors} locations={[0, 1]} angle={132.12} style={styles.card}>
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
        <Text style={styles.previousValue}>
          {previousValue} {samePeriodUnit}
        </Text>
      </View>
    </GradientCard>
  )
}

interface ReservoirMetricData {
  inflow: {
    value: number
    unit: string
    previousValue: number
    samePeriodUnit: string
  }
  outflow: {
    value: number
    unit: string
    previousValue: number
    samePeriodUnit: string
  }
  xtflow: {
    value: number
    unit: string
    previousValue: number
    samePeriodUnit: string
  }
}

const DEFAULT_DATA: ReservoirMetricData = {
  inflow: {
    value: 0,
    unit: 'm³/s',
    previousValue: 0,
    samePeriodUnit: 'm³/s',
  },
  outflow: {
    value: 0,
    unit: 'm³/s',
    previousValue: 0,
    samePeriodUnit: 'm³/s',
  },
  xtflow: {
    value: 0,
    unit: 'm³/s',
    previousValue: 0,
    samePeriodUnit: 'm³/s',
  },
}

function mapInflowOutflowToReservoirMetric(apiData: {
  unit?: string
  cards?: { id?: string; title?: string; value?: number; unit?: string }[]
}): ReservoirMetricData {
  const unit = apiData?.unit ?? 'm³/s'
  const cards = apiData?.cards ?? []
  const inflow = cards[0]
  const outflow = cards[1]
  const xtflow = cards[2]
  return {
    inflow: {
      value: inflow?.value ?? 0,
      unit: inflow?.unit ?? unit,
      previousValue: 0,
      samePeriodUnit: inflow?.unit ?? unit,
    },
    outflow: {
      value: outflow?.value ?? 0,
      unit: outflow?.unit ?? unit,
      previousValue: 0,
      samePeriodUnit: outflow?.unit ?? unit,
    },
    xtflow: {
      value: xtflow?.value ?? 0,
      unit: xtflow?.unit ?? unit,
      previousValue: 0,
      samePeriodUnit: xtflow?.unit ?? unit,
    },
  }
}

function ReservoirMetric(props: { currentPlantId: string }) {
  const { currentPlantId } = props
  const dispatch = useDispatch()
  const inflowOutflowData = useSelector((state: any) => state.hydrologySlice?.inflowOutflow ?? {})
  const hasApiData = inflowOutflowData?.cards?.length >= 3
  const data = hasApiData
    ? mapInflowOutflowToReservoirMetric(inflowOutflowData)
    : DEFAULT_DATA

  useEffect(() => {
    if (currentPlantId) {
      dispatch(getInflowOutflow({ hydroElectricId: currentPlantId }))
    }
  }, [dispatch, currentPlantId])

  return (
    <View style={styles.container}>
      <ReservoirFlowCard
        label="Qvề"
        value={data.inflow.value}
        unit={data.inflow.unit}
        color="#00DF73"
        icon="↓"
        previousValue={data.inflow.previousValue}
        samePeriodUnit={data.inflow.samePeriodUnit}
        gradientColors={['rgba(34, 197, 94, 0.2)', 'rgba(16, 185, 129, 0.1)']}
      />
      <ReservoirFlowCard
        label="Qcm"
        value={data.outflow.value}
        unit={data.outflow.unit}
        color="#FB923C"
        icon="↑"
        previousValue={data.outflow.previousValue}
        samePeriodUnit={data.outflow.samePeriodUnit}
        gradientColors={['rgba(249, 115, 22, 0.2)', 'rgba(239, 68, 68, 0.1)']}
      />
      <ReservoirFlowCard
        label="Qxt"
        value={data.xtflow.value}
        unit={data.xtflow.unit}
        color="#FB923C"
        icon="↑"
        previousValue={data.xtflow.previousValue}
        samePeriodUnit={data.xtflow.samePeriodUnit}
        gradientColors={['rgba(249, 115, 22, 0.2)', 'rgba(239, 68, 68, 0.1)']}
      />
    </View>
  )
}

export default ReservoirMetric
