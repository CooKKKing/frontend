import React from 'react';
import useIsMobile from '../hooks/useIsMobile';
import StepItem from './StepItem';

const StepGroup = ({ title, steps }) => {
  const { isMobile, isSmallMobile } = useIsMobile();

  const titleFontSize = isSmallMobile
    ? 16
    : isMobile
    ? 18
    : 22;

  return (
    <div className="mb-8 bg-[#f9f8f3] border border-gray-300 rounded-xl p-4 w-auto">
      <div
        className="font-bold mb-4"
        style={{ fontSize: titleFontSize }}
      >
        {title}
      </div>
      <div>
        {steps.map((step, idx) => (
          <StepItem
            key={idx}
            stepNumber={idx + 1}
            img={step.img}
            desc={step.desc}
          />
        ))}
      </div>
    </div>
  );
};

export default StepGroup;
