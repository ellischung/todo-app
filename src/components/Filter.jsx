import React from "react";
import { useTodo } from "../contexts/todoContext";

function Filter() {
  const { todos } = useTodo();

  // grab unique tags from all todos
  const tags = new Set();
  todos.forEach((todo) => {
    todo.tags.split(",").forEach((tag) => {
      tags.add(tag.trim());
    });
  });

  const handleChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div>
      <label>Filter</label>
      <select id="filter" onChange={handleChange}>
        <option value="default"></option>
        {[...tags].map((tag) => (
          <option value={tag}>{tag}</option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
