import React from 'react'
import { View } from 'react-native'
import styles from './ProductionOutputFactDetail.styles'
// import ProductOutputRencentDays from './ProductOutputRencentDays/ProductOutputRencentDays'
// import ProuductOutputByHours from './ProductionOutputByHours/ProductionOutputByHours'
// import TotalProductionOutput from './TotalProductionOutput/TotalProductionOutput'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import TotalProductionOutputFactDetail from './TotalProductionOutputFactDetail/TotalProductionOutputFactDetail'
import ProuductOutputByHoursFactDetail from './ProductionOutputByHoursFactDetail/ProductionOutputByHoursFactDetail'
import ProductOutputRencentDaysFactDetail from './ProductOutputRencentDaysFactDetail/ProductOutputRencentDaysFactDetail'
function ProductionOutputFactDetail() {
  return (
    <SectionContainer title="Sản lượng">
      <View style={styles.section}>
        <TotalProductionOutputFactDetail />
        {/* <TotalProductionOutput /> */}
      </View>
      <View style={styles.section}>
        <ProuductOutputByHoursFactDetail />
        {/* <ProuductOutputByHours /> */}
      </View>
      <View style={styles.section}>
        <ProductOutputRencentDaysFactDetail />
        {/* <ProductOutputRencentDays /> */}
      </View>
    </SectionContainer>
  )
}

export default ProductionOutputFactDetail
