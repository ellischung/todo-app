import React, { useState } from "react";
import { useTodo } from "../contexts/todoContext";

function SortDropdown() {
  const { sortBy, setSortBy } = useTodo();
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "Default", value: "default" },
    { label: "Ascending Priority", value: "+priority" },
    { label: "Descending Priority", value: "-priority" },
    { label: "Ascending Complexity", value: "+complexity" },
    { label: "Descending Complexity", value: "-complexity" },
    { label: "Ascending Date", value: "+date" },
    { label: "Descending Date", value: "-date" },
  ];

  const handleChange = (value) => {
    setSortBy(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-black pb-3 mr-4 w-full sm:w-[20%]">
      <div
        className="bg-secondary font-bold rounded-full border p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Sort
      </div>
      {isOpen && (
        <div className="bg-secondary absolute border mt-1 rounded w-full text-left z-50">
          {options.map((option) => (
            <div key={option.value} className="p-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={() => handleChange(option.value)}
                />
                <span>{option.label}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortDropdown;
