import React from 'react'
import { View, Text } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import GradientText from '@/components/GradientText/GradientText.component'
import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber.component'
import { px } from '@/core/utils/scale'
import StackedBar, { StackedItem } from '@/components/StackedBar/StackedBar.component'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import { useAppSelector } from '@/core/redux/hooks'
import { RootState } from '@/core/redux/store'
import { getPowerStoreInLake } from '@/core/redux/domains/hydrology'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import styles from './PowerStoreInLake.styles'
import GradientProgress from '@/components/GradientProgress/GradientProgress.component'

const PowerStoreInLakeV2: React.FC = () => {
  const { powerStoreInLakeFactDetail } = useAppSelector((state: RootState) => state.hydrologySlice)
  const colorMap: Record<string, string> = { BTS: '#F59E0B', BK: '#00B3A4', SP3: '#00D9FF' }
  const fallbackColors = ['#F59E0B', '#00B3A4', '#00D9FF', '#7C4DFF', '#FF5252']
  const isLoading: boolean = false

  const powerStoreInLakeData = powerStoreInLakeFactDetail ? powerStoreInLakeFactDetail[0] : ({} as any)

  return (
    <AnimatedCardContainer>
      <View style={styles.pill}>
        <Text style={[styles.pillText, { color: '#A855F7' }]}>Điện năng tích trữ</Text>
        <MetricDiff style={{ fontSize: px.f(20) }} withBackground diff={powerStoreInLakeData?.rateOfChange / 100} />
      </View>

      <View style={styles.mainRow}>
        {isLoading ? (
          <View style={styles.firstSkeleton}>
            <BarSkeleton width={'90%'} alignSelf="center" />
          </View>
        ) : (
          <>
            <GradientText
              text={Number(powerStoreInLakeData?.currentCapacity ?? 0)}
              fontSize={px.f(52)}
              colors={'#00C853'}
            />
            <Text style={[styles.unit, { color: '#00C853', marginLeft: px.h(6), fontSize: px.f(20) }]}>
              {powerStoreInLakeData?.unit ?? ''}
            </Text>
            <Text style={[styles.slash, { color: '#9AA6B6' }]}> / </Text>
            <Text style={[styles.refValue, { color: '#9AA6B6' }]}>
              {powerStoreInLakeData?.capacity ?? 0} {powerStoreInLakeData?.unit ?? ''}
            </Text>
          </>
        )}
      </View>

      {/* Stacked bar */}
      <View style={{ marginTop: px.v(10) }}>
        {isLoading ? (
          <BarSkeleton width={'100%'} alignSelf="center" height={20} />
        ) : (
          <GradientProgress
            colors={['#EC4899', '#F97316']}
            progress={powerStoreInLakeData?.currentCapacity / powerStoreInLakeData?.capacity}
          />
        )}
      </View>

      <View style={{ marginTop: px.v(10) }}>
        <View style={styles.revenueCard}>
          <View>
            <Text style={[styles.cardTitle, { color: '#FFF' }]}>{`Cùng kỳ năm ngoái`}</Text>
            <Text style={styles.cardValue}>
              {powerStoreInLakeData?.previousCapacity ?? 0}{' '}
              <Text style={styles.cardUnit}>
                {powerStoreInLakeData?.unit ?? ''} ({powerStoreInLakeData?.previousPercentCapacity ?? 0}%)
              </Text>
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: px(24), color: '#A855F7', fontWeight: 'bold' }}>
              {powerStoreInLakeData?.currentPercentCapacity ?? 0}%
            </Text>
          </View>
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default PowerStoreInLakeV2
