import { TaskDocument } from './schemas/task.schema';
import { TaskResponseDto } from './dto/task-response.dto';

export function toTaskResponseDto(task: TaskDocument): TaskResponseDto {
  return {
    id: String(task._id),
    title: task.title,
    description: task.description,
    dueDate: task.dueDate.toISOString(),
    status: task.status,
    userId: task.userId,
  };
}
