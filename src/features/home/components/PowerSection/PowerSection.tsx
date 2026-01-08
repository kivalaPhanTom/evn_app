import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "@/core/redux/store";
import PowerRecentDays from './PowerRecentDays/PowerRecentDays'
import styles from './PowerSection.styles'
import PowerByHours from '@/components/PowerByHours/PowerByHours'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { getPowerOverivew, getPowerByTime } from '@/core/redux/Actions/PowerActions'
import TotalPower from '@/components/TotalPower/TotalPower';

function PowerSection() {
  const { average, total, detail, isLoadingOverview } = useSelector((state: RootState) => state.powerSlice)
  const { currentDate, currentPower, currentTime, avgPower, HourlyPowerList } = useSelector(
    (state: any) => state.powerSlice.powerByTime,
  )
  const { isLoadingByHours } = useSelector((state: any) => state.powerSlice)
  const dispatch = useDispatch()
  const { countRefesh } = useSelector((state: any) => state.homeSlice)
  useEffect(() => {
    dispatch(getPowerOverivew())
    dispatch(getPowerByTime())
  }, [countRefesh])

  return (
    <SectionContainer title="Công Suất">
      <View>
        <View style={styles.section}>
          <TotalPower
            title="TỔNG CÔNG SUẤT"
            average={average}
            total={total}
            detail={detail}
            isLoading={isLoadingOverview}
          />
        </View>
        <View style={styles.section}>
          <PowerByHours
            isLoading={isLoadingByHours}
            currentDate={currentDate}
            currentPower={currentPower}
            currentTime={currentTime}
            avgPower={avgPower}
            HourlyPowerList={HourlyPowerList}
          />
        </View>
        <View style={styles.section}>
          <PowerRecentDays />
        </View>
      </View>
    </SectionContainer>
  )
}

export default PowerSection
