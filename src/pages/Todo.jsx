import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import { convertTime, determineColor, levelToText } from "../utils/utils";
import ProgressBar from "../components/ProgressBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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
    <div className="bg-card max-w-xl mx-auto rounded-3xl border p-4 my-8">
      <div className="flex items-center relative">
        <button className="absolute left-0" onClick={() => navigate("/")}>
          <ArrowBackIosIcon />
        </button>
        <h1 className="text-3xl font-bold w-full text-center">{todo.name}</h1>
      </div>
      <p
        className="text-secondary pt-4"
        style={{ color: determineColor(todo.date) }}
      >
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
      <p className="pt-2">Task Progress:</p>
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
          style={{
            textDecoration: subtask.isChecked ? "line-through" : "",
          }}
        >
          {subtask.name}
          <button
            onClick={() => {
              handleSubtask(subtask.id);
            }}
          >
            &#10003;
          </button>
        </div>
      ))}
      <br />
      <button onClick={() => navigate(`/edit/${todo.id}`)}>Edit Task</button>
      <button onClick={() => removeTodo(todo)}>Delete Task</button>
      <button onClick={repeatTask}>Repeat Task</button>
    </div>
  );
}

export default Todo;
