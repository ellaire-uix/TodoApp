import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Haptics from 'react-native-haptic-feedback';
import PriorityPill from './PriorityPill';
import { Todo, Priority } from '../utils/constants';

const PRIORITIES: Priority[] = ['high', 'medium', 'low'];

interface EditModalProps {
  visible: boolean;
  todo: Todo | null;
  onSave: (id: string, text: string, priority: Priority) => void;
  onClose: () => void;
}

const EditModal = ({ visible, todo, onSave, onClose }: EditModalProps) => {
  const insets = useSafeAreaInsets();

  const [text, setText] = useState(todo?.text ?? '');
  const [priority, setPriority] = useState<Priority>(
    todo?.priority ?? 'medium',
  );

  useEffect(() => {
    if (visible) {
      setText(todo?.text ?? '');
      setPriority(todo?.priority ?? 'medium');
    }
  }, [visible, todo]);

  const handleSave = () => {
    const t = text.trim();
    if (!t || !todo) return;
    Haptics.trigger('impactLight');
    onSave(todo.id, t, priority);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={insets.top + 40}
        >
          <Pressable
            style={[styles.sheet, { paddingBottom: 40 + insets.bottom }]}
            onPress={e => e.stopPropagation()}
          >
            <View style={styles.handle} />

            <Text style={styles.title}>Edit Task</Text>

            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              autoFocus
              multiline
              placeholder="Update your task..."
              placeholderTextColor="#44435A"
              selectionColor="#7C6AF7"
              textAlignVertical="top"
              returnKeyType="done"
              blurOnSubmit
            />

            <Text style={styles.priorityLabel}>PRIORITY</Text>

            <View style={styles.pillRow}>
              {PRIORITIES.map(p => (
                <PriorityPill
                  key={p}
                  priority={p}
                  selected={priority === p}
                  onPress={() => setPriority(p)}
                />
              ))}
            </View>

            <View style={styles.buttonRow}>
              <Pressable
                style={({ pressed }) => [
                  styles.cancelButton,
                  pressed && { opacity: 0.7 },
                ]}
                onPress={onClose}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.saveButton,
                  pressed && { opacity: 0.8 },
                ]}
                onPress={handleSave}
              >
                <Text style={styles.saveText}>Save Changes</Text>
              </Pressable>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    backgroundColor: '#16161F',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  handle: {
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1E1E2A',
    color: '#F0EFF8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    minHeight: 80,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  priorityLabel: {
    color: '#7E7D96',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 12,
  },
  pillRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    backgroundColor: '#1E1E2A',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  cancelText: {
    color: '#F0EFF8',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#7C6AF7',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default EditModal;
