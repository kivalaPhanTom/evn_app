import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { RootState } from '@/core/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { getPowerByTimeFactDetail } from '@/core/redux/Actions/PowerActions'
import PowerByHours from '@/components/PowerByHours/PowerByHours'
interface Props {
  currentPlantId: string
  keyTab: number
}
interface HourlyPowerList {
  value: number
  label: string
}
interface PowerByTime {
  currentDate: string
  currentPower: number
  currentTime: string
  avgPower: number
  HourlyPowerList: HourlyPowerList[]
}
function PowerByHoursFactDetail(props: Props) {
  const router = useRouter()
  const { currentPlantId, keyTab } = props
  const dispatch = useDispatch()
  const { countRefesh } = useSelector((state: any) => state.factoryDetailSlice)
  const { activeTabIndex } = useSelector((state: RootState) => state.powerSlice)
  const [HourlyPowerList, setHourlyPowerList] = useState<HourlyPowerList[]>([])
  const [avgPower, setAvgPower] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPower, setCurrentPower] = useState<number>(0)
  const { currentDate } = useSelector((state: any) => state.powerSlice.powerByTime)

  useEffect(() => {
    if (activeTabIndex === keyTab) {
      dispatch(getPowerByTimeFactDetail({
        factoryId: currentPlantId,
        getDataFromApi: getDataFromApi,
        setLoading: setLoading
      }))
    }
  }, [currentPlantId, activeTabIndex, countRefesh])

  const getDataFromApi = (data: PowerByTime) => {
    setAvgPower(data.avgPower)
    setCurrentPower(data.currentPower)
    setHourlyPowerList(data.HourlyPowerList)
  }

  const setLoading = (value: boolean) => {
    setIsLoading(value)
  }
  const onPressCard = () => {
    router.push({
      pathname: '/product-power-detail', params: {
        currentPlantId: currentPlantId,
      },
    })
  }

  return (
    <PowerByHours
      isLoading={isLoading}
      currentDate={currentDate}
      currentPower={currentPower}
      currentTime={currentDate}
      avgPower={avgPower}
      HourlyPowerList={HourlyPowerList}
      onPressCard = {onPressCard}
    />
  )
}

export default PowerByHoursFactDetail
