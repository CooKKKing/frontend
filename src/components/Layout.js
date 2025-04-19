import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderPC from './HeaderPC';
import HeaderMobile from './HeaderMobile';
import useIsMobile from '../hooks/useIsMobile';
import RankingSection from './RankingSection';
import MyPageMenu from './MyPageMenu';

// 레이아웃 컴포넌트 => 왼쪽 오른쪽 섹션 레이아웃 형식
const Layout = ({ children }) => {
  const { isMobile } = useIsMobile();
  const location = useLocation();
  
  // 현재 경로에 따른 activeMenu 설정
  const getActiveMenu = (path) => {
    // 마이페이지의 모든 하위 경로에서 마이페이지 메뉴 활성화
    if (path.startsWith('/mypage')) {
      return '마이페이지';
    }

    switch (path) {
      case '/':
        return '메인';
      case '/recommend':
        return '추천메뉴';
      case '/ranking':
        return '랭킹';
      case '/dictionary':
        return '도감';
      case '/shop':
        return '밥풀상점';
      default:
        return '메인';
    }
  };

  // 마이페이지 경로인지 확인
  const isMyPage = location.pathname.startsWith('/mypage');

  return (
    <div className="flex bg-background-gradient">
      {/* PC 또는 모바일 헤더 */}
      {isMobile ? (
        <HeaderMobile activeMenu={getActiveMenu(location.pathname)} />
      ) : (
        <HeaderPC activeMenu={getActiveMenu(location.pathname)} />
      )}

      <div className={`flex w-full p-6 gap-6 overflow-hidden ${
        isMobile ? "h-[calc(100vh-60px)] mt-16" : "h-[calc(100vh-10px)]"
      }`}>
        {/* 메인 컨텐츠 영역 */}
        <main className="w-full h-full overflow-y-scroll bg-white border border-border p-6">
          {children}
        </main>

        {/* 오른쪽 박스 */}
        {!isMobile && (
          <aside className="bg-white h-fit border border-border min-w-[300px] overflow-y-auto">
            {isMyPage ? <MyPageMenu /> : <RankingSection />}
          </aside>
        )}
      </div>
    </div>
  );
};

export default Layout; 