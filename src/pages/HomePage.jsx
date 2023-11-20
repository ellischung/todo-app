import Todo from "../components/Todo";
import SortDropdown from "../components/SortDropdown";
import Search from "../components/Search";
import Filter from "../components/Filter";
import PowerButton from "../components/PowerButton";
import { useTodo } from "../contexts/todoContext";
import { useNavigate } from "react-router-dom";
import AddTaskIcon from "@mui/icons-material/AddTask";

const HomePage = () => {
  const { selectedTodos, power, poweredTodo } = useTodo();
  const navigate = useNavigate();

  return (
    <div className="todo-list">
      <Search />
      <SortDropdown />
      <Filter />
      {!power
        ? selectedTodos.map((todo) => <Todo key={todo.id} todo={todo} />)
        : poweredTodo && <Todo key={poweredTodo.id} todo={poweredTodo} />}
      <PowerButton />
      <button onClick={() => navigate("/add")}>
        <AddTaskIcon style={{ fontSize: "124px" }} />
      </button>
    </div>
  );
};

export default HomePage;
