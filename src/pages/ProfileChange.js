import React from 'react';
import Profile from '../components/Profile';
import RadioButton from '../components/RadioButton';
import useRadioGroup from '../hooks/useRadioGroup';
import useIsMobile from '../hooks/useIsMobile';

// 예시 프로필 데이터
const profileList = [
  { id: 1, imageId: 1, price: 20, owned: false },
  { id: 2, imageId: 2, price: 30, owned: false },
  { id: 3, imageId: 3, price: 40, owned: false },
  { id: 4, imageId: 4, price: 50, owned: true },
  { id: 5, imageId: 5, price: 60, owned: true },
  { id: 6, imageId: 6, price: 70, owned: true },
  { id: 7, imageId: 7, price: 80, owned: true },
  { id: 8, imageId: 8, price: 90, owned: false },
  { id: 9, imageId: 9, price: 100, owned: false },
  { id: 10, imageId: 10, price: 20, owned: false },
  { id: 11, imageId: 11, price: 20, owned: true },
  { id: 12, imageId: 12, price: 20, owned: false },
  { id: 13, imageId: 13, price: 20, owned: false },
  { id: 14, imageId: 14, price: 20, owned: false },
  { id: 15, imageId: 15, price: 20, owned: true },
  { id: 16, imageId: 16, price: 20, owned: false },
  { id: 17, imageId: 17, price: 20, owned: true },
  { id: 18, imageId: 18, price: 20, owned: false },
  { id: 19, imageId: 19, price: 40, owned: false },
  { id: 20, imageId: 20, price: 20, owned: true },
  { id: 21, imageId: 21, price: 20, owned: false },
  { id: 22, imageId: 22, price: 20, owned: false },
  { id: 23, imageId: 23, price: 20, owned: false },
  { id: 24, imageId: 24, price: 20, owned: true },
  { id: 25, imageId: 25, price: 20, owned: false },
  { id: 26, imageId: 26, price: 20, owned: false },
  { id: 27, imageId: 27, price: 20, owned: true },
  { id: 28, imageId: 28, price: 20, owned: true },
  { id: 29, imageId: 29, price: 20, owned: true },
  { id: 30, imageId: 30, price: 20, owned: true },
  { id: 31, imageId: 31, price: 20, owned: true },
  { id: 32, imageId: 32, price: 20, owned: true },
  { id: 33, imageId: 33, price: 20, owned: true },
  { id: 34, imageId: 34, price: 20, owned: false },
  { id: 35, imageId: 35, price: 20, owned: false },
  { id: 36, imageId: 36, price: 20, owned: true },
  { id: 37, imageId: 37, price: 20, owned: true },
  { id: 38, imageId: 38, price: 20, owned: false },
];

const ProfileChange = () => {
  const { selected: filter, handleChange: handleFilterChange } = useRadioGroup('owned');
  const { isMobile, isTablet } = useIsMobile();

  // 보유 필터
  const filteredProfiles = React.useMemo(() => {
    if (filter === 'owned') {
      const ownedList = profileList.filter(p => p.owned);
      return ownedList.length > 0 ? ownedList : [profileList[0]];
    }
    return profileList;
  }, [filter]);

  // 선택된 프로필은 owned 중 첫 번째로 기본값
  const defaultProfileId = React.useMemo(() => {
    const firstOwned = filteredProfiles.find(p => p.owned);
    return firstOwned ? firstOwned.id : filteredProfiles[0].id;
  }, [filteredProfiles]);
  const [selectedProfileId, setSelectedProfileId] = React.useState(defaultProfileId);

  // 반응형 그리드
  let gridCols = "grid-cols-1";
  if (isTablet) gridCols = "grid-cols-2";
  else if (!isMobile && !isTablet) gridCols = "grid-cols-4";

  // 전체 화면 차지
  return (
    <div className="min-h-screen w-full flex flex-col items-center py-0">
      <div className="w-full h-full max-w-7xl mx-auto px-2 sm:px-4 py-8 flex flex-col" style={{ minHeight: '100vh' }}>
        {/* 상단: 라디오 버튼 */}
        <div className="flex justify-end gap-4 mb-8">
          <RadioButton
            id="owned"
            name="profileFilter"
            value="owned"
            label="보유중"
            checked={filter === 'owned'}
            onChange={() => handleFilterChange('owned')}
          />
          <RadioButton
            id="all"
            name="profileFilter"
            value="all"
            label="전체"
            checked={filter === 'all'}
            onChange={() => handleFilterChange('all')}
          />
        </div>
        {/* 프로필 리스트 */}
        <div className={`grid ${gridCols} gap-8 w-full flex-1`}>
          {filteredProfiles.map(profile => {
            const isOwned = profile.owned;
            const isSelected = selectedProfileId === profile.id;
            return (
              <button
                key={profile.id}
                type="button"
                disabled={!isOwned}
                onClick={() => isOwned && setSelectedProfileId(profile.id)}
                className={`
                  rounded-xl p-6 transition-colors duration-150 flex flex-col items-center w-full rounded-md border border-black
                  ${isSelected && isOwned ? 'bg-[#FAF6ED]' : 'bg-[#F5F7F7] bg-inherit'}
                  ${!isOwned ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                `}
                style={{ minHeight: 220 }}
              >
                <Profile imageId={profile.imageId} size="m" rank="none" />
                  <div className="mt-4 text-base font-semibold text-black">
                    가격 : 밥풀 {profile.price}개
                  </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileChange;
