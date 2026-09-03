import React, { useState } from 'react'
import { ScrollView, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useLocalSearchParams } from 'expo-router'
import { useTranslation } from 'react-i18next'
import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import GradientText from '@/components/GradientText/GradientText.component'
import { px } from '@/core/utils/scale'
import PowerDetail from '@/features/home/components/PowerSection/PowerDetail/PowerDetail'
import { Colors } from '@/core/constants/colors'
import { saveState } from '@/core/redux/domains/refresh'

const ProductOutputDetailScreen: React.FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [scrollY, setScrollY] = useState(0);
  const { countRefesh } = useSelector((state: any) => state.refreshSlice)
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
            text={'Chi tiết công suất'}
            colors={'#FFF'}
            fontSize={px.f(30)}
            style={{ textAlign: 'center' }}
          />
          <View style={styles.locationRow}>
            <Text style={styles.locationText}>{currentPlantId ? t(currentPlantId) : t('companyName')}</Text>
          </View>
        </View>
        <PowerDetail currentPlantId={currentPlantId} isCheckDisableDate = {false}/>
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
