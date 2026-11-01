import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import styles from '@/features/factory-detail/HydrologyFactDetail/HydrologyFactDetail.styles'
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
  const { plants, selectedCompanyId: companyId } = useAppSelector((state: RootState) => state.companyPlantSlice)
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const { selectedOptionsValueFactDetail } = useAppSelector((state: RootState) => state.hydrologySlice)
  const dispatch = useAppDispatch()
  const plant = plants.find(
    (plant) => plant.symbol === currentPlantId || String(plant.plantId) === currentPlantId,
  )
  const plantId = plant?.plantId
  const maHoChua = plant?.ListHoChua?.[0]?.MaHoChua
  const inflowOutflowMaHoChua = (plant?.ListHoChua?.length ?? 0) > 1 ? maHoChua : undefined

  useEffect(() => {
    if (activeTabIndex === keyTab) {
      const type = selectedOptionsValueFactDetail === '7_DAYS' ? 'day' : 'hour'
      if (maHoChua) {
        dispatch(getHydrographicChart({ maHoChua, type }))
      }
      if (plantId !== undefined && companyId) {
        dispatch(getInflowOutflow({ plantId, companyId, maHoChua: inflowOutflowMaHoChua }))
      }
      dispatch(getPowerStoreInLakeFactDetail({ currentPlantId: currentPlantId }))
    }
  }, [
    currentPlantId,
    activeTabIndex,
    keyTab,
    dispatch,
    countRefesh,
    selectedOptionsValueFactDetail,
    companyId,
    plantId,
    maHoChua,
    inflowOutflowMaHoChua,
  ])

  return (
    <ScrollView>
      <View>
        <WaterLevelByHours currentPlantId={currentPlantId} />
        <View>
          {plantId !== undefined && (
            <ReservoirMetric plantId={plantId} maHoChua={inflowOutflowMaHoChua} />
          )}
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
