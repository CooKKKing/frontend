import React from "react";
import { FaAngleDown } from "react-icons/fa6";

const InfoMessage = ({
  title,
  children,
  borderColor = "#E6731A",
  titleColor = "#111",
  iconColor = "#111",
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className="w-full rounded-lg border transition-all duration-200"
      style={{
        borderColor: borderColor,
        background: "#fff",
      }}
    >
      <button
        className="flex items-center justify-between w-full px-3 py-3 md:px-5 md:py-4 select-none"
        onClick={onToggle}
        type="button"
        style={{ cursor: "pointer" }}
        aria-expanded={isOpen}
      >
        <span
          className="font-bold text-sm md:text-base"
          style={{ color: titleColor, letterSpacing: "-0.5px" }}
        >
          {title}
        </span>
        <span
          className="transition-transform duration-200"
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: iconColor,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <FaAngleDown size={24} />
        </span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 md:px-6 md:pb-6">
          <div className="text-xs md:text-sm text-gray-800">{children}</div>
        </div>
      )}
    </div>
  );
};

export default InfoMessage;
