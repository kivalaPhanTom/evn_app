import React, { useEffect, useState } from 'react'
import ProductOutputRencentDays from '@/components/ProductOutputRencentDays/ProductOutputRencentDays'
import { useDispatch, useSelector } from 'react-redux'
import { getProductOutputByDaysFactDetail } from '@/core/redux/Actions/ProductOutputActions'
import { RootState } from '@/core/redux/store'
interface Props {
  currentPlantId: string
  keyTab: number
}
interface productionData {
  date: string
  actual: number
  contract: number
}
function ProductOutputRencentDaysFactDetail(props: Props) {
  const { currentPlantId, keyTab } = props
  const dispatch = useDispatch()
  const { countRefesh } = useSelector((state: any) => state.factoryDetailSlice)
  const { activeTabIndex } = useSelector((state: RootState) => state.powerSlice)
  const [productionData, setProductionData] = useState<productionData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (activeTabIndex === keyTab) {
      dispatch(getProductOutputByDaysFactDetail({
        factoryId: currentPlantId,
        getDataFromApi: getDataFromApi,
        setLoading: setLoading
      }))
    }
  }, [activeTabIndex, countRefesh])

  const setLoading = (value: boolean) => {
    setIsLoading(value)
  }
  const getDataFromApi = (data: productionData[]) => {
    setProductionData(data)
  }

  return (
    <ProductOutputRencentDays
      isLoading={isLoading}
      productionData={productionData}
    />
  )
}

export default ProductOutputRencentDaysFactDetail
