import React, { useEffect, useState } from 'react'
import ProductionOutputByHours from '@/components/ProductionOutputByHours/ProductionOutputByHours'
import { useDispatch, useSelector } from 'react-redux'
import { getProductOutputByHoursFactDetail } from '@/core/redux/Actions/ProductOutputActions'
import { RootState } from '@/core/redux/store'
interface Props {
  currentPlantId: string
  keyTab: number
}
interface productOutputByHours {
  currentDate: string
  contractPowerValue: number
  currentPowerValue: number
  currentTime: string
  unit: string
  listValueByHours: { label: string; value: number }[]
}

function ProductionOutputByHoursFactDetail(props: Props) {
  const { currentPlantId, keyTab } = props
  const dispatch = useDispatch()
  const { countRefesh } = useSelector((state: any) => state.factoryDetailSlice)
  const { activeTabIndex } = useSelector((state: RootState) => state.powerSlice)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [contractPowerValue, setContractPowerValue] = useState<number>(0)
  const [currentPowerValue, setCurrentPowerValue] = useState<number>(0)
  const [listValueByHours, setListValueByHours] = useState<{ label: string; value: number }[]>([])
  const { productOutputByHours } = useSelector((state: RootState) => state.productOutputSlice)
  const setLoading = (value: boolean) => {
    setIsLoading(value)
  }

  useEffect(() => {
    if (activeTabIndex === keyTab) {
      dispatch(getProductOutputByHoursFactDetail({
        factoryId: currentPlantId,
        getDataFromApi: getDataFromApi,
        setLoading: setLoading
      }))
    }
  }, [activeTabIndex, countRefesh])

  const getDataFromApi = (data: productOutputByHours) => {
    setContractPowerValue(data.contractPowerValue)
    setCurrentPowerValue(data.currentPowerValue)
    setListValueByHours(data.listValueByHours)
  }
 
  return (
    <ProductionOutputByHours
      isLoading={isLoading}
      currentDate={productOutputByHours.currentDate}
      contractPowerValue={contractPowerValue}
      currentPowerValue={currentPowerValue}
      currentTime={productOutputByHours.currentTime}
      unit={productOutputByHours.unit}
      barGroups={listValueByHours}
    />
  )
}

export default ProductionOutputByHoursFactDetail
