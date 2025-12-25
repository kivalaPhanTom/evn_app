import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styles from './TotalProductionOutputFactDetail.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber.component'
import GradientText from '@/components/GradientText/GradientText.component'
import { px } from '@/core/utils/scale'
import { useRouter } from 'expo-router'
import { getProductOutputOverview } from '@/core/redux/Actions/ProductOutputActions'
import { RootState } from '@/core/redux/store'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import DotBarSkeleton from '@/components/Skeletons/DotBarSkeleton'

interface Props { 
   currentPlantId: string
}

function TotalProductionOutputFactDetail(props: Props) {
  const { currentPlantId } = props
  const router = useRouter()
  const dispatch = useDispatch()
  // const {
  //   productOutputOverview: { totalPower, averagePower, powerSources },
  //   isLoadingOverview
  // } = useSelector((state: RootState) => state.productOutputSlice)
   const isLoadingOverview = false
  // useEffect(() => {
  //   dispatch(getProductOutputOverview())
  // }, [])
  const powerSources = [
    {
      code:"Tổ máy H1",
      name:"TM01",
      value:0,
      color:"white"
    },
     {
      code:"Tổ máy H2",
      name:"TM02",
      value:0,
      color:"white"
    }
  ]
  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Left side - Total Power */}
        <View style={styles.leftSection}>
          {/* <Text style={styles.totalPower}>{totalPower}</Text> */}
          {isLoadingOverview ? <BarSkeleton /> :
            <>
              <Text style={styles.title}>TỔNG SẢN LƯỢNG</Text>
              <AnimatedNumber
                value={0}
                duration={900}
                decimals={2}
                formatter={(n) => Number(n.toFixed(2)).toString()}
                render={(text) => <GradientText text={text} fontSize={px.f(64)} colors={'#ff4444'} />}
              />
            </>
          }
          {isLoadingOverview ?
            <BarSkeleton
              width={95}
              height={28}
            /> :
            <>
              <Text style={styles.unit}>tr.Wh</Text>
              <Text style={styles.average}>TB: {0} tr.Wh</Text>
            </>
          }
        </View>

        {/* Right side - Power Sources */}
        <View style={styles.rightSection}>
          {isLoadingOverview ?
            <>
              <DotBarSkeleton />
            </> : <>
              {powerSources.map((source, index) => (
                <View key={index} style={styles.sourceItem}>
                  <View style={styles.sourceInfo}>
                    <View style={[styles.dot, { backgroundColor: source.color }]} />
                    <Text style={styles.sourceName}>
                      {source.name} <Text style={styles.sourceCode}>({source.code})</Text>
                    </Text>
                  </View>
                  <Text style={[styles.sourcePower, { color: source.color }]}>{source.value} tr.Wh</Text>
                </View>
              ))}
            </>}

        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default TotalProductionOutputFactDetail
