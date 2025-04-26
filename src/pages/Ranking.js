import React, { useEffect, useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';
import TabMenu from '../components/TabMenu';
import RankingBox from '../components/RankingBox';
import LoadingBar from '../components/LoadingBar';
import {
  getTitleRankings,
  getRecipeBoardRankings,
  getBookmarkRankings,
  getLikesRankings,
} from '../api/queries/rankingService';
import { useLocation } from 'react-router-dom';

const tabApiMap = [
  getTitleRankings, 
  getRecipeBoardRankings,
  getBookmarkRankings, 
  getLikesRankings,
];

const mapToRankingBox = (item, idx) => ({
  rank: item.ranking ?? item.rank ?? idx + 1,
  nickName: item.userName ?? item.nickName ?? '',
  image: item.profileImagePath || item.profileImageUrl || item.image || '', // 이미지 URL 매핑
  score: item.point ?? item.score ?? item.count ?? 0,
  diff: item.rankingDiff ?? item.diff ?? 0,
});

const Ranking = () => {
  const { isMobile, isTablet } = useIsMobile();
  const isDesktop = !isMobile && !isTablet;
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state && typeof location.state.tab === 'number') {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await tabApiMap[activeTab]();
        setRankingData(Array.isArray(data) ? data.map(mapToRankingBox) : []);
      } catch (err) {
        setError('랭킹 정보를 불러오지 못했습니다.');
        setRankingData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 네비게이션 */}
      <header className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="font-bold text-xl">랭킹 순위</div>
        <div className="w-7 h-7 flex items-center justify-center"></div>
      </header>

      {/* 탭 메뉴 */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <TabMenu activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* 랭킹 영역 */}
      <main className={`w-full ${isDesktop ? 'max-w-5xl mx-auto mt-8 flex gap-10' : 'mt-8'}`}>
        {loading ? (
          <div className="w-full text-center py-10"><LoadingBar /> </div>
        ) : error ? (
          <div className="w-full text-center py-10 text-red-500">{error}</div>
        ) : rankingData.length === 0 ? (
          <div className="w-full text-center py-10">데이터가 없습니다.</div>
        ) : isDesktop ? (
          <>
            {/* 1~3등: PC에서만 sticky */}
            <div className="flex-1">
              <div className="sticky top-8 flex flex-col gap-4">
                {rankingData.slice(0, 3).map((item) => (
                  <RankingBox key={item.rank || item.id} {...item} />
                ))}
              </div>
            </div>
            {/* 4~10등: border-black 박스 */}
            <div className="flex-[1.2] bg-white border border-black rounded-xl px-4">
              {rankingData.slice(3, 10).map((item, idx, arr) => (
                <RankingBox
                  key={item.rank || item.id}
                  {...item}
                  isLast={idx === arr.length - 1}
                />
              ))}
            </div>
          </>
        ) : (
          <div>
            <div className="mb-4">
              {rankingData.slice(0, 3).map((item) => (
                <RankingBox key={item.rank || item.id} {...item} />
              ))}
            </div>
            <div className="bg-white border border-black rounded-2xl">
              {rankingData.slice(3, 10).map((item, idx, arr) => (
                <RankingBox
                  key={item.rank || item.id}
                  {...item}
                  isLast={idx === arr.length - 1}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Ranking;
