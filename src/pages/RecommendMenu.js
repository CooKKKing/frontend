import React, { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import CommonIngredient from "../components/CommonIngredient";
import ingredientsData from "../data/ingredientsData";
import IngredientCircle from "../components/IngredientsCircle";
import Button from "../components/Button";
import useIsMobile from "../hooks/useIsMobile";

const MAX_MAIN = 6;
const MAX_SEASONING = 3;

const RecommendMenu = () => {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const { isMobile, isTablet } = useIsMobile();

  const mainOnBoard = selected.filter(i => i.categoryId === "main");
  const seasoningOnBoard = selected.filter(i => i.categoryId === "seasoning");

  const filtered = useMemo(() => {
    if (!search) return [];
    return ingredientsData.filter(
      i =>
        i.name.includes(search) &&
        !selected.some(sel => sel.name === i.name)
    );
  }, [search, selected]);

  const handleAdd = item => {
    if (item.categoryId === "main" && mainOnBoard.length >= MAX_MAIN) return;
    if (item.categoryId === "seasoning" && seasoningOnBoard.length >= MAX_SEASONING) return;
    if (selected.some(i => i.name === item.name)) return;
    setSelected(prev => [...prev, item]);
    setSearch("");
  };

  const handleRemove = name => {
    setSelected(prev => prev.filter(i => i.name !== name));
  };

  // *수정* PC/Tablet/Mobile 레이아웃 분기
  if (isTablet || isMobile) {
    // 태블릿/모바일: 세로 배치
    return (
        <div className="w-full h- h-full flex flex-col items-center p-2 md:p-6 mx-auto">
          <div className="w-full flex items-start justify-start">
            <h2 className="text-2xl md:text-3xl font-bold">레시피 추천</h2>
          </div>
          {/* 상단: 검색/카테고리/재료 */}
          <div className="w-full flex flex-col items-start mt-3">
            <span className="font-bold text-lg md:text-xl mb-1">재료</span>
            <SearchBar
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="PlaceHolder"
              onSearch={() => {}}
            />
            <div className="w-full flex flex-wrap justify-start gap-x-4 gap-y-2 mt-2">
              <CommonIngredient
                items={selected.map(i => i.name)}
                onRemove={handleRemove}
                size={{ fontSize: 16 }}
              />
            </div>
            {search && (
              <div className="mt-4 w-full">
                <div className="w-full flex flex-wrap items-start gap-4 justify-start">
                  {filtered.length === 0 ? (
                    <span className="text-gray-400">검색 결과가 없습니다.</span>
                  ) : (
                    filtered.map(item => (
                      <button
                        key={item.name}
                        className="flex flex-col items-center mr-4 mb-4"
                        style={{ width: 100 }}
                        onClick={() => handleAdd(item)}
                        disabled={
                          selected.some(sel => sel.name === item.name) ||
                          (item.categoryId === "main" && mainOnBoard.length >= MAX_MAIN) ||
                          (item.categoryId === "seasoning" && seasoningOnBoard.length >= MAX_SEASONING)
                        }
                      >
                        <div
                          className="flex items-center justify-center rounded-full"
                          style={{
                            width: 70, height: 70,
                            background: "#FCF7E9",
                            overflow: "hidden",
                            marginBottom: 4,
                          }}
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            style={{
                              width: 48,
                              height: 48,
                              objectFit: "contain",
                            }}
                          />
                        </div>
                        <span className="mt-1 text-base font-bold text-gray-800" style={{ lineHeight: 1.1, fontSize: 16 }}>
                          {item.name}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
            {!search && selected.length === 0 && (
              <div className="mt-8 text-gray-500 text-base">현재 가지고 계신 재료를 검색해 주세요.</div>
            )}
          </div>
          {/* 도마 영역 */}
          <div className="w-full h-full flex flex-col items-center justify-center mt-4">
            <div
              className="relative h-auto w-full flex items-center justify-center rotate-90"
            >
              <img
                src="/assets/images/doma/1.png"
                alt="도마"
                width="100%"
                style={{
                  transform: "rotate(90deg)", // *수정* 태블릿/모바일에서만 가로로 회전
                }}
                draggable={false}
              />
              {/* 도마 위 2행 3열, 이미지만 크게! */}
              <div
                className="absolute left-0 top-0 w-full h-full flex flex-wrap gap-y-14 items-around content-center justify-around -rotate-90"
                style={{
                  padding: "40px 0",
                  // gap: "40px"
                }}
              >
                {Array.from({ length: 6 }).map((_, idx) =>
                  mainOnBoard[idx] ? (
                    <div
                      key={mainOnBoard[idx].name}
                      className="flex items-center justify-center"
                      style={{
                        width: "calc(33% - 16px)",
                        minWidth: 0,
                        height: "auto",
                      }}
                    >
                      <img
                        src={mainOnBoard[idx].imageUrl}
                        alt={mainOnBoard[idx].name}
                        style={{
                          width: 130,
                          height: 130,
                          objectFit: "contain",
                        }}
                        draggable={false}
                        onClick={() => handleRemove(mainOnBoard[idx].name)}
                      />
                    </div>
                  ) : (
                    <div
                      key={idx}
                      style={{
                        width: "calc(33.333% - 16px)",
                        minWidth: 0,
                        height: 100,
                        opacity: 0,
                      }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
          {/* 시즈닝 영역 */}
          <div className="w-full flex flex-row items-center justify-center mt-4 gap-8">
            {seasoningOnBoard.length === 0 && (
              <div className="text-gray-300 text-lg">양념 없음</div>
            )}
            {seasoningOnBoard.slice(0, 3).map(item => (
              <div key={item.name} className="flex flex-col items-center">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: 150, height: 150, objectFit: "contain" }}
                  draggable={false}
                  onClick={() => handleRemove(item.name)}
                />
                {/* <span className="mt-2 text-base font-bold text-gray-700">{item.name}</span> */}
              </div>
            ))}
          </div>
          {/* 버튼 */}
          <div className="w-full mt-4">
            <Button
              value="레시피 추천받기"
              size="full"
              variant="orange"
              onClick={() => alert("레시피 추천받기")}
            />
          </div>
        </div>
    );
  }

  // PC: 기존 배치
  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden min-w-0 min-h-0">
      <div className="flex-1 flex flex-col w-full h-full min-w-0 min-h-0">
        <div className="w-full flex items-start justify-start px-8">
          <h2 className="text-3xl font-bold">레시피 추천</h2>
        </div>
        <div className="flex-1 flex flex-row w-full h-full min-h-0 min-w-0 pl-8 gap-2">
          {/* 좌측: 검색/선택 */}
          <div className="flex flex-col flex-[1.2] min-w-0 min-h-0">
            <div className="border border-gray-300 rounded-xl bg-white p-4 flex flex-col w-full h-full min-h-0 min-w-0">
              <div className="flex items-center mb-2 w-full">
                <span className="font-bold text-xl mr-2 flex flex-row">재료</span>
                <div className={isMobile || isTablet ? "w-full" : "w-full"}> {/* *수정* */}
                  <SearchBar
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="PlaceHolder"
                    onSearch={() => {}}
                  />
                </div>
              </div>
              <div className="w-full flex flex-wrap justify-start gap-x-6 gap-y-4">
                <CommonIngredient
                  items={selected.map(i => i.name)}
                  onRemove={handleRemove}
                  size={{ fontSize: 16 }}
                />
              </div>
              {search && (
                <div className="mt-4">
                  <div className="w-full flex flex-wrap items-start gap-4 justify-start">
                    {filtered.length === 0 ? (
                      <span className="text-gray-400">검색 결과가 없습니다.</span>
                    ) : (
                      filtered.map(item => (
                        <button
                          key={item.name}
                          className="flex flex-col items-center mr-4 mb-4"
                          style={{ width: 100 }}
                          onClick={() => handleAdd(item)}
                          disabled={
                            selected.some(sel => sel.name === item.name) ||
                            (item.categoryId === "main" && mainOnBoard.length >= MAX_MAIN) ||
                            (item.categoryId === "seasoning" && seasoningOnBoard.length >= MAX_SEASONING)
                          }
                        >
                          <div
                            className="flex items-center justify-center rounded-full"
                            style={{
                              width: 70, height: 70,
                              background: "#FCF7E9",
                              overflow: "hidden",
                              marginBottom: 4,
                            }}
                          >
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              style={{
                                width: 48,
                                height: 48,
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          <span className="mt-1 text-base font-bold text-gray-800" style={{ lineHeight: 1.1, fontSize: 16 }}>
                            {item.name}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
              {!search && selected.length === 0 && (
                <div className="mt-8 text-gray-500 text-base">현재 가지고 계신 재료를 검색해 주세요.</div>
              )}
              <div className="w-full mt-auto">
                <Button
                  value="레시피 추천받기"
                  size="full"
                  variant="orange"
                  onClick={() => alert("레시피 추천받기")}
                />
              </div>
            </div>
          </div>
          {/* 중앙: 도마 */}
          <div className="flex flex-col w-full h-full flex-[1.1] min-w-0 min-h-0">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="/assets/images/doma/1.png"
                alt="도마"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "40px",
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.08)",
                  display: "block",
                  // PC는 회전 없음
                }}
                draggable={false}
              />
              {/* 도마 위 2행 3열, 이미지만 크게! */}
              <div
                className="absolute left-0 right-5 top-0 w-full h-full flex flex-wrap"
                style={{
                  padding: "40px 0",
                  gap: "24px",
                }}
              >
                {Array.from({ length: 6 }).map((_, idx) =>
                  mainOnBoard[idx] ? (
                    <div
                      key={mainOnBoard[idx].name}
                      className="flex items-center justify-center"
                      style={{
                        width: "calc(50% - 16px)",
                        minWidth: 0,
                        height: 120,
                      }}
                    >
                      <img
                        src={mainOnBoard[idx].imageUrl}
                        alt={mainOnBoard[idx].name}
                        style={{
                          width: 150,
                          height: 150,
                          objectFit: "contain",
                        }}
                        draggable={false}
                        onClick={() => handleRemove(mainOnBoard[idx].name)}
                      />
                    </div>
                  ) : (
                    <div
                      key={idx}
                      style={{
                        width: "calc(33.333% - 16px)",
                        minWidth: 0,
                        height: 120,
                        opacity: 0,
                      }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
          {/* 우측: 시즈닝(양념) */}
          <div className="flex flex-col items-start justify-start flex-[0.7] min-w-0 min-h-0">
            <div className="w-full h-full rounded-md flex flex-col items-center justify-center border border-gray-400">
              {seasoningOnBoard.length === 0 && (
                <div className="text-gray-300 text-lg mt-8">양념 없음</div>
              )}
              {seasoningOnBoard.slice(0, 3).map(item => (
                <div key={item.name} className="flex flex-col items-center mb-8">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: 200, height: 200, objectFit: "contain" }}
                    draggable={false}
                    onClick={() => handleRemove(item.name)}
                  />
                  {/* <span className="mt-2 text-lg font-bold text-gray-700">{item.name}</span> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendMenu;
