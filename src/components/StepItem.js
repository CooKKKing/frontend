import React from 'react';
import useIsMobile from '../hooks/useIsMobile';

const StepItem = ({ stepNumber, img, desc }) => {
  const { isMobile, isSmallMobile } = useIsMobile();

  // 텍스트 크기 동적 결정
  const numberFontSize = isSmallMobile
    ? 14
    : isMobile
    ? 16
    : 20;

  const descFontSize = isSmallMobile
    ? 12
    : isMobile
    ? 14
    : 16;

  return (
    <div className="w-full border rounded mb-2 p-2 bg-white">
      <div className="flex flex-row">
        <span
          className="block font-bold mr-4 min-w-[32px] text-center h-auto"
          style={{ fontSize: numberFontSize }}
        >
          {stepNumber}.
        </span>
        <div className="flex items-center">
          <img
            src={img}
            alt=""
            className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded mr-4"
          />
          <div style={{ fontSize: descFontSize }}>{desc}</div>
        </div>
      </div>
    </div>
  );
};

export default StepItem;
