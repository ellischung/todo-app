import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";

function TaskForm() {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState(0);
  const [complexity, setComplexity] = useState(0);
  const { addTodo } = useTodo();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    addTodo(name);
    setName("");
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Set Priority Level:</label>
        <input
          type="text"
          className="input"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <label>Set Complexity Level:</label>
        <input
          type="text"
          className="input"
          value={complexity}
          onChange={(e) => setComplexity(e.target.value)}
        />
        <button type="submit">Save Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
