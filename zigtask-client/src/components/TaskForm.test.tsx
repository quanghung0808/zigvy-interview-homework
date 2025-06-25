import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm', () => {
  it('renders with initial values', () => {
    render(<TaskForm open={true} onClose={jest.fn()} onSubmit={jest.fn()} initialValues={{ title: 'Test', description: 'Desc', dueDate: '2025-07-01', status: 'TODO' }} />);
    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Desc')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2025-07-01')).toBeInTheDocument();
  });

  it('calls onSubmit with form values', () => {
    const onSubmit = jest.fn();
    render(<TaskForm open={true} onClose={jest.fn()} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'New Desc' } });
    fireEvent.change(screen.getByLabelText('Due Date'), { target: { value: '2025-07-10' } });
    fireEvent.mouseDown(screen.getByLabelText('Status'));
    fireEvent.click(screen.getByText('In Progress'));
    fireEvent.click(screen.getByText('Create'));
    expect(onSubmit).toHaveBeenCalledWith({ title: 'New Task', description: 'New Desc', dueDate: '2025-07-10', status: 'INPROGRESS' });
  });
}); 