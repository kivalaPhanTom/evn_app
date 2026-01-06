import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import GradientText from '@/components/GradientText/GradientText.component'
import { px } from '@/core/utils/scale'
import FactoryProfitDetail from '@/features/home/components/RevenueProfit/RevenueProfitDetail/Profit/FactoryProfitDetail/FactoryProfitDetail'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import { Colors } from '@/core/constants/colors'
import { useLocalSearchParams } from 'expo-router'
import { setCountRefesh } from '@/core/redux/slices/RevenueProfitSlice'

const FactoryProfitDetailScreen: React.FC = () => {
  const { companyName } = useLocalSearchParams<{
    companyName?: string | string[]
  }>()
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { countRefesh } = useSelector((state: any) => state.revenueProfitSlice)
  const companyTitle = Array.isArray(companyName) ? companyName[0] : companyName
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
            text={'Chi tiết Lợi nhuận'}
            colors={'#FFF'}
            fontSize={px.f(30)}
            style={{ textAlign: 'center' }}
          />
          <View style={styles.locationRow}>
            <Text style={styles.locationText}>{companyTitle ?? 'Công ty thủy điện Buôn Kuốp'}</Text>
          </View>
        </View>
        <FactoryProfitDetail />
      </TwinkleStars>
    </ScrollView>
  )
}

export default FactoryProfitDetailScreen

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    paddingTop: px.v(12),
    paddingBottom: px.v(40),
  },
  header: {
    marginTop: px.v(10),
    marginBottom: px.v(20),
    alignItems: 'center',
  },
  locationRow: {
    marginTop: px.v(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#C7D6E1',
    fontSize: px.m(14),
  },
})

