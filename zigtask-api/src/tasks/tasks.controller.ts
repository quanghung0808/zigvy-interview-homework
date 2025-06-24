// src/tasks/tasks.controller.ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './schemas/task.schema';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Request() req: { user: { sub: string } },
    @Body() dto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    const { dueDate, ...rest } = dto;
    const data: Partial<Task> & { userId: string } = {
      ...rest,
      dueDate: new Date(dueDate),
      userId: req.user.sub,
    };
    return this.tasksService.create(data);
  }
}
