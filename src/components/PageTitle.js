import React from 'react';
import useIsMobile from '../hooks/useIsMobile';

const PageTitle = ({ title }) => {

    const { isMobile, isTablet } = useIsMobile();

    const fontSize = isMobile ? "30px" : isTablet ? "36px" : "40px";

    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className={`text-[${fontSize}] font-medium text-black`}>{title}</h1>
        </div>
    );
};

export default PageTitle;

