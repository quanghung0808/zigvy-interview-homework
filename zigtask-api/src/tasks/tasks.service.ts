import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { toTaskResponseDto } from './task.mapper';
import { FilterTasksDto } from './dto/filter-tasks.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(data: Partial<Task> & { userId: string }) {
    const existing = await this.taskModel.findOne({ title: data.title });

    if (existing) {
      throw new ConflictException('Task title already exists');
    }

    const task = await this.taskModel.create(data);
    return toTaskResponseDto(task);
  }

  async searchTasks(userId: string, filters: FilterTasksDto) {
    const query: FilterQuery<TaskDocument> = { userId };

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.title) {
      query.title = { $regex: filters.title, $options: 'i' };
    }

    if (filters.from || filters.to) {
      const dueDateFilter: { $gte?: Date; $lte?: Date } = {};

      if (filters.from) {
        dueDateFilter.$gte = new Date(filters.from);
      }

      if (filters.to) {
        dueDateFilter.$lte = new Date(filters.to);
      }

      query.dueDate = dueDateFilter;
    }
    const tasks = await this.taskModel.find(query);
    return tasks.map(toTaskResponseDto);
  }

  async findById(id: string, userId: string) {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    if (task.userId !== userId) throw new ForbiddenException('Access denied');
    return toTaskResponseDto(task);
  }
}
