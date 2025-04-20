import React from 'react';
import PageTitle from '../components/PageTitle';
import IconBtn from '../components/IconBtn';
import { FaArrowLeft } from 'react-icons/fa';
import GaugeBar from '../components/GaugeBar';
import TabMenu from '../components/TabMenu';

const RecommendMenu = () => {
  return (
    <div>
      <PageTitle title="추천 메뉴" />
      <IconBtn icon={<FaArrowLeft />} />
      <GaugeBar current={90} total={100} />
      <TabMenu />
    </div>
  );
};

export default RecommendMenu;
