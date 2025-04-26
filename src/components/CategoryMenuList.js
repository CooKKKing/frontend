import React from 'react';
import { useDictionary } from '../contexts/DictionaryContext';
import PageTitle from './PageTitle';
import useIsMobile from '../hooks/useIsMobile';

const CategoryMenuList = ({ onSelect, activeCategory }) => {
    const { categories } = useDictionary();
    const { isMobile } = useIsMobile();
    console.log("CategoryMenuList - categories:", categories);
    console.log("CategoryMenuList - activeCategory:", activeCategory);
    

    return (
        <div className={`flex gap-4 p-4 flex-col bg-white w-full`}>
            <div className="text-xl font-bold">도감 카테고리</div>
            <div className={`flex gap-4 ${isMobile ? 'w-full flex-row overflow-x-auto' : 'flex-col'}`}>
            {categories.map(category => (
                <div
                    key={category.id}
                    onClick={() => onSelect(category.id)}
                    className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg 
                        ${category.id === activeCategory ? 'bg-blue-100 border-2 border-blue-400' : 'bg-white border'}
                        ${isMobile ? 'min-w-fit h-fit' : ''}
                    `}
                >
                    <img
                        src={`/assets/images/camera/${category.cameraType}-${category.color}.png`}
                        alt={category.name}
                        className="h-10 object-contain"
                    />
                    <span className="font-bold whitespace-nowrap">{category.name}</span>
                </div>
            ))}
            </div>
        </div>
    );
};

export default CategoryMenuList; 