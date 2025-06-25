import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { Task, TaskStatus, CreateTaskRequest, UpdateTaskRequest } from '../types/task';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateTaskRequest | UpdateTaskRequest) => void;
  initialValues?: Partial<Task>;
}

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: 'TODO', label: 'To Do' },
  { value: 'INPROGRESS', label: 'In Progress' },
  { value: 'DONE', label: 'Done' },
];

const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [dueDate, setDueDate] = useState(initialValues?.dueDate || '');
  const [status, setStatus] = useState<TaskStatus>(initialValues?.status || 'TODO');

  useEffect(() => {
    setTitle(initialValues?.title || '');
    setDescription(initialValues?.description || '');
    setDueDate(initialValues?.dueDate || '');
    setStatus(initialValues?.status || 'TODO');
  }, [initialValues, open]);

  const handleSubmit = () => {
    onSubmit({ title, description, dueDate, status });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{initialValues ? 'Edit Task' : 'Create Task'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          fullWidth
          margin="normal"
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {initialValues ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm; 