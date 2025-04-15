import React, { useState, useEffect } from 'react';
import HeaderPC from '../components/HeaderPC';
import HeaderMobile from '../components/HeaderMobile';

const Main = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex">
      {/* PC 또는 모바일 헤더 */}
      {isMobile ? <HeaderMobile activeMenu="메인" /> : <HeaderPC activeMenu="메인" />}

      {/* 메인 박스스 */}
      <main className={`w-full bg-gray-100 p-6 ${isMobile ? "border border-black mt-20" : ""}`}>
        Main Content Area
        Main Content AreaMain Content AreaMain Content Area
        Main Content Area
        Main Content AreaMain Content AreaMain Content AreaMain Content AreaMain Content Areavv
      </main>

       {/* 오른쪽 박스 */}
       {!isMobile && (
        <aside className="border border-black w-min-[300px] h-fit bg-white shadow-md p-4">
          Right Box ContentRight Box ContentRight Box ContentRight Box ContentRight Box Content
        </aside>
      )}
    </div>
  );
};

export default Main;
