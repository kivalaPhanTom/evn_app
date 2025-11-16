import React from 'react'
import { View } from 'react-native'
import CommonLayout from '@/layouts/CommonLayout/CommonLayout'
import styles from './ProductionOutput.styles'
import ProductOutputRencentDays from './ProductOutputRencentDays/ProductOutputRencentDays'
import ProuductOutputByHours from './ProductionOutputByHours/ProductionOutputByHours'
import TotalProductionOutput from './TotalProductionOutput/TotalProductionOutput'


function ProductionOutput() {
    return (
        <CommonLayout title="Sản lượng">
            <View style={styles.section}>
                <TotalProductionOutput/>
            </View>
            <View style={styles.section}>
                <ProuductOutputByHours/>
            </View>
              <View style={styles.section}>
                <ProductOutputRencentDays />
            </View>
        </CommonLayout>
    )
}

export default ProductionOutput
