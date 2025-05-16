import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import Button from '../components/buttons/Button';
import RadioButton from '../components/buttons/RadioButton';
import CheckBox from '../components/buttons/CheckBox';
import InputBox from '../components/inputs/InputBox';
import PageTitle from '../components/PageTitle';
import useRadioGroup from '../hooks/useRadioGroup';
import useIsMobile from '../hooks/useIsMobile';
import AddImageRecipeModal from '../components/modals/AddImageRecipeModal';
import { createRecipe } from '../api/mutations/recipeService';
import { getMenuCategoryList } from '../api/queries/menuService';
import { getIngredients } from '../api/queries/ingredientService';
import { IoSearch } from "react-icons/io5";
import { useToast } from '../hooks/useToast';

import { useNavigate } from 'react-router-dom';


const COOKING_STEPS = [
  '재료 다듬기',
  '볶기',
  '찜',
  '굽기',
  '플레이팅',
  '완료'
];

const CreatePost = () => {
  const {isTablet, isMobile} = useIsMobile();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [menuName, setMenuName] = useState('');
  const [otherCategory, setOtherCategory] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [mainIngredients, setMainIngredients] = useState([]);
  const [subIngredients, setSubIngredients] = useState([]);
  const [mainIngredientInput, setMainIngredientInput] = useState('');
  const [subIngredientInput, setSubIngredientInput] = useState('');
  const [showMainIngredientList, setShowMainIngredientList] = useState(false);
  const [showSubIngredientList, setShowSubIngredientList] = useState(false);
  const [filteredMainIngredients, setFilteredMainIngredients] = useState([]);
  const [filteredSubIngredients, setFilteredSubIngredients] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeImageSection, setActiveImageSection] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);

  const { showToast } = useToast();

  const [cookingSections, setCookingSections] = useState([
    {
      // 섹션
      id: 1,
      type: COOKING_STEPS[0],
      // 그 안에 들어가는 세부적인 단계
      steps: [{
        id: 1, 
        image: null,
        description: ''
      }]
    }
  ]);

  // API 데이터 상태 추가
  const [ingredientsData, setIngredientsData] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  
  // 기존 options 대신 API에서 가져온 카테고리 사용
  const options = menuCategories.map(category => ({
    id: category.menuCategoryId.toString(),
    // 선택값(서버에 보낼 값)
    value: category.menuCategoryName,
    // 화면에 보여주는 값
    label: category.menuCategoryName
  }));

  // 데이터가 비동기로 들어오기때문에 데이터가 아직 없을 때, 데이터가 들어온 후 둘 다 안전하게 처리 가능
  // 카테고리 순서가 이미 정해져 있어도 API에서 순서가 바뀌면 에러가 나기때문에 방어적 코드를 작성한거임임
  const { selected, handleChange } = useRadioGroup(options[0]?.value || '한식');

  // API 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 재료 데이터 가져오기
        const ingredientsJson = await getIngredients();
        console.log('가져온 재료 데이터:', ingredientsJson.data);
        // 이미 try-catch문을 사용하고 있기때문에 굳이 빈 배열로 설정 안해줘도 될듯 ..?
        setIngredientsData(ingredientsJson.data || []);

        // 메뉴 카테고리 데이터 가져오기
        const categoriesJson = await getMenuCategoryList();
        console.log('가져온 카테고리 데이터:', categoriesJson.data);
        setMenuCategories(categoriesJson.data || []);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        // 에러 발생 시 빈 배열로 초기화
        setIngredientsData([]);
        setMenuCategories([]);
      }
    };

    fetchData();
  }, []);

  // 주재료 검색 필터링
  useEffect(() => {
    console.log('현재 ingredientsData:', ingredientsData);
    console.log('현재 검색어:', mainIngredientInput);
    
    if (mainIngredientInput) {
      const filtered = ingredientsData
        .filter(ingredient => {
          console.log('검사중인 재료:', ingredient);
          return ingredient.dtype === 'MAIN';
        })
        .filter(ingredient => 
          // 한글만 검색이 되는데 굳이 toLowerCase를 사용해야할까
          ingredient.ingredientName.toLowerCase().includes(mainIngredientInput.toLowerCase())
        );
      console.log('필터링된 주재료:', filtered);
      setFilteredMainIngredients(filtered);
    } else {
      const mainIngredients = ingredientsData.filter(ingredient => ingredient.dtype === 'MAIN');
      console.log('전체 주재료:', mainIngredients);
      setFilteredMainIngredients(mainIngredients);
    }
  }, [mainIngredientInput, ingredientsData]);

  // 부재료 검색 필터링
  useEffect(() => {
    console.log('현재 검색어:', subIngredientInput);
    
    if (subIngredientInput) {
      const filtered = ingredientsData
        .filter(ingredient => {
          console.log('검사중인 재료:', ingredient);
          return ingredient.dtype === 'SEASONING';
        })
        .filter(ingredient => 
          // 여기도 toLowerCase 사용 할 필요 없는듯듯
          ingredient.ingredientName.toLowerCase().includes(subIngredientInput.toLowerCase())
        );
      console.log('필터링된 부재료:', filtered);
      setFilteredSubIngredients(filtered);
    } else {
      const subIngredients = ingredientsData.filter(ingredient => ingredient.dtype === 'SEASONING');
      console.log('전체 부재료:', subIngredients);
      setFilteredSubIngredients(subIngredients);
    }
  }, [subIngredientInput, ingredientsData]);

  const handleMainIngredientSubmit = (e) => {
    e.preventDefault();
    // trim -> 문자열 양쪽 끝 공백 제거 메서드드
    if (!mainIngredientInput.trim()) return;
    // 조건에 맞는 첫번째 요소를 찾아서 반환 없을 시 undifined 반환환
    const foundIngredient = ingredientsData.find(
      ingredient => 
        ingredient.dtype === 'MAIN' && 
        ingredient.ingredientName.toLowerCase() === mainIngredientInput.toLowerCase()
    );

    if (!foundIngredient) {
      showToast('주재료 목록에 없는 재료입니다.', 'error');
      return;
    }

    // 배열 안에 특정 조건을 만족하는 요소가 하나라도 있으면 true또는 false 반환
    if (mainIngredients.some(item => item.id === foundIngredient.ingredientId)) {
      showToast('이미 추가된 재료입니다.', 'error');
      return;
    }

    setMainIngredients([...mainIngredients, {
      id: foundIngredient.ingredientId,
      name: foundIngredient.ingredientName
    }]);
    setMainIngredientInput('');
    setShowMainIngredientList(false);
  };

  const handleSubIngredientSubmit = (e) => {
    e.preventDefault();
    if (!subIngredientInput.trim()) return;

    const foundIngredient = ingredientsData.find(
      ingredient => 
        ingredient.dtype === 'SEASONING' && 
        ingredient.ingredientName.toLowerCase() === subIngredientInput.toLowerCase()
    );

    if (!foundIngredient) {
      showToast('부재료 목록에 없는 재료입니다.', 'error');
      return;
    }

    if (subIngredients.some(item => item.id === foundIngredient.ingredientId)) {
      showToast('이미 추가된 재료입니다.', 'error');
      return;
    }

    setSubIngredients([...subIngredients, {
      id: foundIngredient.ingredientId,
      name: foundIngredient.ingredientName
    }]);
    setSubIngredientInput('');
    setShowSubIngredientList(false);
  };

  // filter 는 요소를 3가지 받을 수 있음 (요소(필수), 인덱스(선택), 현재 배열(선택)) 
  // 필수이지만 지금 사용하는건 인덱스이기때문에 "_"로 생략하여 사용할 수 있음음
  // index가 아닌것들만 setMainIngredients에 남기고 삭제 할 index인 친구만 삭제 한 새로운 배열 생성
  const removeMainIngredient = (index) => {
    setMainIngredients(mainIngredients.filter((_, i) => i !== index));
  };

  const removeSubIngredient = (index) => {
    setSubIngredients(subIngredients.filter((_, i) => i !== index));
  };

  const addCookingSection = () => {
    const usedTypes = cookingSections.map(section => section.type);
    const availableType = COOKING_STEPS.find(step => !usedTypes.includes(step));

    const newSection = {
      id: cookingSections.length + 1,
      type: availableType || COOKING_STEPS[0],
      steps: [{
        id: 1,
        image: null,
        description: ''
      }]
    };
    setCookingSections([...cookingSections, newSection]);
  };

  const addStep = (sectionIndex) => {
    const newSections = [...cookingSections];
    const section = newSections[sectionIndex];
    section.steps.push({
      id: section.steps.length + 1,
      image: null,
      description: ''
    });
    setCookingSections(newSections);
  };


  const removeStep = (sectionIndex, stepIndex) => {
    const newSections = [...cookingSections];
    newSections[sectionIndex].steps = newSections[sectionIndex].steps.filter((_, i) => i !== stepIndex);
    setCookingSections(newSections);
  };

  const removeCookingSection = (sectionIndex) => {
    setCookingSections(cookingSections.filter((_, i) => i !== sectionIndex));
  };

  const updateStep = (sectionIndex, stepIndex, field, value) => {
    const newSections = [...cookingSections];
    newSections[sectionIndex].steps[stepIndex][field] = value;
    setCookingSections(newSections);
  };

  const handleImageSelect = (imageUrl) => {
    if (activeImageSection === 'main') {
      setMainImage(imageUrl);
    } else {
      const [sectionIndex, stepIndex] = activeImageSection.split('-').slice(1).map(Number);
      updateStep(sectionIndex, stepIndex, 'image', imageUrl);
    }
    setShowImageModal(false);
  };

  const handleSubmit = async () => {
    try {
      // 선택된 카테고리의 ID 찾기
      const selectedCategory = menuCategories.find(
        category => category.menuCategoryName === selected
      );

      const recipeData = {
        title: title,
        image: mainImage,
        recipeStatus: isPrivate ? 'RECIPE_PRIVATE' : 'RECIPE_PUBLIC',
        recipeBoardSteps: cookingSections.map((section, sectionIndex) => ({
          recipeStepId: section.id,
          stepOrder: sectionIndex + 1,
          recipeStepDetails: section.steps.map((step, stepIndex) => ({
            stepOrder: stepIndex + 1,
            description: step.description,
            image: step.image
          }))
        })),
        menuName: menuName,
        menuCategoryId: selectedCategory ? selectedCategory.menuCategoryId : (selected === '기타' ? 5 : 1),
        menuSubCategory: selected === '기타' ? otherCategory : selected,
        ingredients: [
          ...mainIngredients.map(ingredient => ({
            ingredientId: ingredient.id,
            type: 'MAIN'
          })),
          ...subIngredients.map(ingredient => ({
            ingredientId: ingredient.id,
            type: 'SEASONING'
          }))
        ]
      };

      console.log('레시피 데이터:', JSON.stringify(recipeData));
      // 서버에 데이터 보낼 때, JSON 문자열 타입으로 보내기
      const response = await createRecipe(JSON.stringify(recipeData));
      console.log('레시피 등록 응답:', response);

      alert('레시피가 성공적으로 등록되었습니다.');
      navigate('/');
      
    } catch (error) {
      console.error('레시피 등록 실패:', error.response.data);
      alert(error.message || '레시피 등록에 실패했습니다.');
    }
  };

  const handleMainIngredientClick = (ingredient) => {
    if (mainIngredients.some(item => item.id === ingredient.ingredientId)) {
      showToast('이미 추가된 재료입니다.', 'error');
      return;
    }
    setMainIngredients([...mainIngredients, {
      id: ingredient.ingredientId,
      name: ingredient.ingredientName
    }]);
    setMainIngredientInput('');
    setShowMainIngredientList(false);
  };

  const handleSubIngredientClick = (ingredient) => {
    if (subIngredients.some(item => item.id === ingredient.ingredientId)) {
      showToast('이미 추가된 재료입니다.', 'error');
      return;
    }
    setSubIngredients([...subIngredients, {
      id: ingredient.ingredientId,
      name: ingredient.ingredientName
    }]);
    setSubIngredientInput('');
    setShowSubIngredientList(false);
  };

  const isFormValid = () => {
    // 제목 확인
    if (!title.trim()) return false;
    
    // 메뉴명 확인
    if (!menuName.trim()) return false;
    
    // 대표사진 확인
    if (!mainImage) return false;
    
    // 카테고리가 '기타'일 경우 기타 카테고리 입력 확인
    if (selected === '기타' && !otherCategory.trim()) return false;
    
    // 주재료 최소 1개 이상 확인
    if (mainIngredients.length === 0) return false;
    
    // 모든 조리 과정의 모든 단계가 이미지와 설명을 가지고 있는지 확인
    const isAllStepsComplete = cookingSections.every(section => 
      section.steps.every(step => 
        step.image && step.description.trim()
      )
    );
    if (!isAllStepsComplete) return false;

    return true;
  };

  return (
    // <div className="min-h-screen bg-white">
      <>
        <div className="flex justify-between items-center mb-6">
          <PageTitle title="게시글 작성" />
          <CheckBox
            checked={!isPrivate}
            onChange={(e) => setIsPrivate(!e.target.checked)}
            label="비공개"
          />
        </div>
        
        <div className="space-y-6">
          {/* 카테고리 선택 */}
            <div className={` flex ${isTablet || isMobile ? 'flex-col' : ' items-center'}`}>
              <span className="font-medium min-w-[80px]">카테고리</span>
              <div className="flex basic-radio-group items-center">
                {options.map((option) => (
                  <div key={option.id} className={`${isTablet || isMobile ? 'pr-4' : 'pr-5 '} flex items-center`}>
                    <RadioButton
                      id={option.id}
                      name="group"
                      value={option.value}
                      checked={selected === option.value}
                      onChange={() => handleChange(option.value)}
                      label={option.label}
                    />
                    {option.value === '기타' && selected === '기타' && (
                      <input
                        type="text"
                        value={otherCategory}
                        onChange={(e) => setOtherCategory(e.target.value)}
                        placeholder="기타 카테고리 입력"
                        className="ml-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          

          {/* 제목 입력 */}
          <div className={`grid gap-4 ${isTablet || isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <div>
              <h3 className="text-lg font-medium mb-2">제목</h3>
              <InputBox
                value={title}
                showButton={false}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                className="w-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">대표사진</h3>
              <div 
                onClick={() => {
                  setActiveImageSection('main');
                  setShowImageModal(true);
                }}
                className="w-full h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden"
              >
                {mainImage ? (
                  <img 
                    src={mainImage} 
                    alt="대표 사진" 
                    className="w-full h-full object-contain" 
                  />
                ) : (
                  <IoAdd className="w-8 h-8 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* 메뉴명 입력 */}
          <div className={`grid gap-4 ${isTablet || isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {/* 메뉴명명 */}
            <div>
              <h3 className="text-lg font-medium mb-2">메뉴명</h3>
              <InputBox
                value={menuName}
                showButton={false}
                onChange={(e) => setMenuName(e.target.value)}
                placeholder="메뉴명을 입력하세요"
                className="w-full"
              />
            </div>
            
            <div>
              {/* 주재료 */}
              <div className={`${isTablet ? '' : 'mb-8'}`}>
                <h3 className="text-lg font-medium mb-2">주재료</h3>
                <div className="relative">
                  <form onSubmit={handleMainIngredientSubmit} className="relative">
                    <input
                      type="text"
                      value={mainIngredientInput}
                      onChange={(e) => {
                        setMainIngredientInput(e.target.value);
                        setShowMainIngredientList(true);
                      }}
                      onFocus={() => setShowMainIngredientList(true)}
                      onBlur={() => {
                        setTimeout(() => {
                          setShowMainIngredientList(false);
                        }, 200);
                      }}
                      placeholder="주재료를 입력하고 엔터를 눌러주세요"
                      className="w-full h-[48px] px-4 py-2 border border-gray-300 rounded-lg pr-10"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                      <IoSearch className="w-5 h-5 text-gray-400" />
                    </button>
                  </form>
                  {showMainIngredientList && filteredMainIngredients.length > 0 && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                      {filteredMainIngredients.map((ingredient) => {
                        const isDisabled = mainIngredients.some(item => item.id === ingredient.ingredientId);
                        return (
                          <div
                            key={ingredient.ingredientId}
                            className={`px-4 py-2 cursor-pointer ${
                              isDisabled 
                                ? 'bg-gray-100 text-gray-400' 
                                : 'hover:bg-gray-100'
                            }`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              if (isDisabled) {
                                showToast('이미 추가된 재료입니다.', 'error');
                              } else {
                                handleMainIngredientClick(ingredient);
                              }
                            }}
                          >
                            {ingredient.ingredientName}
                            {isDisabled && <span className="ml-2 text-sm">(추가됨)</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {mainIngredients.map((ingredient, index) => (
                    <span key={index} className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm flex items-center gap-1">
                      {ingredient.name}
                      <button 
                        onClick={() => removeMainIngredient(index)}
                        className="text-green-500 hover:text-green-700"
                      >
                      <IoClose className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              {/* 부재료 */}
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">부재료</h3>
                <div className="relative">
                  <form onSubmit={handleSubIngredientSubmit} className="relative">
                    <input
                      type="text"
                      value={subIngredientInput}
                      onChange={(e) => {
                        setSubIngredientInput(e.target.value);
                        setShowSubIngredientList(true);
                      }}
                      onFocus={() => setShowSubIngredientList(true)}
                      onBlur={() => {
                        setTimeout(() => {
                          setShowSubIngredientList(false);
                        }, 200);
                      }}
                      placeholder="부재료를 입력하고 엔터를 눌러주세요"
                      className="w-full h-[48px] px-4 py-2 border border-gray-300 rounded-lg pr-10"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                      <IoSearch className="w-5 h-5 text-gray-400" />
                    </button>
                  </form>
                  {showSubIngredientList && filteredSubIngredients.length > 0 && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                      {filteredSubIngredients.map((ingredient) => {
                        const isDisabled = subIngredients.some(item => item.id === ingredient.ingredientId);
                        return (
                          <div
                            key={ingredient.ingredientId}
                            className={`px-4 py-2 cursor-pointer ${
                              isDisabled 
                                ? 'bg-gray-100 text-gray-400' 
                                : 'hover:bg-gray-100'
                            }`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              if (isDisabled) {
                                showToast('이미 추가된 재료입니다.', 'error');
                              } else {
                                handleSubIngredientClick(ingredient);
                              }
                            }}
                          >
                            {ingredient.ingredientName}
                            {isDisabled && <span className="ml-2 text-sm">(추가됨)</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {subIngredients.map((ingredient, index) => (
                    <span key={index} className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm flex items-center gap-1">
                      {ingredient.name}
                      <button 
                        onClick={() => removeSubIngredient(index)}
                        className="text-orange-500 hover:text-orange-700"
                      >
                      <IoClose className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
          </div>

          

          {/* 순서 */}
          <div>
            <h3 className="text-lg font-medium mb-2">순서</h3>
            <div className="space-y-6">
              {cookingSections.map((section, sectionIndex) => (
                <div key={section.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <select
                      value={section.type}
                      onChange={(e) => {
                        const newSections = [...cookingSections];
                        newSections[sectionIndex].type = e.target.value;
                        setCookingSections(newSections);
                      }}
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {COOKING_STEPS.map((step) => {
                        const isSelected = cookingSections.some(
                          (s, idx) => idx !== sectionIndex && s.type === step
                        );
                        return (
                          <option 
                            key={step} 
                            value={step} 
                            disabled={isSelected}
                            className={isSelected ? 'text-gray-400' : ''}
                          >
                            {step}
                          </option>
                        );
                      })}
                    </select>
                    {cookingSections.length > 1 && (
                      <button
                        onClick={() => removeCookingSection(sectionIndex)}
                        className="p-2 text-gray-500 hover:text-red-500"
                      >
                        <IoClose size={24} />
                      </button>
                    )}
                  </div>

                  {section.steps.map((step, stepIndex) => (
                    <div key={step.id} className="flex gap-4">
                      <div className="w-8 font-bold text-right">{stepIndex + 1}.</div>
                      <div className="flex-1">
                        <div className="grid grid-cols-2 gap-4">
                          <div 
                            onClick={() => {
                              setActiveImageSection(`step-${sectionIndex}-${stepIndex}`);
                              setShowImageModal(true);
                            }}
                            className="w-full aspect-video border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden"
                          >
                            {step.image ? (
                              <img 
                                src={step.image} 
                                alt={`순서 ${stepIndex + 1}`} 
                                className="w-full h-full object-contain" 
                              />
                            ) : (
                              <IoAdd className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                          <div className="w-full aspect-video">
                            <textarea
                              value={step.description || ''}
                              onChange={(e) => updateStep(sectionIndex, stepIndex, 'description', e.target.value)}
                              placeholder="조리 과정에 대한 설명을 입력해주세요"
                              className="w-full h-full p-3 border-2 border-gray-300 rounded-lg resize-none"
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => removeStep(sectionIndex, stepIndex)}
                          className="mt-2 text-gray-500 hover:text-red-500"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => addStep(sectionIndex)}
                    disabled={section.steps.length > 0 && (!section.steps[section.steps.length - 1].image || !section.steps[section.steps.length - 1].description)}
                    className={`w-full p-2 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${
                      section.steps.length > 0 && (!section.steps[section.steps.length - 1].image || !section.steps[section.steps.length - 1].description)
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <IoAdd size={24} className="mr-2" />
                    단계 추가
                  </button>
                </div>
              ))}

              <button
                onClick={addCookingSection}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center"
              >
                <IoAdd size={24} className="mr-2" />
                새로운 조리 과정 추가
              </button>
            </div>
          </div>

          {/* 작성 완료 버튼 */}
          <div className="pt-6">
            <Button
              variant="orange"
              size="full"
              value="작성 완료"
              height="48px"
              className={`w-full ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleSubmit}
              disabled={!isFormValid()}
            />
          </div>
        </div>
      
         {/* 이미지 추가 모달 */}
        <AddImageRecipeModal
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          onAdd={handleImageSelect}
        />
      </>

     
    // </div>

  );
};

export default CreatePost; 