// ../components/ui/input.js
import React from 'react';

export const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  );
};
