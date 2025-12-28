import React from 'react'
import { View } from 'react-native'
import styles from './ProductionOutputFactDetail.styles'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import TotalProductionOutputFactDetail from './TotalProductionOutputFactDetail/TotalProductionOutputFactDetail'
import ProuductOutputByHoursFactDetail from './ProductionOutputByHoursFactDetail/ProductionOutputByHoursFactDetail'
import ProductOutputRencentDaysFactDetail from './ProductOutputRencentDaysFactDetail/ProductOutputRencentDaysFactDetail'
interface Props { 
   currentPlantId: string
}
function ProductionOutputFactDetail(props: Props) {
  const { currentPlantId } = props
  return (
    <SectionContainer title="Sản lượng">
      <View style={styles.section}>
        <TotalProductionOutputFactDetail currentPlantId={currentPlantId} />
      </View>
      <View style={styles.section}>
        <ProuductOutputByHoursFactDetail currentPlantId={currentPlantId} />
      </View>
      <View style={styles.section}>
        <ProductOutputRencentDaysFactDetail currentPlantId={currentPlantId} />
      </View>
    </SectionContainer>
  )
}

export default ProductionOutputFactDetail
