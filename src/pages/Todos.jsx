import Todo from "../components/Todo";
import SortDropdown from "../components/SortDropdown";
import Search from "../components/Search";
import Filter from "../components/Filter";
import { useTodo } from "../contexts/todoContext";
import { Link } from "react-router-dom";

const Todos = () => {
  const { selectedTodos } = useTodo();

  return (
    <div className="todo-list">
      <Search />
      <SortDropdown />
      <Filter />
      {selectedTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      <Link to="/add">
        <button>(+) Add Task</button>
      </Link>
    </div>
  );
};

export default Todos;
