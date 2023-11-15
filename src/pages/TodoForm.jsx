import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";

function TodoForm() {
  const initialValues = {
    name: "",
    priority: 0,
    complexity: 0,
    isCompleted: false,
  };
  const [todo, setTodo] = useState(initialValues);
  const { addTodo } = useTodo();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.name) return;
    addTodo(todo);
    setTodo(initialValues);
    navigate("/");
  };

  return (
    <div>
      <h1>Add New Task</h1>
      <form onSubmit={handleSubmit}>
        <label>Task Name:</label>
        <input
          type="text"
          className="input"
          name="name"
          value={todo.name}
          onChange={handleChange}
        />
        <label>Set Priority Level:</label>
        <input
          type="text"
          className="input"
          name="priority"
          value={todo.priority}
          onChange={handleChange}
        />
        <label>Set Complexity Level:</label>
        <input
          type="text"
          className="input"
          name="complexity"
          value={todo.complexity}
          onChange={handleChange}
        />
        <button type="submit">Save Task</button>
      </form>
    </div>
  );
}

export default TodoForm;
