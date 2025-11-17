import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    minHeight: 160,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    zIndex: 1,
  },
  title: {
    color: '#8b92a0',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingRight: 20,
  },
  valueCard: {
    backgroundColor: '#1e2838',
    borderRadius: 12,
    marginRight: 10,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    width: 75, // Width cố định 70px
  },
  // valueCard: {
  //     backgroundColor: '#1e2838',
  //     borderRadius: 12,
  //     marginRight: 12,
  //     paddingHorizontal: 20,
  //     paddingVertical: 16,
  //     borderWidth: 1,
  //     borderColor: 'rgba(255, 255, 255, 0.05)',
  // },
  valueItem: {
    alignItems: 'center',
  },
  powerValue: {
    color: '#5b8def',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  dayLabel: {
    color: '#8b92a0',
    fontSize: 11,
    fontWeight: '500',
  },
  bottomInfo: {
    marginTop: 20,
    alignItems: 'center', // Thêm dòng này
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'center', // Thêm dòng này
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#5b8def',
    marginRight: 8,
  },
  hintText: {
    color: '#8b92a0',
    fontSize: 11,
    textAlign: 'center',
  },
  unitText: {
    color: '#8b92a0',
    fontSize: 11,
  },
})
export default styles
