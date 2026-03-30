import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TODAY = new Date().toLocaleDateString('en-US', { weekday: 'long' });
const DATE = new Date().toLocaleDateString();
interface HeaderProps {
  activeCount: number;
  completedCount: number;
}

const Header = ({ activeCount, completedCount }: HeaderProps) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.date}>{DATE}</Text>
      <Text style={styles.dayLabel}>{TODAY}</Text>
      <Text style={styles.title}>Todo App</Text>
    </View>

    <View style={styles.badgeRow}>
      <View style={styles.activeBadge}>
        <Text style={styles.activeNumber}>{activeCount}</Text>
        <Text style={styles.badgeLabel}>left</Text>
      </View>

      <View style={styles.doneBadge}>
        <Text style={styles.doneNumber}>{completedCount}</Text>
        <Text style={styles.badgeLabel}>done</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
  },
  dayLabel: {
    color: '#7E7D96',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    color: '#F0EFF8',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  activeBadge: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    minWidth: 60,
    backgroundColor: 'rgba(124, 106, 247, 0.1)',
  },
  doneBadge: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    minWidth: 60,
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
  },
  activeNumber: {
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 28,
    color: '#9D8FFF',
  },
  doneNumber: {
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 28,
    color: '#34D399',
  },
  badgeLabel: {
    color: '#7E7D96',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  date: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F0EFF8',
    marginBottom: 4,
  },
});

export default Header;
