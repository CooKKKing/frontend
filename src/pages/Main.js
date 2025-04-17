import React from 'react';
import HeaderPC from '../components/HeaderPC';
import HeaderMobile from '../components/HeaderMobile';
import useIsMobile from '../hooks/useIsMobile';
import ButtonTest from '../test/buttonTest';

const Main = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex bg-background-gradient">
      {/* PC 또는 모바일 헤더 */}
      {isMobile ? <HeaderMobile activeMenu="메인" /> : <HeaderPC activeMenu="메인" />}

      <div className='flex w-full p-6 gap-6 '>
        {/* 메인 박스스 */}
      <main className={`w-full bg-white border border-border p-6 ${isMobile ? "border border-black mt-20" : ""}`}>
       {/* <ButtonTest/> */}
      </main>

       {/* 오른쪽 박스 */}
       {!isMobile && (
        <aside className=" bg-white border border-border w-min-[300px] h-fit p-4">
          Right Box ContentRight Box ContentRight Box ContentRight Box ContentRight Box Content
        </aside>
      )}
      </div>
      
    </div>
  );
};

export default Main;
