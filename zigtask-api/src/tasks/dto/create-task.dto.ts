import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { TASK_STATUSES, TaskStatus } from '../enum/task-status.enum';

export class CreateTaskDto {
  @ApiProperty({ example: 'Buy groceries' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Milk, Bread, Eggs' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2025-07-01T12:00:00.000Z', type: String })
  @IsDateString()
  dueDate: string;

  @ApiProperty({
    enum: TASK_STATUSES,
    example: 'TODO',
    default: TASK_STATUSES[0],
  })
  @IsEnum(TASK_STATUSES)
  @IsOptional()
  status?: TaskStatus;
}
