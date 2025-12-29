import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import styles from './WaterLevelByHours.styles'
import { useDispatch, useSelector } from 'react-redux'
import HydrographicChart from '@/components/HydrographicChart/HydrographicChart'
import { RootState } from '@/core/redux/store'
interface PlantsData {
  id: number
  name: string
  currentLevel: number
  maxLevel: number
  referenceLevel: number
  color?: string
  abbreviation?: string
}

interface WaterLevelByHoursProps {
  currentPlantId: string
}
function WaterLevelByHours(props: WaterLevelByHoursProps) {
  const { currentPlantId } = props
  const dispatch = useDispatch()
  const { hydrologyCharData } = useSelector((state: RootState) => state.hydrologySlice)
  const { hydrologyPlants } = useSelector((state: RootState) => state.hydrologySlice)
  const getReferenceLevel =(hydroElectricId:string, hydrologyPlants:PlantsData[]):number=>{
    let result = 0
    const findHydrologyItem = hydrologyPlants.find(e => e.abbreviation === hydroElectricId)
    if(findHydrologyItem) result = findHydrologyItem.referenceLevel
    return result
 }

 const referenceLevel = getReferenceLevel(currentPlantId, hydrologyPlants.plantsData)

  return (
    <AnimatedCardContainer>
      <View style={styles.section}>
        <Text style={[styles.pillText, { color: '#E6ECF2' }]}>Mực nước trong hồ</Text>
        <HydrographicChart isLoading={false} data={hydrologyCharData} referenceLevel={referenceLevel} />
      </View>
    </AnimatedCardContainer>
  )
}

export default WaterLevelByHours
