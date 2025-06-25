import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  Paper,
  useMediaQuery,
  useTheme,
  Grid,
  Snackbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TaskBoard from "../components/TaskBoard";
import TaskForm from "../components/TaskForm";
import { useTasksStore } from "../store/tasks";
import { Task, TaskStatus } from "../types/task";
import { DropResult } from "react-beautiful-dnd";
import useDebounce from "../hooks/useDebounce";
import { io, Socket } from "socket.io-client";

const Dashboard: React.FC = () => {
  const {
    tasks,
    fetchAll,
    addTask,
    editTask,
    reorderTask,
    setFilters,
    filters,
    removeTask,
  } = useTasksStore();
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [search, setSearch] = useState(filters.title || "");
  const [startDate, setStartDate] = useState(filters.from || "");
  const [endDate, setEndDate] = useState(filters.to || "");
  const debouncedSearch = useDebounce(search, 500);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  useEffect(() => {
    setFilters({ title: debouncedSearch, from: startDate, to: endDate });
    fetchAll({ title: debouncedSearch, from: startDate, to: endDate });
  }, [debouncedSearch, startDate, endDate, setFilters, fetchAll]);

  useEffect(() => {
    // Connect to the backend WebSocket server
    const socket: Socket = io(
      process.env.REACT_APP_API_URL || "http://localhost:3000"
    );

    socket.on("taskUpdated", (task: Task) => {
      editTask(task.id, task);
    });
    socket.on("taskCreated", (task: Task) => {
      addTask(task);
    });
    socket.on("taskDeleted", (taskId: string) => {
      removeTask(taskId);
    });

    socket.on("taskDueSoon", (data: { id: string; title: string; dueDate: string; userId: string }) => {
      setSnackbarMsg(`Task due soon: ${data.title} at ${new Date(data.dueDate).toLocaleString()}`);
      setSnackbarOpen(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [addTask, editTask, removeTask]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { draggableId, destination, source } = result;
    const status = destination.droppableId as TaskStatus;
    if (
      destination.droppableId !== source.droppableId ||
      destination.index !== source.index
    ) {
      reorderTask(draggableId, status, destination.index);
      editTask(draggableId, { status });
    }
  };

  const handleFormSubmit = async (values: any) => {
    if (editingTask) {
      await editTask(editingTask.id, values);
    } else {
      await addTask(values);
    }
    setFormOpen(false);
    setEditingTask(null);
  };

  return (
    <Box p={isMobile ? 1 : 4}>
      <Paper elevation={3} sx={{ p: isMobile ? 2 : 4, mb: 4, borderRadius: 3 }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Task Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Manage your tasks efficiently. Drag and drop to update status.
              Filter by title or due date.
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 12, md: 4 }}
            textAlign={isMobile ? "left" : "right"}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => setFormOpen(true)}
            >
              + Create Task
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              placeholder="Search by title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <TextField
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              label="Start Due Date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <TextField
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              label="End Due Date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
      </Paper>
      <TaskBoard
        tasks={tasks}
        onDragEnd={handleDragEnd}
        onEditTask={setEditingTask}
      />
      <TaskForm
        open={formOpen || !!editingTask}
        onClose={() => {
          setFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleFormSubmit}
        initialValues={editingTask || undefined}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMsg}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Dashboard;
