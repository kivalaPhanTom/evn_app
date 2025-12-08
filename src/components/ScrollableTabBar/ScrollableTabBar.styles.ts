import { StyleSheet, Dimensions } from 'react-native'
import { px } from '@/core/utils/scale'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const TAB_BAR_BORDER_WIDTH = 1
//SectionContainer có paddingHorizontal: px.h(30)
const SECTION_CONTAINER_PADDING = px.h(30)
// Chiều rộng bên trong SectionContainer (sau khi trừ padding) = TAB_WIDTH
const TAB_WIDTH = SCREEN_WIDTH - SECTION_CONTAINER_PADDING * 2 - TAB_BAR_BORDER_WIDTH * 2

const styles = StyleSheet.create({
  container: {
    marginBottom: px.v(16),
    paddingHorizontal: 0,
    position: 'relative',
  },
  tabBarContainer: {
    borderRadius: 12,
    borderWidth: TAB_BAR_BORDER_WIDTH,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    backgroundColor: 'rgba(26, 35, 50, 0.5)',
    width: TAB_WIDTH + TAB_BAR_BORDER_WIDTH * 2,
    alignSelf: 'center',
  },
  scrollView: {
    paddingHorizontal: 0,
    width: '100%',
  },
  scrollContent: {
    paddingRight: 0,
  },
  tab: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  tabFirst: {},
  tabLast: {},
  tabContent: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    borderRightWidth: 0,
    width: '100%',
  },
  textContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  tabContentFirst: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  tabContentLast: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderRightWidth: 0,
  },
  tabContentActive: {
    position: 'relative',
  },
  shadowGradientLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 50,
    zIndex: 1,
  },
  shadowGradientRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 50,
    zIndex: 1,
  },
  tabText: {
    color: '#9CA3AF',
    fontSize: px.m(16),
    fontWeight: '500',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: px.m(20),
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
})

export default styles
export { TAB_WIDTH, TAB_BAR_BORDER_WIDTH }
