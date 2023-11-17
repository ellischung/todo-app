import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";

function TodoForm() {
  const { id } = useParams();
  const { getTodo, addTodo, editTodo } = useTodo();
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
  const navigate = useNavigate();
  const todoExists = getTodo(id);

  if (todoExists && !todo.id) {
    setTodo(todoExists);
  }

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
    if (todoExists) {
      const updatedTodo = { id: id, ...todo };
      editTodo(updatedTodo);
    } else {
      addTodo(todo);
    }
    setTodo(initialValues);
    navigate("/");
  };

  return (
    <div>
      <h1>{todoExists ? "Edit Task" : "Add New Task"}</h1>
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
        <label>Set Due Date:</label>
        <input
          type="date"
          className="input"
          name="date"
          value={todo.date}
          onChange={handleChange}
        />
        <label>Set Time:</label>
        <input
          type="time"
          className="input"
          name="time"
          value={todo.time}
          onChange={handleChange}
        />
        <label>Add Tags:</label>
        <input
          type="text"
          className="input"
          name="tags"
          value={todo.tags}
          onChange={handleChange}
        />
        <button type="submit">
          {todoExists ? "Update Task" : "Save Task"}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
