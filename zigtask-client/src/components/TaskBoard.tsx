import React from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from 'react-beautiful-dnd';
import { Task, TaskStatus } from '../types/task';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Chip,
  Stack,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const statusLabels: Record<TaskStatus, string> = {
  TODO: 'To Do',
  INPROGRESS: 'In Progress',
  DONE: 'Done',
};

interface TaskBoardProps {
  tasks: Task[];
  onDragEnd: (result: DropResult) => void;
  onEditTask?: (task: Task) => void;
}

const getTasksByStatus = (tasks: Task[], status: TaskStatus) =>
  tasks.filter((task) => task.status === status);

const statusColors: Record<TaskStatus, string> = {
  TODO: 'info',
  INPROGRESS: 'warning',
  DONE: 'success',
};

// Helper to format date as dd MM yyyy
const formatDueDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onDragEnd, onEditTask }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box display="flex" gap={2} flexDirection={isMobile ? 'column' : 'row'}>
        {Object.keys(statusLabels).map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided: DroppableProvided) => (
              <Paper
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  flex: 1,
                  minHeight: 400,
                  p: 2,
                  bgcolor: theme.palette.background.default,
                  borderRadius: 3,
                  transition: 'background 0.2s',
                }}
                elevation={4}
              >
                <Typography variant="h6" align="center" gutterBottom fontWeight={600}>
                  {statusLabels[status as TaskStatus]}
                </Typography>
                <Stack spacing={2}>
                  {getTasksByStatus(tasks, status as TaskStatus).map((task, idx) => (
                    <Draggable draggableId={task.id} index={idx} key={task.id}>
                      {(provided: DraggableProvided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            mb: 0,
                            borderLeft: (() => {
                              const color = theme.palette[statusColors[task.status] as keyof typeof theme.palette];
                              if (typeof color === 'object' && color && 'main' in color) {
                                return `6px solid ${color.main}`;
                              }
                              return `6px solid ${typeof color === 'string' ? color : '#1976d2'}`;
                            })(),
                            boxShadow: 2,
                            transition: 'box-shadow 0.2s, background 0.2s',
                            cursor: 'pointer',
                            bgcolor: theme.palette.background.paper,
                            '&:hover': {
                              boxShadow: 6,
                              bgcolor:
                                theme.palette.mode === 'dark'
                                  ? theme.palette.grey[800]
                                  : theme.palette.grey[100],
                            },
                          }}
                          onClick={() => onEditTask && onEditTask(task)}
                        >
                          <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                              <Typography variant="h6" fontWeight={700} gutterBottom>
                                {task.title}
                              </Typography>
                              {onEditTask && (
                                <IconButton size="small" onClick={e => { e.stopPropagation(); onEditTask(task); }}>
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              )}
                            </Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {task.description}
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                              <Chip
                                label={statusLabels[task.status]}
                                color={statusColors[task.status] as any}
                                size="small"
                              />
                              <Typography variant="caption" color="text.secondary">
                                Due: {formatDueDate(task.dueDate)}
                              </Typography>
                            </Stack>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Stack>
              </Paper>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );
};

export default TaskBoard; 