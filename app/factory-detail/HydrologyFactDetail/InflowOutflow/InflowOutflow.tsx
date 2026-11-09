import { hydrologyDark, hydrologyLight } from '@/core/constants/hydrologyPalette'
import React from 'react'
import { View, Text } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { px } from '@/core/utils/scale'
import styles from '@/features/factory-detail/HydrologyFactDetail/InflowOutflow/InflowOutflow.styles'
import { LineChart } from '@/components/ChartView/LineChart.component'
import { CircleLineIcon } from '@/components/ui/circle-line-icon'
import { useAppSelector } from '@/core/redux/hooks'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { Shadow } from 'react-native-shadow-2'

const InflowOutflow: React.FC = () => {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const colors = (isDark ? hydrologyDark : hydrologyLight).inflowOutflow
  const { inflowOutflow, isLoadingInflowOutflow } = useAppSelector((state: any) => state.hydrologySlice)
  const qIn = Array.isArray(inflowOutflow?.qIn) ? inflowOutflow.qIn : []
  const qOut = Array.isArray(inflowOutflow?.qOut) ? inflowOutflow.qOut : []
  const hasQInData = qIn.length > 0
  const hasQOutData = qOut.length > 0
  const hasChartData = hasQInData || hasQOutData
  const primaryData = hasQInData ? qIn : qOut
  const secondaryData = hasQInData && hasQOutData ? qOut : undefined

  const card = (
    <AnimatedCardContainer style={isDark ? undefined : { elevation: 0, shadowOpacity: 0, shadowRadius: 0 }}>
      <View style={styles.headerRow}>
            <Text style={[styles.pillText, { color: colors.title }]}>Lưu lượng theo giờ</Text>
            <View style={styles.notePanel}>
              {hasQInData && (
                <>
                  <CircleLineIcon color={colors.inflow} />
                  <Text style={[styles.noteText, { color: colors.noteText }]}>Qvề</Text>
                </>
              )}
              {hasQOutData && (
                <>
                  <CircleLineIcon color={colors.outflow} />
                  <Text style={[styles.noteText, { color: colors.noteText }]}>Qxả</Text>
                </>
              )}
            </View>
          </View>
          <View style={[styles.chartPanel, { backgroundColor: colors.chartBackground }, !isDark && { borderRadius: 12 }]}>
            {isLoadingInflowOutflow ? (
              <Text style={[styles.noteText, { color: colors.noteText }]}>Đang tải dữ liệu...</Text>
            ) : hasChartData ? (
              <LineChart
                data={primaryData}
                data2={secondaryData}
                color={hasQInData ? colors.inflow : colors.outflow}
                color2={colors.outflow}
                ruleTypes="solid"
                areaChart={false}
                hideDataPoints1={true}
                hideDataPoints2={true}
                rulesColor={colors.grid}
                //customDataPoint={customDataPoint()}
                //customDataPoint2={customDataPoint2()}
                label1={hasQInData ? 'Qvề: ' : 'Qxả: '}
                label2={secondaryData ? 'Qxả: ' : undefined}
                height={px.v(150)}
                pointerConfig={true}
                xAxisColor={colors.axis}
                scrollToEnd={true}
              />
            ) : (
              <Text style={[styles.noteText, { color: colors.noteText }]}>Chưa có dữ liệu lưu lượng.</Text>
            )}
          </View>
    </AnimatedCardContainer>
  )

  return isDark ? (
    <>{card}</>
  ) : (
    <Shadow distance={5} startColor={colors.shadow} offset={[0, -2]} stretch>
      {card}
    </Shadow>
  )
}

export default InflowOutflow
