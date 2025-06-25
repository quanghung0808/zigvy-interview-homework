export type TaskStatus = "TODO" | "INPROGRESS" | "DONE";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  dueDate: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  dueDate?: string;
  status?: TaskStatus;
}

export interface TaskFilters {
  title?: string;
  from?: string;
  to?: string;
  status?: string;
}
