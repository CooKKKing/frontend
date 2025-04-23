import React from 'react';

const StepItem = ({ stepNumber, img, desc }) => (
  <div className="w-full border rounded mb-2 p-2 bg-white flex items-center">
    <span className="text-xl font-bold mr-4 min-w-[32px] text-center">{stepNumber}.</span>
    <img src={img} alt="" className="w-24 h-20 object-cover rounded mr-4" />
    <div className="text-base">{desc}</div>
  </div>
);

export default StepItem;