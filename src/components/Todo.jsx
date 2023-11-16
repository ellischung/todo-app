import { Link } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import { convertTime } from "../utils/convertTime";

function Todo({ todo }) {
  const { completeTodo, removeTodo } = useTodo();

  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <Link to={`/todo/${todo.id}`}>{todo.name}</Link>
      <div>
        <p>Priority Level: {todo.priority}</p>
        <p>Complexity Level: {todo.complexity}</p>
        <p>
          {todo.date && `Due Date: ${todo.date} at ${convertTime(todo.time)}`}
        </p>
        <p>{todo.tags.split(",").map((tag) => `(${tag.trim()})`)}</p>
      </div>
      <div>
        <button onClick={() => completeTodo(todo)}>Complete</button>
        <button onClick={() => removeTodo(todo)}>X</button>
      </div>
    </div>
  );
}

export default Todo;
