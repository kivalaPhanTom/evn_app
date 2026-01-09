import React, { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import styles from './HydrologyFactDetail.styles'
import WaterLevelByHours from './WaterLevelByHours/WaterLevelByHours'
import { useDispatch, useSelector } from 'react-redux'
import { getHydrographicChart, getInflowOutflow, getPowerStoreInLakeFactDetail } from '@/core/redux/Actions/HydrologyActions'
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
  const { activeTabIndex } = useSelector((state: RootState) => state.powerSlice)
  const { countRefesh } = useSelector((state: any) => state.factoryDetailSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    if (activeTabIndex === keyTab) {
      dispatch(getHydrographicChart({ companyId: currentPlantId }))
      dispatch(getInflowOutflow({ hydroElectricId: currentPlantId }))
      dispatch(getPowerStoreInLakeFactDetail({ currentPlantId: currentPlantId }))
    }
  }, [currentPlantId, activeTabIndex, keyTab, dispatch, countRefesh])

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
