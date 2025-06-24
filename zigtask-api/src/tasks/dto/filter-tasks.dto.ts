import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../enum/task-status.enum';

export class FilterTasksDto {
  @ApiPropertyOptional({
    description: 'Filter by task status (e.g., pending, completed)',
  })
  @IsOptional()
  @IsString()
  status?: TaskStatus;

  @ApiPropertyOptional({
    description: 'Search for tasks with title containing this string',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Start of due date range (ISO 8601 format)',
  })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({
    description: 'End of due date range (ISO 8601 format)',
  })
  @IsOptional()
  @IsDateString()
  to?: string;
}
