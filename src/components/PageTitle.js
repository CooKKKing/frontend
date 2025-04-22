import React from 'react';
import useIsMobile from '../hooks/useIsMobile';

const PageTitle = ({ title }) => {
    const { isMobile, isTablet } = useIsMobile();
    const fontSize = isMobile ? '24px' : isTablet ? '30px' : '36px' ;

    return (
        <div className="flex justify-between items-center mb-6">
            <h1 style={{ fontSize }} className="font-medium text-black">{title}</h1>
        </div>
    );
};

export default PageTitle;

