import { Colors } from '@/core/constants/colors'
import { px } from '@/core/utils/scale'
import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface AlertCardProps {
  title: string
  message: string
  timestamp: string
}

const AlertCard: React.FC<AlertCardProps> = ({ title, message, timestamp }) => {
  const theme = useTheme()
  const isDark = theme.dark

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? Colors.darkGray : Colors.white,
          borderLeftColor: Colors.red,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors.red }]}>{title}</Text>
        <Text style={[styles.timestamp, { color: isDark ? Colors.lightText : Colors.darkText }]}>{timestamp}</Text>
      </View>
      <Text style={[styles.message, { color: isDark ? Colors.white : Colors.black }]}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: px.h(12),
    padding: px.h(16),
    borderLeftWidth: px.h(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: px.v(8),
  },
  title: {
    fontSize: px.m(16),
    fontWeight: '600',
  },
  timestamp: {
    fontSize: px.m(12),
  },
  message: {
    fontSize: px.m(14),
  },
})

export default AlertCard
