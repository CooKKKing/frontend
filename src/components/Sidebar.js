import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-white w-[250px] h-screen flex flex-col items-center py-4 shadow-md">
      <img src="/assets/logo.png" alt="Logo" className="h-12 w-12 mb-6" />
      <nav>
        <ul className="space-y-4 text-gray-700">
          <li>메인</li>
          <li>추천메뉴</li>
          <li>도감</li>
          <li>마이페이지</li>
          <li>밥풀상점</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
