import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import styles from './PowerRecentDaysFactDetail.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { useRouter } from 'expo-router'
import { getPowerByDays } from '@/core/redux/Actions/PowerActions'
import { RootState } from '@/core/redux/store'
import SquareSkelenton from '@/components/Skeletons/SquareSkelenton'
import { getPowerByDaysFactDetail } from '@/core/redux/Actions/PowerActions'
import { setPowerOverviewFactDetail, setPowerByTimeFactDetail, setPowerByDaysFactDetail, setComparePowerFactDetail, setLoadingFactDetail } from '@/core/redux/slices/PowerFactDetailSlice'
// import { getPowerOverivew, getPowerByTime, getPowerByDays, getComparePower, getPowerOverivewFactDetail, getPowerByDaysFactDetail } from '../Actions/PowerActions'
interface PowerByDays {
  value: number
  date: string
}
interface Props { 
   currentPlantId: string
}
function PowerRecentDaysFacrDetail(props: Props) {
  const { currentPlantId } = props
  const router = useRouter()
  const dispatch = useDispatch()
  const [powerData, setPowerByDays] = useState<PowerByDays[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const { powerByDays: { powerData }, isLoadingNearCurrentDays } = useSelector((state: RootState) => state.powerSlice)

  const unit = 'tr.Wh'
  const getDataFromApi = (data: PowerByDays[]) => {
    setPowerByDays(data)
  }
  const setLoading = (value: boolean) => {
    setIsLoading(value)
  }
  useEffect(() => {
    dispatch(getPowerByDaysFactDetail({
      factoryId: currentPlantId,
      getDataFromApi: getDataFromApi,
      setLoading: setLoading
    }))
  }, [currentPlantId])

  return (
    <AnimatedCardContainer>
      <View>
        <View style={styles.content}>
          <Text style={styles.title}>CÔNG SUẤT 7 NGÀY GẦN NHẤT</Text>

          {/* Scrollable Power Values */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {isLoading ? <SquareSkelenton count={4} /> :
              <>
                {powerData.map((day, index) => (
                  <View key={index} style={styles.valueCard}>
                    <View style={styles.valueItem}>
                      <Text style={styles.powerValue}>{day.value}</Text>
                      <Text style={styles.dayLabel}>{day.date}</Text>
                    </View>
                  </View>
                ))}
              </>
            }

          </ScrollView>

          {/* Bottom Info */}
          <View style={styles.bottomInfo}>
            <View style={styles.hintRow}>
              <View style={styles.legendDot} />
              <Text style={styles.hintText}>Lướt ngang để xem thêm →</Text>
            </View>
            <Text style={styles.unitText}>Đơn vị: {unit}</Text>
          </View>
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default PowerRecentDaysFacrDetail
