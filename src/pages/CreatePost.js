import React, { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import AddImageModal from '../components/AddImageModal';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import CheckBox from '../components/CheckBox';
import InputBox from '../components/InputBox';
import PageTitle from '../components/PageTitle';
import useRadioGroup from '../hooks/useRadioGroup';
import { ingredients } from '../data/foodData';
import useIsMobile from '../hooks/useIsMobile';

const COOKING_STEPS = [
  '재료 다듬기',
  '볶기',
  '찜',
  '굽기',
  '플레이팅',
  '완료'
];

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
      {message}
    </div>
  );
};

const CreatePost = () => {
  const {isTablet, isMobile} = useIsMobile();

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
  const [cookingSections, setCookingSections] = useState([
    {
      id: 1,
      type: COOKING_STEPS[0],
      steps: [{
        id: 1,
        image: null,
        description: ''
      }]
    }
  ]);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const options = [
    { id: '한식', value: '한식', label: '한식' },
    { id: '중식', value: '중식', label: '중식' },
    { id: '일식', value: '일식', label: '일식' },
    { id: '양식', value: '양식', label: '양식' },
    { id: '기타', value: '기타', label: '기타' },
  ];

  const { selected, handleChange } = useRadioGroup(options[0].value);

  // 주재료 검색 필터링
  useEffect(() => {
    if (mainIngredientInput) {
      const filtered = ingredients.main.filter(ingredient =>
        ingredient.includes(mainIngredientInput)
      );
      setFilteredMainIngredients(filtered);
    } else {
      setFilteredMainIngredients(ingredients.main);
    }
  }, [mainIngredientInput]);

  // 부재료 검색 필터링
  useEffect(() => {
    if (subIngredientInput) {
      const filtered = ingredients.sub.filter(ingredient =>
        ingredient.includes(subIngredientInput)
      );
      setFilteredSubIngredients(filtered);
    } else {
      setFilteredSubIngredients(ingredients.sub);
    }
  }, [subIngredientInput]);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleMainIngredientSubmit = (e) => {
    e.preventDefault();
    if (!mainIngredientInput.trim()) return;

    if (!ingredients.main.includes(mainIngredientInput)) {
      showToastMessage('주재료 목록에 없는 재료입니다.');
      return;
    }

    if (mainIngredients.includes(mainIngredientInput)) {
      showToastMessage('이미 추가된 재료입니다.');
      return;
    }

    setMainIngredients([...mainIngredients, mainIngredientInput]);
    setMainIngredientInput('');
    setShowMainIngredientList(false);
  };

  const handleSubIngredientSubmit = (e) => {
    e.preventDefault();
    if (!subIngredientInput.trim()) return;

    if (!ingredients.sub.includes(subIngredientInput)) {
      showToastMessage('부재료 목록에 없는 재료입니다.');
      return;
    }

    if (subIngredients.includes(subIngredientInput)) {
      showToastMessage('이미 추가된 재료입니다.');
      return;
    }

    setSubIngredients([...subIngredients, subIngredientInput]);
    setSubIngredientInput('');
    setShowSubIngredientList(false);
  };

  const removeMainIngredient = (index) => {
    setMainIngredients(mainIngredients.filter((_, i) => i !== index));
  };

  const removeSubIngredient = (index) => {
    setSubIngredients(subIngredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...mainIngredients];
    newIngredients[index] = value;
    setMainIngredients(newIngredients);
  };

  const addIngredient = () => {
    setMainIngredients([...mainIngredients, '']);
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

  const handleSubmit = () => {
    console.log('게시글 작성 완료');
  };

  const handleMainIngredientClick = (ingredient) => {
    if (mainIngredients.includes(ingredient)) {
      showToastMessage('이미 추가된 재료입니다.');
      return;
    }
    setMainIngredients([...mainIngredients, ingredient]);
    setMainIngredientInput('');
    setShowMainIngredientList(false);
  };

  const handleSubIngredientClick = (ingredient) => {
    if (subIngredients.includes(ingredient)) {
      showToastMessage('이미 추가된 재료입니다.');
      return;
    }
    setSubIngredients([...subIngredients, ingredient]);
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4">
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
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </form>
                  {showMainIngredientList && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                      {filteredMainIngredients.map((ingredient, index) => {
                        const isDisabled = mainIngredients.includes(ingredient);
                        return (
                          <div
                            key={index}
                            className={`px-4 py-2 cursor-pointer ${
                              isDisabled 
                                ? 'bg-gray-100 text-gray-400' 
                                : 'hover:bg-gray-100'
                            }`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              if (isDisabled) {
                                showToastMessage('이미 추가된 재료입니다.');
                              } else {
                                handleMainIngredientClick(ingredient);
                              }
                            }}
                          >
                            {ingredient}
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
                      {ingredient}
                      <button 
                        onClick={() => removeMainIngredient(index)}
                        className="text-green-500 hover:text-green-700"
                      >
                        ×
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
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </form>
                  {showSubIngredientList && (
                    <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                      {filteredSubIngredients.map((ingredient, index) => {
                        const isDisabled = subIngredients.includes(ingredient);
                        return (
                          <div
                            key={index}
                            className={`px-4 py-2 cursor-pointer ${
                              isDisabled 
                                ? 'bg-gray-100 text-gray-400' 
                                : 'hover:bg-gray-100'
                            }`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              if (isDisabled) {
                                showToastMessage('이미 추가된 재료입니다.');
                              } else {
                                handleSubIngredientClick(ingredient);
                              }
                            }}
                          >
                            {ingredient}
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
                      {ingredient}
                      <button 
                        onClick={() => removeSubIngredient(index)}
                        className="text-orange-500 hover:text-orange-700"
                      >
                        ×
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
                        <IoMdClose size={24} />
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
      </div>

      {/* 이미지 추가 모달 */}
      <AddImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onAdd={handleImageSelect}
      />
      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>

  );
};

export default CreatePost; 