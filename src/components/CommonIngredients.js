import React from 'react';
import { IoClose } from "react-icons/io5";

const CommonIngredient = ({
  items,
  showRemove = false,
  onRemove,
  borderStyle = 'border-gray-400',
  roundedStyle = 'rounded-full',
  size = {},
}) => {
  const { fontSize = 16 } = size;
  return (
    <div className="w-full flex flex-wrap justify-center gap-x-6 gap-y-4">
      {items.map((item, idx) => (
        <div
          key={item + idx}
          className={`px-6 py-2 bg-gray-200 ${roundedStyle} border ${borderStyle} shadow-sm text-base font-bold text-black flex items-center justify-center whitespace-nowrap transition select-none min-w-[90px] max-w-[180px] text-center sm:text-lg md:text-xl`}
          style={{ fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize }}
        >
          {item}
          {showRemove && (
            <button
              className="ml-2 text-gray-500 hover:text-red-500 flex items-center"
              onClick={e => {
                e.stopPropagation();
                onRemove && onRemove(item);
              }}
              type="button"
              aria-label="삭제"
            >
              <IoClose size={20} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommonIngredient;
