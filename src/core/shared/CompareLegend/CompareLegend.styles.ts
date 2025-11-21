import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexBasis: '48%',
  },
  legendBox: {
    width: 14,
    height: 10,
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  legendLine: {
    width: 20,
    height: 2.5,
    backgroundColor: '#8b5cf6',
    borderRadius: 1.5,
  },
  legendLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
})

export default styles
