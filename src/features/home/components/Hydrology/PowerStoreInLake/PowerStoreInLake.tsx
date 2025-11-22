import React, { useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import GradientText from '@/components/GradientText/GradientText.component'
import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber.component'
import { px } from '@/core/utils/scale'
import { styles } from './PowerStoreInLake.styles'
import StackedBar, { StackedItem } from '@/components/StackedBar/StackedBar.component'

const PowerStoreInLake: React.FC = () => {
  const current = 13.1
  const reference = 12.9
  const unit = 'tr.Wh'
  const data = useMemo<StackedItem[]>(
    () => [
      { label: 'BTS', value: 2.1, color: '#F59E0B' },
      { label: 'BK', value: 6.5, color: '#00B3A4' },
      { label: 'SP3', value: 4.5, color: '#00D9FF' },
    ],
    [],
  )

  return (
    <AnimatedCardContainer>
      <View style={styles.pill}>
        <Text style={[styles.pillText, { color: '#E6ECF2' }]}>Điện năng tích trữ trong hồ</Text>
      </View>

      <View style={styles.mainRow}>
        <AnimatedNumber
          value={current}
          decimals={1}
          duration={800}
          render={(txt) => <GradientText text={txt} fontSize={px.f(52)} colors={'#00C853'} />}
        />
        <Text style={[styles.unit, { color: '#00C853', marginLeft: px.h(6), fontSize: px.m(20) }]}>{unit}</Text>
        <Text style={[styles.slash, { color: '#9AA6B6' }]}> / </Text>
        <Text style={[styles.refValue, { color: '#9AA6B6' }]}>
          {reference.toFixed(1)} {unit}
        </Text>
      </View>

      {/* Stacked bar */}
      <View style={{ marginTop: px.v(10) }}>
        <StackedBar items={data} height={px.v(20)} legendGap={px.h(60)} showPercent={false} valueDecimals={1} />
      </View>
    </AnimatedCardContainer>
  )
}

export default PowerStoreInLake
