import React from "react";
import { useTodo } from "../contexts/todoContext";

function PowerButton() {
  const { power, setPower } = useTodo();

  const handleClick = () => {
    setPower(!power);
  };

  return (
    <div className="pt-6 pb-3">
      <button
        className="bg-secondary text-black font-bold border rounded-full px-3 py-2"
        onClick={handleClick}
      >
        {power ? "&#10003;" : "POWER OFF"}
      </button>
    </div>
  );
}

export default PowerButton;
