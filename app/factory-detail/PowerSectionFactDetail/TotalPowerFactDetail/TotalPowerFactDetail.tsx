import React, { useEffect, useState } from 'react'
import { RootState } from '@/core/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { getPowerOverivewFactDetail } from '@/core/redux/domains/power'
import TotalPower from '@/components/TotalPower/TotalPower'
import { useAlignedHourlyTimer } from '@/core/hooks/use-aligned-hourly-timer'
interface PowerDetail {
  code: string
  color: string
  name: string
  value: number
}
interface Props {
  currentPlantId: string
  keyTab: number
}
function TotalPowerFactDetail(props: Props) {
  const { currentPlantId, keyTab } = props
  const { activeTabIndex } = useSelector((state: RootState) => state.powerSlice)
  const { countRefesh } = useSelector((state: any) => state.refreshSlice)
  const dispatch = useDispatch()
  const [average, setAverage] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [detail, setDetail] = useState<PowerDetail[]>([])
  const [isLoadingOverview, setIsLoadingOverview] = useState<boolean>(false)

  const getDataFromApi = (payload: any) => {
    setAverage(payload.average)
    setTotal(payload.total)
    setDetail(payload.detail)
  }
  const setLoading = (value: boolean) => {
    setIsLoadingOverview(value)
  }

  useAlignedHourlyTimer(() => {
    if (activeTabIndex === keyTab) {
      dispatch(
        getPowerOverivewFactDetail({
          factoryId: currentPlantId,
          getDataFromApi: getDataFromApi,
          setLoading: setLoading,
        }),
      )
    }
  })
  
  useEffect(() => {
    if (activeTabIndex === keyTab) {
      dispatch(
        getPowerOverivewFactDetail({
          factoryId: currentPlantId,
          getDataFromApi: getDataFromApi,
          setLoading: setLoading,
        }),
      )
    }
  }, [currentPlantId, activeTabIndex, countRefesh])

  return (
    <TotalPower
      title={' P \u2211 phát'}
      type="power"
      average={average}
      total={total}
      detail={detail}
      isLoading={isLoadingOverview}
      unit="MW"
    />
  )
}

export default TotalPowerFactDetail
