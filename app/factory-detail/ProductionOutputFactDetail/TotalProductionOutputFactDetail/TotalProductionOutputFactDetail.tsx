import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { getProductOutputOverviewFactDetail } from '@/core/redux/domains/production-output'
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
  details: powerSources[]
  unit:string
}
function TotalProductionOutputFactDetail(props: Props) {
  const { currentPlantId, keyTab } = props
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalPower, setTotalPower] = useState<number>(0)
  const [averagePower, setAveragePower] = useState<number>(0)
  const [powerSources, setPowerSources] = useState<powerSources[]>([])
  const [unit, setUnit] = useState<string>('tr.KWh')
  const { activeTabIndex } = useAppSelector((state: RootState) => state.powerSlice)
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const { selectedCompanyId: companyId } = useAppSelector((state: RootState) => state.companyPlantSlice)
  const timerCallback = useCallback(() => {
    if (activeTabIndex === keyTab) {
      dispatch(
        getProductOutputOverviewFactDetail({
          factoryId: currentPlantId,
          companyId: companyId,
          getDataFromApi: getDataFromApi,
          setLoading: setLoading,
        }),
      )
    }
  }, [activeTabIndex, keyTab, companyId, dispatch])
  useAlignedHourlyTimer(timerCallback)

  useEffect(() => {
    if (activeTabIndex === keyTab) {
      dispatch(
        getProductOutputOverviewFactDetail({
          factoryId: currentPlantId,
          companyId: companyId,
          getDataFromApi: getDataFromApi,
          setLoading: setLoading,
        }),
      )
    }
  }, [activeTabIndex, countRefesh, companyId])

  const getDataFromApi = (data: productOutputOverview) => {
    setTotalPower(data.total)
    setAveragePower(data.average)
    setPowerSources(data.details || [])
    setUnit(data.unit || 'tr.KWh')
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
      unit={unit}
      type="product-output"
    />
  )
}

export default TotalProductionOutputFactDetail
