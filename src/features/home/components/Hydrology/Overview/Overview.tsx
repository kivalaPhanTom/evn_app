import { hydrologyLight as light, hydrologyDark as dark } from '@/core/constants/hydrologyPalette'
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { View, Text, StyleSheet, Animated, Pressable, Easing, ScrollView } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { px } from '@/core/utils/scale'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
import { styles } from './Overview.styles'
import { getHydrographicChart } from '@/core/redux/domains/hydrology'
import { getReservoirTabs } from './overview.data'

import HydrographicChart from '@/components/HydrographicChart/HydrographicChart'
import InflowOutflow from '../InflowOutflow/InflowOutflow'
import { Shadow } from 'react-native-shadow-2'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { RootState } from '@/core/redux/store'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import { LineChartSkeleton } from '@/components/Skeletons/LineChartSkeleton'
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { shallowEqual } from 'react-redux'

interface WaterLevelData {
  id: string
  name: string
  plantId: string | number
  reservoirCount: number
  currentLevel: number | null
  maxLevel: number | null
  referenceLevel: number | null
  color?: string
}
// Mảng màu sắc tuần tự cho các nhà máy
const plantColors = dark.plants

// Lấy màu sắc tuần tự theo index
const getColorByIndex = (index: number): string => {
  return plantColors[index % plantColors.length]
}

const formatWaterLevel = (value: number | null): number | string => {
  return value === null ? '—' : Number(value.toFixed(1))
}

const WaterLevelCard: React.FC<{
  data: WaterLevelData
  isActive: boolean
  onPress: () => void
  isLastTab?: boolean
  index: number
  tabWidth?: number
}> = ({ data, isActive, onPress, isLastTab = false, index, tabWidth }) => {
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const containerHeight = px.v(120)
  const [cardWidth, setCardWidth] = useState(0)
  const tankHeight = Math.max(data.maxLevel ?? 0, data.currentLevel ?? 0, data.referenceLevel ?? 0, 1)

  // waterHeight tính theo currentLevel, referenceLevel cố định để vẽ đường reference line
  // MaxLevel line position: tính toán giống như reference line
  const maxLevelYRaw = containerHeight - ((data.maxLevel ?? 0) / tankHeight) * containerHeight
  const referenceYRaw = containerHeight - ((data.referenceLevel ?? data.currentLevel ?? 0) / tankHeight) * containerHeight
  // Khoảng cách tối thiểu giữa MaxLevel line và Reference line (px)
  const MIN_DISTANCE = px.v(10)
  // Điều chỉnh vị trí nếu 2 line quá gần nhau
  const distance = Math.abs(referenceYRaw - maxLevelYRaw)
  let maxLevelY = maxLevelYRaw
  let referenceY = referenceYRaw

  if (data.maxLevel !== null && data.referenceLevel !== null && distance < MIN_DISTANCE) {
    // Nếu referenceY ở dưới maxLevelY, đẩy referenceY xuống
    if (referenceYRaw > maxLevelYRaw) {
      referenceY = Math.min(maxLevelYRaw + MIN_DISTANCE, containerHeight)
    } else {
      // Nếu referenceY ở trên maxLevelY, đẩy maxLevelY lên
      maxLevelY = Math.max(0, referenceYRaw - MIN_DISTANCE)
    }
  }
  // waveAreaHeight tính từ bottom đến referenceY (thay vì waterHeight)
  const waveAreaHeight = containerHeight - referenceY
  const containerWidth = cardWidth > 0 ? cardWidth - px.h(24) : 0

  // Kiểm tra mực nước cảnh báo: currentLevel < referenceLevel
  const isLowWaterLevel = data.currentLevel !== null && data.referenceLevel !== null && data.currentLevel < data.referenceLevel

  // Thêm offset ban đầu khác nhau cho mỗi tab dựa trên index để tạo hiệu ứng không đồng bộ
  // Mỗi tab có offset khác nhau: 0, Math.PI/2, Math.PI, etc.
  const initialOffset = index * (Math.PI / 2)
  const waveTranslateFront = useRef(new Animated.Value(0)).current
  const waveTranslateBack = useRef(new Animated.Value(0)).current

  // Tạo path sóng: trong SVG y=0 là top (reference line), y=waveHeight là bottom
  const createWavePath = (offset: number, amplitude: number, frequency: number, width: number, waveHeight: number) => {
    if (width <= 0 || waveHeight <= 0) return ''
    const steps = 60
    const quietWaterHeight = waveHeight * 0.85
    const centerWaveY = Math.min(waveHeight * 0.22, amplitude + px.v(3))
    let path = `M 0 ${waveHeight} L 0 ${quietWaterHeight}`

    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width
      const waveY = amplitude * Math.sin(x * frequency + offset)
      const y = centerWaveY + waveY
      const clampedY = Math.max(0, Math.min(quietWaterHeight, y))
      path += ` L ${x} ${clampedY}`
    }
    path += ` L ${width} ${quietWaterHeight} L ${width} ${waveHeight} Z`
    return path
  }

  // Bien do nho giup mat nuoc mem va khong bi cat phang o dinh.
  const amplitude1 = Math.min(px.v(7), Math.max(px.v(3), waveAreaHeight * 0.07))
  const amplitude2 = Math.min(px.v(5), Math.max(px.v(2), waveAreaHeight * 0.05))
  const tiledWaveWidth = containerWidth * 2
  const waveFrequency = containerWidth > 0 ? (Math.PI * 2) / containerWidth : 0

  // Path SVG chi duoc tao lai khi kich thuoc/muc nuoc thay doi, khong tao lai o moi frame animation.
  const wavePath1 = useMemo(
    () => createWavePath(initialOffset + Math.PI / 5, amplitude1, waveFrequency, tiledWaveWidth, waveAreaHeight),
    [amplitude1, initialOffset, tiledWaveWidth, waveAreaHeight, waveFrequency],
  )
  const wavePath2 = useMemo(
    () => createWavePath(initialOffset + Math.PI * 1.15, amplitude2, waveFrequency, tiledWaveWidth, waveAreaHeight),
    [amplitude2, initialOffset, tiledWaveWidth, waveAreaHeight, waveFrequency],
  )

  useEffect(() => {
    if (containerWidth <= 0) return

    waveTranslateFront.setValue(0)
    waveTranslateBack.setValue(-containerWidth)
    // Hai lop song chay nguoc chieu voi toc do 5s/7.5s tren UI thread, khong render React theo tung frame.
    const frontAnimation = Animated.loop(
      Animated.timing(waveTranslateFront, {
        toValue: -containerWidth,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    )
    const backAnimation = Animated.loop(
      Animated.timing(waveTranslateBack, {
        toValue: 0,
        duration: 7500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    )
    frontAnimation.start()
    backAnimation.start()

    return () => {
      frontAnimation.stop()
      backAnimation.stop()
    }
  }, [containerWidth, waveTranslateBack, waveTranslateFront])

  return (
    <View
      style={StyleSheet.flatten([
        styles.card,
        tabWidth
          ? {
              flex: 0,
              flexGrow: 0,
              flexShrink: 0,
              width: tabWidth,
              minWidth: tabWidth,
              maxWidth: tabWidth,
            }
          : { width: undefined, minWidth: px.h(110) },
        isActive && styles.cardActive,
        isActive && {
          backgroundColor: isDark ? dark.background : light.background,
          borderTopLeftRadius: px.h(12),
          borderTopRightRadius: px.h(12),
          // Bỏ overflow: 'hidden' để shadow không bị cắt
        },
      ])}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout
        if (width > 0 && cardWidth !== width) {
          setCardWidth(width)
        }
      }}
    >
      {isActive ? (
        <Shadow
          distance={isDark ? 10 : 8}
          startColor={isDark ? dark.overview.shadowStart : 'rgba(30, 64, 110, 0.07)'}
          endColor={isDark ? dark.overview.shadowEnd : 'rgba(30, 64, 110, 0)'}
          offset={[0, -1]}
          paintInside={false}
          sides={{ top: true, start: true, end: true, bottom: false }}
          corners={{ topStart: true, topEnd: true, bottomStart: false, bottomEnd: false }}
          stretch
          containerStyle={{
            flex: 1,
            marginRight: 0,
            marginLeft: isLastTab ? 0 : 0, // Sử dụng isLastTab để kiểm tra Shadow có tự động tạo margin
          }}
          style={{
            flex: 1,
            zIndex: 1,
            backgroundColor: isDark ? dark.background : light.background,
            borderTopLeftRadius: px.h(12),
            borderTopRightRadius: px.h(12),
            overflow: 'hidden',
          }}
        >
          <View style={{ flex: 1 }}>
              <Pressable
                onPress={onPress}
                style={[
                  {
                    flex: 1,
                    elevation: 0,
                    backgroundColor: isActive ? (isDark ? dark.background : light.background) : 'transparent',
                    borderRadius: 0,
                  },
                ]}
              >
              <View style={styles.cardContent}>
                <View style={styles.locationContainer}>
                  <Text style={[styles.locationName, { color: isDark ? data.color : light.plants[index % light.plants.length] }]}>{data.name}</Text>
                  <View style={[styles.locationUnderline, { backgroundColor: isDark ? data.color : light.plants[index % light.plants.length] }]} />
                </View>

                <View style={styles.levelContainer}>
                  <Text style={[styles.currentLevel]} numberOfLines={1} adjustsFontSizeToFit>
                    {formatWaterLevel(data.currentLevel)}
                  </Text>
                  <Text style={[styles.maxLevel, !isDark && { color: light.muted }]} numberOfLines={1}>
                    {' '}
                    / {data.maxLevel ?? '—'}
                  </Text>
                </View>

                {containerWidth > 0 && (
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 4, borderTopWidth: 2, borderColor: isDark ? dark.text : light.border }}></View>
                    <View style={[styles.waterContainer, !isDark && { borderColor: light.border }, { height: containerHeight, width: containerWidth - 8 }]}>
                      {waveAreaHeight > 0 && (
                        <View
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: waveAreaHeight,
                            overflow: 'hidden',
                            zIndex: 1,
                          }}
                        >
                          <Animated.View
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              transform: [{ translateX: waveTranslateBack }],
                            }}
                          >
                            <Svg height={waveAreaHeight} width={tiledWaveWidth}>
                              {wavePath2 && (
                                <Path
                                  d={wavePath2}
                                  fill={isLowWaterLevel ? (isDark ? dark.warningMid : light.warningMid) : (isDark ? dark.waterMid : light.waterMid)}
                                  opacity={0.48}
                                />
                              )}
                            </Svg>
                          </Animated.View>
                          <Animated.View
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              transform: [{ translateX: waveTranslateFront }],
                            }}
                          >
                            <Svg height={waveAreaHeight} width={tiledWaveWidth}>
                              <Defs>
                                {isLowWaterLevel ? (
                                  <>
                                    <LinearGradient id={`waterGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                      <Stop offset="0%" stopColor={isDark ? dark.warningTop : light.warningTop} stopOpacity="0.8" />
                                      <Stop offset="50%" stopColor={isDark ? dark.warningMid : light.warningMid} stopOpacity="0.9" />
                                      <Stop offset="100%" stopColor={isDark ? dark.warningBottom : light.warningBottom} stopOpacity="1" />
                                    </LinearGradient>
                                    <LinearGradient id={`waveGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                      <Stop offset="0%" stopColor={isDark ? dark.warningTop : light.warningTop} stopOpacity="0.8" />
                                      <Stop offset="50%" stopColor={isDark ? dark.warningMid : light.warningMid} stopOpacity="0.9" />
                                      <Stop offset="100%" stopColor={isDark ? dark.warningBottom : light.warningBottom} stopOpacity="1" />
                                    </LinearGradient>
                                  </>
                                ) : (
                                  <>
                                    <LinearGradient id={`waterGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                      <Stop offset="0%" stopColor={isDark ? dark.waterTop : light.waterTop} stopOpacity="0.8" />
                                      <Stop offset="50%" stopColor={isDark ? dark.waterMid : light.waterMid} stopOpacity="0.9" />
                                      <Stop offset="100%" stopColor={isDark ? dark.waterBottom : light.waterBottom} stopOpacity="1" />
                                    </LinearGradient>
                                    <LinearGradient id={`waveGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                      <Stop offset="0%" stopColor={isDark ? dark.waterTop : light.waterTop} stopOpacity="0.8" />
                                      <Stop offset="50%" stopColor={isDark ? dark.waterMid : light.waterMid} stopOpacity="0.9" />
                                      <Stop offset="100%" stopColor={isDark ? dark.waterBottom : light.waterBottom} stopOpacity="1" />
                                    </LinearGradient>
                                  </>
                                )}
                              </Defs>
                              {wavePath1 && <Path d={wavePath1} fill={`url(#waveGrad-${data.id})`} opacity={0.8} />}
                            </Svg>
                          </Animated.View>
                        </View>
                      )}

                      {/* MaxLevel line */}
                      {data.maxLevel !== null && (
                      <View
                        style={[
                          styles.referenceLine,
                          {
                            top: maxLevelY,
                            width: containerWidth - px.h(16),
                            zIndex: 10,
                          },
                        ]}
                      >
                        <View style={[styles.dashedLine, { borderTopColor: isDark ? dark.inflow : '#00DF73' }]} />
                        <Text style={[styles.referenceText, { color: isDark ? dark.inflow : '#00DF73' }, !isDark && { backgroundColor: 'transparent' }]}>{data.maxLevel}</Text>
                      </View>
                      )}

                      {/* Reference line */}
                      {data.referenceLevel !== null && (
                      <View
                        style={[
                          styles.referenceLine,
                          {
                            top: referenceY,
                            width: containerWidth - px.h(16),
                            zIndex: 10,
                          },
                        ]}
                      >
                        <Text style={[styles.referenceText, !isDark && { color: light.warning, backgroundColor: 'transparent' }]}>{data.referenceLevel}</Text>
                        <View style={[styles.dashedLine, !isDark && { borderTopColor: light.warning }]} />
                      </View>
                      )}
                    </View>
                    <View style={{ width: 4, borderTopWidth: 2, borderColor: isDark ? dark.text : light.border }}></View>
                  </View>
                )}
              </View>
            </Pressable>
          </View>
        </Shadow>
      ) : (
        <View style={{ flex: 1 }}>
          <Pressable
            onPress={onPress}
            style={[
              {
                flex: 1,
                elevation: 0,
                backgroundColor: isDark ? 'transparent' : light.surface,
                borderRadius: 0,
              },
            ]}
          >
            <View style={styles.cardContent}>
              <View style={styles.locationContainer}>
                <Text style={[styles.locationName, { color: isDark ? data.color : light.plants[index % light.plants.length] }]}>{data.name}</Text>
                <View style={[styles.locationUnderline, { backgroundColor: isDark ? data.color : light.plants[index % light.plants.length] }]} />
              </View>

              <View style={styles.levelContainer}>
                <Text style={[styles.currentLevel]} numberOfLines={1} adjustsFontSizeToFit>
                  {formatWaterLevel(data.currentLevel)}
                </Text>
                <Text style={[styles.maxLevel, !isDark && { color: light.muted }]} numberOfLines={1}>
                  {' '}
                  / {data.maxLevel ?? '—'}
                </Text>
              </View>

              {containerWidth > 0 && (
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 4, borderTopWidth: 2, borderColor: isDark ? dark.text : light.border }}></View>
                  <View style={[styles.waterContainer, !isDark && { borderColor: light.border }, { height: containerHeight, width: containerWidth - 8 }]}>
                    {waveAreaHeight > 0 && (
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: waveAreaHeight,
                          overflow: 'hidden',
                          zIndex: 1,
                        }}
                      >
                        <Animated.View
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            transform: [{ translateX: waveTranslateBack }],
                          }}
                        >
                          <Svg height={waveAreaHeight} width={tiledWaveWidth}>
                            {wavePath2 && (
                              <Path
                                d={wavePath2}
                                fill={isLowWaterLevel ? (isDark ? dark.warningMid : light.warningMid) : (isDark ? dark.waterMid : light.waterMid)}
                                opacity={0.48}
                              />
                            )}
                          </Svg>
                        </Animated.View>
                        <Animated.View
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            transform: [{ translateX: waveTranslateFront }],
                          }}
                        >
                          <Svg height={waveAreaHeight} width={tiledWaveWidth}>
                            <Defs>
                              {isLowWaterLevel ? (
                                <>
                                  <LinearGradient id={`waterGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <Stop offset="0%" stopColor={isDark ? dark.warningTop : light.warningTop} stopOpacity="0.8" />
                                    <Stop offset="50%" stopColor={isDark ? dark.warningMid : light.warningMid} stopOpacity="0.9" />
                                    <Stop offset="100%" stopColor={isDark ? dark.warningBottom : light.warningBottom} stopOpacity="1" />
                                  </LinearGradient>
                                  <LinearGradient id={`waveGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <Stop offset="0%" stopColor={isDark ? dark.warningTop : light.warningTop} stopOpacity="0.8" />
                                    <Stop offset="50%" stopColor={isDark ? dark.warningMid : light.warningMid} stopOpacity="0.9" />
                                    <Stop offset="100%" stopColor={isDark ? dark.warningBottom : light.warningBottom} stopOpacity="1" />
                                  </LinearGradient>
                                </>
                              ) : (
                                <>
                                  <LinearGradient id={`waterGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <Stop offset="0%" stopColor={isDark ? dark.waterTop : light.waterTop} stopOpacity="0.8" />
                                    <Stop offset="50%" stopColor={isDark ? dark.waterMid : light.waterMid} stopOpacity="0.9" />
                                    <Stop offset="100%" stopColor={isDark ? dark.waterBottom : light.waterBottom} stopOpacity="1" />
                                  </LinearGradient>
                                  <LinearGradient id={`waveGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <Stop offset="0%" stopColor={isDark ? dark.waterTop : light.waterTop} stopOpacity="0.8" />
                                    <Stop offset="50%" stopColor={isDark ? dark.waterMid : light.waterMid} stopOpacity="0.9" />
                                    <Stop offset="100%" stopColor={isDark ? dark.waterBottom : light.waterBottom} stopOpacity="1" />
                                  </LinearGradient>
                                </>
                              )}
                            </Defs>
                            {wavePath1 && <Path d={wavePath1} fill={`url(#waveGrad-${data.id})`} opacity={0.8} />}
                          </Svg>
                        </Animated.View>
                      </View>
                    )}

                    {/* MaxLevel line */}
                    {data.maxLevel !== null && (
                    <View
                      style={[
                        styles.referenceLine,
                        {
                          top: maxLevelY,
                          width: containerWidth - px.h(16),
                          zIndex: 10,
                        },
                      ]}
                    >
                      <View style={[styles.dashedLine, { borderTopColor: isDark ? dark.inflow : '#00DF73' }]} />
                      <Text style={[styles.referenceText, { color: isDark ? dark.inflow : '#00DF73' }, !isDark && { backgroundColor: 'transparent' }]}>{data.maxLevel}</Text>
                    </View>
                    )}

                    {/* Reference line */}
                    {data.referenceLevel !== null && (
                    <View
                      style={[
                        styles.referenceLine,
                        {
                          top: referenceY,
                          width: containerWidth - px.h(16),
                          zIndex: 10,
                        },
                      ]}
                    >
                      <Text style={[styles.referenceText, !isDark && { color: light.warning, backgroundColor: 'transparent' }]}>{data.referenceLevel}</Text>
                      <View style={[styles.dashedLine, !isDark && { borderTopColor: light.warning }]} />
                    </View>
                    )}
                  </View>
                  <View style={{ width: 4, borderTopWidth: 2, borderColor: isDark ? dark.text : light.border }}></View>
                </View>
              )}
            </View>
          </Pressable>
        </View>
      )}
    </View>
  )
}

const Overview: React.FC = () => {
  const dispatch = useAppDispatch()
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const { selectedOptionsValue, hydrologyCharData, isLoadingHydrologyChart } = useAppSelector(
    (state: RootState) => state.hydrologySlice,
    shallowEqual,
  )
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const { plants, plantsStatus, plantsError } = useAppSelector(
    (state: RootState) => state.companyPlantSlice,
    shallowEqual,
  )
  // Chuyển đổi dữ liệu từ API sang format của component
  const waterData: WaterLevelData[] = React.useMemo(() => {
    return getReservoirTabs(plants).map((reservoir, index) => ({
      ...reservoir,
      color: reservoir.color || getColorByIndex(index),
    }))
  }, [plants])

  const [activeTab, setActiveTab] = useState<string>('')
  const [tabsViewportWidth, setTabsViewportWidth] = useState(0)

  // Set activeTab khi data được load
  useEffect(() => {
    if (!waterData.some((reservoir) => reservoir.id === activeTab)) {
      setActiveTab(waterData[0]?.id ?? '')
    }
  }, [waterData, activeTab])

  const activeData = waterData.find((d) => d.id === activeTab) || waterData[0]
  const reservoirId = activeData?.id ?? ''
  const referenceLevel = activeData?.referenceLevel ?? null
  const maxLevel = activeData?.maxLevel ?? undefined
  const uniformTabWidth = waterData.length > 3 && tabsViewportWidth > 0 ? tabsViewportWidth / 3 : undefined
  useEffect(() => {
    if (reservoirId) {
      const type = selectedOptionsValue === '7_DAYS' ? 'day' : 'hour'
      dispatch(getHydrographicChart({ maHoChua: reservoirId, type }))
    }
  }, [reservoirId, countRefesh, dispatch, selectedOptionsValue])
  if (waterData.length === 0 && (plantsStatus === 'succeeded' || plantsStatus === 'failed')) {
    return <Text style={{ color: isDark ? dark.text : light.muted }}>{plantsError ?? 'Không có dữ liệu hồ chứa.'}</Text>
  }
  // Hiển thị skeleton loading nếu chưa có dữ liệu
  if (!waterData || waterData.length === 0) {
    return (
      <AnimatedCardContainer
        noneBackground={true}
        backgroundColor={'transparent'}
        borderWidth={0}
        style={{ elevation: 0 }}
        borderRadius={0}
      >
        <View style={[styles.container, { margin: -24 }]}>
          {/* Skeleton cho tabs */}
          <View style={styles.tabsContainer}>
            {[1, 2, 3].map((index) => (
              <View key={index} style={[styles.card, { flex: 1 }]}>
                <View style={styles.cardContent}>
                  <BarSkeleton width={'80%'} height={20} marginTop={8} />
                  <BarSkeleton width={'60%'} height={16} marginTop={12} />
                  <View style={{ marginTop: px.v(12), width: '100%', alignItems: 'center' }}>
                    <BarSkeleton width={'90%'} height={px.v(120)} marginTop={0} />
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Skeleton cho detail container */}
          <View style={[styles.detailContainer, !isDark && { backgroundColor: light.background }]}>
            <BarSkeleton width={'70%'} height={16} marginTop={0} alignSelf="center" />
            <View style={{ marginTop: px.v(16) }}>
              <LineChartSkeleton />
            </View>
            <View style={{ marginTop: px.v(16) }}>
              <BarSkeleton width={'100%'} height={100} marginTop={0} />
            </View>
          </View>
        </View>
      </AnimatedCardContainer>
    )
  }

  return (
    <AnimatedCardContainer
      noneBackground={true}
      backgroundColor={'transparent'}
      borderWidth={0}
      style={{ elevation: 0 }}
      borderRadius={0}
    >
      <View style={[styles.container, { margin: -24 }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onLayout={(event) => {
            const width = event.nativeEvent.layout.width
            if (width > 0 && width !== tabsViewportWidth) setTabsViewportWidth(width)
          }}
          contentContainerStyle={[styles.tabsContainer, { width: undefined, minWidth: '100%' }]}
        >
          {waterData.map((data, index) => (
            <WaterLevelCard
              key={data.id}
              data={data}
              isActive={activeData?.id === data.id}
              isLastTab={index === waterData.length - 1}
              index={index}
              tabWidth={uniformTabWidth}
              onPress={() => {
                if (activeTab !== data.id) {
                  setActiveTab(data.id)
                }
              }}
            />
          ))}
        </ScrollView>

        <View style={[styles.detailContainer, !isDark && { backgroundColor: light.background }]}>
          {activeData && (
            <>
              <Text style={styles.detailText}>
                {/* {activeData.name}: {activeData.currentLevel}m/ {activeData.maxLevel}m */}
              </Text>
              <HydrographicChart
                isLoading={
                  isLoadingHydrologyChart || !Array.isArray(hydrologyCharData) || hydrologyCharData.length < 2
                }
                data={hydrologyCharData}
                referenceLevel={referenceLevel}
                maxLevel={maxLevel}
                selectedOptionsValue={selectedOptionsValue}
              />
              <InflowOutflow
                plantId={activeData.plantId}
                maHoChua={activeData.reservoirCount > 1 ? activeData.id : undefined}
              />
            </>
          )}
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default React.memo(Overview)
