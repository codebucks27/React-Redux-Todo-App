import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      state.push(action.payload);
      return state;
    },
    removeTodos: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateTodos: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            item: action.payload.item,
          };
        }
        return item;
      });
    },
    completedTodos: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            completed: true,
          };
        }
        return item;
      });
    },
  },
});

export const {
  addTodos,
  removeTodos,
  updateTodos,
  completedTodos,
} = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
