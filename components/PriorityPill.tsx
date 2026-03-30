import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Priority, PRIORITY_COLOR } from '../utils/constants';

const PRIORITY_LABELS: Record<Priority, string> = {
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW',
};

const PILL_STYLES = {
  high: {
    selected: {
      borderColor: `${PRIORITY_COLOR.high}100`,
      backgroundColor: `${PRIORITY_COLOR.high}50`,
    },
    unselected: {
      borderColor: `${PRIORITY_COLOR.high}40`,
      backgroundColor: `${PRIORITY_COLOR.high}0D`,
    },
  },
  medium: {
    selected: {
      borderColor: `${PRIORITY_COLOR.medium}100`,
      backgroundColor: `${PRIORITY_COLOR.medium}50`,
    },
    unselected: {
      borderColor: `${PRIORITY_COLOR.medium}40`,
      backgroundColor: `${PRIORITY_COLOR.medium}0D`,
    },
  },
  low: {
    selected: {
      borderColor: `${PRIORITY_COLOR.low}100`,
      backgroundColor: `${PRIORITY_COLOR.low}50`,
    },
    unselected: {
      borderColor: `${PRIORITY_COLOR.low}40`,
      backgroundColor: `${PRIORITY_COLOR.low}0D`,
    },
  },
} satisfies Record<
  Priority,
  {
    selected: { borderColor: string; backgroundColor: string };
    unselected: { borderColor: string; backgroundColor: string };
  }
>;
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
