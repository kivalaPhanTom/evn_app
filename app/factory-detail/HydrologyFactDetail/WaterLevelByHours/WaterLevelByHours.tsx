import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import styles from '@/features/factory-detail/HydrologyFactDetail/WaterLevelByHours/WaterLevelByHours.styles'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import HydrographicChart from '@/components/HydrographicChart/HydrographicChart'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { RootState } from '@/core/redux/store'
interface PlantsData {
  id: number
  name: string
  currentLevel: number
  maxLevel: number
  referenceLevel: number
  color?: string
  abbreviation?: string
  symbol?: string
}

interface WaterLevelByHoursProps {
  currentPlantId: string
}
function WaterLevelByHours(props: WaterLevelByHoursProps) {
  const { currentPlantId } = props
  const dispatch = useAppDispatch()
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const { hydrologyCharData, selectedOptionsValueFactDetail } = useAppSelector((state: RootState) => state.hydrologySlice)
  const { hydrologyPlants } = useAppSelector((state: RootState) => state.hydrologySlice)
  const getReferenceLevel = (hydroElectricId: string, hydrologyPlants: PlantsData[]): number => {
    let result = 0
    const findHydrologyItem = hydrologyPlants.find(e => e.symbol === hydroElectricId)
    if (findHydrologyItem) result = findHydrologyItem.referenceLevel
    return result
  }

  const referenceLevel = getReferenceLevel(currentPlantId, hydrologyPlants.plantsData)

  return (
    <>
      <View style={styles.section}>
        <Text style={[styles.pillText, { color: isDark ? '#E6ECF2' : '#374151' }]}>Mực nước trong hồ theo giờ</Text>
        <View style={[styles.chartPanel, !isDark && { backgroundColor: '#BFDBFE', borderRadius: 12 }]}>
          <HydrographicChart
            isLoading={false}
            data={hydrologyCharData}
            referenceLevel={referenceLevel}
            bgColor={isDark ? '#000033' : '#BFDBFE'}
            selectedOptionsValue={selectedOptionsValueFactDetail}
          />
        </View>
      </View>
    </>
  )
}

export default WaterLevelByHours
