import React from "react";

/**
 * props:
 * - name: 재료명
 * - imageUrl: 이미지 경로
 * - onClick: 클릭 핸들러 (도마에 추가)
 * - disabled: 이미 도마에 있으면 true
 * - showBg: 배경 표시 여부 (도마 위에서는 false)
 */
const IngredientCircle = ({ name, imageUrl, onClick, disabled, showBg = true }) => (
  <button
    type="button"
    className={`flex flex-col items-center focus:outline-none bg-transparent border-none p-2 transition hover:scale-105 ${
      disabled ? "opacity-40 cursor-not-allowed" : ""
    }`}
    onClick={onClick}
    disabled={disabled}
    style={{ width: 90 }}
  >
    <div
      className="flex items-center justify-center rounded-full"
      style={{
        width: 70,
        height: 70,
        background: showBg ? "#FCF7E9" : "transparent",
        overflow: "hidden",
        marginBottom: 4,
      }}
    >
      <img
        src={imageUrl}
        alt={name}
        style={{
          width: 48,
          height: 48,
          objectFit: "contain",
        }}
      />
    </div>
    <span
      className="mt-1 text-base font-bold text-gray-800"
      style={{ lineHeight: 1.1, fontSize: 16 }}
    >
      {name}
    </span>
  </button>
);

export default IngredientCircle;
