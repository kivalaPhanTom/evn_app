import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import styles from '@/features/factory-detail/HydrologyFactDetail/WaterLevelByHours/WaterLevelByHours.styles'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import HydrographicChart from '@/components/HydrographicChart/HydrographicChart'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { RootState } from '@/core/redux/store'
import { hydrologyDark, hydrologyLight } from '@/core/constants/hydrologyPalette'
interface WaterLevelByHoursProps {
  currentPlantId: string
}
function WaterLevelByHours(props: WaterLevelByHoursProps) {
  const { currentPlantId } = props
  const dispatch = useAppDispatch()
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const colors = (isDark ? hydrologyDark : hydrologyLight).waterLevelByHours
  const { hydrologyCharData, selectedOptionsValueFactDetail } = useAppSelector((state: RootState) => state.hydrologySlice)
  const plants = useAppSelector((state: RootState) => state.companyPlantSlice.plants)
  const plant = plants.find((item) => item.symbol === currentPlantId)
  const referenceLevel = plant?.ListHoChua?.[0]?.referenceLevel ?? null

  return (
    <>
      <View style={styles.section}>
        <Text style={[styles.pillText, { color: colors.title }]}>Mực nước trong hồ theo giờ</Text>
        <View style={[styles.chartPanel, !isDark && { backgroundColor: colors.chartBackground, borderRadius: 12 }]}>
          <HydrographicChart
            isLoading={false}
            data={hydrologyCharData}
            referenceLevel={referenceLevel}
            bgColor={colors.chartBackground}
            selectedOptionsValue={selectedOptionsValueFactDetail}
          />
        </View>
      </View>
    </>
  )
}

export default WaterLevelByHours
