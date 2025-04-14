import React, { useState } from 'react';

const HeaderMobile = ({ activeMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-orange-light h-16 px-4 shadow-md flex justify-between items-center w-full fixed top-0 z-50">
      {/* 로고 */}
      <div className="flex items-center">
        <img src="/assets/logo.png" alt="Logo" className="h-10 w-10" />
        <span className="ml-2 text-orange font-bold text-lg">COOKING</span>
      </div>

      {/* 햄버거 버튼 */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-gray-700 focus:outline-none"
      >
        {isMenuOpen ? '✖' : '☰'}
      </button>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white shadow-lg z-40">
          <ul className="flex flex-col items-start p-4">
            <li
              className={`text-orange mb-2 ${
                activeMenu === '메인' ? 'font-bold' : ''
              }`}
            >
              메인
            </li>
            <li className="mb-2">추천메뉴</li>
            <li className="mb-2">랭킹</li>
            <li className="mb-2">도감</li>
            <li className="mb-2">마이페이지</li>
            <li>밥풀상점</li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default HeaderMobile;
