import React from "react";
import Profile from "./Profile";
import useIsMobile from "../hooks/useIsMobile";

const SideRank = ({
    title,
    images,
    onPlusClick,
    member,
    openModal,
    closeModal,
    setIsLoginModalOpen,
    bgColor
}) => {
    const { isTablet } = useIsMobile();
    return (
        <div className={`${bgColor} rounded-lg p-4 mb-4 shadow-sm`}>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">{title}</h3>
                {/* <button className="text-green-600" onClick={() => goToRankingTab(0)}> */}
                <button className="text-green-600" onClick={
                member 
                ? () => onPlusClick()
                : () => openModal({
                    title: "로그인 후 이용가능한 서비스입니다.",
                    description: "로그인하러 가시겠습니까 ?",
                    SuccessButton: "로그인 하기",
                    onConfirm: () => { closeModal(); setIsLoginModalOpen(true); }
                })
                }>
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
                {images.map((img, idx) => (
                <div key={`cooking-king-${idx}`} className="flex flex-col items-center">
                    <Profile size={isTablet ? 'xxs' : 'xs'} image={img.image} rank={img.rank} />
                </div>
                ))}
            </div>
        </div>
        );
    }

export default SideRank;