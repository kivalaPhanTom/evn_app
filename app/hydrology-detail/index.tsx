import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native'
import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import GradientText from '@/components/GradientText/GradientText.component'
import { Colors } from '@/core/constants/colors'
import { px } from '@/core/utils/scale'
import HydrologyDetail from '@/features/home/components/Hydrology/HydrologyDetail/HydrologyDetail'
import { setCountRefesh } from '@/core/redux/slices/HydrologySlice'

const HydrologyDetailScreen: React.FC = () => {
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { countRefesh } = useSelector((state: any) => state.hydrologySlice)
  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(setCountRefesh({
        countRefesh: countRefesh + 1
      }))
    }, 80);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TwinkleStars background={Colors.background} particleDensity={50} particleColor={Colors.textColor} minSize={0.5} maxSize={2}>
        <View style={styles.header}>
          <GradientText
            text={'Chi tiết Thủy văn'}
            colors={'#FFF'}
            fontSize={px.f(30)}
            style={{ textAlign: 'center' }}
          />
          <View style={styles.locationRow}>
            <Text style={styles.locationText}>{'Công ty thủy điện Buon Kuop'}</Text>
          </View>
        </View>
        <HydrologyDetail />
      </TwinkleStars>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: px.v(20),
    paddingBottom: px.v(10),
  },
  locationRow: {
    alignItems: 'center',
    marginTop: px.v(8),
  },
  locationText: {
    color: '#9CA3AF',
    fontSize: px.m(14),
  },
})

export default HydrologyDetailScreen

