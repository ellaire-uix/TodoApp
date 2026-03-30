import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native'; // removed TouchableOpacity
import Feather from 'react-native-vector-icons/Feather';
import PriorityPill from './PriorityPill';
import { Priority } from '../utils/constants';

const PRIORITIES: Priority[] = ['high', 'medium', 'low'];
const ADD_BUTTON_ACTIVE = { backgroundColor: '#7C6AF7' };
const ADD_BUTTON_INACTIVE = { backgroundColor: 'rgba(124,106,247,0.3)' };

interface TodoInputProps {
  input: string;
  setInput: (text: string) => void;
  priority: Priority;
  setPriority: (priority: Priority) => void;
  addTodo: () => void;
}

const TodoInput = ({
  input,
  setInput,
  priority,
  setPriority,
  addTodo,
}: TodoInputProps) => {
  const isValid = input.trim().length > 0;

  const handlePriorityPress = (p: Priority) => {
    setPriority(p);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Add a task…"
        placeholderTextColor="#44435A"
        returnKeyType="done"
        onSubmitEditing={addTodo}
        selectionColor="#7C6AF7"
      />

      <View style={styles.bottomRow}>
        <View style={styles.pillRow}>
          {PRIORITIES.map(p => (
            <PriorityPill
              key={p}
              priority={p}
              selected={priority === p}
              onPress={() => handlePriorityPress(p)}
            />
          ))}
        </View>

        <Pressable
          style={[
            styles.addButton,
            isValid ? ADD_BUTTON_ACTIVE : ADD_BUTTON_INACTIVE,
          ]}
          onPress={addTodo}
          disabled={!isValid}
        >
          <Feather name="plus" size={22} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#16161F',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  input: {
    color: '#F0EFF8',
    fontSize: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 14,
  },
  pillRow: {
    flexDirection: 'row',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TodoInput;
