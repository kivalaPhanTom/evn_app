import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import styles from './ProductOutputRencentDays.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'

function ProductOutputRencentDays() {
  const productionData = [
    { date: 'Hôm nay', actual: 2.4, contract: 2.5 },
    { date: 'Hôm qua', actual: 2.6, contract: 2.5 },
    { date: '12/11', actual: 2.7, contract: 2.5 },
    { date: '11/11', actual: 2.3, contract: 2.5 },
    { date: '10/11', actual: 2.6, contract: 2.5 },
    { date: '09/11', actual: 2.2, contract: 2.5 },
    { date: '08/11', actual: 2.4, contract: 2.5 },
  ]
  const unit = 'tr.Wh'
  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>SẢN LƯỢNG 7 NGÀY GẦN NHẤT</Text>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.col1]}>NGÀY</Text>
          <Text style={[styles.headerText, styles.col2]}>THỰC TẾ</Text>
          <Text style={[styles.headerText, styles.col3]}>HỢP ĐỒNG</Text>
        </View>

        <View style={styles.separator} />

        {/* Table Rows */}
        <View
          style={styles.tableBody}
          // showsVerticalScrollIndicator={false}
        >
          {productionData.map((day, index) => {
            const isAboveContract = day.actual >= day.contract
            const actualColor = isAboveContract ? '#4ade80' : '#ef4444'

            return (
              <View key={index} style={styles.rowCard}>
                <View style={styles.tableRow}>
                  <Text style={[styles.cellText, styles.col1, styles.dateText]}>{day.date}</Text>
                  <View style={styles.col2}>
                    <Text style={[styles.cellText, styles.valueText, { color: actualColor }]}>
                      {day.actual.toFixed(1)} <Text style={styles.unitText}>{unit}</Text>
                    </Text>
                  </View>
                  <View style={styles.col3}>
                    <Text style={[styles.cellText, styles.valueText, styles.contractText]}>
                      {day.contract.toFixed(1)} <Text style={styles.unitText}>{unit}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            )
          })}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendText}>Màu xanh: Đạt/vượt hợp đồng • Màu đỏ: Dưới hợp đồng</Text>
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default ProductOutputRencentDays
