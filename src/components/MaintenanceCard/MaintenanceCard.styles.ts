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
  infoCard: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  maintenanceInfoRow: {
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
