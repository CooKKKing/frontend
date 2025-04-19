import React from 'react';
import { Outlet } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import useIsMobile from '../hooks/useIsMobile';

const MyPage = () => {
  const { isMobile } = useIsMobile();

  return (
    <>
      <PageTitle title="마이페이지" />
      <div className="h-full">
        {/* 공통 레이아웃은 유지하고 자식 라우트 컴포넌트만 렌더링 지정*/}
        <Outlet />
      </div>
    </>
  );
};

export default MyPage; 