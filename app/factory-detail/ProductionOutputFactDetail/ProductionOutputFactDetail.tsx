import React from 'react'
import { View } from 'react-native'
import styles from './ProductionOutputFactDetail.styles'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import TotalProductionOutputFactDetail from './TotalProductionOutputFactDetail/TotalProductionOutputFactDetail'
import ProuductOutputByHoursFactDetail from './ProductionOutputByHoursFactDetail/ProductionOutputByHoursFactDetail'
import ProductOutputRencentDaysFactDetail from './ProductOutputRencentDaysFactDetail/ProductOutputRencentDaysFactDetail'
function ProductionOutputFactDetail() {
  return (
    <SectionContainer title="Sản lượng">
      <View style={styles.section}>
        <TotalProductionOutputFactDetail />
      </View>
      <View style={styles.section}>
        <ProuductOutputByHoursFactDetail />
      </View>
      <View style={styles.section}>
        <ProductOutputRencentDaysFactDetail />
      </View>
    </SectionContainer>
  )
}

export default ProductionOutputFactDetail
