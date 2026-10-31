import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import ProductionOutputByHours from '@/components/ProductionOutputByHours/ProductionOutputByHours'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { getProductOutputByHoursFactDetail } from '@/core/redux/domains/production-output'
import { RootState } from '@/core/redux/store'
import { View } from 'react-native'
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
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const { activeTabIndex } = useAppSelector((state: RootState) => state.powerSlice)
  const { selectedCompanyId: companyId } = useAppSelector((state: RootState) => state.companyPlantSlice)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [contractPowerValue, setContractPowerValue] = useState<number>(0)
  const [currentPowerValue, setCurrentPowerValue] = useState<number>(0)
  const [listValueByHours, setListValueByHours] = useState<{ label: string; value: number }[]>([])
  const { productOutputByHours } = useAppSelector((state: RootState) => state.productOutputSlice)
  const setLoading = (value: boolean) => {
    setIsLoading(value)
  }

  useEffect(() => {
    if (activeTabIndex === keyTab) {
      dispatch(
        getProductOutputByHoursFactDetail({
          factoryId: currentPlantId,
          companyId: companyId,
          getDataFromApi: getDataFromApi,
          setLoading: setLoading,
        }),
      )
    }
  }, [activeTabIndex, countRefesh, companyId])

  const getDataFromApi = (data: productOutputByHours) => {
    setContractPowerValue(data.contractPowerValue)
    setCurrentPowerValue(data.currentPowerValue)
    setListValueByHours(data.listValueByHours)
  }
  const onPressCard = () => {
    router.push({ pathname: '/product-output-detail', params: { currentPlantId: currentPlantId } })
  }
  return (
    // <ProductionOutputByHours
    //   isLoading={isLoading}
    //   currentDate={productOutputByHours.currentDate}
    //   contractPowerValue={contractPowerValue}
    //   currentPowerValue={currentPowerValue}
    //   currentTime={productOutputByHours.currentTime}
    //   unit={productOutputByHours.unit}
    //   barGroups={listValueByHours}
    //   onPressCard={onPressCard}
    // />
    <View></View>
  )
}

export default ProductionOutputByHoursFactDetail
