import React, { useState, useRef, useEffect, useMemo } from 'react'
import { View, Text, StyleSheet, Animated, Pressable, Easing } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { px } from '@/core/utils/scale'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
import { styles } from './Overview.styles'
import {
  getHydrologyflowChart,
  getInflowOutflow,
  getHydrographicChart,
  getHydrologyPlantsParam,
} from '@/core/redux/Actions/HydrologyActions'

import HydrographicChart from '@/components/HydrographicChart/HydrographicChart'
import InflowOutflow from '../InflowOutflow/InflowOutflow'
import { Shadow } from 'react-native-shadow-2'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/core/redux/store'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import { Colors } from '@/core/constants/colors'
import { LineChartSkeleton } from '@/components/Skeletons/LineChartSkeleton'

interface WaterLevelData {
  id: string
  name: string
  currentLevel: number
  maxLevel: number
  referenceLevel: number
  color?: string
  abbreviation?: string
  symbol?: string
}
interface PlantsData {
  id: number
  name: string
  currentLevel: number
  maxLevel: number
  referenceLevel: number
  color?: string
  abbreviation?: string
}
// Mảng màu sắc tuần tự cho các nhà máy
const plantColors = ['#FB923C', '#14B8A6', '#00C0E8', '#7DF0FF']

// Lấy màu sắc tuần tự theo index
const getColorByIndex = (index: number): string => {
  return plantColors[index % plantColors.length]
}

const WaterLevelCard: React.FC<{
  data: WaterLevelData
  isActive: boolean
  onPress: () => void
  isLastTab?: boolean
  index: number
}> = ({ data, isActive, onPress, isLastTab = false, index }) => {
  const containerHeight = px.v(120)
  const [cardWidth, setCardWidth] = useState(0)
  const MAX_TANK_HEIGHT = 700

  // waterHeight tính theo currentLevel, referenceLevel cố định để vẽ đường reference line
  // MaxLevel line position: tính toán giống như reference line
  const maxLevelYRaw = containerHeight - (data.maxLevel / MAX_TANK_HEIGHT) * containerHeight
  const referenceYRaw = containerHeight - (data.referenceLevel / MAX_TANK_HEIGHT) * containerHeight
  // Khoảng cách tối thiểu giữa MaxLevel line và Reference line (px)
  const MIN_DISTANCE = px.v(10)
  // Điều chỉnh vị trí nếu 2 line quá gần nhau
  const distance = Math.abs(referenceYRaw - maxLevelYRaw)
  let maxLevelY = maxLevelYRaw
  let referenceY = referenceYRaw

  if (distance < MIN_DISTANCE) {
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
  const isLowWaterLevel = data.currentLevel < data.referenceLevel

  // Thêm offset ban đầu khác nhau cho mỗi tab dựa trên index để tạo hiệu ứng không đồng bộ
  // Mỗi tab có offset khác nhau: 0, Math.PI/2, Math.PI, etc.
  const initialOffset = index * (Math.PI / 2)
  const waveTranslateX = useRef(new Animated.Value(0)).current

  // Tạo path sóng: trong SVG y=0 là top (reference line), y=waveHeight là bottom
  const createWavePath = (offset: number, amplitude: number, frequency: number, width: number, waveHeight: number) => {
    if (width <= 0 || waveHeight <= 0) return ''
    const steps = 60
    const quietWaterHeight = waveHeight * 0.8
    let path = `M 0 ${waveHeight} L 0 ${quietWaterHeight}`

    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width
      const waveY = amplitude * Math.sin(x * frequency + offset)
      const waveCenterPercent = 0.1
      const centerWaveY = waveHeight * waveCenterPercent
      const y = centerWaveY + waveY
      const clampedY = Math.max(0, Math.min(quietWaterHeight, y))
      path += ` L ${x} ${clampedY}`
    }
    path += ` L ${width} ${quietWaterHeight} L ${width} ${waveHeight} Z`
    return path
  }

  const amplitude1 = waveAreaHeight > 0 ? Math.max(8, waveAreaHeight * 0.15) : 8
  const amplitude2 = waveAreaHeight > 0 ? Math.max(6, waveAreaHeight * 0.12) : 6
  const tiledWaveWidth = containerWidth * 2
  const waveFrequency = containerWidth > 0 ? (Math.PI * 2) / containerWidth : 0

  // Path SVG chi duoc tao lai khi kich thuoc/muc nuoc thay doi, khong tao lai o moi frame animation.
  const wavePath1 = useMemo(
    () => createWavePath(initialOffset, amplitude1, waveFrequency, tiledWaveWidth, waveAreaHeight),
    [amplitude1, initialOffset, tiledWaveWidth, waveAreaHeight, waveFrequency],
  )
  const wavePath2 = useMemo(
    () => createWavePath(initialOffset + Math.PI, amplitude2, waveFrequency, tiledWaveWidth, waveAreaHeight),
    [amplitude2, initialOffset, tiledWaveWidth, waveAreaHeight, waveFrequency],
  )

  useEffect(() => {
    if (containerWidth <= 0) return

    waveTranslateX.setValue(0)
    // Chi translate mot path tinh tren UI thread; khong setState va render lai React theo tung frame.
    const animation = Animated.loop(
      Animated.timing(waveTranslateX, {
        toValue: -containerWidth,
        duration: Math.max(4000, 7000 - index * 500),
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    )
    animation.start()

    return () => {
      animation.stop()
    }
  }, [containerWidth, index, waveTranslateX])

  return (
    <View
      style={StyleSheet.flatten([
        styles.card,
        isActive && styles.cardActive,
        isActive && {
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
          distance={8}
          startColor="rgba(0, 0, 0, 0.3)"
          endColor="rgba(0, 0, 0, 0.01)"
          offset={[0, -4]}
          sides={{ top: true, start: true, end: true, bottom: false }}
          containerStyle={{
            marginRight: 0,
            marginLeft: isLastTab ? 0 : 0, // Sử dụng isLastTab để kiểm tra Shadow có tự động tạo margin
          }}
          style={{
            flex: 1,
            zIndex: 1,
            backgroundColor: '#1c056eff',
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
                  backgroundColor: isActive ? '#1c056eff' : 'transparent',
                  borderRadius: 0,
                },
              ]}
            >
              <View style={styles.cardContent}>
                <View style={styles.locationContainer}>
                  <Text style={[styles.locationName, { color: data.color }]}>{data.name}</Text>
                  <View style={[styles.locationUnderline, { backgroundColor: data.color }]} />
                </View>

                <View style={styles.levelContainer}>
                  <Text style={styles.currentLevel} numberOfLines={1} adjustsFontSizeToFit>
                    {data.currentLevel}
                  </Text>
                  <Text style={styles.maxLevel} numberOfLines={1}>
                    {' '}
                    / {data.maxLevel}
                  </Text>
                </View>

                {containerWidth > 0 && (
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 4, borderTopWidth: 2, borderColor: '#fff' }}></View>
                    <View style={[styles.waterContainer, { height: containerHeight, width: containerWidth - 8 }]}>
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
                              transform: [{ translateX: waveTranslateX }],
                            }}
                          >
                            <Svg height={waveAreaHeight} width={tiledWaveWidth}>
                              <Defs>
                                {isLowWaterLevel ? (
                                  <>
                                    <LinearGradient id={`waterGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                      <Stop offset="0%" stopColor={Colors.warningZero} stopOpacity="0.8" />
                                      <Stop offset="50%" stopColor={Colors.warningHalf} stopOpacity="0.9" />
                                      <Stop offset="100%" stopColor={Colors.warningFull} stopOpacity="1" />
                                    </LinearGradient>
                                    <LinearGradient id={`waveGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                      <Stop offset="0%" stopColor={Colors.warningZero} stopOpacity="0.8" />
                                      <Stop offset="50%" stopColor={Colors.warningHalf} stopOpacity="0.9" />
                                      <Stop offset="100%" stopColor={Colors.warningFull} stopOpacity="1" />
                                    </LinearGradient>
                                  </>
                                ) : (
                                  <>
                                    <LinearGradient id={`waterGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                      <Stop offset="0%" stopColor="#7DF0FF" stopOpacity="0.8" />
                                      <Stop offset="50%" stopColor="#3AB7FF" stopOpacity="0.9" />
                                      <Stop offset="100%" stopColor="#1E90FF" stopOpacity="1" />
                                    </LinearGradient>
                                    <LinearGradient id={`waveGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                      <Stop offset="0%" stopColor="#7DF0FF" stopOpacity="0.8" />
                                      <Stop offset="50%" stopColor="#3AB7FF" stopOpacity="0.9" />
                                      <Stop offset="100%" stopColor="#1E90FF" stopOpacity="1" />
                                    </LinearGradient>
                                  </>
                                )}
                              </Defs>
                              {wavePath1 && <Path d={wavePath1} fill={`url(#waveGrad-${data.id})`} opacity={0.8} />}
                              {wavePath2 && <Path d={wavePath2} fill={`url(#waveGrad-${data.id})`} opacity={0.6} />}
                            </Svg>
                          </Animated.View>
                        </View>
                      )}

                      {/* MaxLevel line */}
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
                        <View style={[styles.dashedLine, { borderTopColor: '#00DF73' }]} />
                        <Text style={[styles.referenceText, { color: '#00DF73' }]}>{data.maxLevel}</Text>
                      </View>

                      {/* Reference line */}
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
                        <Text style={styles.referenceText}>{data.referenceLevel}</Text>
                        <View style={styles.dashedLine} />
                      </View>
                    </View>
                    <View style={{ width: 4, borderTopWidth: 2, borderColor: '#fff' }}></View>
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
                backgroundColor: 'transparent',
                borderRadius: 0,
              },
            ]}
          >
            <View style={styles.cardContent}>
              <View style={styles.locationContainer}>
                <Text style={[styles.locationName, { color: data.color }]}>{data.name}</Text>
                <View style={[styles.locationUnderline, { backgroundColor: data.color }]} />
              </View>

              <View style={styles.levelContainer}>
                <Text style={styles.currentLevel} numberOfLines={1} adjustsFontSizeToFit>
                  {data.currentLevel}
                </Text>
                <Text style={styles.maxLevel} numberOfLines={1}>
                  {' '}
                  / {data.maxLevel}
                </Text>
              </View>

              {containerWidth > 0 && (
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: 4, borderTopWidth: 2, borderColor: '#fff' }}></View>
                  <View style={[styles.waterContainer, { height: containerHeight, width: containerWidth - 8 }]}>
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
                            transform: [{ translateX: waveTranslateX }],
                          }}
                        >
                          <Svg height={waveAreaHeight} width={tiledWaveWidth}>
                            <Defs>
                              {isLowWaterLevel ? (
                                <>
                                  <LinearGradient id={`waterGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <Stop offset="0%" stopColor={Colors.warningZero} stopOpacity="0.8" />
                                    <Stop offset="50%" stopColor={Colors.warningHalf} stopOpacity="0.9" />
                                    <Stop offset="100%" stopColor={Colors.warningFull} stopOpacity="1" />
                                  </LinearGradient>
                                  <LinearGradient id={`waveGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <Stop offset="0%" stopColor={Colors.warningZero} stopOpacity="0.8" />
                                    <Stop offset="50%" stopColor={Colors.warningHalf} stopOpacity="0.9" />
                                    <Stop offset="100%" stopColor={Colors.warningFull} stopOpacity="1" />
                                  </LinearGradient>
                                </>
                              ) : (
                                <>
                                  <LinearGradient id={`waterGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <Stop offset="0%" stopColor="#7DF0FF" stopOpacity="0.8" />
                                    <Stop offset="50%" stopColor="#3AB7FF" stopOpacity="0.9" />
                                    <Stop offset="100%" stopColor="#1E90FF" stopOpacity="1" />
                                  </LinearGradient>
                                  <LinearGradient id={`waveGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <Stop offset="0%" stopColor="#7DF0FF" stopOpacity="0.8" />
                                    <Stop offset="50%" stopColor="#3AB7FF" stopOpacity="0.9" />
                                    <Stop offset="100%" stopColor="#1E90FF" stopOpacity="1" />
                                  </LinearGradient>
                                </>
                              )}
                            </Defs>
                            {wavePath1 && <Path d={wavePath1} fill={`url(#waveGrad-${data.id})`} opacity={0.8} />}
                            {wavePath2 && <Path d={wavePath2} fill={`url(#waveGrad-${data.id})`} opacity={0.6} />}
                          </Svg>
                        </Animated.View>
                      </View>
                    )}

                    {/* MaxLevel line */}
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
                      <View style={[styles.dashedLine, { borderTopColor: '#00DF73' }]} />
                      <Text style={[styles.referenceText, { color: '#00DF73' }]}>{data.maxLevel}</Text>
                    </View>

                    {/* Reference line */}
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
                      <Text style={styles.referenceText}>{data.referenceLevel}</Text>
                      <View style={styles.dashedLine} />
                    </View>
                  </View>
                  <View style={{ width: 4, borderTopWidth: 2, borderColor: '#fff' }}></View>
                </View>
              )}
            </View>
          </Pressable>
        </View>
      )}
    </View>
  )
}

const getReferenceLevel = (hydroElectricId: string, hydrologyPlants: PlantsData[]): number => {
  let result = 0
  const findHydrologyItem = hydrologyPlants.find((e) => e.abbreviation === hydroElectricId)
  if (findHydrologyItem) result = findHydrologyItem.referenceLevel
  return result
}

const getMaxLevel = (hydrologyPlants: PlantsData[]): number => {
  return hydrologyPlants.reduce((max, item) => Math.max(max, item.maxLevel), 0)
}
const Overview: React.FC = () => {
  const dispatch = useDispatch()
  const { hydrologyPlants, selectedOptionsValue } = useSelector((state: RootState) => state.hydrologySlice)
  const { countRefesh } = useSelector((state: any) => state.homeSlice)
  // Chuyển đổi dữ liệu từ API sang format của component
  const waterData: WaterLevelData[] = React.useMemo(() => {
    if (!hydrologyPlants?.plantsData || hydrologyPlants.plantsData.length === 0) {
      return []
    }
    return hydrologyPlants.plantsData.map((plant, index) => ({
      id: String(plant.id),
      name: plant.name,
      currentLevel: plant.currentLevel,
      maxLevel: plant.maxLevel,
      referenceLevel: plant.referenceLevel,
      color: getColorByIndex(index),
      abbreviation: plant.abbreviation,
      symbol: plant.symbol,
    }))
  }, [hydrologyPlants?.plantsData])

  const [activeTab, setActiveTab] = useState<string>('')
  const { hydrologyCharData, isLoadingHydrologyChart } = useSelector((state: any) => state.hydrologySlice)

  useEffect(() => {
    dispatch(getHydrologyPlantsParam({}))
  }, [countRefesh, dispatch])

  // Set activeTab khi data được load
  useEffect(() => {
    if (waterData.length > 0 && !activeTab) {
      setActiveTab(waterData[0].id)
    }
  }, [waterData, activeTab])

  const activeData = waterData.find((d) => d.id === activeTab) || waterData[0]
  const hydroElectricId = activeData?.abbreviation || ''
  const currentPlantId = activeData ? activeData.symbol : ''
  console.log(currentPlantId)
  const referenceLevel = getReferenceLevel(hydroElectricId, hydrologyPlants.plantsData)
  const maxLevel = getMaxLevel(hydrologyPlants.plantsData)
  useEffect(() => {
    let companyId = ''
    switch (hydroElectricId) {
      case 'buon-tua-srah':
        companyId = 'BTS'
        break
      case 'buon-kuop':
        companyId = 'BK'
        break
      case 'srepok-3':
        companyId = 'SP3'
        break
      default:
        // companyId = hydroElectricId
        break
    }
    if (companyId !== '') {
      const type = selectedOptionsValue === '7_DAYS' ? 'day' : ''
      dispatch(
        getHydrographicChart({
          companyId: companyId,
          type: type,
        }),
      )
      dispatch(getInflowOutflow({ hydroElectricId: companyId }))
    }
  }, [hydroElectricId, countRefesh, dispatch, selectedOptionsValue])
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
          <View style={styles.detailContainer}>
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
        <View style={styles.tabsContainer}>
          {waterData.map((data, index) => (
            <WaterLevelCard
              key={data.id}
              data={data}
              isActive={activeTab === data.id}
              isLastTab={index === waterData.length - 1}
              index={index}
              onPress={() => {
                if (activeTab !== data.id) {
                  setActiveTab(data.id)
                }
              }}
            />
          ))}
        </View>

        <View style={styles.detailContainer}>
          {activeData && (
            <>
              <Text style={styles.detailText}>
                {/* {activeData.name}: {activeData.currentLevel}m/ {activeData.maxLevel}m */}
              </Text>
              <HydrographicChart
                isLoading={isLoadingHydrologyChart}
                data={hydrologyCharData}
                referenceLevel={referenceLevel}
                maxLevel={maxLevel}
                bgColor={'#1c056eff'}
                selectedOptionsValue={selectedOptionsValue}
              />
              <InflowOutflow hydroElectricId={currentPlantId || 'BTS'} />
            </>
          )}
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default Overview
