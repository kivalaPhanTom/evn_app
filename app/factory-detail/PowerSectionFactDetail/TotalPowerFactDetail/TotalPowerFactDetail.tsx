import React, { useEffect, useState } from 'react'
import { RootState } from '@/core/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { getPowerOverivewFactDetail } from '@/core/redux/Actions/PowerActions'
import TotalPower from '@/components/TotalPower/TotalPower'
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
  const { countRefesh } = useSelector((state: any) => state.factoryDetailSlice)
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
  useEffect(() => {
    if (activeTabIndex === keyTab) {
      dispatch(getPowerOverivewFactDetail({
        factoryId: currentPlantId,
        getDataFromApi: getDataFromApi,
        setLoading: setLoading
      }))
    }
  }, [currentPlantId, activeTabIndex, countRefesh])

  return (
    <TotalPower
      title="TỔNG CÔNG SUẤT"
      average={average}
      total={total}
      detail={detail}
      isLoading={isLoadingOverview}
    />
  )
}

export default TotalPowerFactDetail
