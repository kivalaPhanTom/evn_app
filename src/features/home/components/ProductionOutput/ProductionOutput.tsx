import React from 'react'
import { View } from 'react-native'
import styles from './ProductionOutput.styles'
import ProductOutputRencentDays from './ProductOutputRencentDays/ProductOutputRencentDays'
import ProuductOutputByHours from './ProductionOutputByHours/ProductionOutputByHours'
import TotalProductionOutput from './TotalProductionOutput/TotalProductionOutput'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'

function ProductionOutput() {
  return (
    <SectionContainer title="Sản lượng">
      <View style={styles.section}>
        <TotalProductionOutput />
      </View>
      <View style={styles.section}>
        <ProuductOutputByHours />
      </View>
      <View style={styles.section}>
        <ProductOutputRencentDays />
      </View>
    </SectionContainer>
  )
}

export default ProductionOutput
