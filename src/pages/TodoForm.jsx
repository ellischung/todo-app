import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import { uid } from "uid";

function TodoForm() {
  const { id } = useParams();
  const { getTodo, addTodo, editTodo } = useTodo();
  const todoExists = getTodo(id);
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
  const [todo, setTodo] = useState(
    todoExists
      ? { ...todoExists, subtasks: todoExists.subtasks }
      : initialValues
  );
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [subtask, setSubtask] = useState({
    id: uid(),
    name: "",
    isChecked: false,
  });
  const [subtasks, setSubtasks] = useState(
    todoExists ? todoExists.subtasks : []
  );
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleLevelChange = (name, value) => {
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
    setSubtask({ id: uid(), name: "", isChecked: false });
  };

  const removeSubtask = (taskToRemove) => {
    setSubtasks(subtasks.filter((task) => task !== taskToRemove));
  };

  const editSubtask = (e, id) => {
    setSubtasks(
      subtasks.map((prevSubtask) =>
        prevSubtask.id === id
          ? { ...prevSubtask, name: e.target.value }
          : prevSubtask
      )
    );
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>&larr;</button>
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
            className="text-black"
            type="button"
            key={value}
            onClick={() => handleLevelChange("priority", value)}
            style={{
              backgroundColor: todo.priority === value ? "blue" : "white",
            }}
          >
            {value}
          </button>
        ))}
        <label>Set Complexity Level:</label>
        {levels.map((value) => (
          <button
            className="text-black"
            type="button"
            key={value}
            onClick={() => handleLevelChange("complexity", value)}
            style={{
              backgroundColor: todo.complexity === value ? "blue" : "white",
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
        {subtasks.map((subtask) => (
          <div key={subtask.id}>
            <input
              value={subtask.name}
              onChange={(e) => editSubtask(e, subtask.id)}
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
