import {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskFilters,
} from "../types/task";
import { ApiResponse } from "../types/response";
import apiClient from "./client";

export const fetchTasks = async (
  filters: TaskFilters = {}
): Promise<ApiResponse<Task[]>> => {
  const params = new URLSearchParams();
  if (filters.title) params.append("title", filters.title);
  if (filters.from) params.append("from", filters.from);
  if (filters.to) params.append("to", filters.to);
  if (filters.status) params.append("status", filters.status);
  const res = await apiClient.get<ApiResponse<Task[]>>(
    `/tasks?${params.toString()}`
  );
  return res.data;
};

export const createTask = async (
  task: CreateTaskRequest
): Promise<ApiResponse<Task>> => {
  const res = await apiClient.post<ApiResponse<Task>>("/tasks", task);
  return res.data;
};

export const updateTask = async (
  id: string,
  task: UpdateTaskRequest
): Promise<ApiResponse<Task>> => {
  const res = await apiClient.put<ApiResponse<Task>>(`/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: string): Promise<ApiResponse<null>> => {
  const res = await apiClient.delete<ApiResponse<null>>(`/tasks/${id}`);
  return res.data;
};
