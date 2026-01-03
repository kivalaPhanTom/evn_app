import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PowerPrices from './PowerPrices';
import TotalRevenueExpenses from './TotalRevenueExpenses';
import ReveneCompareByTime from './ReveneCompareByTime';
import DatePicker from '@/components/DatePicker/DatePicker.component'
import ScrollableTabBar from '@/components/ScrollableTabBar/ScrollableTabBar.component'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/core/redux/store'
import { getRevebnuePowerPrices, getRevenueTotalExpense } from '@/core/redux/Actions/RevenueProfitActions'
import { getInflow, getOutflow, getTurbineflow, getUpstreamWaterLevel } from '@/core/redux/Actions/HydrologyActions'
interface Props { }

const data = {
    powerPrices: [
        { label: 'GIÁ TT BÌNH QUÂN NGÀY', value: '1,245', unit: 'Đồng/kWh', type: 'blue' },
        { label: 'GIÁ CÔNG SUẤT BQ', value: '156', unit: 'Đồng/kWh', type: 'gray' },

        // ✅ FULL WIDTH
        {
            label: 'GIÁ THỊ TRƯỜNG TOÀN PHẦN',
            value: '1,401',
            unit: 'Đồng/kWh',
            type: 'green',
            full: true,
        },

        { label: 'GIÁ TRẦN CHÀO', value: '1,590', unit: 'Đồng/kWh', type: 'gray' },
        { label: 'GIÁ HĐ THÁNG (TẠM TÍNH)', value: '1,180', unit: 'Đồng/kWh', type: 'gray' },

        // ✅ FULL WIDTH
        {
            label: 'GIÁ BIẾN ĐỔI NHIÊN LIỆU',
            value: '0',
            unit: 'Đồng/kWh',
            note: 'Thuỷ điện không áp dụng',
            type: 'gray',
            full: true,
        },
    ],
};

function SectionBox({ children, style }: any) {
    return <View style={style}>{children}</View>;
}
function getCurrentPlantId(activeTab: string): string {
    let result: string = '';
    switch (activeTab) {
        case 'buon-tua-srah':
            result = 'BTS'
            break
        case 'buon-kuop':
            result = 'BK'
            break
        case 'srepok-3':
            result = 'SP3'
            break
        default:
            break
    }
    return result
}
export default function RevenueDetail(props: Props) {
    const dispatch = useDispatch()
    // const { hydrologyPlants } = useSelector((state: RootState) => state.hydrologySlice)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [activeTab, setActiveTab] = useState<string>('BTS')
    const hydrologyPlants = {
        plantsData: [
            { abbreviation: 'buon-tua-srah', name: 'Buôn Tua Srah' },
            { abbreviation: 'buon-kuop', name: 'Buôn Kuốp' },
            { abbreviation: 'srepok-3', name: 'Srepok 3' },
        ]
    }
    const formattedOneYearAgo = new Date(
        new Date(selectedDate).setFullYear(selectedDate.getFullYear() - 1),
    ).toLocaleDateString('vi-VN')

    const tabs = hydrologyPlants?.plantsData?.map((plant) => {
        const plantId = getCurrentPlantId(plant.abbreviation)
        return {
            id: plantId,
            label: plant.name,
        }
    })

    const upstreamData = useSelector((state: any) => state.hydrologySlice.upstreamWaterLevel || {})
    const inflow = useSelector((state: any) => state.hydrologySlice.inflow || {})
    const outflow = useSelector((state: any) => state.hydrologySlice.outflow || {})
    const turbineflow = useSelector((state: any) => state.hydrologySlice.turbineflow || {})

    useEffect(() => {
        const formattedDate = selectedDate.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const payload = {
            currentPlantId: activeTab,
            date: formattedDate,
        }
        dispatch(getUpstreamWaterLevel(payload))
        dispatch(getInflow(payload))
        dispatch(getOutflow(payload))
        dispatch(getTurbineflow(payload))
        dispatch(getRevebnuePowerPrices(payload))
        dispatch(getRevenueTotalExpense({
            date: formattedDate,
        }))
    }, [activeTab, selectedDate])

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
            <Text style={styles.title}>Chi tiết Doanh thu</Text>
            <Text style={styles.companyName} >Công ty thủy điện Buôn Kuốp</Text>
            <ScrollableTabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Date Picker */}
            <View style={{ marginBottom: 20, paddingHorizontal: 0 }}>
                <DatePicker
                    value={selectedDate}
                    onChange={setSelectedDate}
                    format="DD/MM/YYYY"
                    textColor="#fff"
                    borderColor="rgba(255,255,255,0.15)"
                    backgroundColor="rgba(26, 35, 50, 0.6)"
                />
            </View>
            <PowerPrices />
            <TotalRevenueExpenses />
            <ReveneCompareByTime
                fromDate="01/11/2024"
                toDate="14/11/2024"
                metricLabel="Tổng doanh thu theo thị trường điện"
                onPressFrom={() => console.log('Pick from date')}
                onPressTo={() => console.log('Pick to date')}
                onPressMetric={() => console.log('Open dropdown')}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "600",
        textAlign: "center",
        color: "white",
        marginBottom: 5
    },
    companyName: {
        textAlign: "center",
        color: "white",
        marginBottom: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#0B1220',
        padding: 16,
    },

    sectionTitle: {
        color: '#94A3B8',
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 12,
    },

    gridWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    sectionBox: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        width: '48%',
        marginRight: '2%',
        minHeight: 110,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.28,
        shadowRadius: 12,
        elevation: 5,
    },

    /** 🔵 XANH DƯƠNG DỊU */
    boxBlue: {
        backgroundColor: 'rgba(30, 99, 255, 0.18)',
        borderWidth: 1,
        borderColor: 'rgba(96, 165, 250, 0.6)',
    },

    /** 🟢 XANH LÁ DỊU */
    boxGreen: {
        backgroundColor: 'rgba(16, 185, 129, 0.16)',
        borderWidth: 1,
        borderColor: 'rgba(52, 211, 153, 0.6)',
    },

    /** ⚪ XÁM */
    boxGray: {
        backgroundColor: 'rgba(30, 41, 59, 0.85)',
        borderWidth: 1,
        borderColor: '#334155',
    },

    fullWidth: {
        width: '100%',
        marginRight: 0,
    },

    label: {
        color: '#94A3B8',
        fontSize: 11,
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        marginBottom: 6,
    },

    value: {
        color: '#F8FAFC',
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 28,
    },

    unit: {
        color: '#94A3B8',
        fontSize: 11,
        marginTop: 2,
    },

    note: {
        color: '#64748B',
        fontSize: 11,
        marginTop: 6,
    },
});
