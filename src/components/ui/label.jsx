// ../components/ui/label.js
import React from 'react';

export const Label = ({ htmlFor, className = '', children }) => {
  return (
    <label htmlFor={htmlFor} className={`block font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  );
};
