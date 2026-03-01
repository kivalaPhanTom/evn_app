import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 24,
    minHeight: 340,
    position: 'relative',
    overflow: 'hidden',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  live: {
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    color: '#34D399',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    fontWeight: '600',
  },
  content: {
    zIndex: 1,
    // flex: 1,
  },
})
export default styles
