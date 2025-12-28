import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    marginBottom: px(20),
    gap: px(10),
    paddingHorizontal: px(4),
  },
  infoCard: {
    flex: 1,
    minWidth: 0,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    position: 'relative',
  },
  cardTitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 12,
  },
  maintenanceTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  maintenanceTypeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    minWidth: 20,
  },
  maintenanceTypeLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    gap: px(20),
  },
  durationItem: {
    alignItems: 'center',
    flex: 1,
  },
  durationValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgb(255, 255, 255)',
    marginBottom: 6,
  },
  durationLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
})

export default styles

