import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Document } from '@/core/model/Document';
import styles from './Documents.styles';
import DocumentIcon from './DocumentIcon';

interface Props {
  doc: Document;
  onPress: (doc: Document) => void;
}

const DocumentRow: React.FC<Props> = ({ doc, onPress }) => {
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
          ]}
        >
          <Text style={styles.iconText}><DocumentIcon /></Text>
        </View>

        <View style={styles.textWrap}>
          <Text
            style={[
              styles.title,
              !doc.isValid && styles.expiredTitle,
              doc.isUpcomingDue && styles.upComingDueTitle,
            ]}
            numberOfLines={2}
          >
            {doc.name}
          </Text>
          {/* 
          <Text style={styles.category}>{doc.category}</Text> */}
        </View>
      </View>

      {/* Right */}
      <View style={styles.right}>
        <Text
          style={[
            styles.date,
            !doc.isValid && styles.expiredDate,
            doc.isUpcomingDue && styles.upComingDueDate,
          ]}
        >
          {formatDate(expiryDate)}
        </Text>

        {!doc.isValid && (
          <Text style={styles.expiredLabel}>Hết hiệu lực</Text>
        )}

        {doc.isUpcomingDue && (
          <Text style={styles.upcomingDueLabel}>Sắp hết hiệu lực</Text>
        )}
      </View>
    </Pressable>
  );
};

export default DocumentRow;
