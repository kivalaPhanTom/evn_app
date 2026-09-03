import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { RootState } from '@/core/redux/store'
import styles from './PowerSection.styles'
import PowerByHours from '@/components/PowerByHours/PowerByHours'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { getPowerOverivew, getPowerByTime, getPowerByDays } from '@/core/redux/domains/power'
import TotalPower from '@/components/TotalPower/TotalPower'
import PowerRecentDays from '@/components/PowerRecentDays/PowerRecentDays'
import { useAlignedHourlyTimer } from '@/core/hooks/use-aligned-hourly-timer'

function PowerSection() {
  const router = useRouter()
  const { average, total, detail, isLoadingOverview } = useAppSelector((state: RootState) => state.powerSlice)
  const { currentDate, currentPower, currentTime, avgPower, HourlyPowerList, offeredPower, offeredPowerList, unit } =
    useAppSelector((state: any) => state.powerSlice.powerByTime)
  const { isLoadingByHours } = useAppSelector((state: any) => state.powerSlice)
  const {
    powerByDays: { powerData },
    isLoadingNearCurrentDays,
  } = useAppSelector((state: RootState) => state.powerSlice)
  const dispatch = useAppDispatch()
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)

  useAlignedHourlyTimer(() => {
    dispatch(getPowerOverivew())
  })

  useEffect(() => {
    dispatch(getPowerOverivew())
    dispatch(getPowerByTime())
    dispatch(getPowerByDays(7))
  }, [countRefesh])
  const onPressCard = () => {
    router.navigate({ pathname: '/product-power-detail' })
  }
  return (
    <SectionContainer title="Công Suất (P)">
      <View>
        <View style={styles.section}>
          <TotalPower
            title={'P \u2211 phát'}
            average={average}
            total={total}
            detail={detail}
            isLoading={isLoadingOverview}
            unit="MW"
            type="power"
          />
        </View>
        <View style={styles.section}>
          <PowerByHours
            isLoading={isLoadingByHours}
            currentDate={currentDate}
            currentPower={currentPower}
            currentTime={currentTime}
            HourlyPowerList={HourlyPowerList}
            onPressCard={onPressCard}
            unit={unit}
            offeredPower={offeredPower}
            offeredPowerList={offeredPowerList}
            scrollToEnd={true}
          />
        </View>
        <View style={styles.section}>
          <PowerRecentDays isLoading={isLoadingNearCurrentDays} powerData={powerData} />
        </View>
      </View>
    </SectionContainer>
  )
}

export default PowerSection
