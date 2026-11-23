import { hydrologyLight as light, hydrologyDark as dark } from '@/core/constants/hydrologyPalette'
import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
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
  const accent = isDark ? dark.inflow : '#00DF73'
  const muted = isDark ? dark.storage.muted : '#1F2937'
  const unitLabel = powerStoreInLake?.unit ? ` ${powerStoreInLake.unit}` : ''
  const colorMap: Record<string, string> = {
    BTS: isDark ? dark.storage.plants[0] : '#FB923C',
    BK: isDark ? dark.storage.plants[1] : '#14B8A6',
    SP3: isDark ? dark.storage.plants[2] : '#00C0E8',
  }
  const fallbackColors = isDark
    ? dark.storage.plants
    : ['#FB923C', '#14B8A6', '#00C0E8', '#7056A8', '#EF4444']
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
      <Text allowFontScaling={false} style={[styles.title, { color: isDark ? dark.storage.title : '#1F2937' }]}>
        Điện năng tích trữ trong hồ
      </Text>

      <View style={styles.mainRow}>
        {isLoadingPowerStoreInLake ? (
          <View style={styles.firstSkeleton}>
            <BarSkeleton width={'90%'} alignSelf="center" />
          </View>
        ) : (
          <>
            <Text
              allowFontScaling={false}
              style={[styles.currentValue, { color: accent }]}
            >
              {Number(powerStoreInLake?.currentCapacity ?? 0)}
              <Text style={styles.unit}>{unitLabel}</Text>
            </Text>
            <Text
              allowFontScaling={false}
              style={[styles.refValue, { color: muted }]}
            >
              <Text style={styles.slash}>{'/\u00a0'}</Text>
              {powerStoreInLake?.previousCapacity ?? 0}
              <Text style={styles.refUnit}>{unitLabel}</Text>
            </Text>
          </>
        )}
      </View>

      {/* Stacked bar */}
      <View style={{ marginTop: px.h(20) }}>
        {isLoadingPowerStoreInLake ? (
          <BarSkeleton width={'100%'} alignSelf="center" height={20} />
        ) : (
          <StackedBar
            items={data}
            height={px.h(16)}
            legendGap={px.h(28)}
            legendAlign="center"
            showPercent={false}
            valueDecimals={1}
          />
        )}
      </View>
    </AnimatedCardContainer>
  )
}

export default PowerStoreInLake
