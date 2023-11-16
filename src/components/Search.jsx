import React from "react";
import { useTodo } from "../contexts/todoContext";

function Search() {
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

export default Search;
