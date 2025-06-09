import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderPC from "./HeaderPC";
import HeaderMobile from "./HeaderMobile";
import useIsMobile from "../hooks/useIsMobile";
import RankingSection from "./RankingSection";
import MyPageMenu from "./MyPageMenu";
import ShopMenu from "./ShopMenu";
import CameraColorSelector from "./CameraColorSelector";
import CategoryMenuList from "./CategoryMenuList";
import { useDictionary } from "../contexts/DictionaryContext";
import { useShowDetail } from "../contexts/ShowDetailContext";
import CommonProfile from "./CommonProfile";
import { useUser } from "../hooks/useUser";
import { useSelectedMember } from "../contexts/SelectedMemberContext";
import random from "../assets/random.png";
import { useRecommendMenu } from "../contexts/RecommendMenuContext";
import Button from "./buttons/Button";
// 레이아웃 컴포넌트 => 왼쪽 오른쪽 섹션 레이아웃 형식
const Layout = ({ children }) => {
  const { isMobile, isTablet } = useIsMobile();
  const location = useLocation();
  const { showDetail: showDetailContext } = useShowDetail();
  const { member } = useUser();
  const navigate = useNavigate();
  const { selectedMember } = useSelectedMember();
  const { recommendMenu } = useRecommendMenu();

  console.log("member -=-=-=-=-=-=-", member);

  const { activeCategory, setActiveCategory } = useDictionary();

  // console.log("showDetail", showDetailContext);

  // 현재 경로에 따른 activeMenu 설정
  const getActiveMenu = (path) => {
    // 기본 경로 체크
    if (path === "/") return "메인";
    if (path === "/recommend") return "추천메뉴";
    if (path === "/ranking") return "랭킹";
    if (path === "/dictionary") return "도감";
    if (path === "/signup") return "회원가입";
    if (path === "/login") return "로그인";

    // 마이페이지 경로 체크
    if (path.startsWith("/mypage")) {
      return "마이페이지";
    }

    // 상점 경로 체크
    if (path.startsWith("/shop")) {
      return "상점";
    }

    return "";
  };

  // 현재 페이지에 따른 사이드 메뉴 결정
  const getSideMenu = () => {
    if (location.pathname.startsWith("/mypage")) {
      return (
        <>
          {!isMobile && (
            <div
              className={`flex-shrink-0 h-fit ${
                isTablet ? "w-[190px]" : "w-[360px]"
              }`}>
              {member && (
                <CommonProfile
                  memberId={member.memberId}
                  memberRanking={false}
                  profileId={member.profileImagePath}
                  nickname={member.nickName}
                  riceCount={member.ricePoint}
                  titleType={
                    member.titles.find(
                      (t) => t.titleId === member.activeTitleId
                    )?.title?.type
                  }
                  titleImagePath={
                    member.titles.find(
                      (t) => t.titleId === member.activeTitleId
                    )?.title?.imagePath
                  }
                  titleLevel={
                    member.titles.find(
                      (t) => t.titleId === member.activeTitleId
                    )?.title?.level
                  }
                  titleName={
                    member.titles.find(
                      (t) => t.titleId === member.activeTitleId
                    )?.title?.name
                  }
                />
              )}
              <div className="bg-white pt-6 border border-border mt-6">
                <MyPageMenu />
              </div>
            </div>
          )}
        </>
      );
    }
    if (location.pathname.startsWith("/shop")) {
      return (
        <div
          className={`bg-white pt-6 border border-border flex-shrink-0 h-fit ${
            isTablet ? "w-[190px]" : "w-[360px]"
          }`}>
          <ShopMenu />
        </div>
      );
    }
    if (location.pathname === "/dictionary") {
      return (
        <div
          className={`bg-white border border-border flex-shrink-0 h-fit ${
            isTablet ? "w-[190px]" : "w-[360px]"
          }`}>
          {showDetailContext ? (
            <CategoryMenuList
              onSelect={setActiveCategory}
              activeCategory={activeCategory}
            />
          ) : (
            <CameraColorSelector />
          )}
        </div>
      );
    }
    if (location.pathname === "/ranking") {
      return (
        <div
          className={` flex-shrink-0 h-fit ${
            isTablet ? "w-[190px]" : "w-[360px]"
          }`}>
          {selectedMember ? (
            <CommonProfile
              memberId={selectedMember.id}
              profileId={selectedMember.profileImagePath}
              nickname={selectedMember.nickName}
              riceCount={selectedMember.ricePoint}
              titleType={
                selectedMember.titles.find(
                  (t) => t.titleId === selectedMember.activeTitleId
                )?.title?.type
              }
              titleImagePath={
                selectedMember.titles.find(
                  (t) => t.titleId === selectedMember.activeTitleId
                )?.title?.imagePath
              }
              titleLevel={
                selectedMember.titles.find(
                  (t) => t.titleId === selectedMember.activeTitleId
                )?.title?.level
              }
              titleName={
                selectedMember.titles.find(
                  (t) => t.titleId === selectedMember.activeTitleId
                )?.title?.name
              }
            />
          ) : (
            member && (
              <CommonProfile
                memberId={member.memberId}
                profileId={member.profileImagePath}
                nickname={member.nickName}
                riceCount={member.ricePoint}
                titleType={
                  member.titles.find((t) => t.titleId === member.activeTitleId)
                    ?.title?.type
                }
                titleImagePath={
                  member.titles.find((t) => t.titleId === member.activeTitleId)
                    ?.title?.imagePath
                }
                titleLevel={
                  member.titles.find((t) => t.titleId === member.activeTitleId)
                    ?.title?.level
                }
                titleName={
                  member.titles.find((t) => t.titleId === member.activeTitleId)
                    ?.title?.name
                }
              />
            )
          )}
        </div>
      );
    }
    if (location.pathname === "/recommend") {
      const onButtonClick = () => {
        navigate("/recommend/recommendList");
      };

      return (
        <div
          className={`bg-white border border-border flex-shrink-0 h-fit ${
            isTablet ? "w-[300px]" : "w-[360px]"
          }`}>
          <div
            className={`bg-white w-full ${
              isMobile ? "h-max px-2 py-4" : "h-fit p-4"
            }`}>
            <div className={`w-full ${isMobile ? "flex justify-between" : ""}`}>
              <h2
                className={`text-xl text-center font-bold ${
                  isMobile ? "" : "mb-1"
                }`}>
                랜덤박스
              </h2>
            </div>
            <div
              className={`${
                isTablet ? "p-1" : "p-6"
              } border border-border rounded-md`}>
              {recommendMenu ? (
                <div>
                  {/* <h4>{recommendMenu.menuName}</h4> */}
                  <img
                    className="w-full mb-2"
                    src={recommendMenu.image}
                    alt={recommendMenu.menuName}
                  />
                  <Button
                    size={"full"}
                    variant={"green"}
                    disabled={false}
                    value={`${recommendMenu.menuName} 게시글`}
                    onClick={onButtonClick}
                    height="36px"
                  />
                </div>
              ) : (
                <img src={random} alt="" />
              )}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        className={`bg-white py-6 border border-border flex-shrink-0 h-fit ${
          isTablet ? "w-[260px]" : "w-[360px]"
        }`}>
        <RankingSection />
      </div>
    );
  };

  return (
    <div className="flex h-full max-h-screen bg-background-gradient">
      {/* PC 또는 모바일 헤더 */}
      {isMobile ? (
        <HeaderMobile activeMenu={getActiveMenu(location.pathname)} />
      ) : (
        <HeaderPC activeMenu={getActiveMenu(location.pathname)} />
      )}

      <div
        className={`
        w-full
        flex flex-grow
        ${isMobile ? "mt-16 flex-col" : "max-w-[1920px] mx-auto w-full"}
      `}>
        <div
          className={`
          flex w-full h-full p-6 gap-6
          ${isMobile ? "flex-col-reverse" : "flex-row"}
        `}>
          {/* 메인 컨텐츠 영역 */}
          <main
            className={`
            bg-white border border-border p-6
            ${isMobile ? "w-full h-full" : "flex-1"}
            overflow-y-auto scrollbar-hide
          `}>
            {children}
          </main>
          {isMobile && (
            <div className="w-full">
              {location.pathname === "/dictionary" && (
                <>
                  {showDetailContext ? (
                    <div className="border border-border">
                      <CategoryMenuList
                        onSelect={setActiveCategory}
                        activeCategory={activeCategory}
                      />
                    </div>
                  ) : (
                    <div className="border border-border">
                      <CameraColorSelector />
                    </div>
                  )}
                </>
              )}
              {location.pathname === "/mypage" && member && (
                <div className="border border-border">
                  <CommonProfile
                    profileId={member.profileImagePath}
                    nickname={member.nickName}
                    memberRanking={location.pathname !== "/mypage"}
                    riceCount={member.ricePoint}
                    titleType={member.titles[0].title.type}
                    titleImagePath={member.titles[0].title.imagePath}
                    titleLevel={member.titles[0].title.level}
                    titleName={member.titles[0].title.name}
                  />
                </div>
              )}
              {location.pathname === "/ranking" && member && (
                <div >
                  <CommonProfile
                    profileId={
                      selectedMember
                        ? selectedMember.profileImagePath
                        : member.profileImagePath
                    }
                    nickname={
                      selectedMember ? selectedMember.nickName : member.nickName
                    }
                    memberRanking={location.pathname !== "/mypage"}
                    riceCount={
                       !selectedMember ? member.ricePoint : selectedMember?.memberId === member.memberId ? member.ricePoint : false
                    }
                    titleType={
                      selectedMember
                        ? selectedMember.titles.find(
                            (t) => t.titleId === selectedMember.activeTitleId
                          )?.title?.type
                        : member.titles.find(
                            (t) => t.titleId === member.activeTitleId
                          )?.title?.type
                    }
                    titleImagePath={
                      selectedMember
                        ? selectedMember.titles.find(
                            (t) => t.titleId === selectedMember.activeTitleId
                          )?.title?.imagePath
                        : member.titles.find(
                            (t) => t.titleId === member.activeTitleId
                          )?.title?.imagePath
                    }
                    titleLevel={
                      selectedMember
                        ? selectedMember.titles.find(
                            (t) => t.titleId === selectedMember.activeTitleId
                          )?.title?.level
                        : member.titles.find(
                            (t) => t.titleId === member.activeTitleId
                          )?.title?.level
                    }
                    titleName={
                      selectedMember
                        ? selectedMember.titles.find(
                            (t) => t.titleId === selectedMember.activeTitleId
                          )?.title?.name
                        : member.titles.find(
                            (t) => t.titleId === member.activeTitleId
                          )?.title?.name
                    }
                  />
                </div>
              )}
            </div>
          )}

          {/* 오른쪽 박스 */}
          {!isMobile && getSideMenu()}
        </div>
      </div>
    </div>
  );
};

export default Layout;
