import React, { useEffect, useRef } from 'react'
import { View, Text, ScrollView } from 'react-native'
import styles from './PowerRecentDays.styles'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { getPowerByDays } from '@/core/redux/Actions/PowerActions'
import { RootState } from '@/core/redux/store'
import SquareSkelenton from '@/components/Skeletons/SquareSkelenton'

interface DayPower {
  value: number
  date: string
}

function PowerRecentDays() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { countRefesh } = useSelector((state: any) => state.homeSlice)
  const {
    powerByDays: { powerData },
    isLoadingNearCurrentDays,
  } = useSelector((state: RootState) => state.powerSlice)
  const scrollViewRef = useRef(null);

  const unit = 'tr.Wh'

  useEffect(() => {
    dispatch(getPowerByDays(7))
  }, [countRefesh])

    const handleContentSizeChange = () => {
    // Call scrollToEnd() on the ref
    scrollViewRef.current?.scrollToEnd({ animated: true }); 
  };

  return (
    <AnimatedCardContainer>
      <View>
        <View style={styles.content}>
          <Text style={styles.title}>P - 7 NGÀY GẦN NHẤT</Text>

          {/* Scrollable Power Values */}
          <ScrollView ref={scrollViewRef} horizontal onContentSizeChange={handleContentSizeChange} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {isLoadingNearCurrentDays ? (
              <SquareSkelenton count={4} />
            ) : (
              <>
                {powerData.map((day, index) => (
                  <View key={index} style={styles.valueCard}>
                    <View style={styles.valueItem}>
                      <Text style={styles.powerValue} allowFontScaling={false}>
                        {day.value}
                      </Text>
                      <Text style={styles.dayLabel} allowFontScaling={false}>
                        {day.date}
                      </Text>
                    </View>
                  </View>
                ))}
              </>
            )}
          </ScrollView>

          {/* Bottom Info */}
          <View style={styles.bottomInfo}>
            <View style={styles.hintRow}>
              <View style={styles.legendDot} />
              <Text style={styles.hintText}>Lướt ngang để xem thêm →</Text>
            </View>
            <Text style={styles.unitText}>Đơn vị: {unit}</Text>
          </View>
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default PowerRecentDays
