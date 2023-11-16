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
    isCompleted: false,
  };
  const [todo, setTodo] = useState(initialValues);
  const [todos, setTodos] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");

  const sortingFunctions = {
    default: (a, b) => 0,
    "+priority": (a, b) => a.priority - b.priority,
    "-priority": (a, b) => b.priority - a.priority,
    "+complexity": (a, b) => a.complexity - b.complexity,
    "-complexity": (a, b) => b.complexity - a.complexity,
    "+date": (a, b) => a.date - b.date,
    "-date": (a, b) => b.date - a.date,
  };

  const sortedTodos = [...todos].sort(sortingFunctions[sortBy]);

  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  //   setTodos(storedTodos);
  //   console.log("Data loaded from local storage:", storedTodos);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  //   console.log("Data saved to local storage:", todos);
  // }, [todos]);

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

  const filterTodos = (input) => {
    setTodos((todos) => todos.filter((todo) => todo.name === input));
  };

  return (
    <TodoContext.Provider
      value={{
        initialValues,
        todo,
        setTodo,
        sortBy,
        setSortBy,
        todos,
        sortedTodos,
        search,
        setSearch,
        addTodo,
        completeTodo,
        removeTodo,
        getTodo,
        editTodo,
        filterTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
