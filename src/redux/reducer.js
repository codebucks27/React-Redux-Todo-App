import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    //here we will write our reducer
    //Adding todos
    addTodos: (state, action) => {
      state.push({
        ...action.payload,
        priority: action.payload.priority || 'medium' // 默认优先级为中等
      });
      return state;
    },
    //remove todos
    removeTodos: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    //update todos
    updateTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            item: action.payload.item,
            priority: action.payload.priority || todo.priority
          };
        }
        return todo;
      });
    },
    //completed
    completeTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      });
    },
    // 清除已完成的任务
    clearCompleted: (state) => {
      return state.filter((todo) => !todo.completed);
    },
    // 切换所有任务的完成状态
    toggleAll: (state, action) => {
      return state.map((todo) => ({
        ...todo,
        completed: action.payload
      }));
    },
    // 清空所有任务
    clearAll: () => {
      return [];
    },
    // 更新任务优先级
    updatePriority: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            priority: action.payload.priority
          };
        }
        return todo;
      });
    }
  },
});

export const {
  addTodos,
  removeTodos,
  updateTodos,
  completeTodos,
  clearCompleted,
  toggleAll,
  clearAll,
  updatePriority
} = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
