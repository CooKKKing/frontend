import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search",
  onSearch,
  onKeyDown,
}) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white w-full x-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none border-none text-lg font-semibold placeholder:text-gray-400"
        style={{ minWidth: 0 }}
      />
      <button
        type="button"
        onClick={onSearch}
        className="p-0 ml-2 bg-transparent border-none outline-none flex items-center"
        tabIndex={-1}
      >
        <IoSearch size={28} className="text-black" />
      </button>
    </div>
  );
};

export default SearchBar;
