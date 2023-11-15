import { createContext, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { uid } from "uid";

export const TodoContext = createContext();

export function useTodo() {
  const value = useContext(TodoContext);
  return value;
}

export const TodoProvider = ({ children }) => {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);
  const [sortBy, setSortBy] = useState("default");

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
  return (
    <TodoContext.Provider
      value={{
        todos,
        sortedTodos,
        setSortBy,
        addTodo,
        completeTodo,
        removeTodo,
        getTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
