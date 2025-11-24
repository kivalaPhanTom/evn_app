import React, { useMemo } from 'react'
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

const InflowOutflow: React.FC = () => {
  const summary = {
    inflow: 184.6,
    outflow: 26.3,
    unit: 'm³/s',
  }

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

  const data = [
    { value: 118, label: '00:00' },
    { value: 120, label: '01:00' },
    { value: 200, label: '02:00' },
    { value: 126, label: '03:00' },
    { value: 115, label: '04:00' },
    { value: 110, label: '05:00' },
    { value: 120, label: '06:00' },
    { value: 125, label: '07:00' },
    { value: 125, label: '08:00' },
    { value: 135, label: '09:00' },
    { value: 118, label: '10:00' },
    { value: 112, label: '11:00' },
    { value: 120, label: '12:00' },
    { value: 123, label: '13:00' },
    { value: 140, label: '14:00' },
    { value: 145, label: '15:00' },
    { value: 136, label: '16:00' },
    { value: 133, label: '17:00' },
    { value: 131, label: '18:00' },
    { value: 128, label: '19:00' },
    { value: 126, label: '20:00' },
    { value: 123, label: '21:00' },
    { value: 121, label: '22:00' },
    { value: 110, label: '23:00' },
  ]
  const data2 = [
    { value: 50, label: '00:00' },
    { value: 70, label: '01:00' },
    { value: 100, label: '02:00' },
    { value: 130, label: '03:00' },
    { value: 120, label: '04:00' },
    { value: 90, label: '05:00' },
    { value: 130, label: '06:00' },
    { value: 70, label: '07:00' },
    { value: 80, label: '08:00' },
    { value: 90, label: '09:00' },
    { value: 100, label: '10:00' },
    { value: 120, label: '11:00' },
    { value: 120, label: '12:00' },
    { value: 123, label: '13:00' },
    { value: 140, label: '14:00' },
    { value: 200, label: '15:00' },
    { value: 190, label: '16:00' },
    { value: 180, label: '17:00' },
    { value: 170, label: '18:00' },
    { value: 200, label: '19:00' },
    { value: 100, label: '20:00' },
    { value: 90, label: '21:00' },
    { value: 130, label: '22:00' },
    { value: 80, label: '23:00' },
  ]

  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        <View style={styles.summaryCard}>
          <FlowMetricCard label="Q" label1="về" value={summary.inflow} unit={summary.unit} color="#00DF73" icon="↑" />
          <FlowMetricCard label="Q" label1="xa" value={summary.outflow} unit={summary.unit} color="#FF0000" icon="↓" />
        </View>
      </View>
      <View style={styles.notePanel}>
        <CircleLineIcon color="#00DF73" />
        <Text style={styles.noteText}>Qvề</Text>
        <CircleLineIcon color="#FB923C" />
        <Text style={styles.noteText}>Qxa (Qcm + Qxt)</Text>
      </View>
      <View>
        <LineChart
          data={data}
          data2={data2}
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
          label2="Qxa: "
          height={px.v(150)}
          pointerConfig={true}
        />
      </View>
    </AnimatedCardContainer>
  )
}

export default InflowOutflow
