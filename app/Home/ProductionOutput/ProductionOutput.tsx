import React from 'react'
import { View } from 'react-native'
import CommonLayout from '@/layouts/CommonLayout/CommonLayout'
import styles from './ProductionOutput.styles'
import ProductOutputRencentDays from './ProductOutputRencentDays/ProductOutputRencentDays'


function ProductionOutput() {
    return (
        <CommonLayout title="Sản lượng">
            <View style={styles.section}>
                <ProductOutputRencentDays />
            </View>
        </CommonLayout>
    )
}

export default ProductionOutput
