import React, { useState, useEffect } from 'react';

const LoadingBar = () => {
    const [currentImage, setCurrentImage] = useState(1);
    const totalImages = 5;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev % totalImages) + 1);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="p-4">
                <img 
                    src={`/assets/images/rice/${currentImage}.png`}
                    alt="로딩 애니메이션"
                    className="w-16 h-16 object-contain animate-bounce"
                />
            </div>
        </div>
    );
};

export default LoadingBar;
