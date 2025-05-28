import React from "react";
import Profile from "./Profile";
import CookTitleBox from "./CookTitleBox";
import useIsMobile from "../hooks/useIsMobile";
import { useSelectedMember } from "../contexts/SelectedMemberContext";
import { useQuery } from "@tanstack/react-query";
import { getMemberRankings } from "../api/queries/rankingService";
import { useUser } from "../hooks/useUser";
import { useLocation } from "react-router-dom";
const CommonProfile = ({
  memberId,
  profileId,
  nickname,
  riceCount = true,
  // 칭호에 필요한 정보
  titleType,
  titleImagePath,
  titleLevel,
  titleBoldName,
  titleName,
  memberRanking = true,
}) => {
  const { isMobile, isTablet } = useIsMobile();
  const { member } = useUser();
  const { selectedMember } = useSelectedMember();
  const location = useLocation();

  console.log("SelectedMember", selectedMember);

  const { data: memberRankings } = useQuery({
    queryKey: ["memberRankings", selectedMember?.memberId || member.memberId],
    queryFn: () =>
      getMemberRankings(selectedMember?.memberId || member.memberId),
    enabled: !!member.memberId,
  });

  console.log("CommonProfile memberId:", member.memberId);
  console.log("CommonProfile memberRankings:", memberRankings);

  // 프로필 사이즈: 모바일에서 상단에 있을 때 m, 아니면 s
  let profileSize = isMobile ? "m" : "s";
  const labelFont = isMobile ? "text-xs" : isTablet ? "text-sm" : "text-base";
  const valueFont = isMobile ? "text-base" : isTablet ? "text-lg" : "text-xl";

  return (
    <div className="w-full rounded-[12px] overflow-hidden border border-[#bdbdbd] bg-white">
      {/* 상단 프로필 박스 (연노랑 배경) */}
      <div className="flex flex-col items-center justify-center pt-5 pb-5 px-2 bg-orange-100 w-full">
        <div className="w-fit h-fit rounded-full flex items-center justify-center bg-white">
          <Profile size={profileSize} image={profileId} rank="none" />
        </div>
      </div>
      {/* 구분선 */}
      <div className="w-full border-t border-black" />
      {/* 하단 박스 (흰 배경) */}
      <div className="flex flex-col items-center px-4 py-3 bg-white w-full">
        {/* 칭호 */}
        <div className="mb-2 w-full flex justify-center">
          <CookTitleBox
            type={titleType}
            imagePath={titleImagePath}
            level={titleLevel}
            boldName={titleBoldName}
            name={titleName}
          />
        </div>
        {/* 닉네임/밥풀/랭킹 정보 */}
        <div className="flex flex-col items-center w-full gap-1">
          <div
            className={`flex flex-row items-center gap-1 ${labelFont} w-full justify-center`}>
            <span className="text-black font-bold">닉네임 :</span>
            <span className={`font-semibold ${valueFont} truncate text-black`}>
              {nickname}
            </span>
          </div>
          {riceCount !== false &&
            (selectedMember && member.memberId !== selectedMember.memberId ? (
              <></>
            ) : (
              <div
                className={`flex flex-row items-center gap-1 ${labelFont} w-full justify-center`}>
                <span className="text-black font-bold">잔여 밥풀 :</span>
                <span className={`text-black font-bold`}>{riceCount} 밥풀</span>
              </div>
            ))}
          {memberRanking && memberRankings && (
            <>
              <div
                className={`flex flex-row items-center gap-1 ${labelFont} w-full justify-center`}>
                <span className="text-black font-bold">칭호 랭킹 :</span>
                <span className={`text-black font-bold`}>
                  {memberRankings.data.titleRank || "-"} 위
                </span>
              </div>
              <div
                className={`flex flex-row items-center gap-1 ${labelFont} w-full justify-center`}>
                <span className="text-black font-bold">레시피 랭킹 :</span>
                <span className={`text-black font-bold`}>
                  {memberRankings.data.recipeBoardRank || "-"} 위
                </span>
              </div>
              <div
                className={`flex flex-row items-center gap-1 ${labelFont} w-full justify-center`}>
                <span className="text-black font-bold">북마크 랭킹 :</span>
                <span className={`text-black font-bold`}>
                  {memberRankings.data.bookmarkRank || "-"} 위
                </span>
              </div>
              <div
                className={`flex flex-row items-center gap-1 ${labelFont} w-full justify-center`}>
                <span className="text-black font-bold">좋아요 랭킹 :</span>
                <span className={`text-black font-bold`}>
                  {memberRankings.data.likeRank || "-"} 위
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonProfile;
