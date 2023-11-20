import React from "react";
import { useTodo } from "../contexts/todoContext";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

function PowerButton() {
  const { power, setPower } = useTodo();

  const handleClick = () => {
    setPower(!power);
  };

  return (
    <div className="pt-9 pb-3">
      <button
        className="font-bold border-4 rounded-full p-3"
        onClick={handleClick}
        style={{ borderColor: power ? "green" : "red" }}
      >
        <PowerSettingsNewIcon
          style={{ fontSize: "80px", color: power ? "green" : "red" }}
        />
      </button>
    </div>
  );
}

export default PowerButton;
