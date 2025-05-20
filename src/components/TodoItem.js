import { motion } from "framer-motion";
import React, { useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";
import { FaFlag } from "react-icons/fa";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo, updatePriority } = props;

  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const update = (id, value, e) => {
    if (e.which === 13) {
      //here 13 is key code for enter key
      updateTodo({ id, item: value });
      inputRef.current.disabled = true;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ff4444';
      case 'medium':
        return '#ffbb33';
      case 'low':
        return '#00C851';
      default:
        return '#ffbb33';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return 'Medium';
    }
  };

  return (
    <motion.li
      initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
      animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      whileHover={{
        scale: 0.9,
        transition: { type: "spring", duration: 0.1 },
      }}
      exit={{
        x: "-60vw",
        scale: [1, 0],
        transition: { duration: 0.5 },
        backgroundColor: "rgba(255,0,0,1)",
      }}
      key={item.id}
      className="card"
      style={{
        borderLeft: `4px solid ${getPriorityColor(item.priority)}`
      }}
    >
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item}
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
      />
      <div className="btns">
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeFocus()}
        >
          {" "}
          <AiFillEdit />{" "}
        </motion.button>
        {item.completed === false && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ color: "green" }}
            onClick={() => completeTodo(item.id)}
          >
            <IoCheckmarkDoneSharp />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={() => removeTodo(item.id)}
        >
          {" "}
          <IoClose />
        </motion.button>
        <motion.div
          className="priority-selector"
          whileHover={{ scale: 1.1 }}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          <button
            style={{
              color: getPriorityColor(item.priority),
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            <FaFlag />
          </button>
          <div className="priority-dropdown">
            <button
              onClick={() => updatePriority({ id: item.id, priority: 'high' })}
              style={{ color: '#ff4444' }}
            >
              High
            </button>
            <button
              onClick={() => updatePriority({ id: item.id, priority: 'medium' })}
              style={{ color: '#ffbb33' }}
            >
              Medium
            </button>
            <button
              onClick={() => updatePriority({ id: item.id, priority: 'low' })}
              style={{ color: '#00C851' }}
            >
              Low
            </button>
          </div>
        </motion.div>
      </div>
      {item.completed && <span className="completed">done</span>}
      <span className="priority-badge" style={{ backgroundColor: getPriorityColor(item.priority) }}>
        {getPriorityText(item.priority)}
      </span>
    </motion.li>
  );
};

export default TodoItem;
