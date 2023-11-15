import { Link, useParams } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";

function Todo() {
  const { id } = useParams();
  const { completeTodo, getTodo } = useTodo();
  const todo = getTodo(id);

  if (!todo) return <div>No todo found</div>;

  return (
    <div>
      <Link to={`/edit/${todo.id}`}>Edit Task</Link>
      <h1>{todo.name}</h1>
      <p>{todo.isCompleted ? "Completed" : "Incomplete"}</p>
      <p>Priority Level: {todo.priority}</p>
      <p>Complexity Level: {todo.complexity}</p>
      <button onClick={() => completeTodo(todo)}>Complete</button>
    </div>
  );
}

export default Todo;
