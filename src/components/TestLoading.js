import React, { useState } from 'react';
import LoadingBar from './LoadingBar';

const TestLoading = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
    };

    return (
        <div className="p-4">
            <button 
                onClick={handleClick}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                로딩 시작
            </button>
            {isLoading && <LoadingBar />}
        </div>
    );
};

export default TestLoading; 