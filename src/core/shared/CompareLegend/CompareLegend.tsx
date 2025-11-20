import React from 'react'
import { View, Text } from 'react-native'
import styles from './CompareLegend.styles'

interface LegendItemData {
  type: 'box' | 'line'
  color?: string
  label: string
}

interface CompareLegendProps {
  items?: LegendItemData[]
  displayType?: 'power' | 'output' // Thêm prop để biết kiểu hiển thị
}

const CompareLegend: React.FC<CompareLegendProps> = ({ items, displayType = 'output' }) => {
  // Nếu type = 'power', chỉ hiển thị 2 items: Ngày mục tiêu và Ngày so sánh
  const defaultItemsPower: LegendItemData[] = [
    { type: 'box', label: 'Ngày mục tiêu' },
    { type: 'line', label: 'Ngày so sánh' },
  ]

  // Nếu type = 'output', hiển thị đầy đủ 3 items
  const defaultItemsOutput: LegendItemData[] = [
    { type: 'box', label: 'Ngày mục tiêu' },
    { type: 'line', color: '#FBBF24', label: 'Hợp đồng ngày MT' },
    { type: 'line', label: 'Ngày so sánh' },
  ]

  const defaultItems = displayType === 'power' ? defaultItemsPower : defaultItemsOutput
  const legendItems = items || defaultItems

  return (
    <View style={styles.legendContainer}>
      {legendItems.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          {item.type === 'box' ? (
            <View style={styles.legendBox} />
          ) : (
            <View style={[styles.legendLine, item.color && { backgroundColor: item.color }]} />
          )}
          <Text style={styles.legendLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  )
}

export default CompareLegend
