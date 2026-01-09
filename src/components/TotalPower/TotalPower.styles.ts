import { Colors } from '@/core/constants/colors'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    minHeight: 150,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#8b92a0',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  totalPower: {
    color: Colors.blue,
    fontSize: 64,
    fontWeight: '700',
    lineHeight: 64,
  },
  unit: {
    color: '#8b92a0',
    fontSize: 18,
    fontWeight: '600',
    marginTop: -8,
  },
  average: {
    color: '#8b92a0',
    fontSize: 13,
    marginTop: 4,
  },
  rightSection: {
    flex: 1,
    justifyContent: 'center',
    gap: 5,
  },
  sourceItem: {
    // marginBottom: 2,
  },
  sourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  sourceName: {
    color: '#e0e3e8',
    fontSize: 12,
    fontWeight: '500',
  },
  sourceCode: {
    color: '#8b92a0',
    fontSize: 11,
  },
  sourcePower: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 12,
  },
})
export default styles
