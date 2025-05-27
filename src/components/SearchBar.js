// import React from "react";
// import { IoSearch } from "react-icons/io5";
// import useIsMobile from "../hooks/useIsMobile"; // 반드시 import

// const SearchBar = ({
//   value,
//   onChange,
//   placeholder = "Search",
//   onSearch,
//   onKeyDown,
//   disabled = false,
// }) => {
//   const { isMobile, isTablet, isSmallMobile } = useIsMobile();

//   // 반응형 스타일 동적 결정
//   const containerClass = `
//     flex justify-between items-center border border-gray-300 rounded-full bg-white
//     transition-all duration-200
//     ${disabled ? "opacity-50 cursor-not-allowed" : ""}
//     ${isSmallMobile ? "px-2 py-1 w-[90vw]" : isMobile ? "px-3 py-1.5 w-[80vw]" : isTablet ? "px-4 py-2 w-[60vw]" : "px-6 py-2 w-[40vw]"}
//   `;

//   const inputClass = `
//     bg-transparent outline-none border-none font-semibold placeholder:text-gray-400
//     transition-all duration-200
//     ${disabled ? "cursor-not-allowed" : ""}
//     ${isSmallMobile ? "text-sm" : isMobile ? "text-base" : "text-lg"}
//     flex-1 min-w-0
//   `;

//   const buttonClass = `
//     p-0 ml-2 bg-transparent border-none outline-none flex items-center
//     transition-all duration-200
//     ${disabled ? "cursor-not-allowed" : ""}
//   `;

//   const iconSize = isSmallMobile ? 18 : isMobile ? 22 : 28;

//   return (
//     <div className={containerClass}>
//       <input
//         type="text"
//         value={value}
//         onChange={onChange}
//         onKeyDown={onKeyDown}
//         placeholder={placeholder}
//         disabled={disabled}
//         className={inputClass}
//         style={{ minWidth: 0 }}
//       />
//       <button
//         type="button"
//         onClick={onSearch}
//         disabled={disabled}
//         className={buttonClass}
//         tabIndex={-1}
//       >
//         <IoSearch size={iconSize} className={disabled ? "text-gray-400" : "text-black"} />
//       </button>
//     </div>
//   );
// };

// export default SearchBar;

import React from "react";
import { IoSearch } from "react-icons/io5";
import useIsMobile from "../hooks/useIsMobile";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search",
  onSearch,
  onKeyDown,
  disabled = false,
}) => {
  const { isMobile, isTablet, isSmallMobile } = useIsMobile();

  // 수정: w-full, min-w-0 추가 (부모가 줄어들 때 SearchBar도 줄어듦)
  const containerClass = `
    flex justify-between items-center border border-gray-300 rounded-full bg-white
    transition-all duration-200
    w-full min-w-0
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${isSmallMobile ? "px-2 py-1" : isMobile ? "px-3 py-1.5" : isTablet ? "px-4 py-2" : "px-6 py-2"}
  `;

  // 수정: flex-1 min-w-0 w-full 모두 추가 (input이 부모를 절대 넘지 않음)
  const inputClass = `
    bg-transparent outline-none border-none font-semibold placeholder:text-gray-400
    transition-all duration-200
    flex-1 min-w-0 w-full
    ${disabled ? "cursor-not-allowed" : ""}
    ${isSmallMobile ? "text-sm" : isMobile ? "text-base" : "text-lg"}
  `;

  // 수정: flex-shrink-0 추가 (버튼이 줄어들지 않게)
  const buttonClass = `
    p-0 ml-2 bg-transparent border-none outline-none flex items-center flex-shrink-0
    transition-all duration-200
    ${disabled ? "cursor-not-allowed" : ""}
  `;

  const iconSize = isSmallMobile ? 18 : isMobile ? 22 : 28;

  return (
    <div className={containerClass}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClass}
        style={{ minWidth: 0 }} // 수정: minWidth: 0 명시
      />
      <button
        type="button"
        onClick={onSearch}
        disabled={disabled}
        className={buttonClass}
        tabIndex={-1}
      >
        <IoSearch size={iconSize} className={disabled ? "text-gray-400" : "text-black"} />
      </button>
    </div>
  );
};

export default SearchBar;

