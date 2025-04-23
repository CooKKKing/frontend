import React from 'react';

// const RadioButton = ({
//   id,
//   name,
//   value,
//   checked = false,
//   onChange,
//   label,
//   disabled = false,
// }) => {
//   return (
//     <div className="flex items-center">
//       <input
//         id={id}
//         type="radio"
//         name={name}
//         value={value}
//         checked={checked}
//         onChange={onChange}
//         disabled={disabled}
//         className="hidden"
//       />
//       <label
//         htmlFor={id}
//         className={`flex items-center justify-center px-4 py-2 rounded-full cursor-pointer transition-all
//           ${checked 
//             ? 'bg-green-500 text-white font-medium' 
//             : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
//           }
//           ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
//         `}
//       >
//         {label}
//       </label>  
//     </div>
//   );
// };

// export default RadioButton;

const RadioButton = ({
  id,
  name,
  value,
  checked = false,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 accent-green bg-gray-100 border-gray-300 focus:ring-green disabled:opacity-50 whitespace-nowrap"
      />
      {label && (
        <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900 select-none cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
};

export default RadioButton;