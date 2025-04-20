import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import AddImageModal from '../components/AddImageModal';
import Button from '../components/Button';
import RadioButton from '../components/RadioButton';
import CheckBox from '../components/CheckBox';
import InputBox from '../components/InputBox';
import PageTitle from '../components/PageTitle';

const COOKING_STEPS = [
  '재료 다듬기',
  '볶기',
  '찜',
  '굽기',
  '플레이팅',
  '완료'
];

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [menuName, setMenuName] = useState('');
  const [category, setCategory] = useState('한식');
  const [mainImage, setMainImage] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeImageSection, setActiveImageSection] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [cookingSections, setCookingSections] = useState([
    {
      id: 1,
      type: COOKING_STEPS[0],
      steps: []
    }
  ]);

  const handleIngredientSubmit = (e) => {
    e.preventDefault();
    if (ingredientInput.trim()) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  const removeIngredient = (indexToRemove) => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const addCookingSection = () => {
    const newSection = {
      id: cookingSections.length + 1,
      type: COOKING_STEPS[0],
      steps: []
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
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center">
              <span className="font-medium min-w-[80px]">카테고리</span>
              <div className="flex gap-2">
                {['한식', '중식', '일식', '양식', '기타'].map((item) => (
                  <label
                    key={item}
                    className={`px-4 py-2 rounded-full cursor-pointer transition-all
                      ${category === item 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={item}
                      checked={category === item}
                      onChange={() => setCategory(item)}
                      className="hidden"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 제목 입력 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">제목</h3>
              <InputBox
                value={title}
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">메뉴명</h3>
              <InputBox
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                placeholder="메뉴명을 입력하세요"
                className="w-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">재료</h3>
              <form onSubmit={handleIngredientSubmit} className="relative">
                <input
                  type="text"
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  placeholder="재료를 입력하고 엔터를 눌러주세요"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
              <div className="flex flex-wrap gap-2 mt-2">
                {ingredients.map((ingredient, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">
                    {ingredient}
                    <button 
                      onClick={() => removeIngredient(index)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
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
                      {COOKING_STEPS.map((step) => (
                        <option key={step} value={step}>{step}</option>
                      ))}
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
                    className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 flex items-center justify-center"
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
              size="lg"
              className="w-full"
            >
              작성 완료
            </Button>
          </div>
        </div>
      </div>

      {/* 이미지 추가 모달 */}
      <AddImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onImageSelect={handleImageSelect}
      />
    </div>
  );
};

export default CreatePost; 