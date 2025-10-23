import { images } from '@/assets'
import AlertCard from '@/components/AlertCard/AlertCard.component'
import AnimatedCardContainer from '@/components/CardContainer/CardContainer.component'
import GradientProgress from '@/components/GradientProgress/GradientProgress.component'
import GradientText from '@/components/GradientText/GradientText.component'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import SummaryCard from '@/components/ui/SummaryCard/SummaryCard.component'
import { Colors } from '@/core/constants/colors'
import { textGradients } from '@/core/constants/gradients'
import { dashboardCommonStyles } from '@/core/styles/sharedStyles'
import { px } from '@/core/utils/scale'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, StyleSheet, View } from 'react-native'

interface LakeCardProps {
  tab: 'day' | 'month' | 'year'
  contentAnim?: Animated.Value
}

const LakeCard: React.FC<LakeCardProps> = ({ tab, contentAnim }) => {
  const { t } = useTranslation()

  const fallbackAnim = React.useRef(new Animated.Value(1)).current
  const safeAnim = contentAnim && typeof (contentAnim as any).interpolate === 'function' ? contentAnim : fallbackAnim

  return (
    <SectionContainer title="Tồn tại quan trọng">
      <AnimatedCardContainer
        backgroundColor={{ dark: Colors.deepBlue, light: Colors.white }}
        borderColor={Colors.dividerLight}
        borderRadius={16}
      >
        <Animated.View
          style={{
            opacity: safeAnim,
            transform: [
              {
                translateY: safeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [8, 0],
                }),
              },
            ],
          }}
        >
          <View style={dashboardCommonStyles.metricRow}>
            <View style={dashboardCommonStyles.metricLeft}>
              <View style={styles.metricValueRow}>
                <GradientText text={'Buôn Kuốp'} fontSize={px.f(35)} colors={textGradients.water} />
              </View>
            </View>

            <View style={dashboardCommonStyles.metricRight}>
              <View style={dashboardCommonStyles.smallIconBox} />
            </View>
          </View>

          <View style={{ marginTop: px.v(16) }}>
            <AlertCard
              title="Buôn Kuốp - Tổ máy 2"
              message="Nhiệt độ ổ đỡ tăng cao bất thường, cần kiểm tra hệ thống làm mát"
              timestamp="2 giờ trước"
            />
          </View>

          <SummaryCard
            label={t('lakeFlow')}
            value={tab === 'day' ? 215 : 430}
            decimals={0}
            style={dashboardCommonStyles.summaryFull}
            align="center"
            gradientPosition="top"
            gradientColors={textGradients.border}
            unit={'m³/s'}
            valueColors={textGradients.water}
            showGradient={false}
            borderColor={Colors.lightGray}
            backgroundColor={{ dark: Colors.ocean, light: Colors.white }}
            backgroundImage={images.waves}
          />

          <View style={[dashboardCommonStyles.summaryRow]}>
            <SummaryCard
              label={t('run')}
              value={tab === 'day' ? 4.4 : 12.8}
              decimals={1}
              style={StyleSheet.flatten([dashboardCommonStyles.summaryBox, { marginRight: px.h(8) }])}
              align="center"
              gradientPosition="top"
              gradientColors={textGradients.border}
              unit={'m³/s'}
              valueColors={textGradients.water}
              showGradient={false}
              borderColor={Colors.lightGray}
              backgroundColor={{ dark: Colors.ocean, light: Colors.white }}
            />

            <SummaryCard
              label={t('waterLevel')}
              value={tab === 'day' ? 19.5 : 58.3}
              decimals={1}
              style={StyleSheet.flatten([dashboardCommonStyles.summaryBox, { marginRight: px.h(8) }])}
              align="center"
              gradientPosition="top"
              gradientColors={textGradients.border}
              unit={'m'}
              valueColors={textGradients.water}
              showGradient={false}
              borderColor={Colors.lightGray}
              backgroundColor={{ dark: Colors.ocean, light: Colors.white }}
            />

            <SummaryCard
              label={t('overflow')}
              value={tab === 'day' ? 19.5 : 58.3}
              decimals={1}
              style={StyleSheet.flatten([dashboardCommonStyles.summaryBox, { marginRight: px.h(0) }])}
              align="center"
              gradientPosition="top"
              gradientColors={textGradients.border}
              unit={'m³/s'}
              valueColors={textGradients.water}
              showGradient={false}
              borderColor={Colors.lightGray}
              backgroundColor={{ dark: Colors.ocean, light: Colors.white }}
            />
          </View>

          <View style={{ marginTop: px.v(16) }}>
            <GradientProgress
              progress={0.9}
              leftLabel="Mực nước hồ"
              rightLabel="458.2m / 482m"
              height={6}
              colors={textGradients.water}
              style={{ marginTop: px.v(8) }}
            />
          </View>
        </Animated.View>
      </AnimatedCardContainer>
    </SectionContainer>
  )
}

const styles = StyleSheet.create({
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
})

export default LakeCard
