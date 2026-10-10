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
import { useAppTheme } from '@/core/hooks/use-app-theme'
import { textGradients } from '@/core/constants/gradients'

const ProductOutputDetailScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const scheme = useAppTheme()
  const isDark = scheme === 'dark'
  const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { currentPlantId } = useLocalSearchParams<{
    currentPlantId: string;
  }>();

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
      scrollEventThrottle={16}
    >
      <TwinkleStars background={isDark ? Colors.background : Colors.lightBackground} particleDensity={50} particleColor={Colors.textColor} minSize={0.5} maxSize={2}>
        <View style={styles.header}>
          <GradientText
            text={'Chi tiết sản lượng'}
            colors={textGradients.water}
            fontSize={px.f(30)}
            style={{ textAlign: 'center' }}
          />
          <View style={styles.locationRow}>
            <Text style={[styles.locationText, { color: isDark ? '#C7D6E1' : '#6B7280' }]}>{currentPlantId ? t(currentPlantId) : t('companyName')}</Text>
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
