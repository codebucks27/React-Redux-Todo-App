import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  deletedTodos: JSON.parse(localStorage.getItem("deletedTodos")) || [],
};

const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    //here we will write our reducer
    //Adding todos
    addTodos: (state, action) => {
      state.todos.push(action.payload);
      return state;
    },
    //remove todos
    removeTodos: (state, action) => {
      state.todos.map((todo) => {
        if (todo.id === action.payload) {
          state.deletedTodos.push(todo);
        }
        return todo;
      });

      const removedTodos = state.todos.filter(
        (item) => item.id !== action.payload
      );

      state.todos = [...removedTodos];

      return state;
    },
    //update todos
    updateTodos: (state, action) => {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            item: action.payload.item,
          };
        }
        return todo;
      });

      state.todos = [...updatedTodos];

      return state;
    },
    //completed
    completeTodos: (state, action) => {
      const completedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: true,
          };
        }
        return todo;
      });

      state.todos = [...completedTodos];

      return state;
    },
    //restore todos
    restoreTodos: (state, action) => {
      const deletedTodos = state.deletedTodos
        .map((todo) => {
          if (todo.id === action.payload) {
            state.todos.push(todo);
          }

          return todo;
        })
        .filter((item) => item.id !== action.payload);

      state.deletedTodos = [...deletedTodos];

      return state;
    },
  },
});

export const {
  addTodos,
  removeTodos,
  updateTodos,
  completeTodos,
  restoreTodos,
} = addTodoReducer.actions;

export const reducer = addTodoReducer.reducer;

export const selectTodos = (state) => state;
