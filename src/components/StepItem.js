import React from 'react';

const StepItem = ({ stepNumber, img, desc }) => (
  <div className="w-full border rounded mb-2 p-2 bg-white">
    <div className='flex flex-row'>
        <span className="block text-xl font-bold mr-4 min-w-[32px] text-center h-auto">{stepNumber}.</span>
        <div className='flex items-center'>
            <img src={img} alt="" className="w-24 h-20 object-cover rounded mr-4" />
            <div className="text-base">{desc}</div>
        </div>
    </div>
  </div>
);

export default StepItem;