import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TotalRevenueExpensesItem from './TotalRevenueExpensesItem';


export default function TotalRevenueExpenses() {
    return (
        <View style={[styles.card]}>
            <Text style={{ color: '#94A3B8', marginTop: 24, fontWeight: '700' }}>
                TỔNG DOANH THU VÀ CHI PHÍ
            </Text>
            <TotalRevenueExpensesItem
                title="Doanh thu thị trường điện"
                variant="blue"
                items={[
                    { label: 'Buôn Tua Srah', value: '1.12', unit: 'tỷ' },
                    { label: 'Buôn Kuốp', value: '0.95', unit: 'tỷ' },
                    { label: 'Srepok 3', value: '0.88', unit: 'tỷ' },
                ]}
                total="2.95"
                totalUnit="tỷ Đồng"
            />

            <TotalRevenueExpensesItem
                title="Doanh thu hợp đồng"
                variant="purple"
                items={[
                    { label: 'Buôn Tua Srah', value: '0.80', unit: 'tỷ' },
                    { label: 'Buôn Kuốp', value: '0.68', unit: 'tỷ' },
                    { label: 'Srepok 3', value: '0.62', unit: 'tỷ' },
                ]}
                total="2.10"
                totalUnit="tỷ Đồng"
            />

            <TotalRevenueExpensesItem
                title="Tổng chi phí"
                variant="red"
                items={[
                    { label: 'Buôn Tua Srah', value: '1.45', unit: 'tỷ' },
                    { label: 'Buôn Kuốp', value: '1.22', unit: 'tỷ' },
                    { label: 'Srepok 3', value: '1.15', unit: 'tỷ' },
                ]}
                total="3.82"
                totalUnit="tỷ Đồng"
            />
        </View>
    );
}
const styles = StyleSheet.create({
    card: {
       marginTop:12,
    },
});
