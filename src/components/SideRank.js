import React from "react";
import Profile from "./Profile";
import useIsMobile from "../hooks/useIsMobile";
import { FaPlusCircle } from "react-icons/fa";

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
                <FaPlusCircle size={20} className="w-5 h-5"/>
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