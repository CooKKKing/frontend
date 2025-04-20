import React from 'react';

const ItemSelector = ({
  title,
  items,
  activeItemId,
  onItemClick,
  renderItem,
  colorPairs,
  activeColor,
  onColorClick,
  gridCols = 2
}) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-8">{title}</h2>
      
      {/* 아이템 목록 */}
      <div className={`grid grid-cols-${gridCols} gap-4 mb-8`}>
        {items.map((item) => (
          <div 
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`relative cursor-pointer group ${
              activeItemId === item.id ? 'bg-blue-100' : ''
            } rounded-lg p-4 transition-colors`}
          >
            {renderItem(item)}
          </div>
        ))}
      </div>

      {/* 색상 선택 팔레트 */}
      {colorPairs && (
        <div className="space-y-3">
          {colorPairs.map((pair, index) => (
            <div key={index} className="flex gap-3">
              {pair.map((color) => (
                <button
                  key={color.name}
                  onClick={() => onColorClick(color.name)}
                  className={`w-full h-12 rounded-lg ${color.bgClass} transition-transform hover:scale-105 ${
                    activeColor === color.name 
                      ? 'ring-2 ring-gray-400' 
                      : ''
                  }`}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemSelector; 