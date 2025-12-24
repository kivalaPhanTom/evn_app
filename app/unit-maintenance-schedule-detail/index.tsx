import TwinkleStars from '@/components/Background/TwinkleStarsCore'
import GradientText from '@/components/GradientText/GradientText.component'
import { Colors } from '@/core/constants/colors'
import { px } from '@/core/utils/scale'
import UnitMaintenanceDetails from '@/features/home/components/UnitMaintenanceSchedule/UnitMaintenanceDetails/UnitMaintenanceDetails'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { textGradients } from '@/core/constants/gradients'
import { Ionicons } from '@expo/vector-icons'

const DEFAULT_COMPANY_NAME = 'CÔNG TY THỦY ĐIỆN BUÔN KUỐP'
const DEFAULT_LOCATION = 'Đắk Lắk, Việt Nam'

const UnitMaintenanceScheduleDetailScreen: React.FC = () => {
  const { companyName, location } = useLocalSearchParams<{
    companyName?: string | string[]
    location?: string | string[]
  }>()

  const companyTitle = Array.isArray(companyName) ? companyName[0] : companyName || DEFAULT_COMPANY_NAME
  const companyLocation = Array.isArray(location) ? location[0] : location || DEFAULT_LOCATION

  return (
    <TwinkleStars
      background={Colors.background}
      particleDensity={50}
      particleColor={Colors.textColor}
      minSize={0.5}
      maxSize={2}
    >
      <View style={styles.header}>
        <GradientText
          text={companyTitle}
          colors={textGradients.water}
          fontSize={px.f(30)}
          style={styles.titleText}
        />
        <View style={styles.locationRow}>
          <Ionicons name="location" size={px.f(12)} color="#FF6A6A" style={styles.locationIcon} />
          <Text style={styles.locationText}>{companyLocation}</Text>
        </View>
      </View>
      <UnitMaintenanceDetails />
    </TwinkleStars>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: px.v(20),
    paddingBottom: px.v(10),
  },
  titleText: {
    textAlign: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: px.v(16),
  },
  locationIcon: {
    marginRight: px.h(6),
  },
  locationText: {
    color: '#FFF',
    fontSize: px.m(14),
    fontWeight: 'bold',
  },
})

export default UnitMaintenanceScheduleDetailScreen
