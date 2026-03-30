import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Haptics from 'react-native-haptic-feedback';
import { uid } from '../utils/helpers';
import { STORAGE_KEY, Todo, Priority } from '../utils/constants';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const loadedRef = useRef(false);
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(v => {
        if (v) setTodos(JSON.parse(v));
      })
      .finally(() => {
        loadedRef.current = true;
      });
  }, []);

  useEffect(() => {
    if (loadedRef.current) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (text: string, priority: Priority) => {
    if (!text) return;
    Haptics.trigger('impactLight');
    setTodos(prev => [
      { id: uid(), text, completed: false, priority, createdAt: Date.now() },
      ...prev,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? Date.now() : undefined,
            }
          : t,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    Haptics.trigger('notificationWarning');
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const saveEdit = (id: string, text: string, p: Priority) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, text, priority: p } : t)),
    );
  };

  const clearDone = () => {
    Haptics.trigger('impactHeavy');
    setTodos(prev => prev.filter(t => !t.completed));
  };

  const activeCount = todos.reduce((n, t) => n + (t.completed ? 0 : 1), 0);
  const completedCount = todos.length - activeCount;

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    saveEdit,
    clearDone,
    activeCount,
    completedCount,
  };
}
