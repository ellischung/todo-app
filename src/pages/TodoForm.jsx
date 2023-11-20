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
    subtasks: [],
  };
  const [todo, setTodo] = useState(initialValues);
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedComplexity, setSelectedComplexity] = useState(null);
  const [subtask, setSubtask] = useState({ name: "", isChecked: false });
  const [subtasks, setSubtasks] = useState([]);
  const navigate = useNavigate();
  const todoExists = getTodo(id);

  if (todoExists && !todo.id) {
    setTodo({
      ...todoExists,
      subtasks: todoExists.subtasks,
    });
    setSubtasks(todoExists.subtasks);
    setSelectedPriority(todoExists.priority);
    setSelectedComplexity(todoExists.complexity);
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
    const updatedTodo = { ...todo, subtasks: subtasks };
    if (todoExists) {
      editTodo(updatedTodo);
    } else {
      addTodo(updatedTodo);
    }
    setTodo(initialValues);
    navigate("/");
  };

  const addSubtask = (e) => {
    e.preventDefault();
    if (!subtask.name) return;
    setSubtasks([...subtasks, subtask]);
    setSubtask({ name: "", isChecked: false });
  };

  const removeSubtask = (taskToRemove) => {
    setSubtasks(subtasks.filter((task) => task !== taskToRemove));
  };

  const editSubtask = (e, index) => {
    setSubtasks(
      subtasks.map((subtask, i) =>
        i === index ? { ...subtask, name: e.target.value } : subtask
      )
    );
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
        {levels.map((value) => (
          <button
            type="button"
            key={value}
            onClick={() => {
              handleChange({ target: { name: "priority", value } });
              setSelectedPriority(value);
            }}
            style={{
              backgroundColor: selectedPriority === value ? "blue" : "white",
            }}
          >
            {value}
          </button>
        ))}
        <label>Set Complexity Level:</label>
        {levels.map((value) => (
          <button
            type="button"
            key={value}
            onClick={() => {
              handleChange({ target: { name: "complexity", value } });
              setSelectedComplexity(value);
            }}
            style={{
              backgroundColor: selectedComplexity === value ? "blue" : "white",
            }}
          >
            {value}
          </button>
        ))}
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
        <form onSubmit={addSubtask}>
          <label>Add Subtask:</label>
          <input
            type="text"
            className="input"
            name="subtask"
            placeholder="Add a subtask.."
            value={subtask.name}
            onChange={(e) => setSubtask({ ...subtask, name: e.target.value })}
          />
          <button onClick={addSubtask}>+</button>
        </form>
        {subtasks.map((subtask, index) => (
          <div key={index}>
            <input
              value={subtask.name}
              onChange={(e) => editSubtask(e, index)}
            />
            <button type="button" onClick={() => removeSubtask(subtask)}>
              x
            </button>
          </div>
        ))}
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
