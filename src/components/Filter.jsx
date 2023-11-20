import React from "react";
import { useTodo } from "../contexts/todoContext";

function Filter() {
  const { todos, filter, setFilter } = useTodo();
  const tags = new Set();

  todos.forEach((todo) => {
    todo.tags.split(",").forEach((tag) => {
      tags.add(tag.trim());
    });
  });

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <label>Filter</label>
      <select id="filter" defaultValue={filter} onChange={handleChange}>
        <option value="">None</option>
        {[...tags].map((tag) => (
          <option value={tag}>{tag}</option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
