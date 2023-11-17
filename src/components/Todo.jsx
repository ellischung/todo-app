import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import { convertTime } from "../utils/convertTime";
import ProgressBar from "./ProgressBar";

function Todo({ todo }) {
  const { completeTodo } = useTodo();
  const [progress, setProgress] = useState(0);
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

  useEffect(() => {
    const totalCheckedSubtasks = todo.subtasks.filter(
      (subtask) => subtask.isChecked
    ).length;
    setProgress(
      Math.floor((totalCheckedSubtasks / todo.subtasks.length) * 100)
    );
  }, [todo.subtasks]);

  return (
    <div
      className="todo"
      style={{
        textDecoration: todo.isCompleted ? "line-through" : "",
        border: `1px solid ${alertColor}`,
        padding: "10px",
        margin: "10px 0",
      }}
    >
      <Link to={`/todo/${todo.id}`}>{todo.name}</Link>
      <div>
        <p>Priority Level: {todo.priority}</p>
        <p>Complexity Level: {todo.complexity}</p>
        <p style={{ color: alertColor }}>
          {todo.date && `Due Date: ${todo.date} ${convertTime(todo.time)}`}
        </p>
        <p>
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
        <button onClick={() => completeTodo(todo)}>
          {todo.isCompleted ? "Uncomplete" : "Complete"}
        </button>
        <button onClick={() => navigate(`/edit/${todo.id}`)}>Edit</button>
      </div>
      <p>Task Completed: </p>
      <ProgressBar progress={progress} />
    </div>
  );
}

export default Todo;
