import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/utils";
import { convertTime, levelToText } from "../utils/utils";
import ProgressBar from "../components/ProgressBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RepeatIcon from "@mui/icons-material/Repeat";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

function Todo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTodo, removeTodo, editTodo } = useTodo();
  const todo = getTodo(id);
  const [subtasks, setSubtasks] = useState(todo.subtasks);

  if (!todo) return <div>No todo found</div>;

  useEffect(() => {
    editTodo({ ...todo, subtasks: subtasks });
  }, [subtasks]);

  const handleSubtask = (id) => {
    setSubtasks(
      [...subtasks].map((subtask) =>
        subtask.id === id
          ? { ...subtask, isChecked: !subtask.isChecked }
          : subtask
      )
    );
  };

  const repeatTask = () => {
    setSubtasks(
      [...subtasks].map((subtask) => ({ ...subtask, isChecked: false }))
    );
  };

  return (
    <motion.div
      {...fadeIn}
      className="bg-card max-w-xl mx-auto rounded-3xl border p-4 my-8"
    >
      <div className="flex items-center justify-between">
        <button className="w-10 h-10" onClick={() => navigate("/")}>
          <ArrowBackIosIcon />
        </button>
        <h1 className="text-3xl font-bold">{todo.name}</h1>
        <button
          className="bg-secondary text-black w-10 h-10 rounded-full flex items-center justify-center"
          onClick={() => navigate(`/edit/${todo.id}`)}
        >
          <EditIcon />
        </button>
      </div>
      <p className="text-secondary pt-4">
        &#128197; Due Date:{" "}
        {todo.date ? `${todo.date} ${convertTime(todo.time)}` : "Not specified"}
      </p>
      <p className="text-secondary pt-1">
        <span className="text-black text-xl">&uarr; </span> Priority Level:{" "}
        {todo.priority
          ? `${levelToText(todo.priority)} (${todo.priority}/10)`
          : "Not specified"}
      </p>
      <p className="text-secondary pt-1">
        <span className="text-black text-xl">&oplus; </span>Complexity Level:{" "}
        {todo.complexity
          ? `${levelToText(todo.complexity)} (${todo.complexity}/10)`
          : "Not specified"}
      </p>
      <p className="pt-8">Task Progress:</p>
      <ProgressBar
        progress={
          Math.floor(
            (subtasks.filter((subtask) => subtask.isChecked).length /
              subtasks.length) *
              100
          ) || 0
        }
      />
      <p className="pt-2">Checklist for subtasks:</p>
      {subtasks.map((subtask) => (
        <div
          key={subtask.id}
          className={`flex items-center mx-auto my-2 p-1 border rounded-lg w-2/3 transition duration-500 ease-in-out ${
            subtask.isChecked ? "line-through bg-green-500" : ""
          }`}
        >
          <div className="flex-grow">{subtask.name}</div>
          <button
            className="flex items-center justify-center"
            onClick={() => {
              handleSubtask(subtask.id);
            }}
          >
            {subtask.isChecked ? (
              <CheckBoxIcon />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )}
          </button>
        </div>
      ))}
      <div className="flex justify-center pt-8">
        <button
          className="bg-red-500 mr-2 p-2 rounded-md flex items-center justify-center"
          onClick={() => removeTodo(todo)}
        >
          <DeleteIcon />
          Delete Task
        </button>
        <button
          className="bg-blue-500 ml-2 p-2 rounded-md flex items-center justify-center"
          onClick={repeatTask}
        >
          <RepeatIcon />
          Repeat Tasks
        </button>
      </div>
    </motion.div>
  );
}

export default Todo;
