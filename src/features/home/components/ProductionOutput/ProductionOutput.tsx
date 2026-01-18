import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import { View } from 'react-native'
import styles from './ProductionOutput.styles'
import ProductOutputRencentDays from '@/components/ProductOutputRencentDays/ProductOutputRencentDays'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { RootState } from '@/core/redux/store'
import { getProductOutputOverview, getProductOutputByHours, getProductOutputByDays } from '@/core/redux/Actions/ProductOutputActions'
import TotalPower from '@/components/TotalPower/TotalPower'
import ProductionOutputByHours from '@/components/ProductionOutputByHours/ProductionOutputByHours'

function ProductionOutput() {
  const { countRefesh } = useSelector((state: any) => state.homeSlice)
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    productOutputOverview: { totalPower, averagePower, powerSources },
    isLoadingOverview
  } = useSelector((state: RootState) => state.productOutputSlice)
  const { productOutputByHours, isLoadingByHours } = useSelector((state: RootState) => state.productOutputSlice)
  const { productOutputByDays: { productionData }, isLoadingNearCurrentDays } = useSelector((state: RootState) => state.productOutputSlice)

  useEffect(() => {
    dispatch(getProductOutputOverview())
    dispatch(getProductOutputByHours())
    dispatch(getProductOutputByDays(7))
  }, [countRefesh])

  const onPressCard = () => {
    router.navigate({ pathname: '/product-output-detail' })
  }
  
  return (
    <SectionContainer title="Sản lượng">
      <View style={styles.section}>
        <TotalPower
          title="TỔNG SẢN LƯỢNG"
          average={averagePower}
          total={totalPower}
          detail={powerSources}
          isLoading={isLoadingOverview}
          unit="tr.Wh"
        />
      </View>
      <View style={styles.section}>
        <ProductionOutputByHours
          isLoading={isLoadingByHours}
          currentDate={productOutputByHours.currentDate}
          contractPowerValue={productOutputByHours.contractPowerValue}
          currentPowerValue={productOutputByHours.currentPowerValue}
          currentTime={productOutputByHours.currentTime}
          unit={productOutputByHours.unit}
          barGroups={productOutputByHours.barGroups}
          onPressCard={onPressCard}
        />
      </View>
      <View style={styles.section}>
        <ProductOutputRencentDays
          isLoading={isLoadingNearCurrentDays}
          productionData={productionData}
        />
      </View>
    </SectionContainer>
  )
}

export default ProductionOutput
