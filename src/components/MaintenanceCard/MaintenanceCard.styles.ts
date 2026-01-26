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
    flexDirection: 'row',
    gap: px(12),
    marginTop: px(15),
  },
  maintenanceInfoRow: {
    flex: 1,        // 🔑 split width evenly
    minWidth: 0,    // 🔑 prevent Android flex overflow
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: px(8),
    borderRadius: px(12),
    padding: px(12),
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  maintenanceInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px(4),
  },
  maintenanceInfoHeaderText: {
    color: 'rgb(255,255,255)',
    fontSize: px(13),
    fontWeight: '500',
    marginLeft: px(6),
  },
  maintenanceInfoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: px(12),
  },
  maintenanceInfoItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  maintenanceInfoValue: {
    fontSize: px(18),
    fontWeight: 'bold',
    marginBottom: px(2),
  },
  maintenanceInfoLabel: {
    color: '#64748B',
    fontSize: px(11),
    fontWeight: '500',
  },
  maintenanceInfoDivider: {
    color: '#63728A',
    fontSize: px(24),
    opacity: 0.5,
  },
})
export default styles
