import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  broadcastTaskUpdate(task: any) {
    this.server.emit('taskUpdated', task);
  }

  broadcastTaskCreate(task: any) {
    this.server.emit('taskCreated', task);
  }

  broadcastTaskDelete(taskId: string) {
    this.server.emit('taskDeleted', taskId);
  }
}
