import React from 'react';
import { Outlet } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

const Shop = () => {
  return (
    <>
      {/* <PageTitle title="밥풀 상점" /> */}
      <div className="h-full">
        <Outlet />
      </div>
    </>
  );
};

export default Shop; 