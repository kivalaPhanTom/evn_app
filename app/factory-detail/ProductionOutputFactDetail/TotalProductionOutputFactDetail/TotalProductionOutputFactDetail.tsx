import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductOutputOverviewFactDetail } from '@/core/redux/Actions/ProductOutputActions'
import { RootState } from '@/core/redux/store'
import TotalPower from '@/components/TotalPower/TotalPower'
import { useAlignedHourlyTimer } from '@/core/hooks/use-aligned-hourly-timer'
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
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalPower, setTotalPower] = useState<number>(0)
  const [averagePower, setAveragePower] = useState<number>(0)
  const [powerSources, setPowerSources] = useState<powerSources[]>([])
  const { activeTabIndex } = useSelector((state: RootState) => state.powerSlice)
  const { countRefesh } = useSelector((state: any) => state.refreshSlice)
  const timerCallback = useCallback(() => {
    if (activeTabIndex === keyTab) {
      dispatch(
        getProductOutputOverviewFactDetail({
          factoryId: currentPlantId,
          getDataFromApi: getDataFromApi,
          setLoading: setLoading,
        }),
      )
    }
  }, [activeTabIndex, keyTab, dispatch])
  useAlignedHourlyTimer(timerCallback)

  useEffect(() => {
    if (activeTabIndex === keyTab) {
      dispatch(
        getProductOutputOverviewFactDetail({
          factoryId: currentPlantId,
          getDataFromApi: getDataFromApi,
          setLoading: setLoading,
        }),
      )
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
    <TotalPower
      title={'A \u2211 lũy kế ngày'}
      average={averagePower}
      total={totalPower}
      detail={powerSources}
      isLoading={isLoading}
      unit="tr.KWh"
    />
  )
}

export default TotalProductionOutputFactDetail
