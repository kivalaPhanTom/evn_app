import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import GradientText from '@/components/GradientText/GradientText.component'
import { px } from '@/core/utils/scale'
import { styles } from './PowerStoreInLake.styles'
import StackedBar, { StackedItem } from '@/components/StackedBar/StackedBar.component'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/core/redux/store'
import { getPowerStoreInLake } from '@/core/redux/Actions/HydrologyActions'

const PowerStoreInLake: React.FC = () => {
  const dispatch = useDispatch()
  const { countRefesh } = useSelector((state: any) => state.homeSlice)
  const { powerStoreInLake, isLoadingPowerStoreInLake } = useSelector((state: RootState) => state.hydrologySlice)
  const colorMap: Record<string, string> = { BTS: '#F59E0B', BK: '#00B3A4', SP3: '#00D9FF' }
  const fallbackColors = ['#F59E0B', '#00B3A4', '#00D9FF', '#7C4DFF', '#FF5252']
  const segments = powerStoreInLake?.segments ?? []
  const data: StackedItem[] = segments
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((s, idx) => ({
      label: s.label,
      value: s.value,
      color: colorMap[s.label] ?? fallbackColors[idx % fallbackColors.length],
    }))

  useEffect(() => {
    dispatch(getPowerStoreInLake())
  }, [countRefesh])

  return (
    <AnimatedCardContainer>
      <View style={styles.pill}>
        <Text style={[styles.pillText, { color: '#E6ECF2' }]}>Điện năng tích trữ trong hồ</Text>
      </View>

      <View style={styles.mainRow}>
        {isLoadingPowerStoreInLake ? (
          <View style={styles.firstSkeleton}>
            <BarSkeleton width={'90%'} alignSelf="center" />
          </View>
        ) : (
          <>
            <GradientText
              text={Number(powerStoreInLake?.currentCapacity ?? 0)}
              fontSize={px.f(52)}
              colors={'#00C853'}
            />
            <Text
              allowFontScaling={false}
              style={[styles.unit, { color: '#00C853', marginLeft: px.h(6), fontSize: px.f(20) }]}
            >
              {powerStoreInLake?.unit ?? ''}
            </Text>
            <Text allowFontScaling={false} style={[styles.slash, { color: '#9AA6B6' }]}>
              {' '}
              /{' '}
            </Text>
            <Text allowFontScaling={false} style={[styles.refValue, { color: '#9AA6B6' }]}>
              {powerStoreInLake?.previousCapacity ?? 0} {powerStoreInLake?.unit ?? ''}
            </Text>
          </>
        )}
      </View>

      {/* Stacked bar */}
      <View style={{ marginTop: px.v(10) }}>
        {isLoadingPowerStoreInLake ? (
          <BarSkeleton width={'100%'} alignSelf="center" height={20} />
        ) : (
          <StackedBar items={data} height={px.v(20)} legendGap={px.h(60)} showPercent={false} valueDecimals={1} />
        )}
      </View>
    </AnimatedCardContainer>
  )
}

export default PowerStoreInLake
