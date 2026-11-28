import React from 'react'
import { View, Text } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber.component'
import { px } from '@/core/utils/scale'
import StackedBar, { StackedItem } from '@/components/StackedBar/StackedBar.component'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import { useAppSelector } from '@/core/redux/hooks'
import { RootState } from '@/core/redux/store'
import { getPowerStoreInLake } from '@/core/redux/domains/hydrology'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import createStyles from '@/features/factory-detail/HydrologyFactDetail/PowerStoreInLakeV2/PowerStoreInLake.styles'
import GradientProgress from '@/components/GradientProgress/GradientProgress.component'
import { useAppTheme } from '@/core/hooks/use-app-theme'

const PowerStoreInLakeV2: React.FC = () => {
  const { powerStoreInLakeFactDetail } = useAppSelector((state: RootState) => state.hydrologySlice)
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const styles = createStyles(isDark)
  const colorMap: Record<string, string> = { BTS: '#F59E0B', BK: '#00B3A4', SP3: '#00D9FF' }
  const fallbackColors = ['#F59E0B', '#00B3A4', '#00D9FF', '#7C4DFF', '#FF5252']
  const isLoading: boolean = false

  const powerStoreInLakeData = powerStoreInLakeFactDetail ? powerStoreInLakeFactDetail[0] : ({} as any)
  const unitLabel = powerStoreInLakeData?.unit ? ` ${powerStoreInLakeData.unit}` : ''

  if (!isDark) {
    const current = powerStoreInLakeData?.currentCapacity
    const previous = powerStoreInLakeData?.previousCapacity
    const percent = powerStoreInLakeData?.currentPercentCapacity
    const change = powerStoreInLakeData?.rateOfChange

    return (
      <AnimatedCardContainer noneBackground borderColor="#D9DFE6" style={styles.lightCard}>
        <View style={styles.lightHeader}>
          <Text style={styles.lightTitle}>Điện năng tích trữ</Text>
          {change != null && (
            <MetricDiff
              withBackground
              diff={change / 100}
              textColor="#047857"
            />
          )}
        </View>
        <Text style={styles.lightCurrent}>
          {current == null ? '—' : Number(current)}
          <Text style={styles.lightUnit}>{current == null ? '' : unitLabel}</Text>
        </Text>
        {percent != null && (
          <GradientProgress
            colors="#0F766E"
            height={7}
            backgroundColor="#E2E8F0"
            leftLabel="So với cùng kỳ"
            rightLabel={`${percent}%`}
            labelStyle={styles.lightProgressLabel}
            progress={percent / 100}
          />
        )}
        <View style={styles.lightComparison}>
          <Text style={styles.lightComparisonLabel}>Cùng kỳ năm ngoái</Text>
          <Text style={styles.lightComparisonValue}>
            {previous == null ? '—' : `${previous}${unitLabel}`}
          </Text>
        </View>
      </AnimatedCardContainer>
    )
  }

  return (
    <AnimatedCardContainer>
      <View style={styles.pill}>
        <Text style={[styles.pillText, { color: '#A855F7' }]}>Điện năng tích trữ</Text>
        {powerStoreInLakeData?.rateOfChange != null && (
          <MetricDiff style={{ fontSize: px.f(20) }} withBackground diff={powerStoreInLakeData.rateOfChange / 100} />
        )}
      </View>

      <View style={styles.mainRow}>
        {isLoading ? (
          <View style={styles.firstSkeleton}>
            <BarSkeleton width={'90%'} alignSelf="center" />
          </View>
        ) : (
          <>
            <Text style={[styles.currentValue, { color: '#00C853' }]}>
              {Number(powerStoreInLakeData?.currentCapacity ?? 0)}
              <Text style={styles.unit}>{unitLabel}</Text>
            </Text>
            <Text style={[styles.refValue, { color: '#9AA6B6' }]}>
              <Text style={styles.slash}>{'/\u00a0'}</Text>
              {powerStoreInLakeData?.capacity ?? 0}{unitLabel}
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
            progress={(powerStoreInLakeData?.currentPercentCapacity ?? 0) / 100}
          />
        )}
      </View>

      <View style={{ marginTop: px.v(10) }}>
        <View style={styles.revenueCard}>
          <View>
            <Text style={[styles.cardTitle, { color: isDark ? '#FFF' : '#475569' }]}>{`Cùng kỳ năm ngoái`}</Text>
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
