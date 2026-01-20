import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { dashboardCommonStyles } from '@/core/styles/sharedStyles'
import GradientText from '@/components/GradientText/GradientText.component'
import { px } from '@/core/utils/scale'
import { lightGradients, textGradients } from '@/core/constants/gradients'
import GradientProgress from '@/components/GradientProgress/GradientProgress.component'
import BarChart from '@/components/BarChart/BarChart.component'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { BarGroup } from '@/core/types'

const rawBarGroups: BarGroup[] = [
  {
    label: 'BK',
    items: [
      { value: 1_000_000, frontColor: '#8B5CF6', showValuesOnTop: false },
      { value: 2_500_000, frontColor: '#F59E0B', showValuesOnTop: false },
    ],
  },
  {
    label: 'BST',
    items: [
      { value: 1_800_000, frontColor: '#8B5CF6', showValuesOnTop: false },
      { value: 2_600_000, frontColor: '#F59E0B', showValuesOnTop: false },
    ],
  },
  {
    label: 'SP3',
    items: [
      { value: 2_000_000, frontColor: '#8B5CF6', showValuesOnTop: false },
      { value: 3_000_000, frontColor: '#F59E0B', showValuesOnTop: false },
    ],
  },
]

function RevenueProfit() {
  const router = useRouter()

  const onPressCard = () => {
    router.navigate({ pathname: '/revenue-profit-detail' as any })
  }
  return (
    <SectionContainer
      title="Doanh thu/ Lợi nhuận"
      actionButton={{
        label: 'Thêm chi tiết',
        onPress: onPressCard,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'stretch',
          flexWrap: 'nowrap',
          columnGap: px.h(8),
          marginBottom: px.v(10),
        }}
      >
        {[
          {
            label: 'Doanh thu hợp đồng',
            colors: textGradients.accent,
            icon: <Ionicons name="logo-usd" size={px.f(24)} color="#FFF" />,
          },
          {
            label: 'Doanh thu thực tế',
            colors: textGradients.accent,
            icon: <Ionicons name="flash" size={px.f(24)} color="#FFF" />,
          },
          {
            label: 'Lợi nhuận',
            colors: lightGradients.green,
            icon: <Ionicons name="stats-chart" size={px.f(24)} color="#FFF" />,
          },
        ].map(({ label, colors, icon }, idx) => (
          <View key={idx} style={[styles.cumulativeCard, { flex: 1 }]}>
            <View style={dashboardCommonStyles.metricRow}>
              <View style={dashboardCommonStyles.metricLeft}>
                <View style={dashboardCommonStyles.smallIconBox}>{icon}</View>
              </View>
              <View style={dashboardCommonStyles.metricRight}>
                <Ionicons name="trending-up" size={px.f(24)} color="#10B981" style={{ marginRight: px.h(6) }} />
              </View>
            </View>
            <View style={dashboardCommonStyles.metricValueRow}>
              <GradientText text={1.54} fontSize={px.f(30)} colors={colors} />
              <Text style={styles.metricSuffixInline}>{'tỷ VNĐ'}</Text>
            </View>
            <Text style={styles.metricLabel}>{label}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.chartWrapper]}>
        <View
          style={{
            flexDirection: 'column',
            rowGap: px.v(6),
            marginBottom: px.v(8),
            marginLeft: px.h(15),
          }}
        >
          {[
            { color: '#8B5CF6', label: 'Doanh thu hợp đồng' },
            { color: '#F59E0B', label: 'Doanh thu thực tế' },
          ].map(({ color, label }) => (
            <View
              key={label}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: px.h(8),
              }}
            >
              <View
                style={{
                  width: px.h(12),
                  height: px.h(12),
                  borderRadius: px.h(6),
                  backgroundColor: color,
                }}
              />
              <Text
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: px.m(12),
                  fontWeight: '600',
                }}
              >
                {label}
              </Text>
            </View>
          ))}
        </View>
        <View style={[styles.legendDivider, { alignSelf: 'center' }]} />
        <BarChart
          disableScroll
          showCustomTooltip
          rulesType="dashed"
          data={rawBarGroups}
          rounded
          spacing={70}
          showYAxis
          noOfSection={4}
        />
      </View>
      <Text style={styles.sectionHeader}>Lợi nhuận</Text>
      <View style={styles.sectionDivider} />
      <View style={{ marginTop: px.v(8) }}>
        <GradientProgress colors={'#8B5CF6'} progress={0.95} leftLabel="Buôn Tua Suah" rightLabel="0.95" />
      </View>
      <View style={{ marginTop: px.v(15) }}>
        <GradientProgress colors={'#8B5CF6'} progress={0.5} leftLabel="Buôn Kuốp" rightLabel="0.5" />
      </View>
      <View style={{ marginTop: px.v(15) }}>
        <GradientProgress colors={'#8B5CF6'} progress={0.25} leftLabel="Srepok 3" rightLabel="0.25" />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: px.v(8),
        }}
      >
        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <Text
            key={v}
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: px.m(12),
            }}
          >
            {v}
          </Text>
        ))}
      </View>
    </SectionContainer>
  )
}

export default RevenueProfit

const styles = StyleSheet.create({
  metricLabel: {
    color: '#9AA6B6',
    fontSize: px.m(12),
    marginBottom: px.v(6),
    marginTop: px.v(5),
  },
  metricSuffixInline: {
    color: '#fff',
    fontSize: px.m(14),
    marginLeft: px.h(8),
    marginBottom: px.v(3),
    fontWeight: '600',
  },
  sectionHeader: {
    color: 'rgba(255,255,255,0.35)', // xám nhạt trên nền tối
    fontSize: px.m(18),
    fontWeight: '600',
    marginBottom: px.v(6),
  },
  sectionDivider: {
    height: px.v(3),
    backgroundColor: 'rgba(255,255,255,0.35)',
    width: '100%',
    marginBottom: px.v(10),
  },
  legendDivider: {
    height: px.v(3),
    backgroundColor: 'rgba(255,255,255,0.35)',
    width: '90%',
    marginBottom: px.v(15),
  },
  cumulativeCard: {
    backgroundColor: '#1e2838',
    borderRadius: 12,
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  chartWrapper: {
    marginTop: px.v(8),
    marginBottom: px.v(12),
    marginLeft: px.h(-12),
    width: '100%',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
})
