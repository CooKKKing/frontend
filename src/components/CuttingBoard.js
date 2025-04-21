import React from "react";
import useIsMobile from "../hooks/useIsMobile";

const CuttingBoard = ({ items, onItemClick }) => {
  const { isTablet, isMobile } = useIsMobile();

  const isPC = !isTablet && !isMobile;
  const isRow = isPC;

  // 도마 위 재료 분리
  const seasoningItems = items.filter(i => i.categoryId === "seasoning");
  const normalItems = items.filter(i => i.categoryId !== "seasoning");

  // 한 줄에 2개(PC) 또는 3개(모바일/태블릿)
  const itemsPerRow = isPC ? 2 : 3;
  const maxRows = isPC ? 3 : 2;

  // 반응형 단위로 버튼 크기/도마/시즈닝 크기
  const btnMin = isPC ? "min(8vw,60px)" : "min(16vw,36px)";
  const btnMax = isPC ? "max(12vw,120px)" : "max(24vw,70px)";
  const seasoningW = isPC ? "clamp(80px,18vw,180px)" : "100%";
  const seasoningH = isPC ? "100%" : "clamp(70px,14vw,120px)";

  // 도마 wrapper height/width/비율
  const domaWrapperClass = isRow
    ? "flex-1 w-0 h-full flex items-center justify-center overflow-hidden relative min-w-0 min-h-0"
    : "w-full h-2/3 flex items-center justify-center overflow-hidden relative min-w-0 min-h-0";

  const domaImgStyle = {
    objectFit: "cover",
    objectPosition: "center center",
    width: "100%",
    height: "100%",
    display: "block",
    pointerEvents: "none",
    userSelect: "none",
  };

  return (
    <div className={`flex ${isRow ? "flex-row" : "flex-col"} w-full h-full min-w-0 min-h-0`}>
      {/* 도마 wrapper (항상 렌더링!) */}
      <div className={domaWrapperClass}>
        {/* 도마 이미지 (항상 렌더링!) */}
        <img
          src="/assets/images/doma/1.png"
          alt="도마"
          className={`w-full h-full absolute left-0 top-0 z-10 ${isPC ? "rotate-90" : ""}`}
          draggable={false}
          style={domaImgStyle}
        />
        {/* 도마 위 재료 (flex-wrap, grid X) */}
        <div
          className="absolute left-0 top-0 w-full h-full flex flex-wrap items-center justify-center z-20"
          style={{
            pointerEvents: "auto",
            boxSizing: "border-box",
          }}
        >
          {/* 빈 flex 아이템으로 shrink 방지 */}
          {normalItems.length === 0 && (
            <div
              style={{
                flex: `0 0 50%`,
                minWidth: btnMin,
                minHeight: btnMin,
                opacity: 0,
              }}
            />
          )}
          {Array.from({ length: itemsPerRow * maxRows }).map((_, idx) => {
            const item = normalItems[idx];
            return (
              <div
                key={idx}
                className="flex items-center justify-center"
                style={{
                  flex: `0 0 ${100 / itemsPerRow}%`,
                  minWidth: btnMin,
                  maxWidth: btnMax,
                  minHeight: btnMin,
                  maxHeight: btnMax,
                  height: `${100 / maxRows}%`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxSizing: "border-box",
                }}
              >
                {item && (
                  <button
                    type="button"
                    onClick={() => onItemClick(item.name)}
                    className="flex items-center justify-center rounded-full bg-transparent border-none overflow-hidden transition"
                    style={{
                      width: "70%",
                      height: "70%",
                      minWidth: btnMin,
                      minHeight: btnMin,
                      maxWidth: btnMax,
                      maxHeight: btnMax,
                      background: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      boxSizing: "border-box",
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* 시즈닝(양념) */}
      {seasoningItems.length > 0 && (
        <div
          className={
            isRow
              ? "flex flex-col items-center justify-center flex-shrink-0 h-full"
              : "flex flex-row w-full mt-4 gap-4 justify-center flex-shrink-0"
          }
          style={{
            width: seasoningW,
            height: seasoningH,
            overflow: "hidden",
            boxSizing: "border-box",
            borderLeft: isRow ? "1px solid #eee" : undefined,
            background: "white",
            minWidth: isRow ? "80px" : undefined,
            maxWidth: isRow ? "180px" : undefined,
          }}
        >
          {seasoningItems.map((item, i) => (
            <div key={item.name} className="flex flex-col items-center justify-center mb-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{
                  width: isRow ? "80%" : "70px",
                  height: isRow ? "auto" : "70px",
                  objectFit: "contain",
                  marginBottom: 0,
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                className="select-none"
                draggable={false}
                onClick={() => onItemClick(item.name)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CuttingBoard;
