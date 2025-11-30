import { StyleSheet } from 'react-native'
import { px } from '@/core/utils/scale'

const styles = StyleSheet.create({
  container: {
  },
  title: {
    fontSize: px.f(24),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: px.v(20),
  },
  gridContainer: {
    gap: px.v(12),
  },
  row: {
    flexDirection: 'row',
    gap: px.h(12),
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: px.h(12),
    padding: px.h(16),
    paddingVertical: px.v(16),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
    minHeight: px.v(100),
  },
  cardWide: {
    flex: 0,
    width: '48%',
    alignSelf: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: px.v(12),
    right: px.h(12),
  },
  cardLabel: {
    fontSize: px.f(16),
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: px.v(8),
    fontWeight: '500',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: px.v(4),
  },
  cardValue: {
    fontSize: px.f(26),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardUnit: {
    fontSize: px.f(16),
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
})

export default styles
