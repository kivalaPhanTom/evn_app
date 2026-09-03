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

interface InflowOutflowProps {
  hydroElectricId: string
}

const InflowOutflow: React.FC<InflowOutflowProps> = ({ hydroElectricId }) => {
  const dispatch = useAppDispatch()
  const inflowOutflowData = useAppSelector((state: any) => state.hydrologySlice.inflowOutflow || {})
  const isEmptyData = Object.keys(inflowOutflowData).length === 0
  const inflow = isEmptyData ? {} : inflowOutflowData?.cards[0]
  const outflow = isEmptyData ? {} : inflowOutflowData?.cards[1]
  const qIn = isEmptyData ? [] : JSON.parse(JSON.stringify(inflowOutflowData.qIn))
  const qOut = isEmptyData ? [] : JSON.parse(JSON.stringify(inflowOutflowData.qOut))

  return (
    <>
      {!isEmptyData && (
        <AnimatedCardContainer>
          <View style={styles.headerRow}>
            <Text style={[styles.pillText, { color: '#E6ECF2' }]}>Lưu lượng theo giờ</Text>
            <View style={styles.notePanel}>
              <CircleLineIcon color="#00DF73" />
              <Text style={styles.noteText}>Qvề</Text>
              <CircleLineIcon color="#FB923C" />
              <Text style={styles.noteText}>Qxả</Text>
            </View>
          </View>
          <View>
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
                height={px.v(150)}
                pointerConfig={true}
                xAxisColor="#E5E5EF"
                scrollToEnd={true}
              />
            )}
          </View>
        </AnimatedCardContainer>
      )}
    </>
  )
}

export default InflowOutflow
