import { create } from 'zustand';
import { Task, TaskStatus, CreateTaskRequest, UpdateTaskRequest } from '../types/task';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/tasks';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: {
    title?: string;
    from?: string;
    to?: string;
    status?: TaskStatus;
  };
  fetchAll: (filters?: Partial<{ title: string; from: string; to: string; status: TaskStatus }>) => Promise<void>;
  setFilters: (filters: Partial<{ title: string; from: string; to: string; status: TaskStatus }>) => void;
  addTask: (task: CreateTaskRequest) => Promise<void>;
  editTask: (id: string, task: UpdateTaskRequest) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  reorderTask: (id: string, status: TaskStatus, newIndex: number) => void;
}

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  filters: {},
  fetchAll: async (filters) => {
    set({ loading: true, error: null });
    try {
      const mergedFilters = { ...get().filters, ...filters };
      const res = await fetchTasks(mergedFilters);
      set({ tasks: res.data, loading: false });
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },
  setFilters: (filters) => {
    set((state) => ({ filters: { ...state.filters, ...filters } }));
  },
  addTask: async (task) => {
    set({ loading: true, error: null });
    try {
      const res = await createTask(task);
      set({ tasks: [...get().tasks, res.data], loading: false });
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },
  editTask: async (id, task) => {
    set({ loading: true, error: null });
    try {
      const res = await updateTask(id, task);
      set({
        tasks: get().tasks.map(t => t.id === id ? res.data : t),
        loading: false
      });
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },
  removeTask: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteTask(id);
      set({ tasks: get().tasks.filter(t => t.id !== id), loading: false });
    } catch (e: any) {
      set({ error: e.message, loading: false });
    }
  },
  reorderTask: (id, status, newIndex) => {
    // Move task to new status and position
    const tasks = [...get().tasks];
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return;
    const [moved] = tasks.splice(idx, 1);
    moved.status = status;
    // Insert at new index among tasks with the same status
    const sameStatus = tasks.filter(t => t.status === status);
    const before = tasks.findIndex((t, i) => t.status === status && sameStatus.indexOf(t) === newIndex);
    if (before === -1) {
      // Add to end
      tasks.push(moved);
    } else {
      tasks.splice(before, 0, moved);
    }
    set({ tasks });
  },
})); 