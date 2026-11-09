import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import ReservoirInfo from './ReservoirInfo/ReservoirInfo'
import ReservoirMetric from './ReservoirMetric/ReservoirMetric'
import { t } from 'i18next'

interface ReservoirWaterLevelProps {
  currentPlantId: string
  selectedMaHoChua: string
  onSelectMaHoChua: (maHoChua: string) => void
}

function ReservoirWaterLevel(props: ReservoirWaterLevelProps) {
  const { currentPlantId, selectedMaHoChua, onSelectMaHoChua } = props;

  return (
    // <SectionContainer
    //   title={t('hydrology')}
    //   actionButton={{
    //     label: 'Thêm chi tiết',
    //     onPress: onPressCard,
    //   }}
    // >
      <View style={{ marginBottom: 20 }}>
        <ReservoirInfo
          currentPlantId={currentPlantId}
          selectedMaHoChua={selectedMaHoChua}
          onSelectMaHoChua={onSelectMaHoChua}
        />
      </View>
    // </SectionContainer>
  )
}

export default ReservoirWaterLevel
