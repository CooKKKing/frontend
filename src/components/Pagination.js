import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageGroupSize = 5; // 한 그룹당 페이지 수
  
  // 현재 페이지가 속한 그룹 계산
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const totalGroups = Math.ceil(totalPages / pageGroupSize);
  
  // 현재 그룹의 시작과 끝 페이지 계산
  const groupStart = (currentGroup - 1) * pageGroupSize + 1;
  const groupEnd = Math.min(currentGroup * pageGroupSize, totalPages);
  
  // 현재 그룹의 페이지 배열 생성
  const pages = Array.from(
    { length: groupEnd - groupStart + 1 }, 
    (_, i) => groupStart + i
  );

  const handleFirstGroupClick = () => {
    onPageChange(1);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastGroupClick = () => {
    onPageChange(Math.floor((totalPages - 1) / pageGroupSize) * pageGroupSize + 1);
  };

  return (
    <div className="flex justify-center mt-8 space-x-2">
      {/* 첫 그룹으로 이동 버튼 */}
      <button 
        onClick={handleFirstGroupClick}
        disabled={currentGroup === 1}
        className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded
                   ${currentGroup === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}`}
      >
        &lt;&lt;
      </button>

      {/* 이전 페이지 버튼 */}
      <button 
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded
                   ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}`}
      >
        &lt;
      </button>
      
      {/* 페이지 번호 버튼들 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded transition-colors
                     ${currentPage === page 
                       ? "bg-orange-500 text-white" 
                       : "border border-gray-300 hover:bg-gray-50"}`}
        >
          {page}
        </button>
      ))}
      
      {/* 다음 페이지 버튼 */}
      <button 
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded
                   ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}`}
      >
        &gt;
      </button>

      {/* 마지막 그룹으로 이동 버튼 */}
      <button 
        onClick={handleLastGroupClick}
        disabled={currentGroup === totalGroups}
        className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded
                   ${currentGroup === totalGroups ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}`}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination; 