import React, { useEffect, useState } from 'react'
import ProductOutputRencentDays from '@/components/ProductOutputRencentDays/ProductOutputRencentDays'
import { useDispatch, useSelector } from 'react-redux'
import { getProductOutputByDaysFactDetail } from '@/core/redux/domains/production-output'
import { RootState } from '@/core/redux/store'
import { useRouter } from 'expo-router'

interface Props {
  currentPlantId: string
  keyTab: number
}
interface productionData {
  date: string
  actual: number
  contract: number
  dayOfWeek: string
}
function ProductOutputRencentDaysFactDetail(props: Props) {
  const { currentPlantId, keyTab } = props
  const dispatch = useDispatch()
  const { countRefesh } = useSelector((state: any) => state.refreshSlice)
  const { activeTabIndex } = useSelector((state: RootState) => state.powerSlice)
  const [productionData, setProductionData] = useState<productionData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear() - 1)
  const router = useRouter()

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
  const onPressCard = () => {
    router.push({ pathname: '/product-output-detail', params: { currentPlantId: currentPlantId } })
  }

  return (
    <ProductOutputRencentDays
      isLoading={isLoading}
      productionData={productionData}
      onPressCard={onPressCard}
      selectedYear={selectedYear}
      setSelectedYear={setSelectedYear}
    />
  )
}

export default ProductOutputRencentDaysFactDetail
