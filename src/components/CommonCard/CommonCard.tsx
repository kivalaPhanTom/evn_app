import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styles from './CommonCard.styles'

type Props = {
  children?: React.ReactNode
}

function CommonCard({ children }: Props) {
  return (
    <LinearGradient
      colors={['#1a2332', '#2a3544', '#1a2332']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  )
}

export default CommonCard
