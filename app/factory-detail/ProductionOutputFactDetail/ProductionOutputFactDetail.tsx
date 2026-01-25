import React from 'react'
import { View } from 'react-native'
import styles from './ProductionOutputFactDetail.styles'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import TotalProductionOutputFactDetail from './TotalProductionOutputFactDetail/TotalProductionOutputFactDetail'
import ProuductOutputByHoursFactDetail from './ProductionOutputByHoursFactDetail/ProductionOutputByHoursFactDetail'
import ProductOutputRencentDaysFactDetail from './ProductOutputRencentDaysFactDetail/ProductOutputRencentDaysFactDetail'
interface Props { 
   currentPlantId: string
   keyTab: number
}
function ProductionOutputFactDetail(props: Props) {
  const { currentPlantId, keyTab } = props
  return (
    <SectionContainer title="Sản lượng (Q)">
      <View style={styles.section}>
        <TotalProductionOutputFactDetail currentPlantId={currentPlantId} keyTab={keyTab} />
      </View>
      <View style={styles.section}>
        <ProuductOutputByHoursFactDetail currentPlantId={currentPlantId} keyTab={keyTab} />
      </View>
      <View style={styles.section}>
        <ProductOutputRencentDaysFactDetail currentPlantId={currentPlantId} keyTab={keyTab} />
      </View>
    </SectionContainer>
  )
}

export default ProductionOutputFactDetail
