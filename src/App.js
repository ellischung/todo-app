import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Todos from "./pages/Todos";
import TodoDetail from "./pages/Todo";
import TaskForm from "./pages/TaskForm";
import { TodoProvider } from "./contexts/todoContext";
import "./styles.css";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <TodoProvider>
        <Routes>
          <Route exact path="/" element={<Todos />} />
          <Route path="/todo/:id" element={<TodoDetail />} />
          <Route path="/add" element={<TaskForm />} />
        </Routes>
      </TodoProvider>
    </Router>
  );
}

export default App;