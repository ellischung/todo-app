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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
          (+) Add Task
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
