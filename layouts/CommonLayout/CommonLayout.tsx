import { View, Text } from 'react-native'
import OverviewCard from '@/components/OverviewCard/OverviewCard';
import PowerHistory from '@/components/PowerHistory/PowerHistory';
import ProductionHistory from '@/components/ProductionHistory/ProductionHistory';
import styles from "./CommonLayout.styles"

function CommonLayout() {
    // const { } = props
    // Dữ liệu 7 ngày
    const powerData = [
        { value: 126, label: 'Hôm nay' },
        { value: 124, label: 'Hôm qua' },
        { value: 128, label: '12/11' },
        { value: 122, label: '1/11' },
        { value: 130, label: '11/11' },
        { value: 125, label: '10/11' },
        { value: 127, label: '9/11' },
    ];
    const powerSources = [
        {
            name: 'Buôn Kuốp',
            code: 'BK',
            power: 54,
            color: '#4ade80', // Green
        },
        {
            name: 'Srépok 3',
            code: 'SPS3',
            power: 42,
            color: '#c084fc', // Purple
        },
        {
            name: 'Buôn Tua Srah',
            code: 'BTS',
            power: 30,
            color: '#fb923c', // Orange
        },
    ];
    // Dữ liệu 7 ngày
    const productionData = [
        { date: 'Hôm nay', actual: 2.4, contract: 2.5 },
        { date: 'Hôm qua', actual: 2.6, contract: 2.5 },
        { date: '12/11', actual: 2.7, contract: 2.5 },
        { date: '11/11', actual: 2.3, contract: 2.5 },
        { date: '10/11', actual: 2.6, contract: 2.5 },
        { date: '09/11', actual: 2.2, contract: 2.5 },
        { date: '08/11', actual: 2.4, contract: 2.5 },
    ];
    return (
        <View style={styles.layout}>
            <View style={styles.container}>
                <Text>Công suất</Text>
                <OverviewCard
                    totalPower={126}
                    averagePower={118}
                    sources={powerSources}
                />
                <PowerHistory days={powerData} unit="MW" />
                <ProductionHistory days={productionData} unit="tr.Wh" />
            </View>
        </View>
    )
}


export default CommonLayout
