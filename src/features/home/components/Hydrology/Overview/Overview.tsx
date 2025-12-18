import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { px } from '@/core/utils/scale'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
import { styles } from './Overview.styles'
import { getHydrologyflowChart, getInflowOutflow, getHydrographicChart } from '@/core/redux/Actions/HydrologyActions'

import HydrographicChart from '@/components/HydrographicChart/HydrographicChart'
import InflowOutflow from '../InflowOutflow/InflowOutflow'
import { Shadow } from 'react-native-shadow-2'
import { useDispatch, useSelector } from 'react-redux'
import { getHydrologyPlantsParam } from '@/core/redux/Actions/HydrologyActions'
import { RootState } from '@/core/redux/store'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import LineBarChartSkeleton from '@/components/Skeletons/LineBarChartSkeleton'

interface WaterLevelData {
  id: string
  name: string
  currentLevel: number
  maxLevel: number
  referenceLevel: number
  color?: string
  abbreviation?: string
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

const WaterLevelCard: React.FC<{ data: WaterLevelData; isActive: boolean; onPress: () => void; isLastTab?: boolean; index: number }> = ({
  data,
  isActive,
  onPress,
  isLastTab = false,
  index,
}) => {
  const containerHeight = px.v(120)
  const [cardWidth, setCardWidth] = useState(0)
  const MAX_TANK_HEIGHT = 700

  // waterHeight tính theo currentLevel, referenceLevel cố định để vẽ đường reference line
  const waterHeightPercent = (data.currentLevel / MAX_TANK_HEIGHT) * 100
  const waterHeight = (waterHeightPercent / 100) * containerHeight
  const referenceY = containerHeight - (data.referenceLevel / MAX_TANK_HEIGHT) * containerHeight
  const waveAreaHeight = waterHeight
  const containerWidth = cardWidth > 0 ? cardWidth - px.h(24) : 0

  // Kiểm tra mực nước cảnh báo: currentLevel < referenceLevel
  const isLowWaterLevel = data.currentLevel < data.referenceLevel

  // Thêm offset ban đầu khác nhau cho mỗi tab dựa trên index để tạo hiệu ứng không đồng bộ
  // Mỗi tab có offset khác nhau: 0, Math.PI/2, Math.PI, etc.
  const initialOffset = index * (Math.PI / 2)
  const waveOffset1 = useRef(new Animated.Value(initialOffset)).current
  const waveOffset2 = useRef(new Animated.Value(initialOffset * 1.2)).current
  const waveOffsetBottom1 = useRef(new Animated.Value(initialOffset * 0.8)).current
  const waveOffsetBottom2 = useRef(new Animated.Value(initialOffset * 1.1)).current
  const [wavePath1, setWavePath1] = useState('')
  const [wavePath2, setWavePath2] = useState('')
  const [wavePathBottom1, setWavePathBottom1] = useState('')
  const [wavePathBottom2, setWavePathBottom2] = useState('')

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

  const createBottomWavePath = (
    offset: number,
    amplitude: number,
    frequency: number,
    width: number,
    height: number,
  ) => {
    if (width <= 0 || height <= 0) return ''
    const steps = 60
    const centerY = height / 2
    let path = `M 0 0`

    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width
      const waveY = amplitude * Math.sin(x * frequency + offset)
      const y = centerY + waveY
      const clampedY = Math.max(0, Math.min(height, y))
      path += ` L ${x} ${clampedY}`
    }
    path += ` L ${width} 0 Z`
    return path
  }

  useEffect(() => {
    if (containerWidth <= 0) return

    const amplitude1 = waveAreaHeight > 0 ? Math.max(8, waveAreaHeight * 0.15) : 8
    const amplitude2 = waveAreaHeight > 0 ? Math.max(6, waveAreaHeight * 0.12) : 6
    const amplitudeBottom1 = waterHeight > 0 ? Math.max(8, waterHeight * 0.15) : 8
    const amplitudeBottom2 = waterHeight > 0 ? Math.max(6, waterHeight * 0.12) : 6

    if (waveAreaHeight > 0) {
      setWavePath1(createWavePath(initialOffset, amplitude1, 0.02, containerWidth, waveAreaHeight))
      setWavePath2(createWavePath(initialOffset * 1.2, amplitude2, 0.025, containerWidth, waveAreaHeight))
    }

    if (waterHeight > 0) {
      setWavePathBottom1(
        createBottomWavePath(initialOffset * 0.8, amplitudeBottom1, 0.015, containerWidth, waterHeight),
      )
      setWavePathBottom2(
        createBottomWavePath(initialOffset * 1.1, amplitudeBottom2, 0.018, containerWidth, waterHeight),
      )
    }

    // Tốc độ animation khác nhau dựa trên index: mỗi tab nhanh hơn 0.5s
    const speedOffset = index * 500 // Giảm duration để animation nhanh hơn
    const duration1 = Math.max(3000, 6000 - speedOffset) // Tối thiểu 3s
    const duration2 = Math.max(4000, 7500 - speedOffset) // Tối thiểu 4s
    const durationBottom1 = Math.max(3500, 6500 - speedOffset) // Tối thiểu 3.5s
    const durationBottom2 = Math.max(4500, 8000 - speedOffset) // Tối thiểu 4.5s

    const anim1 = Animated.loop(
      Animated.timing(waveOffset1, {
        toValue: initialOffset + Math.PI * 2,
        duration: duration1,
        useNativeDriver: false,
      }),
      { iterations: -1 },
    )
    const anim2 = Animated.loop(
      Animated.timing(waveOffset2, {
        toValue: initialOffset * 1.2 + Math.PI * 2,
        duration: duration2,
        useNativeDriver: false,
      }),
      { iterations: -1 },
    )
    const animBottom1 = Animated.loop(
      Animated.timing(waveOffsetBottom1, {
        toValue: initialOffset * 0.8 + Math.PI * 2,
        duration: durationBottom1,
        useNativeDriver: false,
      }),
      { iterations: -1 },
    )
    const animBottom2 = Animated.loop(
      Animated.timing(waveOffsetBottom2, {
        toValue: initialOffset * 1.1 + Math.PI * 2,
        duration: durationBottom2,
        useNativeDriver: false,
      }),
      { iterations: -1 },
    )

    const listener1 = waveOffset1.addListener(({ value }) => {
      if (waveAreaHeight > 0) {
        setWavePath1(createWavePath(value, amplitude1, 0.02, containerWidth, waveAreaHeight))
      }
    })
    const listener2 = waveOffset2.addListener(({ value }) => {
      if (waveAreaHeight > 0) {
        setWavePath2(createWavePath(value, amplitude2, 0.025, containerWidth, waveAreaHeight))
      }
    })
    const listenerBottom1 = waveOffsetBottom1.addListener(({ value }) => {
      if (waterHeight > 0) {
        setWavePathBottom1(createBottomWavePath(value, amplitudeBottom1, 0.015, containerWidth, waterHeight))
      }
    })
    const listenerBottom2 = waveOffsetBottom2.addListener(({ value }) => {
      if (waterHeight > 0) {
        setWavePathBottom2(createBottomWavePath(value, amplitudeBottom2, 0.018, containerWidth, waterHeight))
      }
    })

    anim1.start()
    anim2.start()
    animBottom1.start()
    animBottom2.start()

    return () => {
      anim1.stop()
      anim2.stop()
      animBottom1.stop()
      animBottom2.stop()
      waveOffset1.removeListener(listener1)
      waveOffset2.removeListener(listener2)
      waveOffsetBottom1.removeListener(listenerBottom1)
      waveOffsetBottom2.removeListener(listenerBottom2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth, waveAreaHeight, waterHeight])

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
                    {data.currentLevel}m
                  </Text>
                  <Text style={styles.maxLevel} numberOfLines={1}>
                    {' '}
                    / {data.maxLevel}m
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
                            overflow: 'visible',
                            zIndex: 1,
                          }}
                        >
                          <Svg height={waveAreaHeight} width={containerWidth} style={{ position: 'absolute', bottom: 0 }}>
                            <Defs>
                              {isLowWaterLevel ? (
                                <>
                                  <LinearGradient id={`waterGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <Stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.8" />
                                    <Stop offset="50%" stopColor="#FF4757" stopOpacity="0.9" />
                                    <Stop offset="100%" stopColor="#FF3838" stopOpacity="1" />
                                  </LinearGradient>
                                  <LinearGradient id={`waveGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                    <Stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.8" />
                                    <Stop offset="50%" stopColor="#FF4757" stopOpacity="0.9" />
                                    <Stop offset="100%" stopColor="#FF3838" stopOpacity="1" />
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
                        </View>
                      )}

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
                        <View style={styles.dashedLine} />
                        <Text style={styles.referenceText}>{data.referenceLevel}m</Text>
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
                  {data.currentLevel}m
                </Text>
                <Text style={styles.maxLevel} numberOfLines={1}>
                  {' '}
                  / {data.maxLevel}m
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
                          overflow: 'visible',
                          zIndex: 1,
                        }}
                      >
                        <Svg height={waveAreaHeight} width={containerWidth} style={{ position: 'absolute', bottom: 0 }}>
                          <Defs>
                            {isLowWaterLevel ? (
                              <>
                                <LinearGradient id={`waterGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                  <Stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.8" />
                                  <Stop offset="50%" stopColor="#FF4757" stopOpacity="0.9" />
                                  <Stop offset="100%" stopColor="#FF3838" stopOpacity="1" />
                                </LinearGradient>
                                <LinearGradient id={`waveGrad-${data.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                  <Stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.8" />
                                  <Stop offset="50%" stopColor="#FF4757" stopOpacity="0.9" />
                                  <Stop offset="100%" stopColor="#FF3838" stopOpacity="1" />
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
                      </View>
                    )}

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
                      <View style={styles.dashedLine} />
                      <Text style={styles.referenceText}>{data.referenceLevel}m</Text>
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

const getReferenceLevel =(hydroElectricId:string, hydrologyPlants:PlantsData[]):number=>{
   let result = 0
   const findHydrologyItem = hydrologyPlants.find(e => e.abbreviation === hydroElectricId)
   if(findHydrologyItem) result = findHydrologyItem.referenceLevel
   return result
}

const Overview: React.FC = () => {
  const dispatch = useDispatch()
  const { hydrologyPlants } = useSelector((state: RootState) => state.hydrologySlice)
  
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
    }))
  }, [hydrologyPlants?.plantsData])

  const [activeTab, setActiveTab] = useState<string>('')
  const { hydrologyCharData } = useSelector((state: any) => state.hydrologySlice)

  useEffect(() => {
    dispatch(getHydrologyPlantsParam())
  }, [dispatch])

  // Set activeTab khi data được load
  useEffect(() => {
    if (waterData.length > 0 && !activeTab) {
      setActiveTab(waterData[0].id)
    }
  }, [waterData, activeTab])

  const activeData = waterData.find((d) => d.id === activeTab) || waterData[0]
  console.log('Rendering Overview with activeTab:', activeData)
  const hydroElectricId = activeData?.abbreviation || ''
  const referenceLevel = getReferenceLevel(hydroElectricId, hydrologyPlants.plantsData)
  useEffect(() => {
    let companyId = ""
    switch (hydroElectricId) {
      case "buon-tua-srah":
        companyId = "BTS"
        break;
      case "buon-kuop":
        companyId = "BK"
        break;
      case "srepok-3":
        companyId = "SP3"
        break;
      default:
        // companyId = hydroElectricId
        break;
    }
    if (companyId !== "") {
      dispatch(getHydrographicChart({ companyId: companyId }))
    }
    

  }, [hydroElectricId])
  // Hiển thị skeleton loading nếu chưa có dữ liệu
  if (!waterData || waterData.length === 0) {
    return (
      <AnimatedCardContainer backgroundColor={'transparent'} borderWidth={0} style={{ elevation: 0 }} borderRadius={0}>
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
              <LineBarChartSkeleton isShowLine={false} />
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
    <AnimatedCardContainer backgroundColor={'transparent'} borderWidth={0} style={{ elevation: 0 }} borderRadius={0}>
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
                {activeData.name}: {activeData.currentLevel}m/ {activeData.maxLevel}m
              </Text>
              <HydrographicChart isLoading={false} data={hydrologyCharData} referenceLevel = {referenceLevel}/>
              <InflowOutflow hydroElectricId={hydroElectricId} />
            </>
          )}
        </View>
      </View >
    </AnimatedCardContainer >
  )
}

export default Overview
