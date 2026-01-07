import React from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import ReservoirInfo from './ReservoirInfo/ReservoirInfo'
import ReservoirMetric from './ReservoirMetric/ReservoirMetric'
import { t } from 'i18next'

function ReservoirWaterLevel(props: { currentPlantId: string }) {
  const { currentPlantId } = props;
  const router = useRouter();

  const onPressCard = () => {
    router.push({ pathname: '/hydrology-detail' as any })
  }


  return (
    <SectionContainer 
      title={t('hydrology')}
      actionButton={{
        label: 'Thêm chi tiết',
        onPress: onPressCard,
      }}
    >
      <View style={{ marginBottom: 20 }}>
        <ReservoirInfo currentPlantId={currentPlantId} />
      </View>
      <View style={{ marginBottom: 20 }}>
        <ReservoirMetric currentPlantId={currentPlantId} />
      </View>
    </SectionContainer>
  )
}

export default ReservoirWaterLevel
