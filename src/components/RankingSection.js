import { foodItems } from "../data/foodData"

// // Sort food items by likes for ranking
// const sortedByLikes = [...foodItems].sort((a, b) => b.likes - a.likes).slice(0, 3)
// // For bookmark section, we'll just use the first 3 items (in a real app, you'd sort by bookmark count)
// const popularBookmarks = [...foodItems].slice(0, 3)

const RankingSection = () => {
  const sortedByLikes = [...foodItems].sort((a, b) => b.likes - a.likes).slice(0, 3);
  const popularBookmarks = [...foodItems].sort((a, b) => b.isBookmarked - a.isBookmarked).slice(0, 3);

  return (
    <div className="max-w-md mx-auto w-full lg:w-[250px]">
      <h2 className="text-center font-bold text-lg mb-4 border-b pb-2">랭킹</h2>

      {/* 요리왕 섹션 - 사용자 프로필 */}
      <div className="bg-orange-light rounded-lg p-4 mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">요리왕</h3>
          <button className="text-green-600">
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

        <div className="flex justify-between">
          {[1, 2, 3].map((index) => (
            <div key={`cooking-king-${index}`} className="flex flex-col items-center">
              <div className="mb-1">
                {/* Crown icon */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={index === 1 ? "#FFD700" : "none"}
                  stroke={index === 1 ? "#FFD700" : "#888888"}
                  strokeWidth="2"
                  className={index === 1 ? "" : "grayscale"}
                >
                  <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
                </svg> */}
              </div>
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-orange-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    {/* User profile placeholder */}
                    <img
                      src={`https://randomuser.me/api/portraits/men/${index + 10}.jpg`}
                      alt={`User Rank ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 레시피 플레이어 랭킹 섹션 - 음식 이미지 */}
      <div className="bg-[#F0FFF4] rounded-lg p-4 mb-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">레시피 플레이어 랭킹</h3>
          <button className="text-green-600">
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

        <div className="flex justify-between">
          {sortedByLikes.map((food, index) => (
            <div key={`recipe-player-${food.id}`} className="flex flex-col items-center">
              <div className="mb-1">
                {/* Crown icon */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={index === 0 ? "#FFD700" : "none"}
                  stroke={index === 0 ? "#FFD700" : "#888888"}
                  strokeWidth="2"
                  className={index === 0 ? "" : "grayscale"}
                >
                  <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
                </svg> */}
              </div>
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-orange-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    {/* Food image */}
                    <img
                      src={food.image || `https://source.unsplash.com/100x100/?food,${food.menuName}`}
                      alt={food.menuName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 북마크 인기도 섹션 - 음식 이미지 */}
      <div className="bg-[#EFF6FF] rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">북마크 인기도</h3>
          <button className="text-green-600">
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

        <div className="flex justify-between">
          {popularBookmarks.map((food, index) => (
            <div key={`bookmark-${food.id}`} className="flex flex-col items-center">
              <div className="mb-1">
                {/* Crown icon */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={index === 0 ? "#FFD700" : "none"}
                  stroke={index === 0 ? "#FFD700" : "#888888"}
                  strokeWidth="2"
                  className={index === 0 ? "" : "grayscale"}
                >
                  <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>
                </svg> */}
              </div>
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-orange-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    {/* Food image */}
                    <img
                      src={food.image || `https://source.unsplash.com/100x100/?food,${food.menuName}`}
                      alt={food.menuName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RankingSection
