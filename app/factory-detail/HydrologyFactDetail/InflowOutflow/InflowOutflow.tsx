import { hydrologyDark, hydrologyLight } from '@/core/constants/hydrologyPalette'
import React, { useEffect, useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import GradientText from '@/components/GradientText/GradientText.component'
import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber.component'
import { px } from '@/core/utils/scale'
import StackedBar, { StackedItem } from '@/components/StackedBar/StackedBar.component'
import styles from '@/features/factory-detail/HydrologyFactDetail/InflowOutflow/InflowOutflow.styles'
import FlowMetricCard from '@/components/FlowMetricCard/FlowMetricCard.component'
import { LineChart } from '@/components/ChartView/LineChart.component'
import { Image } from 'expo-image'
import { CircleLineIcon } from '@/components/ui/circle-line-icon'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { getInflowOutflow } from '@/core/redux/domains/hydrology'
import { isEmpty } from '@/core/utils/utils'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { Shadow } from 'react-native-shadow-2'

interface InflowOutflowProps {
  hydroElectricId: string
}

const InflowOutflow: React.FC<InflowOutflowProps> = ({ hydroElectricId }) => {
  const dispatch = useAppDispatch()
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const colors = (isDark ? hydrologyDark : hydrologyLight).inflowOutflow
  const inflowOutflowData = useAppSelector((state: any) => state.hydrologySlice.inflowOutflow || {})
  const isEmptyData = Object.keys(inflowOutflowData).length === 0
  const inflow = isEmptyData ? {} : inflowOutflowData?.cards[0]
  const outflow = isEmptyData ? {} : inflowOutflowData?.cards[1]
  const qIn = isEmptyData ? [] : JSON.parse(JSON.stringify(inflowOutflowData.qIn))
  const qOut = isEmptyData ? [] : JSON.parse(JSON.stringify(inflowOutflowData.qOut))

  const card = (
    <AnimatedCardContainer style={isDark ? undefined : { elevation: 0, shadowOpacity: 0, shadowRadius: 0 }}>
      <View style={styles.headerRow}>
            <Text style={[styles.pillText, { color: colors.title }]}>Lưu lượng theo giờ</Text>
            <View style={styles.notePanel}>
              <CircleLineIcon color={colors.inflow} />
              <Text style={[styles.noteText, { color: colors.noteText }]}>Qvề</Text>
              <CircleLineIcon color={colors.outflow} />
              <Text style={[styles.noteText, { color: colors.noteText }]}>Qxả</Text>
            </View>
          </View>
          <View style={[styles.chartPanel, { backgroundColor: colors.chartBackground }, !isDark && { borderRadius: 12 }]}>
            {qIn.length > 0 && qOut.length > 0 && (
              <LineChart
                data={qIn}
                data2={qOut}
                color={colors.inflow}
                color2={colors.outflow}
                ruleTypes="solid"
                areaChart={false}
                hideDataPoints1={true}
                hideDataPoints2={true}
                rulesColor={colors.grid}
                //customDataPoint={customDataPoint()}
                //customDataPoint2={customDataPoint2()}
                label1="Qvề: "
                label2="Qxả: "
                height={px.v(150)}
                pointerConfig={true}
                xAxisColor={colors.axis}
                scrollToEnd={true}
              />
            )}
          </View>
    </AnimatedCardContainer>
  )

  return isDark ? (
    <>{!isEmptyData && card}</>
  ) : (
    <Shadow distance={5} startColor={colors.shadow} offset={[0, -2]} stretch>
      {!isEmptyData && card}
    </Shadow>
  )
}

export default InflowOutflow
