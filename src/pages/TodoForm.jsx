import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import { uid } from "uid";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/utils";
import { variants } from "../utils/utils";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

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

  const handleSubtask = (e) => {
    setSubtask((prevSubtask) => ({
      ...prevSubtask,
      name: e.target.value,
    }));
  };

  const handleEditSubtask = (e, id) => {
    setSubtasks(
      subtasks.map((prevSubtask) =>
        prevSubtask.id === id
          ? { ...prevSubtask, name: e.target.value }
          : prevSubtask
      )
    );
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

  return (
    <motion.div
      {...fadeIn}
      className="bg-card mx-auto rounded-3xl border p-4 my-8 w-[80%] sm:w-[40%]"
    >
      <div className="flex items-center justify-center relative">
        <button className="absolute left-0" onClick={() => navigate("/")}>
          <ArrowBackIosIcon />
        </button>
        <h1 className="text-3xl font-bold">
          {todoExists ? "Edit Task" : "Add New Task"}
        </h1>
      </div>
      <form className="flex flex-col text-left pt-8" onSubmit={handleSubmit}>
        <label>Task Name:</label>
        <input
          className="rounded-2xl p-1"
          type="text"
          name="name"
          placeholder="Enter a task name..."
          value={todo.name}
          onChange={handleChange}
        />
        <label className="pt-4">Set Priority Level:</label>
        <div className="flex">
          {levels.map((value, index) => (
            <motion.label
              initial={variants.initial}
              animate={variants.animate}
              transition={{ delay: index * 0.08 }}
              className={`rounded-full mx-auto w-10 h-10 flex items-center justify-center cursor-pointer ${
                todo.priority == value
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
              key={index}
            >
              <input
                type="radio"
                name="priority"
                className="hidden"
                value={value}
                checked={todo.priority == value ? true : false}
                onChange={handleChange}
              />
              {value}
            </motion.label>
          ))}
        </div>
        <label className="pt-4">Set Complexity Level:</label>
        <div className="flex">
          {levels.map((value, index) => (
            <motion.label
              initial={variants.initial}
              animate={variants.animate}
              transition={{ delay: index * 0.08 }}
              className={`rounded-full mx-auto w-10 h-10 flex items-center justify-center cursor-pointer ${
                todo.complexity == value
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
              key={index}
            >
              <input
                type="radio"
                name="complexity"
                className="hidden"
                value={value}
                checked={todo.complexity == value ? true : false}
                onChange={handleChange}
              />
              {value}
            </motion.label>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row pt-4">
          <label>Set Due Date:</label>
          <input
            type="date"
            className="rounded-full p-2 sm:mx-2"
            name="date"
            value={todo.date}
            onChange={handleChange}
          />
          <label>Set Time:</label>
          <input
            type="time"
            className="rounded-full p-2 sm:mx-2"
            name="time"
            value={todo.time}
            onChange={handleChange}
          />
        </div>
        <form className="flex flex-col text-left pt-4" onSubmit={addSubtask}>
          <label>Add Subtask:</label>
          <div className="flex items-center">
            <input
              type="text"
              className="rounded-full p-2 mr-2 mb-2 w-[95%]"
              name="subtask"
              placeholder="Add a subtask..."
              value={subtask.name}
              onChange={handleSubtask}
            />
            <button
              className="flex items-center justify-center"
              onClick={addSubtask}
            >
              <AddIcon />
            </button>
          </div>
        </form>
        {subtasks.map((subtask) => (
          <div className="flex items-center" key={subtask.id}>
            <input
              className="rounded-full p-2 mr-2 mb-2 w-[95%]"
              value={subtask.name}
              onChange={(e) => handleEditSubtask(e, subtask.id)}
            />
            <button
              className="flex items-center justify-center"
              type="button"
              onClick={() => removeSubtask(subtask)}
            >
              <ClearIcon />
            </button>
          </div>
        ))}
        <label className="pt-2">Add Tags:</label>
        <input
          type="text"
          className="rounded-full p-2"
          name="tags"
          placeholder="Tag1, Tag2, Tag3, ..."
          value={todo.tags}
          onChange={handleChange}
        />
        <div className="flex justify-center pt-8">
          <button
            className="bg-blue-500 ml-2 p-2 rounded-md flex items-center justify-center"
            type="submit"
          >
            {todoExists ? "Update Task" : "Save Task"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default TodoForm;
