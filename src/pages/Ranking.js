// App.jsx
import React from 'react';
import useIsMobile from '../hooks/useIsMobile';
import TabMenu from '../components/TabMenu';
import RankingBox from '../components/RankingBox';

// 더미 데이터
const rankingData = [
  { rank: 1, nickname: '철수', imageId: 10, score: 101, diff: 2 },
  { rank: 2, nickname: '영희', imageId: 1, score: 81, diff: 0 },
  { rank: 3, nickname: '순자', imageId: 2, score: 60, diff: -2 },
  { rank: 4, nickname: '민수', imageId: 3, score: 41, diff: 1 },
  { rank: 5, nickname: '백수', imageId: 4, score: 39, diff: -2 },
  { rank: 6, nickname: '광자', imageId: 5, score: 24, diff: 0 },
  { rank: 7, nickname: '현후', imageId: 6, score: 25, diff: -2 },
  { rank: 8, nickname: '성민', imageId: 7, score: 15, diff: 1 },
  { rank: 9, nickname: '택현', imageId: 8, score: 68, diff: 1 },
  { rank: 10, nickname: '정민', imageId: 9, score: 84, diff: 0 },
];

const Ranking = () => {
  const { isMobile, isTablet } = useIsMobile();
  const isDesktop = !isMobile && !isTablet;

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 네비게이션 */}
      <header className="w-full flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="font-bold text-xl">랭킹 순위</div>
        <div className="w-7 h-7 flex items-center justify-center"></div>
      </header>

      {/* 탭 메뉴 */}
      <div className="max-w-3xl mx-auto mt-6 px-4">
        <TabMenu />
      </div>

      {/* 랭킹 영역 */}
      <main className={`w-full ${isDesktop ? 'max-w-5xl mx-auto mt-8 flex gap-10' : 'mt-8'}`}>
        {isDesktop ? (
          // 데스크탑: 좌측 1~3등 sticky, 우측 4~10등 border-black
          <>
            {/* 1~3등: PC에서만 sticky */}
            <div className="flex-1">
              <div className="sticky top-8 flex flex-col gap-4">
                {rankingData.slice(0, 3).map((item) => (
                  <RankingBox key={item.rank} {...item} />
                ))}
              </div>
            </div>
            {/* 4~10등: border-black 박스 */}
            <div className="flex-[1.2] bg-white border border-black rounded-xl px-4">
              {rankingData.slice(3, 10).map((item, idx, arr) => (
                <RankingBox
                  key={item.rank}
                  {...item}
                  isLast={idx === arr.length - 1} // 마지막 행 여부 전달
                />
              ))}
            </div>
          </>
        ) : (
          // 모바일/태블릿: 전체 세로 정렬, 4~10등 border-black 박스
          <div>
            <div className="mb-4">
              {rankingData.slice(0, 3).map((item) => (
                <RankingBox key={item.rank} {...item} />
              ))}
            </div>
            <div className="bg-white border border-black rounded-2xl">
              {rankingData.slice(3, 10).map((item, idx, arr) => (
                <RankingBox
                  key={item.rank}
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
