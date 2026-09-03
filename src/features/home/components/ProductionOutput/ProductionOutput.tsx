import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import { View } from 'react-native'
import styles from './ProductionOutput.styles'
import ProductOutputRencentDays from '@/components/ProductOutputRencentDays/ProductOutputRencentDays'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { RootState } from '@/core/redux/store'
import { getProductOutputOverview, getProductOutputByHours, getProductOutputByDays } from '@/core/redux/domains/production-output'
import TotalPower from '@/components/TotalPower/TotalPower'
import ProductionOutputByHours from '@/components/ProductionOutputByHours/ProductionOutputByHours'
import { useAlignedHourlyTimer } from '@/core/hooks/use-aligned-hourly-timer'

function ProductionOutput() {
  const { countRefesh } = useSelector((state: any) => state.refreshSlice)
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    productOutputOverview: { totalPower, averagePower, powerSources },
    isLoadingOverview
  } = useSelector((state: RootState) => state.productOutputSlice)
  const { productOutputByHours, isLoadingByHours } = useSelector((state: RootState) => state.productOutputSlice)
  const { productOutputByDays: { productionData }, isLoadingNearCurrentDays } = useSelector((state: RootState) => state.productOutputSlice)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear() - 1)

  useAlignedHourlyTimer(() => {
    dispatch(getProductOutputOverview())
  })

  useEffect(() => {
    dispatch(getProductOutputOverview())
    dispatch(getProductOutputByHours())
    dispatch(getProductOutputByDays({n: 7, samePeriodYear: selectedYear}))
  }, [countRefesh])

  const onPressCard = () => {
    router.navigate({ pathname: '/product-output-detail' })
  }
  useEffect(() => {
    dispatch(getProductOutputByDays({n: 7, samePeriodYear: selectedYear}))
  }, [countRefesh, selectedYear])
  
  return (
    <SectionContainer title="Sản lượng (A)">
      <View style={styles.section}>
        <TotalPower
          title={"Q \u2211 lũy kế ngày"}
          average={averagePower}
          total={totalPower}
          detail={powerSources}
          isLoading={isLoadingOverview}
          unit="tr.KWh"
          type='production'
        />
      </View>
      {/* <View style={styles.section}>
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
      </View> */}
      <View style={styles.section}>
        <ProductOutputRencentDays
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          isLoading={isLoadingNearCurrentDays}
          productionData={productionData}
          onPressCard={onPressCard}
        />
      </View>
    </SectionContainer>
  )
}

export default ProductionOutput
