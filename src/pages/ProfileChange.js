import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import RadioButton from '../components/buttons/RadioButton';
import useRadioGroup from '../hooks/useRadioGroup';
import useIsMobile from '../hooks/useIsMobile';
import BasicModal from '../components/modals/BasicModal';
import PageTitle from '../components/PageTitle';
import { getProfileList } from '../api/queries/profileService';
import { useUser } from '../hooks/useUser';
import { profilePurchase, updateProfile } from '../api/mutations/profileService';
import { useNavigate } from 'react-router-dom';

// 예시 프로필 데이터
// const initialProfileList = [
//   { id: 1, imageId: 1, price: "-", owned: true },
//   { id: 2, imageId: 2, price: "-", owned: true },
//   { id: 3, imageId: 3, price: 40, owned: false },
//   { id: 4, imageId: 4, price: 50, owned: true },
//   { id: 5, imageId: 5, price: 60, owned: true },
//   { id: 6, imageId: 6, price: 70, owned: true },
//   { id: 7, imageId: 7, price: 80, owned: true },
//   { id: 8, imageId: 8, price: 90, owned: false },
//   { id: 9, imageId: 9, price: 100, owned: false },
//   { id: 10, imageId: 10, price: 20, owned: false },
//   { id: 11, imageId: 11, price: 20, owned: true },
//   { id: 12, imageId: 12, price: 20, owned: false },
//   { id: 13, imageId: 13, price: 20, owned: false },
//   { id: 14, imageId: 14, price: 20, owned: false },
//   { id: 15, imageId: 15, price: 20, owned: true },
//   { id: 16, imageId: 16, price: 20, owned: false },
//   { id: 17, imageId: 17, price: 20, owned: true },
//   { id: 18, imageId: 18, price: 20, owned: false },
//   { id: 19, imageId: 19, price: 40, owned: false },
//   { id: 20, imageId: 20, price: 20, owned: true },
//   { id: 21, imageId: 21, price: 20, owned: false },
//   { id: 22, imageId: 22, price: 20, owned: false },
//   { id: 23, imageId: 23, price: 20, owned: false },
//   { id: 24, imageId: 24, price: 20, owned: true },
//   { id: 25, imageId: 25, price: 20, owned: false },
//   { id: 26, imageId: 26, price: 20, owned: false },
//   { id: 27, imageId: 27, price: 20, owned: true },
//   { id: 28, imageId: 28, price: 20, owned: true },
//   { id: 29, imageId: 29, price: 20, owned: true },
//   { id: 30, imageId: 30, price: 20, owned: true },
//   { id: 31, imageId: 31, price: 20, owned: true },
//   { id: 32, imageId: 32, price: 20, owned: true },
//   { id: 33, imageId: 33, price: 20, owned: true },
//   { id: 34, imageId: 34, price: 20, owned: false },
//   { id: 35, imageId: 35, price: 20, owned: false },
//   { id: 36, imageId: 36, price: 20, owned: true },
//   { id: 37, imageId: 37, price: 20, owned: true },
//   { id: 38, imageId: 38, price: 20, owned: false },
// ];


//  "profileId": 40,
//       "imagePath": "https://aws-cookking-bucket.s3.ap-northeast-2.amazonaws.com/profile/38.png",
//       "price": 100,
//       "owned": false

// const userInfoInit = {
//   id: 1,
//   nickname: "홍성민",
//   rice: 200
// };

// const getUserInfoFromStorage = () => {
//   const saved = localStorage.getItem('userInfo');
//   return saved ? JSON.parse(saved) : userInfoInit;
// };

// const setUserInfoToStorage = (userInfo) => {
//   localStorage.setItem('userInfo', JSON.stringify(userInfo));
// };

const ProfileChange = () => {
  const { selected: filter, handleChange: handleFilterChange } = useRadioGroup('all');
  const { isMobile, isTablet } = useIsMobile();
  const navigate = useNavigate();

  // 유저 정보 상태 (localStorage에서 불러오기)
  // const [userInfo, setUserInfo] = useState(getUserInfoFromStorage());
  const {member, setMember} = useUser();
  // 프로필 리스트 상태 (구매 시 업데이트)
  const [profileList, setProfileList] = useState([]);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  // const [initialProfileList, setInitialProfileList] = useState([]);


  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProfile, setModalProfile] = useState(null);
  const [modalType, setModalType] = useState('purchase'); // 'purchase' | 'success' | 'fail'

  useEffect(() => {
    const profileFetch = async () => {
      try{
        const data = await getProfileList();
        const sortedData = data.sort((a, b) => a.profileId - b.profileId);
        setProfileList(sortedData);
        console.log("data==================", data);
        return data;
      }catch(e){
        console.log(e);
      }
    }

    profileFetch();
  },[]);

const filteredProfiles = React.useMemo(() => {
  if (filter === 'owned') {
    const ownedList = profileList.filter(p => p.owned);
    console.log("ownedList =-=-=-=-=-=",ownedList);
    // ownedList가 비어있으면 전체 리스트의 첫 번째 요소만 반환
    return ownedList.length > 0 ? ownedList : [profileList[0]];
  }
  return profileList;
}, [filter, profileList]);

const defaultProfileId = React.useMemo(() => {
  if (!member || !member.profileImagePath) return null;
  const matching = filteredProfiles.find(p => p.imagePath === member.profileImagePath);
  if (matching) return matching.profileId;
  const firstOwned = filteredProfiles.find(p => p.owned);
  return firstOwned ? firstOwned.profileId : (filteredProfiles[0]?.profileId ?? null);
}, [filteredProfiles, member?.profileImagePath]);

// defaultProfileId가 바뀔 때 selectedProfileId도 바꿔줌
useEffect(() => {
  if (defaultProfileId !== null) {
    setSelectedProfileId(defaultProfileId);
    console.log("selectedProfileId ===", selectedProfileId);
  }
}, [defaultProfileId]);

  // 반응형 그리드 (모바일 2, 태블릿 3, PC 4)
  let gridCols = "grid-cols-2";
  if (isTablet) gridCols = "sm:grid-cols-3";
  else if (!isMobile && !isTablet) gridCols = "xl:grid-cols-4";

  // 클릭 핸들러
  const handleProfileClick = async (profile) => {
  if (profile.owned) {
    try {
      await updateProfile(profile.profileId);
      setSelectedProfileId(profile.profileId);
      // 프로필 이미지 경로 갱신
      setMember(prev => ({
        ...prev,
        profileImagePath: profile.imagePath
      }));
    } catch (e) {
      alert('프로필 착용에 실패했습니다.');
    }
  }
  else {
    // 이하 기존 구매 모달 로직 동일
    if (typeof profile.price === 'string') return;
    if (member.ricePoint < profile.price) {
      setModalProfile(profile);
      setModalType('fail');
      setModalOpen(true);
    } else {
      setModalProfile(profile);
      setModalType('purchase');
      setModalOpen(true);
    }
  }
};


  // 결제 확인 버튼
// 결제 확인 버튼
const handlePurchase = async () => {
  if (!modalProfile) return;
  try {
    await profilePurchase(modalProfile.profileId);

    // 프로필 owned 처리
    setProfileList(prev =>
      prev.map(p =>
        p.profileId === modalProfile.profileId ? { ...p, owned: true } : p
      )
    );

    // ricePoint 차감 (응답에 최신 값이 없다면 직접 차감)
    setMember(prev => ({
      ...prev,
      ricePoint: prev.ricePoint - modalProfile.price
    }));

    setModalType('success');
  } catch (e) {
    alert('구매에 실패했습니다.');
    setModalOpen(false);
  }
};


  // 결제 모달/밥풀 부족 모달에서 "취소" 또는 "닫기" 버튼
  const handleModalCloseOnly = () => {
    setModalOpen(false);
    setModalType('purchase');
    setModalProfile(null);
  };

  // 밥풀 부족 모달에서 "상점으로 이동하기" 버튼
  const handleGoToShop = () => {
    // alert("상점으로 이동합니다! (테스트용)");
    navigate('/shop');
    setModalOpen(false);
    setModalType('purchase');
    setModalProfile(null);
  };

  // 모달 내용 및 버튼 설정
  let modalProps = {};
  if (modalType === 'purchase' && modalProfile) {
    modalProps = {
      open: modalOpen,
      onClose: handleModalCloseOnly,
      title: "프로필 구매 안내",
      description: `현재 보유 밥풀: ${member.ricePoint}개\n차감 밥풀: - ${modalProfile.price}개\n ------------------------\n잔여 밥풀: ${member.ricePoint - modalProfile.price}개`,
      SuccessButton: "구매",
      FailButton: "취소",
      onConfirm: handlePurchase,
      onClose: handleModalCloseOnly, // 취소 버튼
      onFail: handleModalCloseOnly,  // FailButton 클릭 시
    };
  } else if (modalType === 'success' && modalProfile) {
    modalProps = {
      open: modalOpen,
      onClose: handleModalCloseOnly,
      title: "구매 완료",
      description: `프로필 구매가 완료되었습니다!\n남은 밥풀: ${member.ricePoint}개`,
      SuccessButton: "확인",
      onConfirm: handleModalCloseOnly
    };
  } else if (modalType === 'fail' && modalProfile) {
    modalProps = {
      open: modalOpen,
      onClose: handleModalCloseOnly,
      title: "밥풀 부족",
      description: "밥풀이 부족합니다.\n밥풀을 충전하러 가시겠습니까?",
      SuccessButton: "상점으로 이동하기",
      FailButton: "닫기",
      onConfirm: handleGoToShop,      // 상점으로 이동하기
      onFail: handleModalCloseOnly,   // 닫기 버튼
      onClose: handleModalCloseOnly
    };
  }

  return (
    <>
    {/* <div className="min-h-screen w-full flex flex-col items-center py-0"> */}
      <div>
        {/* 상단: 라디오 버튼 */}
        <div className='w-full flex justify-between'>
          <PageTitle title="프로필 수정"/>
          <div className="flex justify-end gap-4 mb-8"> 
          <RadioButton
              id="all"
              name="profileFilter"
              value="all"
              label="전체"
              checked={filter === 'all'}
              onChange={() => handleFilterChange('all')}
            />
            <RadioButton
              id="owned"
              name="profileFilter"
              value="owned"
              label="보유중"
              checked={filter === 'owned'}
              onChange={() => handleFilterChange('owned')}
            />
          </div>
        </div>
        
        {/* 프로필 리스트 */}
        <div className={`grid ${gridCols} gap-8 w-full flex-1 overflow-y-auto`}>
          {filteredProfiles.map(profile => {
            const isOwned = profile.owned;
            const isSelected = selectedProfileId === profile.profileId;
            return (
              <button
                key={profile.profileId}
                type="button"
                onClick={() => handleProfileClick(profile)}
                className={`
                  rounded-xl p-6 transition-colors duration-150 flex flex-col items-center w-full border
                  ${isOwned
                    ? isSelected
                      ? 'bg-[#FAF6ED] border-[#E0CBAE] outline outline-2 outline-[#E0CBAE]'
                      : 'bg-white border-[#E0CBAE] hover:bg-[#FFF9E9]'
                    : 'bg-[#F5F7F7] border-[#E0CBAE] opacity-60 cursor-pointer grayscale'
                  }
                `}
                style={{ minHeight: 220 }}
              >
                <Profile imageId={profile.imageId} image={profile.imagePath} size="m" rank="none" />
                <div className="mt-4 text-base font-semibold text-black">
                  가격 : {typeof profile.price === 'string' ? "-" : `밥풀 ${profile.price}개`}
                </div>
              </button>
            );
          })}
        </div>
        <BasicModal {...modalProps} />
      </div>
      {/* BasicModal */}

    </>
  );
};

export default ProfileChange;
