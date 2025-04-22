import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderPC from './HeaderPC';
import HeaderMobile from './HeaderMobile';
import useIsMobile from '../hooks/useIsMobile';
import RankingSection from './RankingSection';
import MyPageMenu from './MyPageMenu';
import ShopMenu from './ShopMenu';
import CameraColorSelector from './CameraColorSelector';

// 레이아웃 컴포넌트 => 왼쪽 오른쪽 섹션 레이아웃 형식
const Layout = ({ children }) => {
  const { isMobile, isTablet } = useIsMobile();
  const location = useLocation();
  
  // 현재 경로에 따른 activeMenu 설정
  const getActiveMenu = (path) => {
    if (path.startsWith('/mypage')) {
      return '마이페이지';
    }

    if (path.startsWith('/shop')) {
      return '밥풀상점';
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
      case '/signup':
        return '회원가입';
      case '/login':
        return '로그인';
      default:
        return '';
    }
  };

  // 현재 페이지에 따른 사이드 메뉴 결정
  const getSideMenu = () => {
    if (location.pathname.startsWith('/mypage')) {
      return <MyPageMenu />;
    }
    if (location.pathname.startsWith('/shop')) {
      return <ShopMenu />;
    }
    if (location.pathname === '/dictionary') {
      return <CameraColorSelector />;
    }
    return <RankingSection />;
  };

  return (
    <div className="flex bg-background-gradient">
      {/* PC 또는 모바일 헤더 */}
      {isMobile ? (
        <HeaderMobile activeMenu={getActiveMenu(location.pathname)} />
      ) : (
        <HeaderPC activeMenu={getActiveMenu(location.pathname)} />
      )}

      <div className={`flex w-full p-6 gap-6 ${
        isMobile ? "h-[calc(100vh-60px)] mt-16" : "h-[calc(100vh-10px)]"
      }`}>
        {/* 메인 컨텐츠 영역 */}
        <main className="flex-1 h-full scrollbar-hide overflow-y-auto bg-white border border-border p-6">
          {children}
        </main>

        {/* 오른쪽 박스 */}
        {!isMobile && (
          <aside className={`bg-white py-6 h-fit border border-border overflow-y-auto w-auto max-w-xs`}>
            {getSideMenu()}
          </aside>
        )}
      </div>
    </div>
  );
};

export default Layout; 