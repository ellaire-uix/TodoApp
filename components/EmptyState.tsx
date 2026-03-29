import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Filter } from '../utils/constants';

interface EmptyStateProps {
  filter: Filter;
}
const EMPTY_MESSAGES: Record<Filter, string> = {
  all: 'No tasks yet.\nAdd one above.',
  active: 'Nothing active right now.',
  completed: 'Nothing completed yet.',
};
const EmptyState = ({ filter }: EmptyStateProps) => (
  <View style={styles.container}>
    <Feather name="inbox" size={52} color="#44435A" />
    <Text style={styles.text}>{EMPTY_MESSAGES[filter]}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    gap: 16,
  },
  text: {
    color: '#44435A',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 26,
  },
});

export default EmptyState;
