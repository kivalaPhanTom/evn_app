import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text } from 'react-native'
import styles from './TotalPower.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber.component'
import { px } from '@/core/utils/scale'
import GradientText from '@/components/GradientText/GradientText.component'
import { useRouter } from 'expo-router'
import { RootState } from "@/core/redux/store";
import SkeletonForTotalValue from './SkeletonForTotalValue'
import SkeletonForUnit from './SkeletonForUnit'
import SkeletonForCompany from './SkeletonForCompany'


function TotalPower() {
  const router = useRouter()
  const { average, total, detail, isLoadingOverview } = useSelector((state: RootState) => state.powerSlice)

  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Left side - Total Power */}
        <View style={styles.leftSection}>
          {isLoadingOverview ? <SkeletonForTotalValue /> :
            <>
              <Text style={styles.title}>TỔNG CÔNG SUẤT</Text>
              <AnimatedNumber
                value={total}
                duration={900}
                decimals={2}
                formatter={(n) => Number(n.toFixed(2)).toString()}
                render={(text) => <GradientText text={text} fontSize={px.f(64)} colors={'#5b8def'} />}
              />
            </>
          }

          {isLoadingOverview ? <SkeletonForUnit /> :
            <>
              <Text style={styles.unit}>MW</Text>
              <Text style={styles.average}>TB: {average} MW</Text>
            </>
          }
        </View>

        {/* Right side - Power Sources */}
        <View style={styles.rightSection}>
          {isLoadingOverview ? <SkeletonForCompany /> : <>
            {detail.map((source, index) => (
              <View key={index} style={styles.sourceItem}>
                <View style={styles.sourceInfo}>
                  <View style={[styles.dot, { backgroundColor: source.color }]} />
                  <Text style={styles.sourceName}>
                    {source.name} <Text style={styles.sourceCode}>({source.code})</Text>
                  </Text>
                </View>
                <Text style={[styles.sourcePower, { color: source.color }]}>{source.value} MW</Text>
              </View>
            ))}
          </>}
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default TotalPower
