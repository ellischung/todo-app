import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";
import { useTodo } from "../contexts/todoContext";
import { Link } from "react-router-dom";

const Todos = () => {
  const { todos } = useTodo();
  return (
    <div className="todo-list">
      <Link to="/add">
        <button>+</button>
      </Link>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default Todos;
