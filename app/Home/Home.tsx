import React from 'react'
import { View,ScrollView } from 'react-native'
import PowerSection from './PowerSection/PowerSection'
import ProductionOutput from './ProductionOutput/ProductionOutput'
interface Props {}

function Home(props: Props) {
    const {} = props

    return (
        <View style={{ backgroundColor: 'transparent' }}>
            <PowerSection/>
            <ProductionOutput />
        </View>
    )
}

export default Home
