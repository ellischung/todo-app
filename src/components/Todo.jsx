import { useNavigate } from "react-router-dom";
import { useTodo } from "../contexts/todoContext";
import { convertTime, determineColor, levelToText } from "../utils/utils";
import ProgressBar from "./ProgressBar";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

function Todo({ todo }) {
  const { completeTodo } = useTodo();
  const navigate = useNavigate();

  const handleComplete = (e) => {
    e.stopPropagation();
    completeTodo(todo);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit/${todo.id}`);
  };

  return (
    <div
      className={`bg-card mx-auto rounded-3xl border p-4 my-8 transition duration-500 ease-in-out hover:bg-hover cursor-pointer w-[80%] sm:w-[40%] ${
        todo.isCompleted ? "line-through" : ""
      }`}
      style={{ backgroundColor: todo.isCompleted ? "green" : "" }}
      onClick={() => navigate(`/todo/${todo.id}`)}
    >
      <div>
        <p className={`text-3xl font-bold ${determineColor(todo)}`}>
          {todo.name}
        </p>
        <p className={`pt-4 ${determineColor(todo)}`}>
          &#128197; Due Date:{" "}
          {todo.date ? `${todo.date} ${convertTime(todo.time)}` : "No Set Date"}
        </p>
        <p className="pt-1">
          <span className="text-black text-xl">&uarr; </span> Priority Level:{" "}
          {todo.priority
            ? `${levelToText(todo.priority)} (${todo.priority}/10)`
            : `${levelToText(0)} (0/10)`}
        </p>
        <p className="pt-1">
          <span className="text-black text-xl">&oplus; </span>Complexity Level:{" "}
          {todo.complexity
            ? `${levelToText(todo.complexity)} (${todo.complexity}/10)`
            : `${levelToText(0)} (0/10)`}
        </p>
        <p className="pt-2">
          {todo.tags &&
            todo.tags
              .split(",")
              .map((tag) =>
                tag ? (
                  <span className=" bg-tag rounded-full text-sm px-2 py-1 m-1">
                    {tag.trim()}
                  </span>
                ) : null
              )}
        </p>
      </div>
      <div className="flex justify-center pt-3">
        <button
          onClick={handleEdit}
          className="bg-secondary text-black mr-2 w-10 h-10 rounded-full flex items-center justify-center"
        >
          <EditIcon />
        </button>
        <button
          onClick={handleComplete}
          className="bg-secondary text-black ml-2 w-10 h-10 rounded-full flex items-center justify-center"
        >
          <CheckIcon />
        </button>
      </div>
      {todo.subtasks.length != 0 && (
        <div className="pt-3">
          <p>Task Completed: </p>
          <ProgressBar
            progress={
              Math.floor(
                (todo.subtasks.filter((subtask) => subtask.isChecked).length /
                  todo.subtasks.length) *
                  100
              ) || 0
            }
          />
        </div>
      )}
    </div>
  );
}

export default Todo;
