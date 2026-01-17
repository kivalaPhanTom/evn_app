import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import styles from './CompareOutput24h.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { useRouter } from 'expo-router'
import CompareDetailStats from '@/core/shared/CompareDetailStats'
import CompareLegend from '@/core/shared/CompareLegend'
import CompareDashboardOutput from '@/core/shared/CompareDashboard/CompareDashboardOutput'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "@/core/redux/store";

function ProductOutputRencentDays(props: { currentPlantId?: string, isCheckDisableDate: boolean }) {
  const { currentPlantId, isCheckDisableDate } = props;
  const dispatch = useDispatch()
  const {isLoadingCompareProductOutput} = useSelector((state: RootState) => state.productOutputSlice)
  const compareProductOutput = useSelector((state: RootState) => state.productOutputSlice.compareProductOutput || {})
  const { Unit = '', BarChartData, compareLineChartData, Summary, Contractvalue } = compareProductOutput
 
  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>So sánh sản lượng 24h</Text>
          {/* <Text style={styles.live}>LIVE</Text> */}
        </View>

        {/* Legend */}
        <CompareLegend displayType="output" />

        {/* Dashboard */}
        <CompareDashboardOutput
          currentPlantId={currentPlantId}
          data={BarChartData}
          lineData={Contractvalue}
          lineData2={compareLineChartData}
          isCheckDisableDate={isCheckDisableDate}
        />
        {/* Compare Detail Stats */}
        <CompareDetailStats summary={Summary} isLoading={isLoadingCompareProductOutput}/>
      </View>
    </AnimatedCardContainer>
  )
}

export default ProductOutputRencentDays
