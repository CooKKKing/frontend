import React, { useState } from 'react';
import useIsMobile from '../hooks/useIsMobile';

const PageTitle = ({ title, isMargin = true }) => {
    const { isMobile, isTablet } = useIsMobile();
    // const [ isMargin , setIsMargin ] = useState(true);
    const fontSize = isMobile ? '24px' : isTablet ? '30px' : '36px' ;

    return (
        <div className={`flex justify-between items-center ${isMargin ? "mb-4" : ""}`}>
            <h1 style={{ fontSize }} className="font-medium text-black">{title}</h1>
        </div>
    );
        // <div className={`flex justify-between items-center ${isMargin ? "mb-4" : ""}`}>
        //     <h1 style={{ fontSize }} className="font-medium text-black">{title}</h1>
        // </div>
    
};

export default PageTitle;

