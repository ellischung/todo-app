import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";

export const TodoContext = createContext();

export function useTodo() {
  const value = useContext(TodoContext);
  return value;
}

export const TodoProvider = ({ children }) => {
  const navigate = useNavigate();
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(storedTodos);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [tags, setTags] = useState(new Set());
  const [power, setPower] = useState(false);
  const [poweredTodo, setPoweredTodo] = useState(null);

  const selectedTodos = [...todos]
    .filter((todo) => todo.name.includes(search) && todo.tags.includes(filter))
    .sort((a, b) => {
      switch (sortBy) {
        case "+priority":
          return a.priority - b.priority;
        case "-priority":
          return b.priority - a.priority;
        case "+complexity":
          return a.complexity - b.complexity;
        case "-complexity":
          return b.complexity - a.complexity;
        case "+date":
          return new Date(a.date) - new Date(b.date);
        case "-date":
          return new Date(b.date) - new Date(a.date);
        default:
          return 0;
      }
    });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    createTags();
    createPoweredTodo(); // recall when todo completes, to move on to next todo
  }, [todos]);

  const createTags = () => {
    const todoTags = new Set();
    todos.forEach((todo) => {
      todo.tags &&
        todo.tags.split(",").forEach((tag) => {
          todoTags.add(tag.trim());
        });
    });
    setTags(todoTags);
  };

  const createPoweredTodo = () => {
    const todo = [...todos]
      .filter((todo) => !todo.isCompleted)
      .sort(
        (a, b) => b.priority + b.complexity - (a.priority + a.complexity)
      )[0];
    setPoweredTodo(todo);
  };

  const addTodo = (todo) => {
    setTodos([{ ...todo, id: uid() }, ...todos]);
  };

  const completeTodo = (todo) => {
    setTodos((todos) =>
      todos
        .map((t) =>
          t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
        )
        .sort((a, b) => {
          if (a.isCompleted && !b.isCompleted) return 1;
          if (!a.isCompleted && b.isCompleted) return -1;
          return 0;
        })
    );
  };

  const removeTodo = (todo) => {
    setTodos((todos) => todos.filter((t) => t.id !== todo.id));
    if (power) setPower(!power);
    navigate("/");
  };

  const getTodo = (id) => {
    return todos.find((todo) => todo.id === id);
  };

  const editTodo = (editedTodo) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setSearch,
        filter,
        setFilter,
        sortBy,
        setSortBy,
        tags,
        power,
        setPower,
        selectedTodos,
        poweredTodo,
        createPoweredTodo,
        addTodo,
        completeTodo,
        removeTodo,
        getTodo,
        editTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
