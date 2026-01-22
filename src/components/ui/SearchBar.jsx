import React, { useEffect, useState } from "react";
import useDebounce from "../../hook/Debounce";

function SearchBar({ setSearchItem }) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchItem(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className=" flex justify-center pb-5 ">
      <input
        type="text"
        placeholder="Want Frames or Sunglasses..?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          w-80 p-3 
          border border-gray-300 rounded-2xl 
          outline-none shadow-sm
          transition-all duration-300 ease-in-out
          focus:w-[400px] focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:shadow-md
        "
      />
    </div>
  );
}

export default SearchBar;
