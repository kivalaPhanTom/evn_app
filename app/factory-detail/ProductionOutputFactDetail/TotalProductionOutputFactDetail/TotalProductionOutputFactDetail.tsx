import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styles from './TotalProductionOutputFactDetail.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber.component'
import GradientText from '@/components/GradientText/GradientText.component'
import { px } from '@/core/utils/scale'
import { useRouter } from 'expo-router'
import { getProductOutputOverviewFactDetail } from '@/core/redux/Actions/ProductOutputActions'
import { RootState } from '@/core/redux/store'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import DotBarSkeleton from '@/components/Skeletons/DotBarSkeleton'

interface Props {
  currentPlantId: string
  keyTab: number
}
interface powerSources {
  name: string
  code: string
  power: number
  value: number
  color: string
}

interface productOutputOverview {
  total: number
  average: number
  detail: powerSources[]
}
function TotalProductionOutputFactDetail(props: Props) {
  const { currentPlantId, keyTab } = props
  const router = useRouter()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalPower, setTotalPower] = useState<number>(0)
  const [averagePower, setAveragePower] = useState<number>(0)
  const [powerSources, setPowerSources] = useState<powerSources[]>([])
  const { activeTabIndex } = useSelector((state: RootState) => state.powerSlice)
  const { countRefesh } = useSelector((state: any) => state.factoryDetailSlice)

  useEffect(() => {
    if (activeTabIndex === keyTab) {
      dispatch(getProductOutputOverviewFactDetail({
        factoryId: currentPlantId,
        getDataFromApi: getDataFromApi,
        setLoading: setLoading
      }))
    }
  }, [activeTabIndex, countRefesh])

  const getDataFromApi = (data: productOutputOverview) => {
    setTotalPower(data.total)
    setAveragePower(data.average)
    setPowerSources(data.detail)
  }
  const setLoading = (value: boolean) => {
    setIsLoading(value)
  }

  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Left side - Total Power */}
        <View style={styles.leftSection}>
          {/* <Text style={styles.totalPower}>{totalPower}</Text> */}
          {isLoading ? <BarSkeleton /> :
            <>
              <Text style={styles.title}>TỔNG SẢN LƯỢNG</Text>
              <AnimatedNumber
                value={totalPower}
                duration={900}
                decimals={2}
                formatter={(n) => Number(n.toFixed(2)).toString()}
                render={(text) => <GradientText text={text} fontSize={px.f(64)} colors={'#ff4444'} />}
              />
            </>
          }
          {isLoading ?
            <BarSkeleton
              width={95}
              height={28}
            /> :
            <>
              <Text style={styles.unit}>tr.Wh</Text>
              <Text style={styles.average}>TB: {averagePower} tr.Wh</Text>
            </>
          }
        </View>

        {/* Right side - Power Sources */}
        <View style={styles.rightSection}>
          {isLoading ?
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
