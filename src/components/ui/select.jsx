import React from 'react';

// Main Select component
export function Select({ children }) {
  return <div className="relative">{children}</div>;
}

// SelectTrigger component (button that opens the dropdown)
export function SelectTrigger({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center p-2 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      {children}
    </button>
  );
}

// SelectValue component (displays the selected value)
export function SelectValue({ value, placeholder }) {
  return (
    <span className={value ? 'text-gray-800' : 'text-gray-400'}>
      {value || placeholder}
    </span>
  );
}

// SelectContent component (dropdown menu)
export function SelectContent({ children, isOpen }) {
  return (
    isOpen && (
      <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
        {children}
      </div>
    )
  );
}

// SelectItem component (individual item in the dropdown)
export function SelectItem({ value, onSelect, children }) {
  return (
    <div
      className="p-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  );
}
