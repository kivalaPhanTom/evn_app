import React, { useEffect, useMemo } from 'react'
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
import SquareSkeleton from '@/components/Skeletons/SquareSkelenton'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'

interface InflowOutflowProps {
  hydroElectricId: string
}

const InflowOutflow: React.FC<InflowOutflowProps> = ({ hydroElectricId }) => {
  const customDataPoint = () => (
    <View
      style={{
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#00DF73',
        borderColor: '#FFF',
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
        backgroundColor: '#FB923C',
        borderColor: '#FFF',
        borderWidth: 2,
      }}
    />
  )

  const dispatch = useAppDispatch()
  const { isLoadingInflowOutflow } = useAppSelector((state: any) => state.hydrologySlice)
  const inflowOutflowData = useAppSelector((state: any) => state.hydrologySlice.inflowOutflow || {})
  const isEmptyData = Object.keys(inflowOutflowData).length === 0
  const inflow = isEmptyData ? {} : inflowOutflowData?.cards[0]
  const outflow = isEmptyData ? {} : inflowOutflowData?.cards[1]
  const xtflow = isEmptyData ? {} : inflowOutflowData?.cards[2]
  const qIn = isEmptyData ? [] : JSON.parse(JSON.stringify(inflowOutflowData.qIn))
  const qOut = isEmptyData ? [] : JSON.parse(JSON.stringify(inflowOutflowData.qOut))

  useEffect(() => {
    // Dispatch action to fetch inflow/outflow data
    console.log(hydroElectricId)
    dispatch(getInflowOutflow({ hydroElectricId: hydroElectricId }))
  }, [dispatch, hydroElectricId])

  return (
    <>
      {!isEmptyData && (
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
                    value={inflow?.value}
                    unit={inflow?.unit}
                    color="#00DF73"
                    icon="↑"
                  />
                  <FlowMetricCard
                    label="Q"
                    label1="cm"
                    value={outflow?.value}
                    unit={outflow?.unit}
                    color="#FF0000"
                    icon="↓"
                  />
                  <FlowMetricCard
                    label="Q"
                    label1="xt"
                    value={xtflow?.value}
                    unit={xtflow?.unit}
                    color="#FF0000"
                    icon="↓"
                  />
                </>
              )}
            </View>
          </View>
          {!isLoadingInflowOutflow && (
            <View style={styles.notePanel}>
              <CircleLineIcon color="#00DF73" />
              <Text style={styles.noteText}>Qvề</Text>
              <CircleLineIcon color="#FB923C" />
              <Text style={styles.noteText}>Qxả (Qcm + Qxt)</Text>
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
                    color="#00DF73"
                    color2="#FB923C"
                    ruleTypes="solid"
                    areaChart={false}
                    hideDataPoints1={true}
                    hideDataPoints2={true}
                    rulesColor="#E5E5EF"
                    //customDataPoint={customDataPoint()}
                    //customDataPoint2={customDataPoint2()}
                    label1="Qvề: "
                    label2="Qxả: "
                    height={px.v(200)}
                    pointerConfig={true}
                    xAxisColor="#E5E5EF"
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

export default InflowOutflow
