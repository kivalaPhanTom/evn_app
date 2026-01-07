import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "@/core/redux/store";
import PowerRecentDays from './PowerRecentDays/PowerRecentDays'
import styles from './PowerSection.styles'
import PowerByHours from './PowerByHours/PowerByHours'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { getPowerOverivew } from '@/core/redux/Actions/PowerActions'
import TotalPower from '@/components/TotalPower/TotalPower';

function PowerSection() {
  const { average, total, detail, isLoadingOverview } = useSelector((state: RootState) => state.powerSlice)
  const dispatch = useDispatch()
  const { countRefesh } = useSelector((state: any) => state.homeSlice)
  useEffect(() => {
    dispatch(getPowerOverivew())
  }, [countRefesh])

  return (
    <SectionContainer title="Công Suất">
      <View>
        <View style={styles.section}>
          <TotalPower
            average={average}
            total={total}
            detail={detail}
            isLoading={isLoadingOverview}
          />
        </View>
        <View style={styles.section}>
          <PowerByHours />
        </View>
        <View style={styles.section}>
          <PowerRecentDays />
        </View>
      </View>
    </SectionContainer>
  )
}

export default PowerSection
