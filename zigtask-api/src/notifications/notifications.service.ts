import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../tasks/schemas/task.schema';
import { TaskGateway } from '../tasks/task/task.gateway';

@Injectable()
export class NotificationsService implements OnModuleInit {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private readonly taskGateway: TaskGateway,
  ) {}

  onModuleInit() {
    // Run every minute
    setInterval(() => {
      (async () => {
        await this.notifyTasksDueSoon();
      })();
    }, 60 * 1000);
  }

  async notifyTasksDueSoon() {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    // Find tasks due within the next hour and not already DONE
    const tasks = await this.taskModel.find({
      dueDate: { $gte: now, $lte: oneHourLater },
      status: { $ne: 'DONE' },
    });
    if (tasks.length > 0) {
      tasks.forEach((task) => {
        this.taskGateway.server.emit('taskDueSoon', {
          id: String(task._id),
          title: task.title,
          dueDate: task.dueDate,
          userId: task.userId,
        });
      });
    }
  }
}
