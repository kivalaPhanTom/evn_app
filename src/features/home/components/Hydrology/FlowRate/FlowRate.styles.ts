import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  item: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    width: 105,
    backgroundColor: 'rgba(255,255,255, 0.03)',
    borderRadius: 8,
    gap: 4,
  },
  itemLabel: {
    fontSize: 12,
    color: '#93959F',
  },
  itemValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  legend: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  legendText: {
    color: '#7a8596',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
})

export default styles
