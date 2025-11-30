import React from 'react'
import { View, Text } from 'react-native'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import styles from './GeneralInformation.style'

interface GeneralInformationProps {
  title?: string
}

interface InfoCardData {
  label: string
  value: string
  unit?: string
  icon?: {
    name: keyof typeof FontAwesome.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap
    type: 'fontawesome' | 'material'
  }
}

const GeneralInformation: React.FC<GeneralInformationProps> = () => {
  const renderIcon = (icon: InfoCardData['icon']) => {
    if (!icon) return null
    const IconComponent = icon.type === 'material' ? MaterialCommunityIcons : FontAwesome
    return (
      <View style={styles.iconContainer}>
        <IconComponent
          name={icon.name as any}
          size={24}
          color="#000"
        />
      </View>
    )
  }

  const cardsData: InfoCardData[] = [
    {
      label: 'MNTL',
      value: '612.3',
      unit: 'm',
      icon: {
        name: 'hydro-power' as keyof typeof MaterialCommunityIcons.glyphMap,
        type: 'material',
      },
    },
    {
      label: 'MNQT',
      value: '527.8',
      unit: 'm',
      icon: {
        name: 'thermometer' as keyof typeof FontAwesome.glyphMap,
        type: 'fontawesome',
      },
    },
    {
      label: 'Δ MNQT',
      value: '-0.7',
      unit: 'm',
    },
    {
      label: 'V HỮU ÍCH',
      value: '145',
      unit: 'tr.m³',
    },
    {
      label: 'SỐ CỬA XẢ',
      value: '3',
      unit: 'cửa',
    },
  ]

  return (
    <AnimatedCardContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Thông tin chung</Text>

        <View style={styles.gridContainer}>
          {/* Row 1: MNTL và MNQT */}
          <View style={styles.row}>
            {cardsData.slice(0, 2).map((card, index) => (
              <View key={index} style={styles.card}>
                {renderIcon(card.icon)}
                <Text style={styles.cardLabel}>{card.label}</Text>
                <View style={styles.valueContainer}>
                  <Text style={styles.cardValue}>{card.value}</Text>
                  {card.unit && (
                    <Text style={styles.cardUnit}> {card.unit}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Row 2: Δ MNQT và V HỮU ÍCH */}
          <View style={styles.row}>
            {cardsData.slice(2, 4).map((card, index) => (
              <View key={index} style={styles.card}>
                {renderIcon(card.icon)}
                <Text style={styles.cardLabel}>{card.label}</Text>
                <View style={styles.valueContainer}>
                  <Text style={styles.cardValue}>{card.value}</Text>
                  {card.unit && (
                    <Text style={styles.cardUnit}> {card.unit}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Row 3: SỐ CỬA XẢ - card rộng hơn, ở giữa */}
          <View style={styles.row}>
            <View style={[styles.card, styles.cardWide]}>
              {renderIcon(cardsData[4].icon)}
              <Text style={styles.cardLabel}>{cardsData[4].label}</Text>
              <View style={styles.valueContainer}>
                <Text style={styles.cardValue}>{cardsData[4].value}</Text>
                {cardsData[4].unit && (
                  <Text style={styles.cardUnit}> {cardsData[4].unit}</Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </AnimatedCardContainer>
  )
}

export default GeneralInformation
