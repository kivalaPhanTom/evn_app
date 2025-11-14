import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PowerSource {
  name: string;
  code: string;
  power: number;
  color: string;
}

interface PowerDashboardProps {
  totalPower: number;
  averagePower: number;
  sources: PowerSource[];
}

const OverviewCard: React.FC<PowerDashboardProps> = ({
  totalPower,
  averagePower,
  sources,
}) => {
  return (
    <LinearGradient
      colors={['#1a2332', '#2a3544', '#1a2332']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Decorative stars */}
      {/* <View style={[styles.star, styles.star1]} />
      <View style={[styles.star, styles.star2]} />
      <View style={[styles.star, styles.star3]} />
      <View style={[styles.star, styles.star4]} /> */}

      <View style={styles.content}>
        {/* Left side - Total Power */}
        <View style={styles.leftSection}>
          <Text style={styles.title}>TỔNG CÔNG SUẤT</Text>
          <Text style={styles.totalPower}>{totalPower}</Text>
          <Text style={styles.unit}>MW</Text>
          <Text style={styles.average}>TB: {averagePower} MW</Text>
        </View>

        {/* Right side - Power Sources */}
        <View style={styles.rightSection}>
          {sources.map((source, index) => (
            <View key={index} style={styles.sourceItem}>
              <View style={styles.sourceInfo}>
                <View style={[styles.dot, { backgroundColor: source.color }]} />
                <Text style={styles.sourceName}>
                  {source.name}{' '}
                  <Text style={styles.sourceCode}>({source.code})</Text>
                </Text>
              </View>
              <Text style={[styles.sourcePower, { color: source.color }]}>
                {source.power} MW
              </Text>
            </View>
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    minHeight: 150,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  leftSection: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#8b92a0',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  totalPower: {
    color: '#5b8def',
    fontSize: 64,
    fontWeight: '700',
    lineHeight: 64,
  },
  unit: {
    color: '#8b92a0',
    fontSize: 18,
    fontWeight: '600',
    marginTop: -8,
  },
  average: {
    color: '#8b92a0',
    fontSize: 13,
    marginTop: 4,
  },
  rightSection: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  sourceItem: {
    marginBottom: 8,
  },
  sourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  sourceName: {
    color: '#e0e3e8',
    fontSize: 12,
    fontWeight: '500',
  },
  sourceCode: {
    color: '#8b92a0',
    fontSize: 11,
  },
  sourcePower: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 12,
  },
  // Decorative stars
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: '#ffffff',
    borderRadius: 1,
    opacity: 0.6,
  },
  star1: {
    top: 20,
    right: 60,
  },
  star2: {
    top: 40,
    right: 100,
  },
  star3: {
    bottom: 30,
    left: 40,
  },
  star4: {
    top: 70,
    right: 30,
  },
});

export default OverviewCard;
