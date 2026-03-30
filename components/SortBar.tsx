import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { SortMode, SORT_OPTIONS } from '../utils/constants';

const ICON_COLOR = {
  active: '#9D8FFF',
  inactive: '#7E7D96',
} as const;

interface SortBarProps {
  sortMode: SortMode;
  setSortMode: (mode: SortMode) => void;
}

const SortBar = ({ sortMode, setSortMode }: SortBarProps) => {
  const handlePress = (value: SortMode) => {
    setSortMode(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Feather name="sliders" size={13} color={ICON_COLOR.inactive} />
        <Text style={styles.label}>Sort by</Text>
      </View>

      <View style={styles.pillRow}>
        {SORT_OPTIONS.map(opt => {
          const isActive = sortMode === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => handlePress(opt.value)}
              style={[styles.pill, isActive && styles.pillActive]}
            >
              <Feather
                name={opt.icon}
                size={12}
                color={isActive ? ICON_COLOR.active : ICON_COLOR.inactive}
              />
              <Text
                style={[styles.pillText, isActive && styles.pillTextActive]}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  label: {
    color: '#7E7D96',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#16161F',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pillActive: {
    backgroundColor: 'rgba(124, 106, 247, 0.12)',
    borderColor: 'rgba(124, 106, 247, 0.4)',
  },
  pillText: {
    color: '#7E7D96',
    fontSize: 13,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#9D8FFF',
  },
});

export default SortBar;
