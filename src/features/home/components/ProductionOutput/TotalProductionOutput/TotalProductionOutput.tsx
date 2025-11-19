import React from 'react'
import { View, Text } from 'react-native'
import styles from './TotalProductionOutput.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber.component'
import GradientText from '@/components/GradientText/GradientText.component'
import { px } from '@/core/utils/scale'
import { useRouter } from 'expo-router'

interface Props {}

function TotalProductionOutput(props: Props) {
  const {} = props
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
  const totalPower = 2.4
  const averagePower = 118

  const onPressCard = () => {
    router.push({ pathname: '/product-output-detail', params: { type: 'output' } })
  }

  return (
    <AnimatedCardContainer onPress={() => onPressCard()}>
      <View style={styles.content}>
        {/* Left side - Total Power */}
        <View style={styles.leftSection}>
          <Text style={styles.title}>TỔNG SẢN LƯỢNG</Text>
          {/* <Text style={styles.totalPower}>{totalPower}</Text> */}
          <AnimatedNumber
            value={totalPower}
            duration={900}
            decimals={2}
            formatter={(n) => Number(n.toFixed(2)).toString()}
            render={(text) => <GradientText text={text} fontSize={px.f(64)} colors={'#ff4444'} />}
          />
          <Text style={styles.unit}>tr.Wh</Text>
          <Text style={styles.average}>TB: {averagePower} tr.Wh</Text>
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
              <Text style={[styles.sourcePower, { color: source.color }]}>{source.power} tr.Wh</Text>
            </View>
          ))}
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default TotalProductionOutput
