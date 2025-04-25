const CommonIngredient = ({
  items,
  onRemove,
  size = {},
}) => {
  const { fontSize = 16 } = size;
  return (
    <div className="w-full flex flex-wrap justify-start gap-x-6 gap-y-4">
      {items.map((item, idx) => (
        <div
          key={item + idx}
          className="px-6 py-2 bg-gray-100 rounded-full border border-gray-400 shadow-sm text-base font-bold text-black flex items-center justify-center whitespace-nowrap transition select-none min-w-[90px] max-w-[180px] text-center sm:text-lg md:text-xl cursor-pointer"
          style={{ fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize }}
          onClick={() => onRemove && onRemove(item)}
        >
          {item}
          <button
            className="ml-2 text-gray-500 hover:text-red-500"
            onClick={e => {
              e.stopPropagation();
              onRemove && onRemove(item);
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default CommonIngredient;