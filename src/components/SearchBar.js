import React from "react";
import { IoSearch } from "react-icons/io5";
import useIsMobile from "../hooks/useIsMobile"; // 반드시 import

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search",
  onSearch,
  onKeyDown,
  disabled = false,
}) => {
  const { isMobile, isTablet } = useIsMobile(); // *반응형 적용*  

  return (
    <div
      className={`flex justify-between items-center border border-gray-300 rounded-full px-4 py-2 bg-white w-full ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={` bg-transparent outline-none border-none text-lg font-semibold placeholder:text-gray-400 ${
          disabled ? "cursor-not-allowed" : ""
        }`}
        style={{ minWidth: 0 }}
      />
      <button
        type="button"
        onClick={onSearch}
        disabled={disabled}
        className={`p-0 ml-2 bg-transparent border-none outline-none flex items-center ${
          disabled ? "cursor-not-allowed" : ""
        }`}
        tabIndex={-1}
      >
        <IoSearch size={28} className={`${disabled ? "text-gray-400" : "text-black"}`} />
      </button>
    </div>
  );
};

export default SearchBar;
