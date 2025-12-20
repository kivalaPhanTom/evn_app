import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    marginBottom: px(20),
    gap: px(10),
    paddingHorizontal: px(4), // small safe padding
  },
  infoCard: {
    flex: 1,            // 🔑 share available width
    minWidth: 0,        // 🔑 prevents overflow on Android
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
export default styles
