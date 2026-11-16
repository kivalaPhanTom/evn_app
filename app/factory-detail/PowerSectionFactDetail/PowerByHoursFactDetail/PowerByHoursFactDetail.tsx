import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { RootState } from '@/core/redux/store'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { getPowerByTimeFactDetail } from '@/core/redux/domains/power'
import PowerByHours from '@/components/PowerByHours/PowerByHours'
import { usePlantSelection } from '@/core/hooks/use-plant-selection'
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
  offeredPower: number
  HourlyPowerList: HourlyPowerList[]
  offeredPowerList: number[]
  unit: string
}

function PowerByHoursFactDetail(props: Props) {
  const router = useRouter()
  const { currentPlantId, keyTab } = props
  const dispatch = useAppDispatch()
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const { activeTabIndex } = useAppSelector((state: RootState) => state.powerSlice)
  const { selectedCompanyId: companyId } = useAppSelector((state: RootState) => state.companyPlantSlice)
  const { currentPlantId: plantId } = usePlantSelection(currentPlantId)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { currentDate, unit, HourlyPowerList, currentTime, offeredPowerList, currentPower, offeredPower  } = useAppSelector((state: any) => state.powerSlice.powerByTime)

  useEffect(() => {
    if (activeTabIndex === keyTab && plantId) {
      dispatch(
        getPowerByTimeFactDetail({
          factoryId: plantId,
          companyId,
          getDataFromApi: () => {},
          setLoading: setLoading,
        }),
      )
    }
  }, [plantId, activeTabIndex, countRefesh, companyId, keyTab, dispatch])

  const setLoading = (value: boolean) => {
    setIsLoading(value)
  }
  const onPressCard = () => {
    router.push({
      pathname: '/product-power-detail',
      params: {
        currentPlantId: currentPlantId,
      },
    })
  }

  return (
    <PowerByHours
      isLoading={isLoading}
      currentDate={currentDate}
      currentPower={currentPower}
      currentTime={currentTime}
      offeredPower={offeredPower}
      HourlyPowerList={HourlyPowerList}
      onPressCard={onPressCard}
      offeredPowerList={offeredPowerList}
      unit={unit}
      scrollToEnd={true}
    />
  )
}

export default PowerByHoursFactDetail
