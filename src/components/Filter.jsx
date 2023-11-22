import React, { useState } from "react";
import { useTodo } from "../contexts/todoContext";

function Filter() {
  const { filter, setFilter, tags } = useTodo();
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="p-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={filter === ""}
                onChange={() => handleChange("")}
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
