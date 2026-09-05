import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { useLocalSearchParams } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View, ScrollView, RefreshControl, } from 'react-native'
import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import GradientText from '@/components/GradientText/GradientText.component'
import { Colors } from '@/core/constants/colors'
import { px } from '@/core/utils/scale'
import ProductOutputDetail from '@/features/home/components/ProductionOutput/ProductOutputDetail/ProductOutputDetail'
import { saveState } from '@/core/redux/domains/refresh'

const ProductOutputDetailScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [scrollY, setScrollY] = useState(0);
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { currentPlantId } = useLocalSearchParams<{
    currentPlantId: string;
  }>();
  const onScroll = (e: any) => {
    setScrollY(e.nativeEvent.contentOffset.y);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(saveState({
        countRefesh: countRefesh + 1
      }))
    }, 80);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onScroll={onScroll}
      scrollEventThrottle={16}
    >
      <TwinkleStars background={Colors.background} particleDensity={50} particleColor={Colors.textColor} minSize={0.5} maxSize={2}>
        <View style={styles.header}>
          <GradientText
            text={'Chi tiết sản lượng'}
            colors={'#FFF'}
            fontSize={px.f(30)}
            style={{ textAlign: 'center' }}
          />
          <View style={styles.locationRow}>
            <Text style={styles.locationText}>{currentPlantId ? t(currentPlantId) : t('companyName')}</Text>
          </View>
        </View>
        <ProductOutputDetail currentPlantId={currentPlantId} isCheckDisableDate={false} />
      </TwinkleStars>
    </ScrollView>
  )
}

export default ProductOutputDetailScreen

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
    fontSize: px.m(13),
  },
})
