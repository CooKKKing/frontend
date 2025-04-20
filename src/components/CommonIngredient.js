import React from "react";

/**
 * props:
 * - items: string[] (재료 목록)
 */
const CommonIngredient = ({
    items,
    size = {},
  }) => {
    // 사이즈 prop 기본값
    const {
      fontSize = 16,
    } = size;
  return (
    <div className="w-full flex flex-wrap justify-center gap-x-6 gap-y-4">
      {items.map((item, idx) => (
        <div
          key={item + idx}
          className="
            px-6 py-2
            bg-gray-100
            rounded-full
            border
            border-gray-400
            shadow-sm
            text-base
            font-bold
            text-black
            flex items-center justify-center
            whitespace-nowrap
            transition
            select-none
            min-w-[90px]
            max-w-[180px]
            text-center
            sm:text-lg
            md:text-xl
            "
          style={{
            fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default CommonIngredient;
