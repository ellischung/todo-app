import React from "react";
import { useTodo } from "../contexts/todoContext";

function Search() {
  const { setSearch } = useTodo();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        className="input"
        name="search"
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
