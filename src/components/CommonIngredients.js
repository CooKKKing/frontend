import React from 'react';
import { IoClose } from "react-icons/io5";

const CommonIngredients = ({
  items, // [{ name: '양파', type: 'main' }, ...]
  showRemove = false,
  onRemove,
  borderStyle = '', // 직접 지정하지 않아도 됨
  roundedStyle = 'rounded-full',
  size = {},
}) => {
  const { fontSize = 16 } = size;
  return (
    <div className="w-full flex flex-wrap justify-self-start gap-x-6 gap-y-4">
      {items.map((item, idx) => {
        // 타입에 따라 색상 클래스 지정
        const colorClass =
          item.type === 'main'
            ? 'text-green-700 border-green-500'
            : 'text-orange-700 border-orange-400';

        return (
          <div
            key={item.name + idx}
            className={`px-6 py-2 ${roundedStyle} border ${colorClass} shadow-sm text-base font-bold flex items-center justify-center whitespace-nowrap transition select-none min-w-[90px] max-w-[180px] text-center sm:text-lg md:text-xl`}
            style={{ fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize }}
          >
            {item.name}
            {showRemove && (
              <button
                className="ml-2 text-black hover:text-red-500 flex items-center"
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
        );
      })}
    </div>
  );
};

export default CommonIngredients;
