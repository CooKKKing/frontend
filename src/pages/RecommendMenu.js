import React, { useState, useMemo, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CommonIngredient from "../components/CommonIngredient";
import IngredientCircle from "../components/IngredientsCircle";
import Button from "../components/buttons/Button";
import useIsMobile from "../hooks/useIsMobile";
import PageTitle from "../components/PageTitle";
import { getIngredients } from "../api/queries/ingredientService";
import { getIngredient } from "../api/queries/ingredientService";
import { getRecommendMenu } from "../api/mutations/menuService";
import { useRecommendMenu } from "../contexts/RecommendMenuContext";
import useBasicModal from "../hooks/useBasicModal";
import BasicModal from "../components/modals/BasicModal";
import { useToast } from "../hooks/useToast";


const MAX_MAIN = 6;
const MAX_SEASONING = 3;

const RecommendMenu = () => {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const { isMobile, isTablet } = useIsMobile();
  const [ingredients, setIngredients] = useState([]);
  const {recommendMenu ,setRecommendMenu} = useRecommendMenu();
  const { showToast } = useToast();
    const { openModal, closeModal, open, modalProps } = useBasicModal();

  const mainOnBoard = selected.filter(i => i.dtype === "MAIN");
  const seasoningOnBoard = selected.filter(i => i.dtype === "SEASONING");

  // 재료 전체 목록 받아오는 API 사용용
  useEffect(()=> {
    const ingredientFetch = async () => {
      try {
        const data = await getIngredients();
        setIngredients(data.data);
        return data.data;
      } catch(error) {
        console.log(error);
      }
  }

  ingredientFetch();
  }, []);

  useEffect(() => {
    setRecommendMenu(null);
  },[selected])

  const filtered = useMemo(() => {
    if (!search) return [];
    return ingredients.filter(
      i =>
        i.ingredientName.includes(search) &&
        !selected.some(sel => sel.ingredientName === i.ingredientName)
    );
  }, [search, selected, ingredients]);

  const handleAdd = item => {
    if (item.categoryId === "MAIN" && mainOnBoard.length >= MAX_MAIN) return;
    if (item.categoryId === "SEASONING" && seasoningOnBoard.length >= MAX_SEASONING) return;
    if (selected.some(i => i.ingredientName === item.ingredientName)) return;
    setSelected(prev => [...prev, item]);
    setSearch("");
  };

  const handleRemove = ingredientName => {
    setSelected(prev => prev.filter(i => i.ingredientName !== ingredientName));
  };

  const handleSubmit = async () => {
    try {
      const ingredientPayload = {
        ingredients: 
          selected.map(ingredient => ({
            ingredientId: ingredient.ingredientId,
            type: ingredient.dtype 
          }))
      };

      const recommendResponse = await getRecommendMenu(JSON.stringify(ingredientPayload));
      setRecommendMenu(recommendResponse);
      
      // showToast('', 'success');  
    } catch (error) {
      console.error('실패?', error.response?.data.message || error);
      showToast(error.response?.data.message || "다시 시도해주세요.", 'error');
    }
  };

  const mobileHandleSubmit = async () => {
    try {
      const ingredientPayload = {
        ingredients: 
          selected.map(ingredient => ({
            ingredientId: ingredient.ingredientId,
            type: ingredient.dtype 
          }))
      };

      const recommendResponse = await getRecommendMenu(JSON.stringify(ingredientPayload));
      setRecommendMenu(recommendResponse);
      
      openModal({
        title: "추천 메뉴",
        description: recommendMenu.menuName,
        img: recommendMenu.image,
        OrangeButton: "재추천",
        GreenButton: "레시피 보러가기",
        onConfirm: closeModal(),
        onRecommend: (() => console.log("재추천버튼"))
      })
    } catch (error) {
      console.error('실패?', error.response?.data || error);
    }
  };

  if (isTablet || isMobile) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center p-2 md:p-6 mx-auto">
        <div className="w-full flex items-start justify-start">
          <h2 className="text-2xl md:text-3xl font-bold">레시피 추천</h2>
        </div>
        {/* 상단: 검색/카테고리/재료 */}
        <div className="w-full flex flex-col items-start mt-3 z-[2]">
          <span className="font-bold text-lg md:text-xl mb-1">재료</span>
          {/* 수정: SearchBar를 w-full, min-w-0, flex-1로 감싸고 overflow: hidden 제거 */}
          <div className="w-full flex flex-row items-center">
            <div className="flex-1 min-w-0">
              <SearchBar
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="PlaceHolder"
                onSearch={() => {}}
              />
            </div>
          </div>
          <div className="w-full flex flex-wrap justify-start gap-x-4 gap-y-2 mt-2">
            <CommonIngredient
              items={selected.map(i => i.ingredientName)}
              onRemove={handleRemove}
              size={{ fontSize: 16 }}
            />
          </div>
          {search && (
            <div className="mt-4 w-full z-[2]">
              <div className="w-full flex flex-wrap items-start gap-4 justify-start">
                {filtered.length === 0 ? (
                  <span className="text-gray-400">검색 결과가 없습니다.</span>
                ) : (
                  filtered.map(item => (
                    <button
                      key={item.ingredientId}
                      className="flex flex-col items-center mr-4 mb-4"
                      style={{ width: 100 }}
                      onClick={() => handleAdd(item)}
                      disabled={
                        selected.some(sel => sel.ingredientName === item.ingredientName) ||
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
                          src={item.image}
                          alt={item.ingredientName}
                          style={{
                            width: 48,
                            height: 48,
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <span className="mt-1 text-base font-bold text-gray-800" style={{ lineHeight: 1.1, fontSize: 16 }}>
                        {item.ingredientName}
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
            className="relative h-auto w-full flex items-center justify-center rotate-90 z-[1]"
          >
            <img
              src="/assets/images/doma/1.png"
              alt="도마"
              width="100%"
              style={{
                transform: "rotate(90deg)",
              }}
              draggable={false}
            />
            {/* 도마 위 2행 3열, 이미지만 크게! */}
            <div
              className="absolute left-0 top-0 w-full h-full flex flex-wrap gap-y-14 items-around content-center justify-around -rotate-90"
              style={{
                padding: "40px 0",
              }}
            >
              {Array.from({ length: 6 }).map((_, idx) =>
                mainOnBoard[idx] ? (
                  <div
                    key={mainOnBoard[idx].ingredientId}
                    className="flex items-center justify-center"
                    style={{
                      width: "calc(33% - 16px)",
                      minWidth: 0,
                      height: "auto",
                    }}
                  >
                    <img
                      src={mainOnBoard[idx].image}
                      alt={mainOnBoard[idx].ingredientName}
                      style={{
                        width: 130,
                        height: 130,
                        objectFit: "contain",
                        cursor:"pointer"
                      }}
                      draggable={false}
                      onClick={() => handleRemove(mainOnBoard[idx].ingredientName)}
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
            <div key={item.ingredientId} className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.ingredientName}
                style={{ width: 150, height: 150, objectFit: "contain" }}
                draggable={false}
                onClick={() => handleRemove(item.ingredientName)}
              />
            </div>
          ))}
        </div>
        {/* 버튼 */}
        <div className="w-full mt-4">
          {isMobile ? 
          <Button
            value="레시피 추천받기"
            size="full"
            variant="orange"
            onClick={mobileHandleSubmit}
          />
          :
          <Button
            value="레시피 추천받기"
            size="full"
            variant="orange"
            onClick={handleSubmit}
          />
        }
          
        </div>
         <BasicModal open={open} onClose={closeModal} {...modalProps} />

      </div>
    );
  }

  // PC 레이아웃
  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden min-w-0 min-h-0">
      <div className="flex-1 flex flex-col w-full h-full min-w-0 min-h-0">
        <PageTitle title="레시피 추천" isMargin={false} />
        <div className="flex-1 flex flex-row w-full h-full min-h-0 min-w-0 gap-2">
          {/* 좌측: 검색/선택 */}
          <div className="flex flex-col flex-[1.2] min-w-0 min-h-0 z-[2]">
            <div className="border border-gray-300 rounded-xl bg-white p-4 flex flex-col w-full h-full min-h-0 min-w-0">
              <div className="flex items-center mb-2 w-full min-w-0">
                <span className="font-bold text-xl flex flex-row w-12">재료</span>
                {/* 수정: SearchBar를 flex-1 min-w-0로 감싸고 overflow: hidden 제거 */}
                <div className="flex-1 min-w-0">
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
                  items={selected.map(i => i.ingredientName)}
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
                          key={item.ingredientId}
                          className="flex flex-col items-center mr-4 mb-4"
                          style={{ width: 100 }}
                          onClick={() => handleAdd(item)}
                          disabled={
                            selected.some(sel => sel.name === item.ingredientName) ||
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
                              src={item.image}
                              alt={item.ingredientName}
                              style={{
                                width: 48,
                                height: 48,
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          <span className="mt-1 text-base font-bold text-gray-800" style={{ lineHeight: 1.1, fontSize: 16 }}>
                            {item.ingredientName}
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
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
          {/* 중앙: 도마 */}
          <div className="flex flex-col w-full h-full flex-[1.1] min-w-0 min-h-0">
            <div className="relative w-full h-full flex items-center justify-center z-[1]">
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
                      key={mainOnBoard[idx].ingredientId}
                      className="flex items-center justify-center"
                      style={{
                        width: "calc(50% - 16px)",
                        minWidth: 0,
                        height: 120,
                      }}
                    >
                      <img
                        src={mainOnBoard[idx].image}
                        alt={mainOnBoard[idx].ingredientName}
                        style={{
                          width: 150,
                          height: 150,
                          objectFit: "contain",
                        }}
                        draggable={false}
                        onClick={() => handleRemove(mainOnBoard[idx].ingredientName)}
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
                <div key={item.ingredientId} className="flex flex-col items-center mb-8">
                  <img
                    src={item.image}
                    alt={item.ingredientName}
                    style={{ width: 200, height: 200, objectFit: "contain" }}
                    draggable={false}
                    onClick={() => handleRemove(item.ingredientName)}
                  />
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
