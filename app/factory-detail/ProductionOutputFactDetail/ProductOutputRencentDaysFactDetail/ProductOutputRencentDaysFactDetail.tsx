import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import styles from './ProductOutputRencentDaysFactDetail.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { useDispatch, useSelector } from 'react-redux'
import { getProductOutputByDaysFactDetail } from '@/core/redux/Actions/ProductOutputActions'
import { RootState } from '@/core/redux/store'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import { Colors } from '@/core/constants/colors'
interface Props {
  currentPlantId: string
  keyTab: number
}
interface productionData {
  date: string
  actual: number
  contract: number
}
function ProductOutputRencentDaysFactDetail(props: Props) {
  const { currentPlantId, keyTab } = props
  const dispatch = useDispatch()
  const { countRefesh } = useSelector((state: any) => state.factoryDetailSlice)
  const { activeTabIndex } = useSelector((state: RootState) => state.powerSlice)
  const [productionData, setProductionData] = useState<productionData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const unit = 'tr.Wh'

  useEffect(() => {
    if (activeTabIndex === keyTab) {
      dispatch(getProductOutputByDaysFactDetail({
        factoryId: currentPlantId,
        getDataFromApi: getDataFromApi,
        setLoading: setLoading
      }))
    }
  }, [activeTabIndex, countRefesh])

  const setLoading = (value: boolean) => {
    setIsLoading(value)
  }
  const getDataFromApi = (data: productionData[]) => {
    setProductionData(data)
  }

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
          {isLoading ?
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
        <View style={styles.legend}>
          <Text style={styles.legendText}>Màu xanh: Đạt/vượt hợp đồng • Màu đỏ: Dưới hợp đồng</Text>
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default ProductOutputRencentDaysFactDetail
