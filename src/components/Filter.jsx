import React from "react";
import { useTodo } from "../contexts/todoContext";

function Filter() {
  const { search, setSearch, filterTodos } = useTodo();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filterTodos(search);
  };

  return (
    <div>
      <label>Filter</label>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          name="filter"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default Filter;
