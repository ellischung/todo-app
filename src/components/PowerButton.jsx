import React from "react";
import { useTodo } from "../contexts/todoContext";
import { motion } from "framer-motion";
import variants from "../utils/animationVariants";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

function PowerButton() {
  const { power, setPower, selectedTodos } = useTodo();

  const handleClick = () => {
    setPower(!power);
  };

  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      transition={{ delay: selectedTodos.length * 0.2 }}
      className="pt-9 pb-3"
    >
      <button
        className="font-bold border-4 rounded-full p-3"
        onClick={handleClick}
        style={{ borderColor: power ? "green" : "red" }}
      >
        <PowerSettingsNewIcon
          style={{ fontSize: "80px", color: power ? "green" : "red" }}
        />
      </button>
    </motion.div>
  );
}

export default PowerButton;
