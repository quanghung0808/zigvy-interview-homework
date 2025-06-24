import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { TASK_STATUSES, TaskStatus } from '../enum/task-status.enum';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Buy groceries' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Milk, Bread, Eggs' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: '2025-07-01T12:00:00.000Z', type: String })
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @ApiPropertyOptional({ enum: TASK_STATUSES, example: 'TODO' })
  @IsEnum(TASK_STATUSES)
  @IsOptional()
  status?: TaskStatus;
}
