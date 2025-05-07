import React from 'react';

const TitleRadioButtons = ({ selectedFilter, onFilterChange }) => {
  return (
    <div className="flex justify-end gap-4 mb-6">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="titleFilter"
          value="전체"
          checked={selectedFilter === '전체'}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-4 h-4 text-green-600"
        />
        <span>전체</span>
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="titleFilter"
          value="보유"
          checked={selectedFilter === '보유'}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-4 h-4 text-green-600"
        />
        <span>보유</span>
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="titleFilter"
          value="미보유"
          checked={selectedFilter === '미보유'}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-4 h-4 text-green-600"
        />
        <span>미보유</span>
      </label>
    </div>
  );
};

export default TitleRadioButtons; 