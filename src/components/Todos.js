import { motion } from "framer-motion";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  removeTodos,
  updateTodos,
  completedTodos,
} from "../redux/reducer";
import { GoPlus } from "react-icons/go";

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
    completed: (id) => dispatch(completedTodos(id)),
  };
};

const Todos = (props) => {
  const [todo, settodo] = useState("");
  // const inputRef = useRef(true);

  // const changeRef = () => {
  //   inputRef.current.disabled = false;
  // };

  const handleChange = (e) => {
    settodo(e.target.value);
  };
  const add = () => {
    //console.log("todo input", todo);
    if (todo === "") {
      alert("Input is Empty!");
    } else {
      props.addTodo({
        id: Math.floor(Math.random() * 1000),
        item: todo,
        completed: false,
      });
      settodo("");
    }
  };

  return (
    <div className="addTodos">
      <input
        className="todo-input"
        type="text"
        onChange={(e) => handleChange(e)}
        value={todo}
      />

      <motion.button
        className="add-btn"
        onClick={() => add()}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <GoPlus />
      </motion.button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
