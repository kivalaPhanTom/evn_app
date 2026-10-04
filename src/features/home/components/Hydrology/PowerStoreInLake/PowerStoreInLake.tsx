import { hydrologyLight as light } from '@/core/constants/hydrologyPalette'
import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import GradientText from '@/components/GradientText/GradientText.component'
import { px } from '@/core/utils/scale'
import { styles } from './PowerStoreInLake.styles'
import StackedBar, { StackedItem } from '@/components/StackedBar/StackedBar.component'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { RootState } from '@/core/redux/store'
import { getPowerStoreInLake } from '@/core/redux/domains/hydrology'
import { useAppTheme } from '@/core/hooks/use-app-theme'

const PowerStoreInLake: React.FC = () => {
  const dispatch = useAppDispatch()
  const isDark = useAppTheme() === 'dark'
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const { powerStoreInLake, isLoadingPowerStoreInLake } = useAppSelector((state: RootState) => state.hydrologySlice)
  const colorMap: Record<string, string> = { BTS: isDark ? '#F59E0B' : light.plants[0], BK: isDark ? '#00B3A4' : light.plants[1], SP3: isDark ? '#00D9FF' : light.plants[2] }
  const fallbackColors = isDark ? ['#F59E0B', '#00B3A4', '#00D9FF', '#7C4DFF', '#FF5252'] : light.plants
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
    <AnimatedCardContainer noneBackground={!isDark} borderColor={isDark ? undefined : light.border}>
      <View style={[styles.pill, !isDark && { backgroundColor: light.subtle }]}>
        <Text style={[styles.pillText, { color: isDark ? '#E6ECF2' : light.text }]}>Điện năng tích trữ trong hồ</Text>
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
              colors={isDark ? '#00C853' : light.water}
            />
            <Text
              allowFontScaling={false}
              style={[styles.unit, { color: isDark ? '#00C853' : light.water, marginLeft: px.h(6), fontSize: px.f(20) }]}
            >
              {powerStoreInLake?.unit ?? ''}
            </Text>
            <Text allowFontScaling={false} style={[styles.slash, { color: isDark ? '#9AA6B6' : light.muted }]}>
              {' '}
              /{' '}
            </Text>
            <Text allowFontScaling={false} style={[styles.refValue, { color: isDark ? '#9AA6B6' : light.muted }]}>
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
