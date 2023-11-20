import Todo from "../components/Todo";
import SortDropdown from "../components/SortDropdown";
import Search from "../components/Search";
import Filter from "../components/Filter";
import PowerButton from "../components/PowerButton";
import { useTodo } from "../contexts/todoContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { selectedTodos, power, poweredTodo } = useTodo();

  return (
    <div className="todo-list">
      <Search />
      <SortDropdown />
      <Filter />
      {!power
        ? selectedTodos.map((todo) => <Todo key={todo.id} todo={todo} />)
        : poweredTodo && <Todo key={poweredTodo.id} todo={poweredTodo} />}
      <PowerButton />
      <Link to="/add">
        <button className="bg-secondary text-black font-bold border rounded-full px-3 py-2">
          Add Task
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
