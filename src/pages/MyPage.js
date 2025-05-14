import React from 'react';
import { Outlet } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

const MyPage = () => {
  const { isMobile } = useIsMobile();

  return (
    <>
      <Outlet />
    </>
  );
};

export default MyPage; 