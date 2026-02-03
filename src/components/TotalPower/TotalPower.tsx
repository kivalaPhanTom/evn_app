import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import styles from './TotalPower.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { px } from '@/core/utils/scale'
import GradientText from '@/components/GradientText/GradientText.component'
import BarSkeleton from '@/components/Skeletons/BarSkeleton'
import DotBarSkeleton from '@/components/Skeletons/DotBarSkeleton'
import { Colors } from '@/core/constants/colors'
import { Image } from 'expo-image'

interface PowerDetail {
  code: string
  color: string
  name: string
  value: number
}
interface Props {
  total: number
  average: number
  isLoading: boolean
  detail: PowerDetail[]
  title?: string
  unit: string
  type: 'power' | 'production'
}
const ROTATION_DURATION = 3000

function TotalPower(props: Props) {
  const [firstLoading, setFirstLoading] = useState(true)
  const { total = 0, average = 0, isLoading = false, detail = [], title = 'TỔNG CÔNG SUẤT', unit, type } = props
  const rotation = useSharedValue(0)

  useEffect(() => {
    setFirstLoading(true)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      setFirstLoading(false)
    }
  }, [isLoading])

  useEffect(() => {
    if (type === 'power' && !isLoading) {
      rotation.value = withRepeat(
        withTiming(360, { duration: ROTATION_DURATION, easing: Easing.linear }),
        -1,
        false,
      )
    } else {
      rotation.value = withTiming(0, { duration: 0 })
    }
  }, [type, isLoading, rotation])

  const cogwheelAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  return (
    <AnimatedCardContainer>
      <View style={styles.content}>
        {/* Column 1 - Icon */}
        <View style={styles.iconSection}>
          {firstLoading || isLoading ? (
            <BarSkeleton width={40} height={40} />
          ) : (
            <View style={styles.iconPlaceholder}>
              {type === 'power' ? (
                <Animated.View style={[cogwheelAnimatedStyle]}>
                  <Image
                    source={require('@/assets/images/cogwheel.png')}
                    style={{ width: 50, height: 50 }}
                  />
                </Animated.View>
              ) : (
                <Image
                  source={require('@/assets/images/hydroelectric.png')}
                  style={{ width: 50, height: 50 }}
                />
              )}
            </View>
          )}
        </View>
        {/* Left side - Total Power */}
        <View style={styles.leftSection}>
          {firstLoading || isLoading ? (
            <BarSkeleton />
          ) : (
            <>
              {/* <Text style={styles.title}>{title}</Text> */}
              <GradientText text={total} fontSize={px.f(64)} colors={Colors.blue} />
            </>
          )}

          {firstLoading || isLoading ? (
            <BarSkeleton width={95} height={28} />
          ) : (
            <>
              <Text style={styles.unit}>{unit}</Text>
              {/* <Text style={styles.average}>
                TB: {average} {unit}
              </Text> */}
            </>
          )}
        </View>

        {/* Right side - Power Sources */}
        <View style={styles.rightSection}>
          {firstLoading || isLoading ? (
            <>
              <DotBarSkeleton />
            </>
          ) : (
            <>
              {detail.map((source, index) => (
                <View key={index} style={styles.sourceItem}>
                  <View style={styles.sourceInfo}>
                    <View style={[styles.dot, { backgroundColor: source.color }]} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                      <Text style={styles.sourceName}>
                        {source.code}
                        {/* {source.name} <Text style={styles.sourceCode}>({source.code})</Text> */}
                      </Text>
                      <Text style={[styles.sourcePower, { color: source.color }]}>
                        {source.value}
                      </Text>
                    </View>
                  </View>
                  {/* <Text style={[styles.sourcePower, { color: source.color }]}>
                    {source.value} {unit}
                  </Text> */}
                </View>
              ))}
            </>
          )}
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default TotalPower
