import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
let localArray = [];
export const localStore = JSON.parse(localStorage.getItem('todos'));
if (localStore !== null && localStore === []) {
  localArray.push(localStore);
}

/* action name creator */
// const reducerName = 'order';
// const createActionName = name => `app/${reducerName}/${name}`;

// /* action types */
// const FETCH_START = createActionName('FETCH_START');
// const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
// const FETCH_ERROR = createActionName('FETCH_ERROR');
// const ADD_TODOS = createActionName('ADD_TODOS');
// const REMOVE_TODOS = createActionName('REMOVE_TODOS');
// const UPDATE_TODOS = createActionName('UPDATE_TODOS');
// const COMPLETE_TODOS = createActionName('COMPLETE_TODOS');
// const DELETE_TODOS = createActionName('DELETE_TODOS');

// /* action creators */
// export const fetchStarted = payload => ({ payload, type: FETCH_START });
// export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
// export const fetchError = payload => ({ payload, type: FETCH_ERROR });
// export const addTodos = payload => ({ payload, type: ADD_TODOS });
// export const removeTodos = payload => ({ payload, type: REMOVE_TODOS });
// export const updateTodos = payload => ({ payload, type: UPDATE_TODOS });
// export const completeTodos = payload => ({ payload, type: COMPLETE_TODOS });
// export const deleteTodos = payload => ({ payload, type: DELETE_TODOS });

// /* reducer */
// export const reducer = (state = [], action = {}) => {
//   switch (action.type) {
//     case ADD_TODOS: {
//       console.log(state);
//       state.push(action.payload);
//       localArray.push(action.payload);
//       localStorage.setItem('todos', JSON.stringify(localArray));
//       // const addTask = state.find(item => (item.id === action.payload.id) ? 'undefined' : false);
//       // const id = action.payload.id;
//       // console.log(action.payload.quantity);
//       // console.log('inCart1', inCart);
//       return {
//         ...state,
//         // todis: addTask
//         //   ? state.map(item =>
//         //     item.id === action.payload.id
//         //       ? { ...item }
//         //       : item
//         //   )
//         //   : [...state, action.payload],
//       };
//     }
//     default:
//       return state;
//   }
// };


const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    //here we will write our reducer
    //Adding todos
    addTodos: (state, action) => {
      state.push(action.payload);
      localArray.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(localArray));
      return state;
    },
    //remove todos
    removeTodos: (state, action) => {
      let localStore = JSON.parse(localStorage.getItem('todos'));
      let removedLocalStore = localStore.filter(item => {
        return item.id !== action.payload;
      })
      localStorage.setItem('todos', JSON.stringify(removedLocalStore));
      return state.filter((item) => item.id !== action.payload);
    },
    //update todos
    updateTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            item: action.payload.item,
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
    //deleted
    deleteTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            deleted: true,
          };
        }
        return todo;
      });
    },
  },
});

export const {
  addTodos,
  removeTodos,
  updateTodos,
  completeTodos,
  deleteTodos,
} = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
