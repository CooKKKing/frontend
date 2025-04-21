import React from 'react';
import { Outlet } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

const MyPage = () => {
  const { isMobile } = useIsMobile();

  return (
    <div className="h-full w-full">
      <Outlet />
    </div>
  );
};

export default MyPage; 