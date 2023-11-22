import { useTodo } from "../contexts/todoContext";

function Filter() {
  const { setFilter, tags } = useTodo();

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="text-black w-[40%] sm:w-[20%]">
      <select
        className="bg-secondary font-bold rounded-full border p-2 cursor-pointer w-full"
        onChange={handleChange}
        defaultValue=""
      >
        <option value="" disabled hidden>
          Filter
        </option>
        <option value="">None</option>
        {[...tags].map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
