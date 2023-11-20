import React from "react";
import { useTodo } from "../contexts/todoContext";

function Search() {
  const { setSearch } = useTodo();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="pt-6 pb-3">
      <input
        type="text"
        className="bg-secondary font-bold placeholder-tag rounded-full border p-2 w-full sm:w-96"
        placeholder="Search"
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
