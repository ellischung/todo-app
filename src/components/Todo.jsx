import { useNavigate } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import { convertTime } from "../utils/convertTime";
import ProgressBar from "./ProgressBar";

function Todo({ todo }) {
  const { completeTodo } = useTodo();
  const navigate = useNavigate();

  let alertColor = "";
  if (todo.isCompleted) {
    alertColor = "green";
  } else if (todo.date) {
    const timeDiff = new Date(todo.date) - new Date().setHours(0, 0, 0, 0);
    if (timeDiff < 0) {
      alertColor = "red";
    } else if (timeDiff < 3 * 24 * 60 * 60 * 1000) {
      alertColor = "orange";
    }
  }

  const levelToText = (value) => {
    if (value <= 3) {
      return "Low";
    } else if (value <= 7) {
      return "Medium";
    }
    return "High";
  };

  const handleComplete = (e) => {
    e.stopPropagation();
    completeTodo(todo);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit/${todo.id}`);
  };

  return (
    <div
      className={`bg-card max-w-md mx-auto rounded-3xl border p-4 my-4 hover:bg-hover cursor-pointer min-h-[300px]`}
      style={{
        textDecoration: todo.isCompleted ? "line-through" : "",
        borderColor: alertColor,
      }}
      onClick={() => navigate(`/todo/${todo.id}`)}
    >
      <div>
        <p className="text-3xl font-bold" style={{ color: alertColor }}>
          {todo.name}
        </p>
        <p className="text-secondary pt-4">
          Priority Level: {levelToText(todo.priority)} ({todo.priority}/10)
        </p>
        <p className="text-secondary pt-1">
          Complexity Level: {levelToText(todo.complexity)} ({todo.complexity}
          /10)
        </p>
        <p className="text-secondary pt-1" style={{ color: alertColor }}>
          {todo.date && `Due Date: ${todo.date} ${convertTime(todo.time)}`}
        </p>
        <p className="pt-2">
          {todo.tags
            .split(",")
            .map((tag) =>
              tag ? (
                <span className=" bg-tag rounded-full text-sm px-2 py-1 m-1">
                  {tag.trim()}
                </span>
              ) : null
            )}
        </p>
      </div>
      <div className="flex justify-center pt-3">
        <button
          onClick={handleEdit}
          className="bg-secondary text-black text-2xl mr-2 w-10 h-10 rounded-full flex items-center justify-center"
        >
          &#9998;
        </button>
        <button
          onClick={handleComplete}
          className="bg-secondary text-black text-2xl ml-2 w-10 h-10 rounded-full flex items-center justify-center"
        >
          &#10003;
        </button>
      </div>
      <p className="pt-3">Task Completed: </p>
      <ProgressBar
        progress={
          todo.isCompleted
            ? 100
            : Math.floor(
                (todo.subtasks.filter((subtask) => subtask.isChecked).length /
                  todo.subtasks.length) *
                  100
              ) || 0
        }
      />
    </div>
  );
}

export default Todo;
