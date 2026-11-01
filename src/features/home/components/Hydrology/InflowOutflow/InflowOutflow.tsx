import { hydrologyLight as light, hydrologyDark as dark } from '@/core/constants/hydrologyPalette'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import GradientText from '@/components/GradientText/GradientText.component'
import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber.component'
import { px } from '@/core/utils/scale'
import StackedBar, { StackedItem } from '@/components/StackedBar/StackedBar.component'
import styles from './InflowOutflow.styles'
import FlowMetricCard from '@/components/FlowMetricCard/FlowMetricCard.component'
import { LineChart } from '@/components/ChartView/LineChart.component'
import { Image } from 'expo-image'
import { CircleLineIcon } from '@/components/ui/circle-line-icon'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { getInflowOutflow } from '@/core/redux/domains/hydrology'
import { isEmpty } from '@/core/utils/utils'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import SquareSkeleton from '@/components/Skeletons/SquareSkelenton'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'

interface InflowOutflowProps {
  plantId: string | number
  maHoChua?: string
}

const roundToOneDecimal = (value: unknown): number => {
  const numericValue = Number(value)
  return Number.isFinite(numericValue) ? Number(numericValue.toFixed(1)) : 0
}

const InflowOutflow: React.FC<InflowOutflowProps> = ({ plantId, maHoChua }) => {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const customDataPoint = () => (
    <View
      style={{
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: isDark ? dark.inflow : '#00DF73',
        borderColor: isDark ? dark.text : '#FFF',
        borderWidth: 2,
        transform: [{ translateX: -6 }, { translateY: -6 }],
      }}
    />
  )

  const customDataPoint2 = () => (
    <View
      style={{
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: isDark ? dark.chart.outflow : '#FB923C',
        borderColor: isDark ? dark.text : '#FFF',
        borderWidth: 2,
      }}
    />
  )

  const dispatch = useAppDispatch()
  const { selectedCompanyId: companyId } = useAppSelector((state: any) => state.companyPlantSlice)
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const { isLoadingInflowOutflow } = useAppSelector((state: any) => state.hydrologySlice)
  const inflowOutflowData = useAppSelector((state: any) => state.hydrologySlice?.inflowOutflow)
  const cards = Array.isArray(inflowOutflowData?.cards) ? inflowOutflowData.cards : []
  const qIn = Array.isArray(inflowOutflowData?.qIn) ? inflowOutflowData.qIn : []
  const qOut = Array.isArray(inflowOutflowData?.qOut) ? inflowOutflowData.qOut : []
  const isEmptyData = cards.length === 0 && qIn.length === 0 && qOut.length === 0
  const inflow = cards[0]
  const outflow = cards[1]
  const xtflow = cards[2]

  useEffect(() => {
    // Dispatch action to fetch inflow/outflow data
    if (plantId && companyId) dispatch(getInflowOutflow({ plantId, companyId, maHoChua }))
  }, [dispatch, plantId, companyId, maHoChua, countRefesh])

  return (
    <>
      {!isLoadingInflowOutflow && isEmptyData && (
        <View style={styles.content}>
          <Text style={[styles.noteText, !isDark && { color: light.muted }]}>Chưa có dữ liệu lưu lượng.</Text>
        </View>
      )}
      {(isLoadingInflowOutflow || !isEmptyData) && (
        <>
          <View style={styles.content}>
            <View style={styles.summaryCard}>
              {isLoadingInflowOutflow ? (
                <>
                  <SquareSkeleton count={1} size={100} />
                  <SquareSkeleton count={1} size={100} />
                </>
              ) : (
                <>
                  <FlowMetricCard
                    label="Q"
                    label1="về"
                    value={roundToOneDecimal(inflow?.value)}
                    unit={inflow?.unit ?? "m³/s"}
                    color={isDark ? dark.inflow : light.inflow}
                    icon="↑"
                  />
                  <FlowMetricCard
                    label="Q"
                    label1="cm"
                    value={roundToOneDecimal(outflow?.value)}
                    unit={outflow?.unit ?? "m³/s"}
                    color={isDark ? dark.outflow : light.outflow}
                    icon="↓"
                  />
                  <FlowMetricCard
                    label="Q"
                    label1="xt"
                    value={roundToOneDecimal(xtflow?.value)}
                    unit={xtflow?.unit ?? "m³/s"}
                    color={isDark ? dark.outflow : light.outflow}
                    icon="↓"
                  />
                </>
              )}
            </View>
          </View>
          {!isLoadingInflowOutflow && !isEmptyData && (
            <View style={styles.notePanel}>
              <CircleLineIcon color={isDark ? dark.inflow : light.inflow} />
              <Text style={[styles.noteText, !isDark && { color: light.muted }]}>Qvề</Text>
              <CircleLineIcon color={isDark ? dark.chart.outflow : light.warning} />
              <Text style={[styles.noteText, !isDark && { color: light.muted }]}>Qxả (Qcm + Qxt)</Text>
            </View>
          )}

          <View>
            {isLoadingInflowOutflow ? (
              <BarSkeleton width={'100%'} alignSelf="center" height={75} />
            ) : (
              <>
                {qIn.length > 0 && qOut.length > 0 && (
                  <LineChart
                    data={qIn}
                    data2={qOut}
                    color={isDark ? dark.inflow : light.inflow}
                    color2={isDark ? dark.chart.outflow : light.warning}
                    ruleTypes="solid"
                    areaChart={false}
                    hideDataPoints1={true}
                    hideDataPoints2={true}
                    rulesColor={isDark ? dark.chart.flowGrid : light.grid}
                    //customDataPoint={customDataPoint()}
                    //customDataPoint2={customDataPoint2()}
                    label1="Qvề: "
                    label2="Qxả: "
                    height={px.v(200)}
                    pointerConfig={true}
                    xAxisColor={isDark ? dark.chart.flowGrid : light.grid}
                    scrollToEnd={true}
                  />
                )}
              </>
            )}
          </View>
        </>
      )}
    </>
  )
}

export default React.memo(InflowOutflow)
