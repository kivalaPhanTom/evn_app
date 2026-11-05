import { hydrologyDark, hydrologyLight } from '@/core/constants/hydrologyPalette'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { px } from '@/core/utils/scale'
import { createStyles } from '@/features/factory-detail/ReservoirWaterLevel/ReservoirMetric/ReservoirMetric.styles'
import GradientCard from '@/components/GradientCard/GradientCard.component'
import { getInflowOutflow } from '@/core/redux/domains/hydrology'
import { shallowEqual } from 'react-redux'

interface ReservoirFlowCardProps {
  label: string // "Qvề" hoặc "Qxa"
  value: number // 184.6 hoặc 26.3
  unit: string // "m³/s"
  color: string // màu chủ đạo (xanh hoặc cam)
  icon: string // "↓" hoặc "↑"
  previousValue: number // giá trị cùng kỳ
  samePeriodUnit: string // đơn vị cùng kỳ
  gradientColors: readonly [string, string] // màu gradient cho background
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
  const isDark = useAppTheme() === 'dark'
  const styles = createStyles(isDark)
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

const roundToOneDecimal = (value: unknown): number => {
  const numericValue = Number(value)
  return Number.isFinite(numericValue) ? Number(numericValue.toFixed(1)) : 0
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
      value: roundToOneDecimal(inflow?.value),
      unit: inflow?.unit ?? unit,
      previousValue: 0,
      samePeriodUnit: inflow?.unit ?? unit,
    },
    outflow: {
      value: roundToOneDecimal(outflow?.value),
      unit: outflow?.unit ?? unit,
      previousValue: 0,
      samePeriodUnit: outflow?.unit ?? unit,
    },
    xtflow: {
      value: roundToOneDecimal(xtflow?.value),
      unit: xtflow?.unit ?? unit,
      previousValue: 0,
      samePeriodUnit: xtflow?.unit ?? unit,
    },
  }
}

function ReservoirMetric(props: { plantId: string | number; maHoChua?: string }) {
  const { plantId, maHoChua } = props
  const isDark = useAppTheme() === 'dark'
  const colors = (isDark ? hydrologyDark : hydrologyLight).reservoirMetric
  const styles = createStyles(isDark)
  const dispatch = useAppDispatch()
  const { selectedCompanyId: companyId } = useAppSelector((state: any) => state.companyPlantSlice)
  const inflowOutflowData = useAppSelector((state: any) => state.hydrologySlice?.inflowOutflow ?? {}, shallowEqual)
  const hasApiData = inflowOutflowData?.cards?.length >= 3
  const data = hasApiData
    ? mapInflowOutflowToReservoirMetric(inflowOutflowData)
    : DEFAULT_DATA

  useEffect(() => {
    if (plantId && companyId) {
      dispatch(getInflowOutflow({ plantId, companyId, maHoChua }))
    }
  }, [dispatch, plantId, companyId, maHoChua])

  return (
    <View style={styles.container}>
      <ReservoirFlowCard
        label="Qvề"
        value={data.inflow.value}
        unit={data.inflow.unit}
        color={colors.inflow.accent}
        icon="↓"
        previousValue={data.inflow.previousValue}
        samePeriodUnit={data.inflow.samePeriodUnit}
        gradientColors={colors.inflow.backgroundGradient}
      />
      <ReservoirFlowCard
        label="Qcm"
        value={data.outflow.value}
        unit={data.outflow.unit}
        color={colors.turbine.accent}
        icon="↑"
        previousValue={data.outflow.previousValue}
        samePeriodUnit={data.outflow.samePeriodUnit}
        gradientColors={colors.turbine.backgroundGradient}
      />
      <ReservoirFlowCard
        label="Qxt"
        value={data.xtflow.value}
        unit={data.xtflow.unit}
        color={colors.spillway.accent}
        icon="↑"
        previousValue={data.xtflow.previousValue}
        samePeriodUnit={data.xtflow.samePeriodUnit}
        gradientColors={colors.spillway.backgroundGradient}
      />
    </View>
  )
}

export default ReservoirMetric
