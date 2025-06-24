import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TASK_STATUSES, TaskStatus } from '../enum/task-status.enum';

export class TaskResponseDto {
  @ApiProperty({ example: '664f1b2c2f1b2c2f1b2c2f1b' })
  id: string;

  @ApiProperty({ example: 'Buy groceries' })
  title: string;

  @ApiPropertyOptional({ example: 'Milk, Bread, Eggs' })
  description?: string;

  @ApiProperty({ example: '2025-07-01T12:00:00.000Z', type: String })
  dueDate: string;

  @ApiProperty({ enum: TASK_STATUSES, example: 'TODO' })
  status: TaskStatus;

  @ApiProperty({ example: 'userId123' })
  userId: string;
}
