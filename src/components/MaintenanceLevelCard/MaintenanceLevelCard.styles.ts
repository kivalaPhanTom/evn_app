import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: px(16),
    marginBottom: px(20),
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: px(16),
  },
  title: {
    color: '#FFF',
    fontSize: px(16),
    fontWeight: 'bold',
    flex: 1,
  },
  statusTag: {
    paddingHorizontal: px(12),
    paddingVertical: px(6),
    borderRadius: px(8),
    borderWidth: 1,
  },
  statusText: {
    fontSize: px(12),
    fontWeight: 'bold',
  },
  sectionsContainer: {
    flexDirection: 'row',
    gap: px(16),
    marginBottom: px(16),
  },
  section: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: px(8),
    gap: px(6),
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: px(14),
    fontWeight: '600',
  },
  plannedSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: px(8),
    padding: px(12),
  },
  actualSection: {
    paddingVertical: px(12),
  },
  infoColumn: {
    gap: px(8),
  },
  infoRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: px(4),
  },
  infoLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: px(12),
  },
  infoValue: {
    color: '#FFF',
    fontSize: px(14),
    fontWeight: '500',
  },
  infoValueOver: {
    color: '#FB7185',
  },
  infoValueUnder: {
    color: '#34D399',
  },
  timelineContainer: {
    marginTop: px(8),
  },
  timelineBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: px(4),
  },
  timelineItem: {
    flex: 1,
    alignItems: 'center',
  },
  timelineSegmentWrapper: {
    width: '100%',
    marginBottom: px(6),
    minHeight: px(12),
  },
  timelineShadowContainer: {
    width: '100%',
    height: px(12),
  },
  timelineSegment: {
    width: '100%',
    height: px(12),
    borderRadius: px(4),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  timelineLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: px(10),
    fontWeight: '500',
  },
  timelineLabelActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
})

export default styles

