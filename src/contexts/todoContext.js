import { createContext, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { uid } from "uid";

export const TodoContext = createContext();

export function useTodo() {
  const value = useContext(TodoContext);
  return value;
}

export const TodoProvider = ({ children }) => {
  const { id } = useParams();
  const initialValues = {
    name: "",
    priority: 0,
    complexity: 0,
    date: null,
    time: "",
    tags: "",
    isCompleted: false,
  };
  const [todo, setTodo] = useState(initialValues);
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setTodos] = useState(storedTodos);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("default");

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
  }, [todos]);

  const addTodo = (todo) => {
    const newTodos = [...todos, { ...todo, id: uid() }];
    setTodos(newTodos);
  };

  const completeTodo = (todo) => {
    setTodos((todos) =>
      todos.map((t) =>
        t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  const removeTodo = (todo) => {
    setTodos((todos) => todos.filter((t) => t.id !== todo.id));
  };

  const getTodo = (id) => {
    return todos.find((todo) => todo.id === id);
  };

  const editTodo = (editedTodo) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === editedTodo.id ? { ...todo, ...editedTodo } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        initialValues,
        todo,
        setTodo,
        todos,
        setSearch,
        filter,
        setFilter,
        sortBy,
        setSortBy,
        selectedTodos,
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
