import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Todo from "./pages/Todo";
import TodoForm from "./pages/TodoForm";
import { TodoProvider } from "./contexts/todoContext";
import "./App.css";

function App() {
  return (
    <Router>
      <TodoProvider>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/todo/:id" element={<Todo />} />
          <Route path="/add" element={<TodoForm />} />
          <Route path="/edit/:id" element={<TodoForm />} />
        </Routes>
      </TodoProvider>
    </Router>
  );
}

export default App;
