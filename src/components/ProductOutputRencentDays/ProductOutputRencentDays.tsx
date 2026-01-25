import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import styles from './ProductOutputRencentDays.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import { Colors } from '@/core/constants/colors'

interface ProductionData {
  date: string
  actual: number
  contract: number
}
interface Props {
  isLoading: boolean
  productionData: ProductionData[]
}
function ProductOutputRencentDays(props: Props) {
  const [firstLoading, setFirstLoading] = useState(true)
  const { isLoading, productionData } = props
  const unit = 'tr.Wh'

  useEffect(() => {
    setFirstLoading(true)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      setFirstLoading(false)
    }
  }, [isLoading])

  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Q 7 NGÀY GẦN NHẤT</Text>

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
          {firstLoading || isLoading ?
            <>
              <BarSkeleton width={'100%'} />
              <BarSkeleton width={'100%'} />
              <BarSkeleton width={'100%'} />
              <BarSkeleton width={'100%'} />
              <BarSkeleton width={'100%'} />
              <BarSkeleton width={'100%'} />
              <BarSkeleton width={'100%'} />
            </>
            :
            <>
              {productionData.map((day, index) => {
                const isAboveContract = day.actual >= day.contract
                const actualColor = isAboveContract ? Colors.green : Colors.red

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
            </>
          }
        </View>

        {/* Legend */}
        {/* <View style={styles.legend}>
          <Text style={styles.legendText}>Màu xanh: Đạt/vượt hợp đồng • Màu đỏ: Dưới hợp đồng</Text>
        </View> */}
      </View>
    </AnimatedCardContainer>
  )
}

export default ProductOutputRencentDays
