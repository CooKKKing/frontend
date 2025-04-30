import React, { useEffect, useState } from 'react';
import { getTitleRankings, getRecipeBoardRankings, getBookmarkRankings, getLikesRankings } from '../api/queries/rankingService';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import Profile from './Profile';
import useIsMobile from '../hooks/useIsMobile';
const mapToImageData = (item, idx) => {
  const image =
    item.profileImagePath ||
    item.profileImageUrl ||       
    item.image
  const alt = item.nickName || item.userName || item.menuName || `User Rank ${idx + 1}`;
  const rank = idx === 0 ? 'gold' : idx === 1 ? 'silver' : idx === 2 ? 'bronze' : 'none';
  return { image, alt, rank };
};

const RankingSection = () => {
  const { member } = useUser();
  const [titleImages, setTitleImages] = useState([]);
  const [recipeImages, setRecipeImages] = useState([]);
  const [bookmarkImages, setBookmarkImages] = useState([]);
  const [likesImages, setLikesImages] = useState([]);
  const { isTablet } = useIsMobile();
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [titles, recipes, bookmarks, likes] = await Promise.all([
          getTitleRankings(),
          getRecipeBoardRankings(),
          getBookmarkRankings(),
          getLikesRankings(),
        ]);
        setTitleImages((Array.isArray(titles) ? titles : []).slice(0, 3).map((item, idx) => mapToImageData(item, idx, 'profile')));
        setRecipeImages((Array.isArray(recipes) ? recipes : []).slice(0, 3).map((item, idx) => mapToImageData(item, idx, 'food')));
        setBookmarkImages((Array.isArray(bookmarks) ? bookmarks : []).slice(0, 3).map((item, idx) => mapToImageData(item, idx, 'food')));
        setLikesImages((Array.isArray(likes) ? likes : []).slice(0, 3).map((item, idx) => mapToImageData(item, idx, 'food')));
      } catch (e) {
        setTitleImages([]);
        setRecipeImages([]);
        setBookmarkImages([]);
        setLikesImages([]);
      }
    };
    fetchAll();
  }, [member]);

  // 각 섹션별 + 버튼 클릭 시 해당 탭 인덱스와 함께 /ranking으로 이동
  const goToRankingTab = (tabIdx) => {
    navigate('/ranking', { state: { tab: tabIdx } });
  };

  return (
    <div className="w-full h-fit px-4">
      <h2 className="text-center font-bold text-lg mb-4 border-b pb-2">랭킹</h2>

      {/* 요리왕 섹션 - 사용자 프로필 */}
      <div className="bg-orange-light rounded-lg p-4 mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">요리왕</h3>
          <button className="text-green-600" onClick={() => goToRankingTab(0)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </button>
        </div>
        <div className="flex justify-around">
          {titleImages.map((img, idx) => (
            <div key={`cooking-king-${idx}`} className="flex flex-col items-center">
              <Profile size={isTablet ? 'xxs' : 'xs'} image={img.image} rank={img.rank} />
            </div>
          ))}
        </div>
      </div>

      {/* 레시피 플레이어 랭킹 섹션 - 음식 이미지 */}
      <div className="bg-[#F0FFF4] rounded-lg p-4 mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">레시피 플레이어 랭킹</h3>
          <button className="text-green-600" onClick={() => goToRankingTab(1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </button>
        </div>
        <div className="flex justify-around">
          {recipeImages.map((img, idx) => (
            <div key={`recipe-player-${idx}`} className="flex flex-col items-center">
              <Profile size={isTablet ? 'xxs' : 'xs'} image={img.image} rank={img.rank} />
            </div>
          ))}
        </div>
      </div>

      {/* 북마크 인기도 섹션 - 음식 이미지 */}
      <div className="bg-[#EFF6FF] rounded-lg p-4 shadow-sm mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">북마크 인기도</h3>
          <button className="text-green-600" onClick={() => goToRankingTab(2)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </button>
        </div>
        <div className="flex justify-around">
          {bookmarkImages.map((img, idx) => (
            <div key={`bookmark-${idx}`} className="flex flex-col items-center">
              <Profile size={isTablet ? 'xxs' : 'xs'} image={img.image} rank={img.rank} />
            </div>
          ))}
        </div>
      </div>

      {/* 좋아요 랭킹 섹션 - 음식 이미지 */}
      <div className="bg-[#FFF7E6] rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">좋아요 랭킹</h3>
          <button className="text-green-600" onClick={() => goToRankingTab(3)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </button>
        </div>
        <div className="flex justify-around">
          {likesImages.map((img, idx) => (
            <div key={`likes-${idx}`} className="flex flex-col items-center">
              <Profile size={isTablet ? 'xxs' : 'xs'} image={img.image} rank={img.rank} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingSection;
