import { useTodo } from "../contexts/todoContext";

function SortDropdown() {
  const { setSortBy } = useTodo();

  const handleChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="text-black w-[40%] sm:w-[20%]">
      <select
        className="bg-secondary font-bold rounded-full border p-2 cursor-pointer w-full"
        onChange={handleChange}
        defaultValue=""
      >
        <option value="" disabled hidden>
          Sort
        </option>
        <option value="">Default</option>
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
