import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'
import PowerRecentDays from '@/components/PowerRecentDays/PowerRecentDays';
import { RootState } from '@/core/redux/store'
import { getPowerByDaysFactDetail } from '@/core/redux/domains/power'
interface PowerByDays {
  value: number
  date: string
  dayOfWeek: string
}
interface Props {
  currentPlantId: string
  keyTab: number
}
function PowerRecentDaysFactDetail(props: Props) {
  const { currentPlantId, keyTab } = props
  const router = useRouter()
  const dispatch = useDispatch()
  const { activeTabIndex } = useSelector((state: RootState) => state.powerSlice)
  const [powerData, setPowerByDays] = useState<PowerByDays[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getDataFromApi = (data: PowerByDays[]) => {
    setPowerByDays(data)
  }
  const setLoading = (value: boolean) => {
    setIsLoading(value)
  }
  useEffect(() => {
    if (activeTabIndex === keyTab) {
      dispatch(getPowerByDaysFactDetail({
        factoryId: currentPlantId,
        getDataFromApi: getDataFromApi,
        setLoading: setLoading
      }))
    }
  }, [currentPlantId, activeTabIndex])

  return (
    <PowerRecentDays
      isLoading={isLoading}
      powerData={powerData}
    />
  )
}

export default PowerRecentDaysFactDetail
