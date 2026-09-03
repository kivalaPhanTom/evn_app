import React, { useState, useRef, useEffect, useMemo } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { px } from '@/core/utils/scale'
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg'
import { styles } from './ReservoirInfo.styles'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { RootState } from '@/core/redux/store'
import { getHydrologyPlantsParam } from '@/core/redux/domains/hydrology'

interface ReservoirData {
  currentLevel: number
  maxLevel: number
  deadLevel: number
  samePeriodLastYear: number
  referenceLevel: number
  previousLevel: number
  percent: number
  symbol: string
  name: string
}

function ReservoirInfo(props: { currentPlantId: string }) {
  const { currentPlantId } = props;
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [containerWidth, setContainerWidth] = useState(0)
  const containerHeight = px.v(140)

  const { currentHydrologyPlant } = useAppSelector((state: RootState) => state.hydrologySlice)

  // Call API when component mounts or currentPlantId changes
  useEffect(() => {
    if (currentPlantId) {
      dispatch(getHydrologyPlantsParam({ currentPlantId }))
    }
  }, [currentPlantId, dispatch])

  // Map API data to ReservoirData format
  const data = useMemo(() => {
    if (currentHydrologyPlant?.plantsData && currentHydrologyPlant.plantsData.length > 0) {
      const plantData = currentHydrologyPlant.plantsData[0]
      return {
        currentLevel: plantData.currentLevel,
        maxLevel: plantData.maxLevel,
        deadLevel: plantData.referenceLevel, // Using referenceLevel as deadLevel
        previousLevel: plantData.previousLevel,
        referenceLevel: plantData.referenceLevel,
        name: plantData.name,
        percent: plantData.percent,
        symbol: plantData.symbol,
      }
    }
  }, [currentHydrologyPlant])

  // Use percentage from API
  const waterHeightPercent = data?.percent || 0
  const waterHeight = (waterHeightPercent / 100) * containerHeight
  // Reference line position: calculate from bottom based on maxLevel
  const referenceY = data?.maxLevel
    ? containerHeight - ((data.deadLevel / data.maxLevel) * containerHeight)
    : 0
  // MaxLevel line position: at the top (y = 0) since maxLevel is the maximum
  const maxLevelY = 0
  const waveAreaHeight = waterHeight
  const gaugeWidth = containerWidth > 0 ? containerWidth : px.h(80)

  // Check if water level is low
  const isLowWaterLevel = (data?.currentLevel || 0) < (data?.referenceLevel || 0)

  // Wave animation offsets
  const initialOffset = 0
  const waveOffset1 = useRef(new Animated.Value(initialOffset)).current
  const waveOffset2 = useRef(new Animated.Value(initialOffset * 1.2)).current
  const [wavePath1, setWavePath1] = useState('')
  const [wavePath2, setWavePath2] = useState('')

  // Create wave path
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

  useEffect(() => {
    if (gaugeWidth <= 0) return

    const amplitude1 = waveAreaHeight > 0 ? Math.max(8, waveAreaHeight * 0.15) : 8
    const amplitude2 = waveAreaHeight > 0 ? Math.max(6, waveAreaHeight * 0.12) : 6

    if (waveAreaHeight > 0) {
      setWavePath1(createWavePath(initialOffset, amplitude1, 0.02, gaugeWidth, waveAreaHeight))
      setWavePath2(createWavePath(initialOffset * 1.2, amplitude2, 0.025, gaugeWidth, waveAreaHeight))
    }

    const duration1 = 6000
    const duration2 = 7500

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

    const listener1 = waveOffset1.addListener(({ value }: { value: number }) => {
      if (waveAreaHeight > 0) {
        setWavePath1(createWavePath(value, amplitude1, 0.02, gaugeWidth, waveAreaHeight))
      }
    })
    const listener2 = waveOffset2.addListener(({ value }: { value: number }) => {
      if (waveAreaHeight > 0) {
        setWavePath2(createWavePath(value, amplitude2, 0.025, gaugeWidth, waveAreaHeight))
      }
    })

    anim1.start()
    anim2.start()

    return () => {
      anim1.stop()
      anim2.stop()
      waveOffset1.removeListener(listener1)
      waveOffset2.removeListener(listener2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gaugeWidth, waveAreaHeight])

  // Calculate gradient direction for 122.53deg
  // 122.53deg from vertical = 32.53deg from horizontal
  const angle = 122.53 * (Math.PI / 180)
  const startX = 0.5 - 0.5 * Math.sin(angle)
  const startY = 0.5 - 0.5 * Math.cos(angle)
  const endX = 0.5 + 0.5 * Math.sin(angle)
  const endY = 0.5 + 0.5 * Math.cos(angle)

  return (
    <LinearGradient
      colors={['rgba(34, 211, 238, 0.12)', 'rgba(59, 130, 246, 0.08)', 'rgba(99, 102, 241, 0.1)']}
      locations={[0, 0.5, 1]}
      start={{ x: startX, y: startY }}
      end={{ x: endX, y: endY }}
      style={styles.wrapper}
    >
      <View style={styles.header}>
        <Text style={styles.title}>MỰC NƯỚC HỒ CHỨA (m)</Text>
        <Text style={styles.locationName}>{data?.name}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.contentRow}>
          {/* Left side - Water Gauge */}
          <View
            style={styles.gaugeContainer}
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout
              if (width > 0 && containerWidth !== width) {
                setContainerWidth(width)
              }
            }}
          >
            {gaugeWidth > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.waterContainer, { height: containerHeight, width: gaugeWidth - 8 }]}>
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
                      <Svg height={waveAreaHeight} width={gaugeWidth} style={{ position: 'absolute', bottom: 0 }}>
                        <Defs>
                          {isLowWaterLevel ? (
                            <>
                              <SvgLinearGradient id="waterGrad-reservoir" x1="0%" y1="0%" x2="0%" y2="100%">
                                <Stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.8" />
                                <Stop offset="50%" stopColor="#FF4757" stopOpacity="0.9" />
                                <Stop offset="100%" stopColor="#FF3838" stopOpacity="1" />
                              </SvgLinearGradient>
                              <SvgLinearGradient id="waveGrad-reservoir" x1="0%" y1="0%" x2="0%" y2="100%">
                                <Stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.8" />
                                <Stop offset="50%" stopColor="#FF4757" stopOpacity="0.9" />
                                <Stop offset="100%" stopColor="#FF3838" stopOpacity="1" />
                              </SvgLinearGradient>
                            </>
                          ) : (
                            <>
                              <SvgLinearGradient id="waterGrad-reservoir" x1="0%" y1="0%" x2="0%" y2="100%">
                                <Stop offset="0%" stopColor="#7DF0FF" stopOpacity="0.8" />
                                <Stop offset="50%" stopColor="#3AB7FF" stopOpacity="0.9" />
                                <Stop offset="100%" stopColor="#1E90FF" stopOpacity="1" />
                              </SvgLinearGradient>
                              <SvgLinearGradient id="waveGrad-reservoir" x1="0%" y1="0%" x2="0%" y2="100%">
                                <Stop offset="0%" stopColor="#7DF0FF" stopOpacity="0.8" />
                                <Stop offset="50%" stopColor="#3AB7FF" stopOpacity="0.9" />
                                <Stop offset="100%" stopColor="#1E90FF" stopOpacity="1" />
                              </SvgLinearGradient>
                            </>
                          )}
                        </Defs>
                        {wavePath1 && <Path d={wavePath1} fill="url(#waveGrad-reservoir)" opacity={0.8} />}
                        {wavePath2 && <Path d={wavePath2} fill="url(#waveGrad-reservoir)" opacity={0.6} />}
                      </Svg>
                    </View>
                  )}

                  {/* Percentage text in the middle of water */}
                  {/* {waterHeightPercent > 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        bottom: waveAreaHeight / 2 - px.v(12),
                        left: 0,
                        right: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 5,
                      }}
                    >
                      <Text style={styles.percentageText}>{waterHeightPercent} %</Text>
                    </View>
                  )} */}

                  {/* MaxLevel line */}
                  <View
                    style={[
                      styles.referenceLine,
                      {
                        top: maxLevelY,
                        width: gaugeWidth - px.h(16),
                        zIndex: 10,
                      },
                    ]}
                  >
                    <View style={[styles.dashedLine, { borderTopColor: '#00DF73' }]} />
                    <Text style={[styles.referenceText, { color: '#00DF73', marginRight: 6, marginLeft: 0 }]}>{data?.maxLevel}</Text>
                  </View>

                  {/* Reference line */}
                  <View
                    style={[
                      styles.referenceLine,
                      {
                        top: referenceY,
                        width: gaugeWidth - px.h(16),
                        zIndex: 10,
                      },
                    ]}
                  >
                    <Text style={[styles.referenceText, { marginLeft: 0}]}>{data?.deadLevel}</Text>
                    <View style={styles.dashedLine} />
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Right side - Information */}
          <View style={styles.infoContainer}>
            <View style={styles.currentLevelContainer}>
              <Text style={styles.currentLevel}>{data?.currentLevel}</Text>
              <Text style={styles.maxLevel}>/ {data?.maxLevel} (mực nước tối đa)</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Mực nước chết</Text>
              <Text style={styles.infoValue}>{data?.deadLevel}</Text>
            </View>

            <View style={[styles.infoRow, { marginBottom: 0 }]}>
              <Text style={styles.infoLabel}>Cùng kỳ năm ngoái</Text>
              <Text style={styles.infoValue}>{data?.previousLevel}</Text>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

export default ReservoirInfo
