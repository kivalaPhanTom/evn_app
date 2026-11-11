import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '@/core/redux/hooks'
import TotalRevenueExpensesItem from './TotalRevenueExpensesItem';
import { useAppTheme } from '@/core/hooks/use-app-theme';


export default function TotalRevenueExpenses() {
    const isDark = useAppTheme() === 'dark';
    const { revenueCostSummary } = useAppSelector((state: any) => state.revenueProfitSlice)
    const titleColor = isDark ? '#94A3B8' : 'rgba(61,61,61,0.8)';
    return (
        <View style={[styles.card]}>
            <Text style={[styles.title, { color: titleColor }]}>
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
    title: {
        marginTop: 5,
        fontWeight: '700',
        fontSize: 13,
        letterSpacing: 1,
        marginBottom: 12,
    },
});
