import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Priority, PRIORITY_COLOR } from '../utils/constants';

const PRIORITY_LABELS: Record<Priority, string> = {
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW',
};

const PILL_STYLES = (() => {
  const result = {} as Record<
    Priority,
    { selected: object; unselected: object }
  >;
  for (const p of ['high', 'medium', 'low'] as Priority[]) {
    const c = PRIORITY_COLOR[p];
    result[p] = {
      selected: { borderColor: c + '100', backgroundColor: c + '50' },
      unselected: { borderColor: c + '40', backgroundColor: c + '0D' },
    };
  }
  return result;
})();

interface PriorityPillProps {
  priority: Priority;
  selected?: boolean;
  onPress?: () => void;
}

const PriorityPill = ({ priority, selected, onPress }: PriorityPillProps) => {
  const color = PRIORITY_COLOR[priority];
  const variantStyle =
    PILL_STYLES[priority][selected ? 'selected' : 'unselected'];

  return (
    <Pressable onPress={onPress} style={[styles.pill, variantStyle]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.label, { color }]}>{PRIORITY_LABELS[priority]}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 10,
    borderWidth: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default PriorityPill;
