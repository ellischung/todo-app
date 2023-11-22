import Todo from "../components/Todo";
import SortDropdown from "../components/SortDropdown";
import Search from "../components/Search";
import Filter from "../components/Filter";
import PowerButton from "../components/PowerButton";
import { useTodo } from "../contexts/todoContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { variants } from "../utils/utils";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const HomePage = () => {
  const { selectedTodos, power, poweredTodo } = useTodo();
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <Search />
      <div className="flex justify-center pb-3">
        <SortDropdown />
        <Filter />
      </div>
      <div className="flex justify-center pt-6 pb-2 space-x-6">
        <PowerButton />
        <button onClick={() => navigate("/add")}>
          <AddCircleIcon style={{ fontSize: "100px" }} />
        </button>
      </div>
      {!power
        ? selectedTodos.map((todo, index) => (
            <motion.div
              key={todo.id}
              initial={variants.initial}
              animate={variants.animate}
              transition={{ delay: index * 0.2 }}
            >
              <Todo todo={todo} />
            </motion.div>
          ))
        : poweredTodo && (
            <motion.div initial={variants.initial} animate={variants.animate}>
              <Todo key={poweredTodo.id} todo={poweredTodo} />
            </motion.div>
          )}
    </div>
  );
};

export default HomePage;
