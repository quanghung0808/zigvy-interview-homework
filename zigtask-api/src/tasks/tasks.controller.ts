// src/tasks/tasks.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './schemas/task.schema';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { TaskStatus } from './enum/task-status.enum';

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

  @Get()
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'from', required: false })
  @ApiQuery({ name: 'to', required: false })
  async findAll(
    @Request() req: { user: { sub: string } },
    @Query('status') status?: TaskStatus,
    @Query('title') title?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ): Promise<TaskResponseDto[]> {
    return this.tasksService.searchTasks(req.user.sub, {
      status,
      title,
      from,
      to,
    });
  }

  @Get(':id')
  async findOne(
    @Request() req: { user: { sub: string } },
    @Param('id') id: string,
  ): Promise<TaskResponseDto> {
    return this.tasksService.findById(id, req.user.sub);
  }
}
