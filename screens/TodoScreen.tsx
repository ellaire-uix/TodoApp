import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import TodoInput from '../components/TodoInput';
import FilterBar from '../components/FilterBar';
import SortBar from '../components/SortBar';
import TodoItem from '../components/TodoItem';
import EmptyState from '../components/EmptyState';
import EditModal from '../components/EditModal';
import { useTodos } from '../hooks/useTodos';
import {
  Priority,
  Filter,
  SortMode,
  PRIORITY_ORDER,
  Todo,
} from '../utils/constants';

const { width: SCREEN_W } = Dimensions.get('window');

const ItemSeparator = () => <View style={styles.separator} />;
export default function TodoScreen() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    saveEdit,
    clearDone,
    activeCount,
    completedCount,
  } = useTodos();

  const [input, setInput] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [filter, setFilter] = useState<Filter>('all');
  const [sortMode, setSortMode] = useState<SortMode>('priority');
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleAddTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    addTodo(trimmed, priority);
    setInput('');
  };

  const handleCloseEdit = () => setEditTodo(null);

  const filtered = () => {
    const list = todos
      .filter(t =>
        filter === 'all'
          ? true
          : filter === 'active'
          ? !t.completed
          : t.completed,
      )
      .filter(t =>
        t.text.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );

    return [...list].sort((a, b) => {
      switch (sortMode) {
        case 'priority':
          return (
            PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] ||
            b.createdAt - a.createdAt
          );
        case 'newest':
          return b.createdAt - a.createdAt;
        case 'oldest':
          return a.createdAt - b.createdAt;
        case 'alpha':
          return a.text.toLowerCase().localeCompare(b.text.toLowerCase());
        default:
          return 0;
      }
    });
  };

  const renderItem = ({ item }: { item: Todo }) => (
    <TodoItem
      todo={item}
      onToggle={toggleTodo}
      onDelete={deleteTodo}
      onEdit={setEditTodo}
      screenWidth={SCREEN_W}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D14" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <Header activeCount={activeCount} completedCount={completedCount} />

        <TodoInput
          input={input}
          setInput={setInput}
          priority={priority}
          setPriority={setPriority}
          addTodo={handleAddTodo}
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search tasks..."
          placeholderTextColor="#44435A"
          style={styles.searchInput}
        />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          completedCount={completedCount}
          clearDone={clearDone}
        />

        <SortBar sortMode={sortMode} setSortMode={setSortMode} />

        {todos.length > 0 && (
          <Text style={styles.swipeHint}>← swipe left to delete</Text>
        )}

        <FlatList
          data={filtered()}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={
            filtered().length === 0 ? styles.emptyContainer : styles.listContainer
          }
          ListEmptyComponent={<EmptyState filter={filter} />}
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparator}
        />
      </KeyboardAvoidingView>

      <EditModal
        key={editTodo?.id ?? 'none'}
        visible={!!editTodo}
        todo={editTodo}
        onSave={saveEdit}
        onClose={handleCloseEdit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D14',
  },
  flex: {
    flex: 1,
  },
  separator: {
    height: 12,
  },
  swipeHint: {
    color: '#44435A',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  searchInput: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#16161F',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#F0EFF8',
  },
});
