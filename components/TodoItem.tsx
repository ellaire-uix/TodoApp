import React, { memo, useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutUp,
  Layout,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Haptics from 'react-native-haptic-feedback';
import {
  Todo,
  Priority,
  PRIORITY_COLOR,
  DELETE_THRESHOLD,
} from '../utils/constants';
import { formatDate } from '../utils/helpers';

const PRIORITY_LABELS: Record<Priority, string> = {
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW',
};

const MINI_PILL_STYLES = (() => {
  const result = {} as Record<Priority, object>;
  for (const p of ['high', 'medium', 'low'] as Priority[]) {
    const c = PRIORITY_COLOR[p];
    result[p] = { borderColor: c + '55', backgroundColor: c + '15' };
  }
  return result;
})();

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  screenWidth: number;
}

const TodoItem = memo(
  ({ todo, onToggle, onDelete, onEdit, screenWidth }: TodoItemProps) => {
    const translateX = useSharedValue(0);
    const deleteReady = useSharedValue(false);
    const color = PRIORITY_COLOR[todo.priority];

    // ✅ simple function (no need for useCallback)
    const handleToggle = () => {
      Haptics.trigger('impactMedium');
      onToggle(todo.id);
    };

    // ✅ fixed
    const handleEdit = () => {
      onEdit(todo);
    };

    // ✅ KEEP useMemo here (gesture should not recreate every render)
    const pan = useMemo(
      () =>
        Gesture.Pan()
          .activeOffsetX([-10, 10])
          .onUpdate(e => {
            if (e.translationX < 0) {
              translateX.value = e.translationX * 0.8;
              deleteReady.value = e.translationX < DELETE_THRESHOLD;
            }
          })
          .onEnd(() => {
            if (translateX.value < DELETE_THRESHOLD) {
              translateX.value = withTiming(
                -screenWidth,
                { duration: 200 },
                () => {
                  runOnJS(onDelete)(todo.id);
                },
              );
            } else {
              translateX.value = withSpring(0);
              deleteReady.value = false;
            }
          }),
      [screenWidth, onDelete, todo.id],
    );

    const rowStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value }],
    }));

    const deleteRevealStyle = useAnimatedStyle(() => ({
      backgroundColor: withTiming(deleteReady.value ? '#3D1212' : '#2A1212', {
        duration: 150,
      }),
    }));

    return (
      <Animated.View
        entering={FadeInDown.springify().damping(20)}
        exiting={FadeOutUp.duration(200)}
        layout={Layout.springify()}
        style={styles.wrapper}
      >
        <Animated.View style={[styles.deleteReveal, deleteRevealStyle]}>
          <Feather name="trash-2" size={20} color="#F87171" />
          <Text style={styles.deleteText}>Delete</Text>
        </Animated.View>

        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.row, rowStyle]}>
            <View style={[styles.stripe, { backgroundColor: color }]} />

            <Pressable
              onPress={handleToggle}
              style={[
                styles.checkbox,
                todo.completed ? styles.CHECKBOX_DONE : styles.CHECKBOX_UNDONE,
              ]}
            >
              {todo.completed && (
                <Feather name="check" size={14} color="#0D0D14" />
              )}
            </Pressable>

            <View style={styles.content}>
              <Text
                style={[styles.taskText, todo.completed && styles.taskTextDone]}
                numberOfLines={2}
              >
                {todo.text}
              </Text>

              <View style={styles.metaRow}>
                <View
                  style={[styles.miniPill, MINI_PILL_STYLES[todo.priority]]}
                >
                  <Text style={[styles.miniPillText, { color }]}>
                    {PRIORITY_LABELS[todo.priority]}
                  </Text>
                </View>

                <Text style={styles.dateText}>
                  {todo.completed && todo.completedAt
                    ? `✓ ${formatDate(todo.completedAt)}`
                    : formatDate(todo.createdAt)}
                </Text>
              </View>
            </View>

            <Pressable onPress={handleEdit} style={styles.editButton}>
              <Feather name="edit-2" size={16} color="#7E7D96" />
            </Pressable>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
  },
  deleteReveal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 24,
    borderRadius: 16,
  },
  deleteText: {
    color: '#F87171',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16161F',
    borderRadius: 16,
    overflow: 'hidden',
  },
  stripe: {
    width: 5,
    alignSelf: 'stretch',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 14,
  },
  content: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 8,
  },
  taskText: {
    color: '#F0EFF8',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 6,
  },
  taskTextDone: {
    color: '#44435A',
    textDecorationLine: 'line-through',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  miniPill: {
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
  },
  miniPillText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  dateText: {
    color: '#44435A',
    fontSize: 12,
  },
  editButton: {
    padding: 16,
  },
  CHECKBOX_DONE: { backgroundColor: '#34D399', borderColor: '#34D399' },
  CHECKBOX_UNDONE: { borderColor: '#44435A' },
});

export default TodoItem;
