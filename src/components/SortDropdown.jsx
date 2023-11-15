import React from "react";
import { useTodo } from "../contexts/todoContext";

function SortDropdown() {
  const { setSortBy } = useTodo();
  const handleChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div>
      <label>Sort</label>
      <select id="sort" defaultValue="default" onChange={handleChange}>
        <option value="default">Default</option>
        <option value="+priority">Ascending Priority</option>
        <option value="-priority">Descending Priority</option>
        <option value="+complexity">Ascending Complexity</option>
        <option value="-complexity">Descending Complexity</option>
        <option value="+date">Ascending Date</option>
        <option value="-date">Descending Date</option>
      </select>
    </div>
  );
}

export default SortDropdown;
