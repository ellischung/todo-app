import { useNavigate } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import { convertTime } from "../utils/convertTime";
import ProgressBar from "./ProgressBar";

function Todo({ todo }) {
  const { completeTodo } = useTodo();
  const navigate = useNavigate();

  let alertColor = "";
  if (todo.date) {
    const timeDiff = new Date(todo.date) - new Date().setHours(0, 0, 0, 0);
    if (timeDiff < 0) {
      alertColor = "red";
    } else if (timeDiff < 3 * 24 * 60 * 60 * 1000) {
      alertColor = "orange";
    }
  }

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
      className={`bg-card max-w-md mx-auto rounded-3xl border p-4 my-4 hover:bg-hover cursor-pointer`}
      style={{
        textDecoration: todo.isCompleted ? "line-through" : "",
        borderColor: alertColor,
      }}
      onClick={() => navigate(`/todo/${todo.id}`)}
    >
      <div>
        <p className="text-3xl font-bold">{todo.name}</p>
        <p className="text-secondary pt-4">Priority Level: {todo.priority}</p>
        <p className="text-secondary pt-1">
          Complexity Level: {todo.complexity}
        </p>
        <p className="text-secondary pt-1" style={{ color: alertColor }}>
          {todo.date && `Due Date: ${todo.date} ${convertTime(todo.time)}`}
        </p>
        <p className="pt-1">
          {todo.tags
            .split(",")
            .map(
              (tag) =>
                tag && (
                  <span style={{ margin: "5px", border: "1px solid" }}>
                    {tag.trim()}
                  </span>
                )
            )}
        </p>
      </div>
      <div>
        <button onClick={handleComplete}>
          {todo.isCompleted ? "Uncomplete" : "Complete"}
        </button>
        <button onClick={handleEdit}>Edit</button>
      </div>
      <p>Task Completed: </p>
      <ProgressBar
        progress={
          Math.floor(
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
