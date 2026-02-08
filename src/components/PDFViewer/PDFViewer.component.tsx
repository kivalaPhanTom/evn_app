import React from 'react'
import { View, Text, Pressable, StyleSheet, Modal, Platform, Linking } from 'react-native'
import { WebView } from 'react-native-webview'
import styles from './PDFViewer.styles'
import { Document } from '@/core/model/Document'
import { formatDate } from '@/core/utils/date'
import { SafeAreaView } from 'react-native-safe-area-context'

interface PdfViewerProps {
  doc: Document
  onClose: () => void
}

const PdfViewer: React.FC<PdfViewerProps> = ({ doc, onClose }) => {
  const openExternal = () => {
    Linking.openURL(doc.linkFile)
  }
  const [loading, setLoading] = React.useState(true)
  return (
    <Modal visible animationType="slide">
      <SafeAreaView style={styles.container}>
        {/* Top Navigation */}
        <View style={styles.header}>
          <Pressable
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>✕</Text>
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={styles.title} numberOfLines={1}>
              {doc.name}
            </Text>
            <Text style={styles.subtitle}>
              {formatDate(new Date(doc.deadline))} • {doc.isValid ? 'Còn hiệu lực' : 'Hết hiệu lực'}
            </Text>
          </View>

          <View style={{ width: 32 }} />
        </View>

        {/* PDF Content */}
        <View style={styles.viewer}>
          <WebView
            source={{
              uri:
                Platform.OS === 'ios'
                  ? doc.linkFile
                  : `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(doc.linkFile)}`,
            }}
            startInLoadingState
            allowsFullscreenVideo
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setLoading(false)
              console.log('error loading pdf')
            }}
          />

          {/* Fallback overlay */}
          {loading && (
            <View pointerEvents="none" style={styles.loadingOverlay}>
              <Text style={styles.loadingIcon}>📄</Text>
              <Text style={styles.loadingText}>Đang tải tài liệu...</Text>
            </View>
          )}
        </View>

        {/* Bottom Bar */}
        {/* <View style={styles.bottomBar}>
                    <Pressable
                        onPress={openExternal}
                        style={({ pressed }) => [
                            styles.openButton,
                            pressed && { transform: [{ scale: 0.96 }] },
                        ]}
                    >
                        <Text style={styles.openButtonText}>
                            Open in External Viewer
                        </Text>
                    </Pressable>
                </View> */}
      </SafeAreaView>
    </Modal>
  )
}

export default PdfViewer
