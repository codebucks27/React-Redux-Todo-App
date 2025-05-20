import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  removeTodos,
  updateTodos,
  clearCompleted,
  toggleAll,
  clearAll,
  updatePriority
} from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
    clearCompleted: () => dispatch(clearCompleted()),
    toggleAll: (completed) => dispatch(toggleAll(completed)),
    clearAll: () => dispatch(clearAll()),
    updatePriority: (obj) => dispatch(updatePriority(obj))
  };
};

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active");
  const [prioritySort, setPrioritySort] = useState("all");

  const handleToggleAll = () => {
    const allCompleted = props.todos.every(todo => todo.completed);
    props.toggleAll(!allCompleted);
  };

  const getPriorityWeight = (priority) => {
    switch (priority) {
      case 'high':
        return 3;
      case 'medium':
        return 2;
      case 'low':
        return 1;
      default:
        return 2;
    }
  };

  const sortTodos = (todos) => {
    return [...todos].sort((a, b) => {
      if (prioritySort !== 'all') {
        if (a.priority !== prioritySort) return 1;
        if (b.priority !== prioritySort) return -1;
      }
      return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
    });
  };

  const renderTodos = (todos) => {
    const filteredTodos = todos.filter(todo => {
      if (sort === "active" && todo.completed) return false;
      if (sort === "completed" && !todo.completed) return false;
      if (prioritySort !== 'all' && todo.priority !== prioritySort) return false;
      return true;
    });

    const sortedTodos = sortTodos(filteredTodos);

    return sortedTodos.map((item) => (
      <TodoItem
        key={item.id}
        item={item}
        removeTodo={props.removeTodo}
        updateTodo={props.updateTodo}
        completeTodo={props.completeTodo}
        updatePriority={props.updatePriority}
      />
    ));
  };

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
          onClick={() => setSort("all")}
        >
          All
        </motion.button>
      </div>

      <div className="priority-filter">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setPrioritySort("all")}
          style={{
            backgroundColor: prioritySort === "all" ? "#4CAF50" : "#e0e0e0",
            color: prioritySort === "all" ? "white" : "black"
          }}
        >
          All
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setPrioritySort("high")}
          style={{
            backgroundColor: prioritySort === "high" ? "#ff4444" : "#e0e0e0",
            color: prioritySort === "high" ? "white" : "black"
          }}
        >
          High Priority
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setPrioritySort("medium")}
          style={{
            backgroundColor: prioritySort === "medium" ? "#ffbb33" : "#e0e0e0",
            color: prioritySort === "medium" ? "white" : "black"
          }}
        >
          Medium Priority
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setPrioritySort("low")}
          style={{
            backgroundColor: prioritySort === "low" ? "#00C851" : "#e0e0e0",
            color: prioritySort === "low" ? "white" : "black"
          }}
        >
          Low Priority
        </motion.button>
      </div>

      <div className="batch-actions">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleAll}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            margin: "5px"
          }}
        >
          Toggle All
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={props.clearCompleted}
          style={{
            backgroundColor: "#f44336",
            color: "white",
            margin: "5px"
          }}
        >
          Clear Completed
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (window.confirm("Are you sure you want to clear all tasks?")) {
              props.clearAll();
            }
          }}
          style={{
            backgroundColor: "#ff9800",
            color: "white",
            margin: "5px"
          }}
        >
          Clear All
        </motion.button>
      </div>

      <ul>
        <AnimatePresence>
          {props.todos.length > 0 && renderTodos(props.todos)}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
