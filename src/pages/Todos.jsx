import Todo from "../components/Todo";
import SortDropdown from "../components/SortDropdown";
import Filter from "../components/Filter";
import { useTodo } from "../contexts/todoContext";
import { Link } from "react-router-dom";

const Todos = () => {
  const { sortedTodos } = useTodo();

  return (
    <div className="todo-list">
      <Filter />
      <SortDropdown />
      {sortedTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      <Link to="/add">
        <button>(+) Add Task</button>
      </Link>
    </div>
  );
};

export default Todos;
