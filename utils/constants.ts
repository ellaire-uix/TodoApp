import { Dimensions } from 'react-native';

export const SCREEN_W = Dimensions.get('window').width;
export const DELETE_THRESHOLD = -SCREEN_W * 0.35;

export const STORAGE_KEY = 'rn_todos_v1';

export type Priority = 'high' | 'medium' | 'low';
export type Filter = 'all' | 'active' | 'completed';
export type SortMode = 'priority' | 'newest' | 'oldest' | 'alpha';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
  completedAt?: number;
}

export interface SortOption {
  value: SortMode;
  label: string;
  icon: string;
}

export const PRIORITY_COLOR: Record<Priority, string> = {
  high: '#F87171',
  medium: '#FBBF24',
  low: '#34D399',
};

export const PRIORITY_ORDER: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: 'HIGH',
  medium: 'MEDIUM',
  low: 'LOW',
};

export const FILTER_LABELS: Record<Filter, string> = {
  all: 'All',
  active: 'Active',
  completed: 'Done',
};

export const SORT_OPTIONS: SortOption[] = [
  { value: 'priority', label: 'Priority', icon: 'alert-circle' },
  { value: 'newest', label: 'Newest', icon: 'arrow-down' },
  { value: 'oldest', label: 'Oldest', icon: 'arrow-up' },
  { value: 'alpha', label: 'A-Z', icon: 'type' },
];
