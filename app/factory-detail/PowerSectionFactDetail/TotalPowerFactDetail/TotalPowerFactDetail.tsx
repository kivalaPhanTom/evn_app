import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text } from 'react-native'
import styles from './TotalPowerFactDetail.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber.component'
import { px } from '@/core/utils/scale'
import GradientText from '@/components/GradientText/GradientText.component'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import DotBarSkeleton from '@/components/Skeletons/DotBarSkeleton'
import { getPowerOverivewFactDetail } from '@/core/redux/Actions/PowerActions'
interface PowerDetail {
  code: string
  color: string
  name: string
  value: number
}
interface TotalPowerFactDetailProps {
  currentPlantId: string
}
function TotalPowerFactDetail(props: TotalPowerFactDetailProps) {
  const { currentPlantId } = props
  const dispatch = useDispatch()
  const [average, setAverage] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [detail, setDetail] = useState<PowerDetail[]>([])
  const [isLoadingOverview, setIsLoadingOverview] = useState<boolean>(true)

  const getDataFromApi = (payload: any) => {
    setAverage(payload.average)
    setTotal(payload.total)
    setDetail(payload.detail)
  }
  const setLoading = (value: boolean) => {
    setIsLoadingOverview(value)
  }
  useEffect(() => {
    dispatch(getPowerOverivewFactDetail({
      factoryId: currentPlantId,
      getDataFromApi: getDataFromApi,
      setLoading: setLoading
    }))
  }, [currentPlantId])

  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Left side - Total Power */}
        <View style={styles.leftSection}>

          {isLoadingOverview ? <BarSkeleton /> :
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

          {isLoadingOverview ?
            <BarSkeleton
              width={95}
              height={28}
            /> :
            <>
              <Text style={styles.unit}>MW</Text>
              <Text style={styles.average}>TB: {average} MW</Text>
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
