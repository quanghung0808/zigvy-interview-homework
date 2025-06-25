import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskBoard from './TaskBoard';
import { Task, TaskStatus } from '../types/task';

describe('TaskBoard', () => {
  it('renders without crashing', () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        status: 'TODO' as TaskStatus,
        dueDate: '2024-12-31',
      },
    ];
    const mockOnDragEnd = jest.fn();
    render(
      <div data-testid="task-board">
        <TaskBoard tasks={mockTasks} onDragEnd={mockOnDragEnd} />
      </div>
    );
    expect(screen.getByTestId('task-board')).toBeInTheDocument();
  });
});

export {}; 