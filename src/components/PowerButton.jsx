import React from "react";
import { useTodo } from "../contexts/todoContext";
import { motion } from "framer-motion";
import variants from "../utils/animationVariants";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

function PowerButton() {
  const { power, setPower, selectedTodos, createPoweredTodo } = useTodo();

  const handleClick = () => {
    setPower(!power);
    createPoweredTodo();
  };

  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      transition={{ delay: selectedTodos.length * 0.2 }}
      className="pt-9 pb-5"
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="font-bold border-4 rounded-full p-3"
        style={{ backgroundColor: power ? "green" : "red" }}
      >
        <PowerSettingsNewIcon style={{ fontSize: "80px" }} />
      </motion.button>
    </motion.div>
  );
}

export default PowerButton;
