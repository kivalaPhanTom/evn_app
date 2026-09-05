import React, { useState, useRef, useEffect, useMemo } from 'react'
import { View, Text, Animated, Easing } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { px } from '@/core/utils/scale'
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg'
import { styles } from './ReservoirInfo.styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/core/redux/store'
import { getHydrologyPlantsParam } from '@/core/redux/Actions/HydrologyActions'

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
  const { currentPlantId } = props
  const router = useRouter()
  const dispatch = useDispatch()
  const [containerWidth, setContainerWidth] = useState(0)
  const containerHeight = px.v(140)

  const { currentHydrologyPlant } = useSelector((state: RootState) => state.hydrologySlice)

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
  const referenceY = data?.maxLevel ? containerHeight - (data.deadLevel / data.maxLevel) * containerHeight : 0
  // MaxLevel line position: at the top (y = 0) since maxLevel is the maximum
  const maxLevelY = 0
  const waveAreaHeight = waterHeight
  const gaugeWidth = containerWidth > 0 ? containerWidth : px.h(80)

  // Check if water level is low
  const isLowWaterLevel = (data?.currentLevel || 0) < (data?.referenceLevel || 0)

  const waveTranslateFront = useRef(new Animated.Value(0)).current
  const waveTranslateBack = useRef(new Animated.Value(0)).current

  // Create wave path
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
  const tiledWaveWidth = gaugeWidth * 2
  const waveFrequency = gaugeWidth > 0 ? (Math.PI * 2) / gaugeWidth : 0

  // Path SVG chi duoc tao lai khi kich thuoc hoac muc nuoc thay doi, khong tao lai theo tung frame.
  const wavePath1 = useMemo(
    () => createWavePath(Math.PI / 5, amplitude1, waveFrequency, tiledWaveWidth, waveAreaHeight),
    [amplitude1, tiledWaveWidth, waveAreaHeight, waveFrequency],
  )
  const wavePath2 = useMemo(
    () => createWavePath(Math.PI * 1.15, amplitude2, waveFrequency, tiledWaveWidth, waveAreaHeight),
    [amplitude2, tiledWaveWidth, waveAreaHeight, waveFrequency],
  )

  useEffect(() => {
    if (gaugeWidth <= 0 || waveAreaHeight <= 0) return

    waveTranslateFront.setValue(0)
    waveTranslateBack.setValue(-gaugeWidth)
    // Hai lop song chay nguoc chieu, khac toc do tren UI thread de chuyen dong tu nhien ma van nhe.
    const frontAnimation = Animated.loop(
      Animated.timing(waveTranslateFront, {
        toValue: -gaugeWidth,
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
  }, [gaugeWidth, waveAreaHeight, waveTranslateBack, waveTranslateFront])

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
                          <Defs>
                            <SvgLinearGradient id="waveGrad-reservoir-back" x1="0%" y1="0%" x2="0%" y2="100%">
                              <Stop
                                offset="0%"
                                stopColor={isLowWaterLevel ? '#FF8A8A' : '#8CF4FF'}
                                stopOpacity="0.55"
                              />
                              <Stop
                                offset="100%"
                                stopColor={isLowWaterLevel ? '#FF4757' : '#3AB7FF'}
                                stopOpacity="0.7"
                              />
                            </SvgLinearGradient>
                          </Defs>
                          {wavePath2 && <Path d={wavePath2} fill="url(#waveGrad-reservoir-back)" />}
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
                            <SvgLinearGradient id="waveGrad-reservoir-front" x1="0%" y1="0%" x2="0%" y2="100%">
                              <Stop
                                offset="0%"
                                stopColor={isLowWaterLevel ? '#FF6B6B' : '#7DF0FF'}
                                stopOpacity="0.78"
                              />
                              <Stop
                                offset="55%"
                                stopColor={isLowWaterLevel ? '#FF4757' : '#3AB7FF'}
                                stopOpacity="0.88"
                              />
                              <Stop
                                offset="100%"
                                stopColor={isLowWaterLevel ? '#E92D3D' : '#1E90FF'}
                                stopOpacity="0.96"
                              />
                            </SvgLinearGradient>
                          </Defs>
                          {wavePath1 && <Path d={wavePath1} fill="url(#waveGrad-reservoir-front)" />}
                        </Svg>
                      </Animated.View>
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
                    <Text style={[styles.referenceText, { color: '#00DF73', marginRight: 6, marginLeft: 0 }]}>
                      {data?.maxLevel}
                    </Text>
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
                    <Text style={[styles.referenceText, { marginLeft: 0 }]}>{data?.deadLevel}</Text>
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
