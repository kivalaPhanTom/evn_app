import AnimatedNumber from '@/components/AnimatedNumber/AnimatedNumber.component'
import AnimatedCardContainer from '@/components/CardContainer/CardContainer.component'
import { ChartView } from '@/components/ChartView/ChartView.component'
import GradientText from '@/components/GradientText/GradientText.component'
import MetricDiff from '@/components/MetricDiff/MetricDiff.component'
import { TabSwitcher } from '@/components/TabSwitcher/TabSwitcher.component'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import SummaryCard from '@/components/ui/SummaryCard/SummaryCard.component'
import { textGradients } from '@/core/constants/gradients'
import { dashboardCommonStyles } from '@/core/styles/sharedStyles'
import { px } from '@/core/utils/scale'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, StyleSheet, Text, View } from 'react-native'

type TabType = 'day' | 'month' | 'year'

interface Props {
  tab: TabType
  setTab: (t: TabType) => void
  contentAnim: Animated.Value
  lineData: { value: number; label: string }[]
}

export default function ProfitCard({ tab, setTab, contentAnim, lineData }: Props) {
  const { t } = useTranslation()

  return (
    <SectionContainer style={{ marginTop: px.h(26) }} title="Sản xuất kinh danh">
      <AnimatedCardContainer
        backgroundColor={{ dark: '#051022', light: '#fff' }}
        borderColor="rgba(255,255,255,0.04)"
        borderRadius={16}
      >
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>{t('profit')}</Text>

          <TabSwitcher
            tabs={[
              { id: 'day', label: t('day') },
              { id: 'month', label: t('month') },
              { id: 'year', label: t('year') },
            ]}
            activeTab={tab}
            onTabChange={(newTab) => setTab(newTab as TabType)}
            contentAnim={contentAnim}
          />
        </View>

        <Animated.View
          style={{
            opacity: contentAnim,
            transform: [
              {
                translateY: contentAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [8, 0],
                }),
              },
            ],
          }}
        >
          <View style={dashboardCommonStyles.metricRow}>
            <View style={dashboardCommonStyles.metricLeft}>
              <Text style={styles.metricLabel}>{t('profitYesterday')}</Text>

              <View style={dashboardCommonStyles.metricValueRow}>
                <AnimatedNumber
                  value={tab === 'day' ? 6.98 : tab === 'month' ? 45.32 : 215}
                  duration={900}
                  decimals={2}
                  formatter={(n) => Number(n.toFixed(2)).toString()}
                  render={(text) => <GradientText text={text} fontSize={px.f(60)} colors={textGradients.primary} />}
                />
                <Text style={styles.metricSuffixInline}>{t('unitVND')}</Text>
              </View>

              <MetricDiff diff={0.15} label={t('vsYesterday')} />
            </View>

            <View style={dashboardCommonStyles.metricRight}>
              <View style={dashboardCommonStyles.smallIconBox} />
            </View>
          </View>

          {/* Line chart */}
          <View style={styles.chartWrapper}>
            <View style={styles.chartInner}>
              <ChartView
                type="line"
                data={
                  tab === 'day'
                    ? lineData
                    : tab === 'month'
                      ? lineData.map((d) => ({ ...d, value: d.value * 1.6 }))
                      : lineData.map((d) => ({ ...d, value: d.value * 3 }))
                }
                color="green"
                height={px.v(240)}
              />
            </View>
          </View>

          {/* Summary boxes */}
          <View style={[dashboardCommonStyles.summaryRow]}>
            <SummaryCard
              label={t('accumulatedWeek')}
              value={tab === 'day' ? 4.4 : 12.8}
              decimals={1}
              style={StyleSheet.flatten([dashboardCommonStyles.summaryBox, { marginRight: px.h(8) }])}
              align="left"
              gradientPosition="top"
              gradientColors={textGradients.border}
              unit={t('unit')}
            />

            <SummaryCard
              label={t('accumulatedMonth')}
              value={tab === 'day' ? 19.5 : 58.3}
              decimals={1}
              style={StyleSheet.flatten([dashboardCommonStyles.summaryBox, { marginRight: px.h(0) }])}
              align="left"
              gradientPosition="top"
              gradientColors={textGradients.border}
              unit={t('unit')}
            />
          </View>

          <SummaryCard
            label={t('accumulatedYear')}
            value={tab === 'day' ? 215 : 430}
            decimals={0}
            style={dashboardCommonStyles.summaryFull}
            align="center"
            gradientPosition="top"
            gradientColors={textGradients.border}
            unit={t('unit')}
          />
        </Animated.View>
      </AnimatedCardContainer>
    </SectionContainer>
  )
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: px.v(8),
  },
  headerTitle: {
    color: '#9AA6B6',
    fontSize: px.m(12),
    fontWeight: '600',
    marginBottom: px.v(8),
  },
  metricLabel: {
    color: '#9AA6B6',
    fontSize: px.m(12),
    marginBottom: px.v(6),
  },
  metricSuffixInline: {
    color: '#9AA6B6',
    fontSize: px.m(18),
    marginLeft: px.h(8),
    marginBottom: px.v(10),
    fontWeight: '600',
  },
  chartWrapper: {
    marginTop: px.v(8),
    marginBottom: px.v(12),
    width: '100%',
    alignSelf: 'stretch',
    paddingHorizontal: px.h(8),
    backgroundColor: 'transparent',
    overflow: 'visible', // allow bars to render rounded caps outside bounds
  },
  chartInner: {
    width: '100%',
    borderRadius: px.h(10),
    paddingVertical: px.v(6),
    paddingHorizontal: px.h(6),
    backgroundColor: 'rgba(255,255,255,0.01)', // subtle inner panel
    overflow: 'visible', // prevent clipping of rounded bar caps
    alignItems: 'stretch',
  },
})
