import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  content: {
    zIndex: 1,
    alignItems: 'center',
  },
  summaryCard: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  notePanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 15,
  },
  noteText: {
    fontSize: 16,
    color: '#615E83',
  },
  pillText: {
    textAlign: 'left',
    fontSize: px.m(18),
    fontWeight: '600',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export default styles
