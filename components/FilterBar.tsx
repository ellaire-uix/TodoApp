import React from 'react';
import { View, Text, Pressable, Keyboard, StyleSheet } from 'react-native'; // Pressable replaces TouchableOpacity
import Feather from 'react-native-vector-icons/Feather';
import { Filter } from '../utils/constants';

const FILTERS: Filter[] = ['all', 'active', 'completed'];
const FILTER_LABELS: Record<Filter, string> = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

interface FilterBarProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  completedCount: number;
  clearDone: () => void;
}

const FilterBar = ({
  filter,
  setFilter,
  completedCount,
  clearDone,
}: FilterBarProps) => {
  const handleTabPress = (f: Filter) => {
    setFilter(f);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {FILTERS.map(f => (
          <Pressable
            key={f}
            onPress={() => handleTabPress(f)}
            style={[styles.tab, filter === f && styles.tabActive]}
          >
            <Text
              style={[styles.tabText, filter === f && styles.tabTextActive]}
            >
              {FILTER_LABELS[f]}
            </Text>
          </Pressable>
        ))}
      </View>

      {completedCount > 0 && (
        <Pressable onPress={clearDone} style={styles.clearButton}>
          <Feather name="trash" size={14} color="#F87171" />
          <Text style={styles.clearText}>Clear</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#16161F',
    borderRadius: 12,
    padding: 4,
    flex: 1,
    marginRight: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#1E1E2A',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7E7D96',
  },
  tabTextActive: {
    color: '#F0EFF8',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  clearText: {
    color: '#F87171',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default FilterBar;
