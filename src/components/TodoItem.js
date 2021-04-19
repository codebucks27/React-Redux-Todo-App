import { motion } from "framer-motion";
import React, { useRef } from "react";

import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, todoCompleted } = props;
  const inputRef = useRef(false);
  console.log(inputRef);

  const changeFunc = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const update = (id, value, e) => {
    //console.log("id is", id, "value is", value);
    //console.log(e.which);
    if (e.which === 13) {
      updateTodo({ id, item: value });
      inputRef.current.disabled = true;
    }
  };

  const completed = (id) => {
    todoCompleted(id);
  };

  return (
    <motion.li
      key={item.id}
      className="card"
      exit={{
        x: "-60vw",
        scale: [1, 0],
        backgroundColor: "red",
        transition: { duration: 0.5 },
      }}
      initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
      animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      whileHover={{ scale: 0.9, transition: { type: "spring", duration: 0.1 } }}
    >
      <textarea
        ref={inputRef}
        defaultValue={item.item}
        disabled={inputRef}
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
      />
      <div className="btns">
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeFunc()}
        >
          <AiFillEdit />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => completed(item.id)}
        >
          <IoCheckmarkDoneSharp />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            removeTodo(item.id);
          }}
        >
          <IoClose />
        </motion.button>
      </div>
    </motion.li>
  );
};

export default TodoItem;
