import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import styles from './HydrologyFactDetail.styles'
import WaterLevelByHours from './WaterLevelByHours/WaterLevelByHours'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { getHydrographicChart, getInflowOutflow, getPowerStoreInLakeFactDetail } from '@/core/redux/domains/hydrology'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import PowerStoreInLakeV2 from './PowerStoreInLakeV2/PowerStoreInLake'
import { px } from '@/core/utils/scale'
import InflowOutflow from './InflowOutflow/InflowOutflow'
import { RootState } from '@/core/redux/store'
import ReservoirMetric from '../ReservoirWaterLevel/ReservoirMetric/ReservoirMetric'

interface hydrologyFactDetailProps {
  currentPlantId: string
  keyTab: number
}
function HydrologyFactDetail(props: hydrologyFactDetailProps) {
  const { currentPlantId, keyTab } = props
  const { activeTabIndex } = useAppSelector((state: RootState) => state.powerSlice)
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const { selectedOptionsValueFactDetail } = useAppSelector((state: RootState) => state.hydrologySlice)
  const { hydrologyPlants } = useAppSelector((state: RootState) => state.hydrologySlice)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (activeTabIndex === keyTab) {
      const type = selectedOptionsValueFactDetail === "7_DAYS" ? "day" : ""
      dispatch(getHydrographicChart({
        companyId: currentPlantId,
        type: type
      }))
      dispatch(getInflowOutflow({ hydroElectricId: currentPlantId }))
      dispatch(getPowerStoreInLakeFactDetail({ currentPlantId: currentPlantId }))
    }
  }, [currentPlantId, activeTabIndex, keyTab, dispatch, countRefesh, selectedOptionsValueFactDetail])

  return (
    <ScrollView>
      <View>
        <WaterLevelByHours currentPlantId={currentPlantId} />
        <View>
          <ReservoirMetric currentPlantId={currentPlantId} />
        </View>
        <View style={{ marginTop: 20 }}>
          <InflowOutflow hydroElectricId={currentPlantId} />
        </View>

        <View style={{ marginTop: 20 }}>
          <PowerStoreInLakeV2 />
        </View>
      </View>
    </ScrollView>
  )
}

export default HydrologyFactDetail
