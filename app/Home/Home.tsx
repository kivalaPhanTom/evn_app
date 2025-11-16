import React from 'react'
import { View,ScrollView } from 'react-native'
import PowerSection from './PowerSection/PowerSection'
import ProductionOutput from './ProductionOutput/ProductionOutput'
interface Props {}

function Home(props: Props) {
    const {} = props

    return (
        <View>
            <PowerSection/>
            <ProductionOutput />
        </View>
    )
}

export default Home
