import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '@/core/redux/hooks'
import TotalRevenueExpensesItem from './TotalRevenueExpensesItem';


export default function TotalRevenueExpenses() {
    const { revenueCostSummary } = useAppSelector((state: any) => state.revenueProfitSlice)
    return (
        <View style={[styles.card]}>
            <Text style={{ color: '#94A3B8', marginTop: 5, fontWeight: '700' }}>
                TỔNG DOANH THU VÀ CHI PHÍ
            </Text>
            <TotalRevenueExpensesItem
                title="Doanh thu thị trường điện"
                variant="blue"
                items={revenueCostSummary.MarketRevenue.ByPlant}
                total={revenueCostSummary.MarketRevenue.Total}
                totalUnit={revenueCostSummary.MarketRevenue.Unit}
            />

            <TotalRevenueExpensesItem
                title="Doanh thu hợp đồng"
                variant="purple"
                items={revenueCostSummary.ContractRevenue.ByPlant}
                total={revenueCostSummary.ContractRevenue.Total}
                totalUnit={revenueCostSummary.ContractRevenue.Unit}
            />

            <TotalRevenueExpensesItem
                title="Tổng chi phí"
                variant="red"
                items={revenueCostSummary.TotalCost.ByPlant}
                total={revenueCostSummary.TotalCost.Total}
                totalUnit={revenueCostSummary.TotalCost.Unit}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        marginTop: 0,
    },
});
