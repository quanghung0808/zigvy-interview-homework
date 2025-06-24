import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { toTaskResponseDto } from './task.mapper';

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
}
