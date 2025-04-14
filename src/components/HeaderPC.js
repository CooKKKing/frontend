import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { menuItems } from '../constants/menuItems';

const HeaderPC = ({ activeMenu }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`border border-black bg-white h-screen flex flex-col items-center py-4 shadow-md transition-all duration-300 ${
        isExpanded ? 'w-[280px]' : 'w-[80px]'
      }`}
    >
      {/* 로고 */}
      <div
        className="cursor-pointer flex items-center justify-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <img src={logo} alt="Logo" className="h-12 w-12 mb-6" />
      </div>

      {/* 메뉴 리스트 */}
      <nav className="mt-4 w-[280px]">
        <ul className="space-y-4 w-full text-gray-700 flex flex-col items-center justify-center">
          {menuItems.map((item) => (
             <li
             key={item.name}
             className={`flex items-center border border-black space-x-3 px-4 transition-all duration-300 ${
               isExpanded ? 'w-[150px] justify-start' : 'w-fit justify-center'
             } ${
               activeMenu === item.name ? 'text-orange font-bold' : ''
             }`}
           >
              {/* 아이콘 */}
              <span className="text-lg">{item.icon}</span>
              {/* 텍스트 (접혔을 때 숨김) */}
              <span
                className={`whitespace-nowrap overflow-hidden transition-opacity duration-500 ${
                  isExpanded ? 'opacity-100 block' : 'opacity-0 hidden'
                }`}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer (접혔을 때 숨김) */}
      <footer
        className={`mt-auto text-sm text-gray-500 transition-opacity duration-300 ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Test Footer<br />
        개인정보 처리방침<br />
        이용약관<br />
        CopyRight © 2025
      </footer>
    </aside>
  );
};

export default HeaderPC;
