import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://xxxxxxxxxxxxxxxxxx.mockapi.io/api/v1"; // Mock API - Use your own API URL

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchAll", async () => {
  const response = await axios.get("/tasks");
  console.log("Call from the Thunk", response.data);
  return response.data;
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (text, thunkAPI) => {
    try {
      const response = await axios.post("/tasks", text);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const toggleCompleted = createAsyncThunk(
  "tasks/toggleCompleted",
  async (task, thunkAPI) => {
    try {
      const response = await axios.put(`/tasks/${task.id}`, {
        completed: !task.completed,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // addTask: (state, action) => {
    //   state.push(action.payload);
    // },
    // deleteTask(state, action) {
    //   const index = state.findIndex((task) => task.id === action.payload);
    //   state.splice(index, 1);
    // },
    // toggleCompleted(state, action) {
    //   const index = state.findIndex((task) => task.id === action.payload);
    //   state[index].completed = !state[index].completed;
    // },
  },
  extraReducers: {
    [fetchTasks.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchTasks.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchTasks.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addTask.pending]: (state) => {
      state.isLoading = true;
    },
    [addTask.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items.push(action.payload);
      state.error = null;
    },
    [addTask.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteTask.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteTask.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      const item = state.items.find((task) => task.id === action.payload.id);
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [deleteTask.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [toggleCompleted.pending]: (state, action) => {
      state.isLoading = true;
    },
    [toggleCompleted.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      const item = state.items.find((task) => task.id === action.payload.id);
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id
      );
      state.items[index].completed = !item.completed;
    },
  },
});

export const selectTasks = (state) => state.tasks;

export default tasksSlice.reducer;
