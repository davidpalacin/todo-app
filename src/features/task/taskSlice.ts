import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { data } from '../../utils/data'


export interface Task {
  id: number;
  title: string;
  content: string;
  status: string;
}

export interface TaskState {
  tasks: Task[];
  filteredTasks: Task[]; // Add a new field to store the filtered tasks
}

const initialState: TaskState = {
  tasks: data,
  filteredTasks: data, // Initialize filteredTasks with all tasks
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    filterBy: (state, action: PayloadAction<string>) => {
      const filter = action.payload;
      if (filter === 'all') {
        return {
          ...state,
          filteredTasks: state.tasks, // Show all tasks when the filter is 'all'
        };
      }

      // Filter the tasks based on the selected filter and update filteredTasks slice
      const filteredTasks = state.tasks.filter((task) => task.status === filter);
      return {
        ...state,
        filteredTasks,
      };
    },
    deleteOne: (state, action: PayloadAction<number>) => {
      const idToDelete = action.payload;
      const updatedTasks = state.tasks.filter((task) => task.id !== idToDelete);

      return {
        ...state,
        tasks: updatedTasks,
        filteredTasks: updatedTasks, // Also update filteredTasks with the modified tasks
      };
    },
    changeStatus: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === id) {
          if (task.status === 'pending') {
            return { ...task, status: 'in progress' };
          } else if (task.status === 'in progress') {
            return { ...task, status: 'completed' };
          } else if (task.status === 'completed') {
            return { ...task, status: 'pending' };
          }
        }
        return task;
      });

      return {
        ...state,
        tasks: updatedTasks,
        filteredTasks: updatedTasks, // Also update filteredTasks with the modified tasks
      };
    },
    editTask: (state, action: PayloadAction<{ id: number, newTitle: string, newContent: string }>) => {
      const { id, newContent, newTitle } = action.payload;

      const updatedTasks = state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, title: newTitle, content: newContent };
        }
        return task;
      });

      return {
        ...state,
        tasks: updatedTasks,
        filteredTasks: updatedTasks, // Also update filteredTasks with the modified tasks
      };
    },
    createOne: (state, action: PayloadAction<{ title: string, content: string }>) => {
      const { title, content } = action.payload;

      const newId: number = state.tasks.reduce((maxId, task) => {
        if (task.id > maxId) {
          return task.id;
        } else {
          return maxId;
        }
      }, 0) + 1;

      const newTask = { id: newId, title, content, status: 'pending' };

      const updatedTasks = [...state.tasks, newTask];

      return {
        ...state,
        tasks: updatedTasks,
        filteredTasks: updatedTasks, // Also update filteredTasks with the new task included
      };
    },

  },
})

// Action creators are generated for each case reducer function
export const { filterBy, deleteOne, changeStatus, editTask, createOne } = tasksSlice.actions

export default tasksSlice.reducer