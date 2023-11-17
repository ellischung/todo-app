import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import { convertTime } from "../utils/convertTime";
import ProgressBar from "../components/ProgressBar";

function Todo() {
  const { id } = useParams();
  const { getTodo, removeTodo } = useTodo();
  const todo = getTodo(id);
  const [progress, setProgress] = useState(0);
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
    const totalCheckedSubtasks = subtasks.filter(
      (subtask) => subtask.isChecked
    ).length;
    setProgress(Math.floor((totalCheckedSubtasks / subtasks.length) * 100));
  }, [subtasks]);

  const handleSubtask = (index) => {
    setSubtasks(
      [...subtasks].map((subtask, i) =>
        i === index ? { ...subtask, isChecked: !subtask.isChecked } : subtask
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
      <Link to={`/edit/${todo.id}`}>Edit Task</Link>
      <h1>{todo.name}</h1>
      <p>{todo.isCompleted ? "Completed" : "Incomplete"}</p>
      <p>Priority Level: {todo.priority}</p>
      <p>Complexity Level: {todo.complexity}</p>
      <p style={{ color: alertColor }}>
        {todo.date && `Due Date: ${todo.date} ${convertTime(todo.time)}`}
      </p>
      <p>{todo.tags.split(",").map((tag) => `(${tag.trim()})`)}</p>
      <p>Task Progress:</p>
      <ProgressBar progress={progress} />
      {subtasks.map((subtask, index) => (
        <div
          style={{
            textDecoration: subtask.isChecked ? "line-through" : "",
          }}
        >
          {subtask.name}
          <button
            onClick={() => {
              handleSubtask(index);
            }}
          >
            Check
          </button>
        </div>
      ))}
      <button onClick={repeatTask}>Repeat Task</button>
      <button onClick={() => removeTodo(todo)}>X</button>
    </div>
  );
}

export default Todo;
