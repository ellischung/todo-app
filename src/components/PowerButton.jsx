import React from "react";
import { useTodo } from "../contexts/todoContext";
import { motion } from "framer-motion";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

function PowerButton() {
  const { power, setPower, createPoweredTodo } = useTodo();

  const handleClick = () => {
    setPower(!power);
    createPoweredTodo();
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className={`font-bold border-4 rounded-full p-3 ${
        power ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <PowerSettingsNewIcon style={{ fontSize: "80px" }} />
    </motion.button>
  );
}

export default PowerButton;
