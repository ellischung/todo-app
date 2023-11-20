import React, { useState } from "react";
import { useTodo } from "../contexts/todoContext";

function Filter() {
  const { todos, filter, setFilter } = useTodo();
  const [isOpen, setIsOpen] = useState(false);
  const tags = new Set();

  todos.forEach((todo) => {
    const todoTags = todo.tags.trim();
    if (todoTags !== "") {
      todoTags.split(",").forEach((tag) => {
        tags.add(tag.trim());
      });
    }
  });

  const handleChange = (value) => {
    setFilter(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-black w-full sm:w-44 ml-4">
      <div
        className="bg-secondary font-bold rounded-full border p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Filter
      </div>
      {isOpen && (
        <div className="bg-secondary absolute border mt-1 rounded w-full text-left">
          <div key="" className="p-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value=""
                checked={filter === ""}
                onChange={() => handleChange("")}
                className="form-radio"
              />
              <span>None</span>
            </label>
          </div>
          {[...tags].map((tag) => (
            <div key={tag} className="p-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={tag}
                  checked={filter === tag}
                  onChange={() => handleChange(tag)}
                />
                <span>{tag}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Filter;
