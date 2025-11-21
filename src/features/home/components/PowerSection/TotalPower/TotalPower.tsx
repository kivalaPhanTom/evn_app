import React from 'react'
import { View, Text } from 'react-native'
import styles from './TotalPower.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber.component'
import { px } from '@/core/utils/scale'
import GradientText from '@/components/GradientText/GradientText.component'
import { useRouter } from 'expo-router'

function TotalPower() {
  const router = useRouter()
  
  const powerSources = [
    {
      name: 'Buôn Tua Srah',
      code: 'BTS',
      power: 30,
      color: '#fb923c', // Orange
    },
    {
      name: 'Buôn Kuốp',
      code: 'BK',
      power: 54,
      color: '#4ade80', // Green
    },
    {
      name: 'Srepok 3',
      code: 'SPS3',
      power: 42,
      color: '#c084fc', // Purple
    },
  ]
  const totalPower = 126
  const averagePower = 118

  const onPressCard = () => {
    router.push({ pathname: '/product-power-detail' })
  }

  return (
    <AnimatedCardContainer onPress={() => onPressCard()}>
      <View style={styles.content}>
        {/* Left side - Total Power */}
        <View style={styles.leftSection}>
          <Text style={styles.title}>TỔNG CÔNG SUẤT</Text>
          {/* <Text style={styles.totalPower}>{totalPower}</Text> */}
          <AnimatedNumber
            value={totalPower}
            duration={900}
            decimals={2}
            formatter={(n) => Number(n.toFixed(2)).toString()}
            render={(text) => <GradientText text={text} fontSize={px.f(64)} colors={'#5b8def'} />}
          />
          <Text style={styles.unit}>MW</Text>
          <Text style={styles.average}>TB: {averagePower} MW</Text>
        </View>

        {/* Right side - Power Sources */}
        <View style={styles.rightSection}>
          {powerSources.map((source, index) => (
            <View key={index} style={styles.sourceItem}>
              <View style={styles.sourceInfo}>
                <View style={[styles.dot, { backgroundColor: source.color }]} />
                <Text style={styles.sourceName}>
                  {source.name} <Text style={styles.sourceCode}>({source.code})</Text>
                </Text>
              </View>
              <Text style={[styles.sourcePower, { color: source.color }]}>{source.power} MW</Text>
            </View>
          ))}
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default TotalPower
