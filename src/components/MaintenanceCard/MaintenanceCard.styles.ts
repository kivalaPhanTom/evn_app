import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    // width: px.h(12),
    // height: px.h(12),
    // borderRadius: px.h(6),
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  maintenanceInfoContainer: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 15,
  },
  maintenanceInfoRow: {
    flex: 1,        // 🔑 split width evenly
    minWidth: 0,    // 🔑 prevent Android flex overflow
    alignItems: 'flex-start',
    gap: 6,
    borderRadius: 12,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
})
export default styles
