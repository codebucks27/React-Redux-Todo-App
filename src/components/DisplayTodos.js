import React, { useEffect, useState } from "react";
import {
  completeTodos,
  removeTodos,
  selectTodos,
  updateTodos,
  restoreTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

const DisplayTodos = () => {
  const { todos, deletedTodos } = useSelector(selectTodos);
  const [sort, setSort] = useState("active");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("deletedTodos", JSON.stringify(deletedTodos));
  }, [todos, deletedTodos]);

  return (
    <div className="displaytodos">
      <div className="buttons">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("active")}
        >
          Active
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("completed")}
        >
          Completed
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("deleted")}
        >
          Deleted
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("all")}
        >
          All
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>
          {todos.length > 0 && sort === "active"
            ? todos.map((item) => {
                return (
                  item.completed === false && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={removeTodos}
                      updateTodo={updateTodos}
                      completeTodo={completeTodos}
                    />
                  )
                );
              })
            : null}
          {/* for completed items */}
          {todos.length > 0 && sort === "completed"
            ? todos.map((item) => {
                return (
                  item.completed === true && (
                    <TodoItem
                      key={item.id}
                      item={item}
                      removeTodo={removeTodos}
                      updateTodo={updateTodos}
                      completeTodo={completeTodos}
                    />
                  )
                );
              })
            : null}
          {/* for deleted items */}
          {deletedTodos.length > 0 && sort === "deleted"
            ? deletedTodos.map((item) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    restoreTodo={restoreTodos}
                  />
                );
              })
            : null}
          {/* for all items */}
          {todos.length > 0 && sort === "all"
            ? todos.map((item) => {
                return (
                  <TodoItem
                    key={item.id}
                    item={item}
                    removeTodo={removeTodos}
                    updateTodo={updateTodos}
                    completeTodo={completeTodos}
                  />
                );
              })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default DisplayTodos;
