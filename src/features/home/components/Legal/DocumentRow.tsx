import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Document } from '@/core/model/Document';
import { Colors } from '@/core/constants/colors';
import createStyles from './Documents.styles';
import DocumentIcon from './DocumentIcon';
import { useAppTheme } from '@/core/hooks/use-app-theme';

interface Props {
  doc: Document;
  onPress: (doc: Document) => void;
}

const DocumentRow: React.FC<Props> = ({ doc, onPress }) => {
  const scheme = useAppTheme();
  const isDark = scheme === 'dark';
  const styles = createStyles(isDark);
  const expiryDate = new Date(doc.deadline);

  const formatDate = (date: Date) => {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  return (
    <Pressable
      onPress={() => onPress(doc)}
      style={({ pressed }) => [
        styles.row,
        !doc.isValid && styles.expiredRow,
        pressed && styles.pressed,
      ]}
    >
      {/* Left */}
      <View style={styles.left}>
        <View
          style={[
            styles.icon,
            !doc.isValid ? styles.iconExpired : styles.iconNormal,
            doc.isUpcomingDue && styles.iconUpcomingDue,
            doc.isValid && !doc.isUpcomingDue && styles.docIconChip,
          ]}
        >
          <DocumentIcon
            size={18}
            color={doc.isUpcomingDue ? Colors.warningFull : !doc.isValid ? '#dc2626' : isDark ? '#60A5FA' : '#2563EB'}
          />
        </View>

        <View style={styles.textWrap}>
          <Text
            style={[
              styles.docName,
              !doc.isValid && styles.expiredTitle,
              doc.isUpcomingDue && styles.upComingDueTitle,
            ]}
            numberOfLines={2}
          >
            {doc.name}
          </Text>

          <View style={styles.dateLine}>
            <Ionicons name="calendar-outline" size={12} color="#6b7280" />
            <Text style={styles.dateText}>
              {`hiệu lực đến: ${formatDate(expiryDate)}`}
            </Text>
            {!doc.isValid && (
              <Text style={[styles.statusLabel, styles.expiredLabel]}>Hết hiệu lực</Text>
            )}
            {doc.isUpcomingDue && (
              <Text style={[styles.statusLabel, styles.upcomingDueLabel]}>Sắp hết hiệu lực</Text>
            )}
          </View>
        </View>
      </View>

      {/* Right: eye button opens document */}
      <Pressable
        onPress={() => onPress(doc)}
        hitSlop={8}
        style={styles.eyeButton}
      >
        <Ionicons name="eye" size={18} color="#FFFFFF" />
      </Pressable>
    </Pressable>
  );
};

export default DocumentRow;
