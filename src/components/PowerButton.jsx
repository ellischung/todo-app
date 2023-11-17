import React from "react";
import { useTodo } from "../contexts/todoContext";

function PowerButton() {
  const { power, setPower } = useTodo();

  const handleClick = () => {
    setPower(!power);
  };

  return (
    <div>
      <button onClick={handleClick}>{power ? "POWER ON" : "POWER OFF"}</button>
    </div>
  );
}

export default PowerButton;
