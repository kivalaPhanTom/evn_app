import { px } from '@/core/utils/scale'
import { StyleSheet } from 'react-native'
import { createThemePalette } from '@/core/constants/themePalette'

const createStyles = (isDark: boolean) => {
  const p = createThemePalette(isDark)
  return StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: px(16),
    marginBottom: px(20),
    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#FFFFFF',
    borderWidth: 1,
    borderColor: p.divider,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: px(16),
  },
  title: {
    color: p.title,
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
    color: p.textLabel,
    fontSize: px(14),
    fontWeight: '600',
  },
  plannedSection: {
    backgroundColor: p.inputBg,
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
    color: p.textSecondary,
    fontSize: px(12),
  },
  infoValue: {
    color: p.textPrimary,
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
    backgroundColor: p.inputBg,
    borderWidth: 1,
    borderColor: p.divider,
  },
  timelineLabel: {
    color: p.textSecondary,
    fontSize: px(10),
    fontWeight: '500',
  },
  timelineLabelActive: {
    color: p.textPrimary,
    fontWeight: 'bold',
  },
  })
}

export default createStyles
