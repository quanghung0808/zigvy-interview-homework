export const TASK_STATUSES = ['TODO', 'INPROGRESS', 'DONE'] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];
