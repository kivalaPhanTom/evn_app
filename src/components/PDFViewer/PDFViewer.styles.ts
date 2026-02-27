import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  marginTopHeader: {
    marginTop: 40,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },

  closeButton: {
    padding: 8,
  },

  closeText: {
    fontSize: 22,
    color: '#4b5563',
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  subtitle: {
    fontSize: 10,
    letterSpacing: 1,
    color: '#6b7280',
    marginTop: 2,
  },

  /* Viewer */
  viewer: {
    flex: 1,
    backgroundColor: '#e5e7eb',
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.2,
  },

  loadingIcon: {
    fontSize: 48,
    marginBottom: 12,
  },

  loadingText: {
    fontSize: 14,
    color: '#6b7280',
  },

  /* Bottom */
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },

  openButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  openButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  iconButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 22,
    color: '#333',
  },
})
export default styles
