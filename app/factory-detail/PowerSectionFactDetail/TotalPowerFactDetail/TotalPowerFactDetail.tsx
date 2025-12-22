import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text } from 'react-native'
import styles from './TotalPowerFactDetail.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber.component'
import { px } from '@/core/utils/scale'
import GradientText from '@/components/GradientText/GradientText.component'
import { useRouter } from 'expo-router'
import { RootState } from "@/core/redux/store";
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import DotBarSkeleton from '@/components/Skeletons/DotBarSkeleton'
import { Colors } from 'toastify-react-native/config/theme'


function TotalPowerFactDetail() {
  const router = useRouter()
//   const { average, total, detail, isLoadingOverview } = useSelector((state: RootState) => state.powerSlice)
const detail = [
    {
        name:"Tổ máy H1",
        code:"TM01",
        value: 27,
        color:"white"
    },
     {
        name:"Tổ máy H2",
        code:"TM02",
        value: 27,
        color:"white"
    }
]
  const isLoadingOverview = false
  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Left side - Total Power */}
        <View style={styles.leftSection}>

          {isLoadingOverview ? <BarSkeleton /> :
            <>
              <Text style={styles.title}>TỔNG CÔNG SUẤT</Text>
              <AnimatedNumber
                value={0}
                duration={900}
                decimals={2}
                formatter={(n) => Number(n.toFixed(2)).toString()}
                render={(text) => <GradientText text={text} fontSize={px.f(64)} colors={'#5b8def'} />}
              />
            </>
          }

          {isLoadingOverview ?
            <BarSkeleton
              width={95}
              height={28}
            /> :
            <>
              <Text style={styles.unit}>MW</Text>
              <Text style={styles.average}>TB: {0} MW</Text>
            </>
          }
        </View>

        {/* Right side - Power Sources */}
        <View style={styles.rightSection}>
          {isLoadingOverview ?
            <>
              <DotBarSkeleton />
            </> : <>
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

export default TotalPowerFactDetail
