import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import { convertTime } from "../utils/convertTime";
import ProgressBar from "../components/ProgressBar";

function Todo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTodo, removeTodo, editTodo } = useTodo();
  const todo = getTodo(id);
  const [subtasks, setSubtasks] = useState(todo.subtasks);

  if (!todo) return <div>No todo found</div>;

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
    <div>
      <h1 className="text-3xl font-bold">{todo.name}</h1>
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
      <p>Task Progress:</p>
      <ProgressBar
        progress={
          Math.floor(
            (subtasks.filter((subtask) => subtask.isChecked).length /
              subtasks.length) *
              100
          ) || 0
        }
      />
      <p>Checklist for subtasks:</p>
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
