import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { px } from '@/core/utils/scale'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'
import { styles } from './Overview.styles'

interface WaterLevelData {
  id: string
  name: string
  currentLevel: number
  maxLevel: number
  referenceLevel: number
  color?: string
}

const waterData: WaterLevelData[] = [
  {
    id: 'buon-tua-srah',
    name: 'Buôn Tua Srah',
    currentLevel: 420,
    maxLevel: 700,
    referenceLevel: 420,
    color: '#FB923C',
  },
  {
    id: 'buon-kuop',
    name: 'Buôn Kuốp',
    currentLevel: 300,
    maxLevel: 700,
    referenceLevel: 300,
    color: '#14B8A6',
  },
  {
    id: 'srepok-3',
    name: 'Srepok 3',
    currentLevel: 600,
    maxLevel: 700,
    referenceLevel: 600,
    color: '#00C0E8',
  },
]

const WaterLevelCard: React.FC<{ data: WaterLevelData; isActive: boolean; onPress: () => void }> = ({
  data,
  isActive,
  onPress,
}) => {
  const containerHeight = px.v(120)
  const [cardWidth, setCardWidth] = useState(0)
  const MAX_TANK_HEIGHT = 700

  const waterHeightPercent = (data.referenceLevel / MAX_TANK_HEIGHT) * 100
  const waterHeight = (waterHeightPercent / 100) * containerHeight
  const referenceY = containerHeight - (data.referenceLevel / MAX_TANK_HEIGHT) * containerHeight
  const waveAreaHeight = waterHeight
  const containerWidth = cardWidth > 0 ? cardWidth - px.h(24) : 0

  // Thêm offset ban đầu khác nhau cho mỗi tab để tạo hiệu ứng không đồng bộ
  const initialOffset = data.id === 'buon-tua-srah' ? 0 : data.id === 'buon-kuop' ? Math.PI : Math.PI * 1.5
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
      setWavePathBottom1(createBottomWavePath(initialOffset * 0.8, amplitudeBottom1, 0.015, containerWidth, waterHeight))
      setWavePathBottom2(createBottomWavePath(initialOffset * 1.1, amplitudeBottom2, 0.018, containerWidth, waterHeight))
    }

    const anim1 = Animated.loop(
      Animated.timing(waveOffset1, {
        toValue: initialOffset + Math.PI * 2,
        duration: 6000,
        useNativeDriver: false,
      }),
      { iterations: -1 }
    )
    const anim2 = Animated.loop(
      Animated.timing(waveOffset2, {
        toValue: initialOffset * 1.2 + Math.PI * 2,
        duration: 7500,
        useNativeDriver: false,
      }),
      { iterations: -1 }
    )
    const animBottom1 = Animated.loop(
      Animated.timing(waveOffsetBottom1, {
        toValue: initialOffset * 0.8 + Math.PI * 2,
        duration: 6500,
        useNativeDriver: false,
      }),
      { iterations: -1 }
    )
    const animBottom2 = Animated.loop(
      Animated.timing(waveOffsetBottom2, {
        toValue: initialOffset * 1.1 + Math.PI * 2,
        duration: 8000,
        useNativeDriver: false,
      }),
      { iterations: -1 }
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
      style={StyleSheet.flatten([styles.card, isActive && styles.cardActive])}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout
        if (width > 0 && cardWidth !== width) {
          setCardWidth(width)
        }
      }}
    >
      <AnimatedCardContainer
        onPress={onPress}
        style={{ flex: 1 }}
        backgroundColor={isActive ? '#48319d' : 'rgba(255, 255, 255, 0.05)'}
        borderRadius={px.h(12)}
        opacityBg={1}
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
      </AnimatedCardContainer>
    </View>
  )
}

const Overview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(waterData[0].id)
  const contentAnim = useRef(new Animated.Value(1)).current

  const activeData = waterData.find((d) => d.id === activeTab) || waterData[0]

  return (
    <AnimatedCardContainer backgroundColor={'transparent'}>
      <View style={[styles.container, { margin: -24 }]}>
        <View style={styles.tabsContainer}>
          {waterData.map((data) => (
            <WaterLevelCard
              key={data.id}
              data={data}
              isActive={activeTab === data.id}
              onPress={() => {
                if (activeTab !== data.id) {
                  Animated.timing(contentAnim, {
                    toValue: 0,
                    duration: 140,
                    useNativeDriver: true,
                  }).start(() => {
                    setActiveTab(data.id)
                    Animated.timing(contentAnim, {
                      toValue: 1,
                      duration: 220,
                      useNativeDriver: true,
                    }).start()
                  })
                }
              }}
            />
          ))}
        </View>

        <Animated.View style={[styles.detailContainer, { opacity: contentAnim }]}>
          <Text style={styles.detailText}>
            {activeData.name}: {activeData.currentLevel}m / {activeData.maxLevel}m
          </Text>
        </Animated.View>
      </View>
    </AnimatedCardContainer>
  )
}

export default Overview
