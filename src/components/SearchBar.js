import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search",
  onSearch,
  onKeyDown,
  disabled = false,
}) => {
  return (
    <div className={`flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white w-full x-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={`flex-1 bg-transparent outline-none border-none text-lg font-semibold placeholder:text-gray-400 ${disabled ? 'cursor-not-allowed' : ''}`}
        style={{ minWidth: 0 }}
      />
      <button
        type="button"
        onClick={onSearch}
        disabled={disabled}
        className={`p-0 ml-2 bg-transparent border-none outline-none flex items-center ${disabled ? 'cursor-not-allowed' : ''}`}
        tabIndex={-1}
      >
        <IoSearch size={28} className={`${disabled ? 'text-gray-400' : 'text-black'}`} />
      </button>
    </div>
  );
};

export default SearchBar;
