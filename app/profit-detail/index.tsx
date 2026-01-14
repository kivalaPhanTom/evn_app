import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import GradientText from '@/components/GradientText/GradientText.component'
import { px } from '@/core/utils/scale'
import ProfitDetail from '@/features/home/components/RevenueProfit/RevenueProfitDetail/Profit/ProfitDetail/ProfitDetail'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '@/core/constants/colors'
import { useLocalSearchParams } from 'expo-router'

const ProfitDetailScreen: React.FC = () => {
  const { plantName, plantId } = useLocalSearchParams<{
    plantName?: string
    plantId?: string
  }>()

  return (
    <TwinkleStars background={Colors.background} particleDensity={50} particleColor={Colors.textColor} minSize={0.5} maxSize={2}>
      <View style={styles.header}>
        <GradientText
          text={'Chi tiết Lợi nhuận'}
          colors={'#FFF'}
          fontSize={px.f(30)}
          style={{ textAlign: 'center' }}
        />
        <View style={styles.locationRow}>
          <Text style={styles.locationText}>{`${plantName}`}</Text>
        </View>
      </View>
      <ProfitDetail plantName={plantName} plantId={plantId} />
    </TwinkleStars>
  )
}

export default ProfitDetailScreen

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

