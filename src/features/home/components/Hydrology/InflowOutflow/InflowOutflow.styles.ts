import { hydrologyDark as dark } from '@/core/constants/hydrologyPalette'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  content: {
    zIndex: 1,
    alignItems: 'center',
  },
  summaryCard: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  notePanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  noteText: {
    fontSize: 16,
    color: dark.chart.noteText,
    marginRight: 15,
    marginLeft: -5,
  },
})

export default styles
