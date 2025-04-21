import React from 'react';
import PageTitle from '../components/PageTitle';
import IconBtn from '../components/IconBtn';
import { FaArrowLeft } from 'react-icons/fa';
import GaugeBar from '../components/GaugeBar';
import TabMenu from '../components/TabMenu';
import Profile from '../components/Profile';
import CookTitleBox from '../components/CookTitleBox';
import CookTitleList from '../components/CookTitleList';
import { challengeData } from '../data/challengeData';
const RecommendMenu = () => {
  return (
    <div>
      <PageTitle title="추천 메뉴" />
      <IconBtn icon={<FaArrowLeft />} />
      <GaugeBar current={90} total={100} />
      <TabMenu />
      <Profile size="s" imageId={1} rank="none" />
      <Profile size="m" imageId={1} rank="none" />
      <Profile size="l" imageId={1} rank="none" />
      <br />
      <Profile size="l" imageId={1} rank="gold" />
      <Profile size="l" imageId={1} rank="silver" />
      <Profile size="l" imageId={1} rank="bronze" />
      <br />
      <CookTitleBox type="쌀" imagePath={challengeData.rice.imagePath} level="1" boldName="쌀" name="한톨" />
      <CookTitleList  />
    </div>
  );
};

export default RecommendMenu;
